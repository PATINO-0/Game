# backend/scripts/Text_3_cero.txt

Script Python de Blender: exporta cada malla seleccionada a GLB y guarda ubicaciones y nivel en JSON.

Fuente: [backend/scripts/Text_3_cero.txt](../../backend/scripts/Text_3_cero.txt). La numeración corresponde al archivo comentado.

## Funciones y métodos

Este archivo declara datos, configuración o instrucciones de entrada sin métodos propios con nombre.

## Referencia por línea

Cada fila conserva el código de esa línea y explica su operación o su papel estructural. Los textos HTML/CSS y las plantillas se documentan aquí sin insertar comentarios que alterarían su contenido.

| Línea | Código | Qué hace |
| ---: | --- | --- |
| 1 | <code># Exporta mallas seleccionadas y coordenadas compatibles con Three.js.</code> | Comentario de documentación en español. |
| 2 | <code> </code> | Separa visualmente dos partes del archivo. |
| 3 | <code> </code> | Separa visualmente dos partes del archivo. |
| 4 | <code> </code> | Separa visualmente dos partes del archivo. |
| 5 | <code> </code> | Separa visualmente dos partes del archivo. |
| 6 | <code> </code> | Separa visualmente dos partes del archivo. |
| 7 | <code> </code> | Separa visualmente dos partes del archivo. |
| 8 | <code>import bpy</code> | Accede a escenas y operadores de Blender. |
| 9 | <code>import os</code> | Permite crear carpetas y construir rutas. |
| 10 | <code>import json</code> | Permite escribir los registros de posición. |
| 11 | <code>from mathutils import Vector</code> | Importa Vector; el script actual no lo utiliza. |
| 12 | <code> </code> | Separa visualmente dos partes del archivo. |
| 13 | <code> </code> | Separa visualmente dos partes del archivo. |
| 14 | <code>nivel = 1</code> | Selecciona el nivel que quedará en los nombres y registros. |
| 15 | <code> </code> | Separa visualmente dos partes del archivo. |
| 16 | <code> </code> | Separa visualmente dos partes del archivo. |
| 17 | <code>export_path = r"D:/UCC/React/PortafolioUCC/Projecto_final_v1/game-project/public/models/toycar2"</code> | Define la carpeta de salida; debe adaptarse a esta copia del repositorio. |
| 18 | <code>json_path = os.path.join(export_path, f"toy_car_blocks{nivel}.json")</code> | Construye el nombre del JSON de posiciones del nivel. |
| 19 | <code>os.makedirs(export_path, exist_ok=True)</code> | Crea la carpeta de salida si todavía no existe. |
| 20 | <code> </code> | Separa visualmente dos partes del archivo. |
| 21 | <code>positions = &#91;&#93;</code> | Inicia el arreglo de registros exportados. |
| 22 | <code> </code> | Separa visualmente dos partes del archivo. |
| 23 | <code> </code> | Separa visualmente dos partes del archivo. |
| 24 | <code>depsgraph = bpy.context.evaluated_depsgraph_get()</code> | Obtiene el grafo evaluado de la escena. |
| 25 | <code>bpy.ops.object.mode_set(mode='OBJECT')</code> | Cambia a modo Objeto para permitir la selección. |
| 26 | <code>bpy.context.view_layer.update()</code> | Actualiza las transformaciones de la escena. |
| 27 | <code> </code> | Separa visualmente dos partes del archivo. |
| 28 | <code> </code> | Separa visualmente dos partes del archivo. |
| 29 | <code>for obj in bpy.context.selected_objects:</code> | Recorre la lista de objetos seleccionados al iniciar el bucle. |
| 30 | <code>    if obj.type != 'MESH':</code> | Permite exportar únicamente objetos de malla. |
| 31 | <code>        continue</code> | Omite el objeto que no es una malla. |
| 32 | <code> </code> | Separa visualmente dos partes del archivo. |
| 33 | <code>    obj_eval = obj.evaluated_get(depsgraph)</code> | Lee el objeto evaluado con sus transformaciones finales. |
| 34 | <code>    matrix_world = obj_eval.matrix_world</code> | Obtiene su matriz de transformación mundial. |
| 35 | <code>    loc = matrix_world.to_translation()</code> | Extrae la posición mundial del objeto. |
| 36 | <code> </code> | Separa visualmente dos partes del archivo. |
| 37 | <code> </code> | Separa visualmente dos partes del archivo. |
| 38 | <code>    name = obj.name.lower().replace(" ", "_").replace(f"_lev{nivel}", "")</code> | Normaliza el nombre y retira el sufijo del nivel actual. |
| 39 | <code> </code> | Separa visualmente dos partes del archivo. |
| 40 | <code> </code> | Separa visualmente dos partes del archivo. |
| 41 | <code>    name_with_level = f"{name}_lev{nivel}"</code> | Añade el sufijo del nivel a exportar. |
| 42 | <code>    obj.name = name_with_level</code> | Actualiza el nombre de la malla en la sesión de Blender. |
| 43 | <code> </code> | Separa visualmente dos partes del archivo. |
| 44 | <code> </code> | Separa visualmente dos partes del archivo. |
| 45 | <code>    pos = {</code> | Construye el registro que consumirá el juego. |
| 46 | <code>        "name": obj.name,</code> | Conserva la clave que debe coincidir con sources.js. |
| 47 | <code>        "x": loc.x,</code> | Conserva el eje X de Blender. |
| 48 | <code>        "y": loc.z,</code> | Convierte la altura Z de Blender en Y. |
| 49 | <code>        "z": -loc.y,</code> | Convierte Y de Blender en Z con signo invertido. |
| 50 | <code>        "level": nivel,</code> | Asocia el registro al nivel exportado. |
| 51 | <code>        "role": "default"</code> | Asigna el rol normal; una moneda final necesita otro valor. |
| 52 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 53 | <code> </code> | Separa visualmente dos partes del archivo. |
| 54 | <code>    positions.append(pos)</code> | Añade el registro a la lista de salida. |
| 55 | <code>    print(f"📦 {obj.name}: ({pos&#91;'x'&#93;}, {pos&#91;'y'&#93;}, {pos&#91;'z'&#93;}, nivel {pos&#91;'level'&#93;})") #</code> | Informa el avance o la finalización en la consola de Blender. |
| 56 | <code> </code> | Separa visualmente dos partes del archivo. |
| 57 | <code> </code> | Separa visualmente dos partes del archivo. |
| 58 | <code>    bpy.ops.object.select_all(action='DESELECT')</code> | Limpia la selección antes de exportar una sola malla. |
| 59 | <code>    obj.select_set(True)</code> | Selecciona la malla actual. |
| 60 | <code>    bpy.context.view_layer.objects.active = obj</code> | Define la malla activa para el exportador. |
| 61 | <code> </code> | Separa visualmente dos partes del archivo. |
| 62 | <code>    filepath = os.path.join(export_path, f"{obj.name}.glb")</code> | Construye la ruta del GLB individual. |
| 63 | <code>    bpy.ops.export_scene.gltf(</code> | Exporta la selección con el operador glTF de Blender. |
| 64 | <code>        filepath=filepath,</code> | Indica el archivo de salida del modelo. |
| 65 | <code>        use_selection=True,</code> | Limita la exportación al objeto seleccionado. |
| 66 | <code>        export_format='GLB',</code> | Selecciona el contenedor binario GLB. |
| 67 | <code>        export_apply=False</code> | Conserva el estado actual de aplicación de modificadores. |
| 68 | <code>    )</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 69 | <code> </code> | Separa visualmente dos partes del archivo. |
| 70 | <code> </code> | Separa visualmente dos partes del archivo. |
| 71 | <code>with open(json_path, "w") as f:</code> | Abre el archivo de posiciones para escritura. |
| 72 | <code>    json.dump(positions, f, indent=4)</code> | Serializa todos los registros con sangría legible. |
| 73 | <code> </code> | Separa visualmente dos partes del archivo. |
| 74 | <code>print("✅ Exportación finalizada con sistema de coordenadas compatible con Three.js.") # &#91;</code> | Informa el avance o la finalización en la consola de Blender. |
