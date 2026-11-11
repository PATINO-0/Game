/**
 * Registra el catálogo de nombres, tipos y rutas de recursos. No carga todos los niveles al iniciar.
 */
export default [ // [doc] Exporta el valor principal del módulo.
    { name: 'enemyModel', type: 'gltfModel', path: '/models/Enemy/Enemy.glb' }, // [doc] Configura name con "enemyModel".
    {
        name: 'environmentMapTexture', // [doc] Configura name con "environmentMapTexture".
        type: 'cubeTexture', // [doc] Configura type con "cubeTexture".
        path: [ // [doc] Configura path con el arreglo de datos.
            '/textures/environmentMap/px.jpg',
            '/textures/environmentMap/nx.jpg',
            '/textures/environmentMap/py.jpg',
            '/textures/environmentMap/ny.jpg',
            '/textures/environmentMap/pz.jpg',
            '/textures/environmentMap/nz.jpg'
        ]
    },

    {
        name: 'grassColorTexture', // [doc] Configura name con "grassColorTexture".
        type: 'texture', // [doc] Configura type con "texture".
        path: '/textures/dirt/color.jpg' // [doc] Configura path con "/textures/dirt/color.jpg".
    },
    {
        name: 'grassNormalTexture', // [doc] Configura name con "grassNormalTexture".
        type: 'texture', // [doc] Configura type con "texture".
        path: '/textures/dirt/normal.jpg' // [doc] Configura path con "/textures/dirt/normal.jpg".
    },
    {
        name: 'foxModel', // [doc] Configura name con "foxModel".
        type: 'gltfModel', // [doc] Configura type con "gltfModel".
        path: '/models/Fox/glTF/Fox.gltf' // [doc] Configura path con "/models/Fox/glTF/Fox.gltf".
    },
    {
        name: 'robotModel', // [doc] Configura name con "robotModel".
        type: 'gltfModel', // [doc] Configura type con "gltfModel".
        path: '/models/Robot/Robot.glb' // [doc] Configura path con "/models/Robot/Robot.glb".
    },



    {
        "name": "baked_lev1", // [doc] Configura "name" con "baked_lev1".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/baked_lev1.glb" // [doc] Configura "path" con "/models/toycar/baked_lev1.glb".
    },
    {
        "name": "coin_1.001_lev1", // [doc] Configura "name" con "coin_1.001_lev1".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/coin_1.001_lev1.glb" // [doc] Configura "path" con "/models/toycar/coin_1.001_lev1.glb".
    },
    {
        "name": "coin_1.002_lev1", // [doc] Configura "name" con "coin_1.002_lev1".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/coin_1.002_lev1.glb" // [doc] Configura "path" con "/models/toycar/coin_1.002_lev1.glb".
    },
    {
        "name": "coin_1.003_lev1", // [doc] Configura "name" con "coin_1.003_lev1".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/coin_1.003_lev1.glb" // [doc] Configura "path" con "/models/toycar/coin_1.003_lev1.glb".
    },
    {
        "name": "coin_1.004_lev1", // [doc] Configura "name" con "coin_1.004_lev1".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/coin_1.004_lev1.glb" // [doc] Configura "path" con "/models/toycar/coin_1.004_lev1.glb".
    },
    {
        "name": "coin_1.005_lev1", // [doc] Configura "name" con "coin_1.005_lev1".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/coin_1.005_lev1.glb" // [doc] Configura "path" con "/models/toycar/coin_1.005_lev1.glb".
    },
    {
        "name": "coin_1.006_lev1", // [doc] Configura "name" con "coin_1.006_lev1".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/coin_1.006_lev1.glb" // [doc] Configura "path" con "/models/toycar/coin_1.006_lev1.glb".
    },
    {
        "name": "coin_1.007_lev1", // [doc] Configura "name" con "coin_1.007_lev1".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/coin_1.007_lev1.glb" // [doc] Configura "path" con "/models/toycar/coin_1.007_lev1.glb".
    },
    {
        "name": "coin_1.008_lev1", // [doc] Configura "name" con "coin_1.008_lev1".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/coin_1.008_lev1.glb" // [doc] Configura "path" con "/models/toycar/coin_1.008_lev1.glb".
    },
    {
        "name": "coin_1_lev1", // [doc] Configura "name" con "coin_1_lev1".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/coin_1_lev1.glb" // [doc] Configura "path" con "/models/toycar/coin_1_lev1.glb".
    },
    {
        "name": "copycat_s_house_lev1", // [doc] Configura "name" con "copycat_s_house_lev1".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/copycat_s_house_lev1.glb" // [doc] Configura "path" con "/models/toycar/copycat_s_house_lev1.glb".
    },
    {
        "name": "mr._psychic_s_house_lev1", // [doc] Configura "name" con "mr._psychic_s_house_lev1".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/mr._psychic_s_house_lev1.glb" // [doc] Configura "path" con "/models/toycar/mr._psychic_s_house_lev1.glb".
    },
    {
        "name": "object_0.001_lev1", // [doc] Configura "name" con "object_0.001_lev1".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/object_0.001_lev1.glb" // [doc] Configura "path" con "/models/toycar/object_0.001_lev1.glb".
    },
    {
        "name": "object_0_lev1", // [doc] Configura "name" con "object_0_lev1".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/object_0_lev1.glb" // [doc] Configura "path" con "/models/toycar/object_0_lev1.glb".
    },
    {
        "name": "object_1.001_lev1", // [doc] Configura "name" con "object_1.001_lev1".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/object_1.001_lev1.glb" // [doc] Configura "path" con "/models/toycar/object_1.001_lev1.glb".
    },
    {
        "name": "object_1_lev1", // [doc] Configura "name" con "object_1_lev1".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/object_1_lev1.glb" // [doc] Configura "path" con "/models/toycar/object_1_lev1.glb".
    },
    {
        "name": "object_2.001_lev1", // [doc] Configura "name" con "object_2.001_lev1".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/object_2.001_lev1.glb" // [doc] Configura "path" con "/models/toycar/object_2.001_lev1.glb".
    },
    {
        "name": "object_2_lev1", // [doc] Configura "name" con "object_2_lev1".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/object_2_lev1.glb" // [doc] Configura "path" con "/models/toycar/object_2_lev1.glb".
    },
    {
        "name": "object_3_lev1", // [doc] Configura "name" con "object_3_lev1".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/object_3_lev1.glb" // [doc] Configura "path" con "/models/toycar/object_3_lev1.glb".
    },
    {
        "name": "object_4_lev1", // [doc] Configura "name" con "object_4_lev1".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/object_4_lev1.glb" // [doc] Configura "path" con "/models/toycar/object_4_lev1.glb".
    },
    {
        "name": "palmtree_1.007.001_lev1", // [doc] Configura "name" con "palmtree_1.007.001_lev1".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/palmtree_1.007.001_lev1.glb" // [doc] Configura "path" con "/models/toycar/palmtree_1.007.001_lev1.glb".
    },
    {
        "name": "palmtree_1.007.002_lev1", // [doc] Configura "name" con "palmtree_1.007.002_lev1".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/palmtree_1.007.002_lev1.glb" // [doc] Configura "path" con "/models/toycar/palmtree_1.007.002_lev1.glb".
    },
    {
        "name": "palmtree_1.007.003_lev1", // [doc] Configura "name" con "palmtree_1.007.003_lev1".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/palmtree_1.007.003_lev1.glb" // [doc] Configura "path" con "/models/toycar/palmtree_1.007.003_lev1.glb".
    },
    {
        "name": "palmtree_1.007.004.001_lev1", // [doc] Configura "name" con "palmtree_1.007.004.001_lev1".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/palmtree_1.007.004.001_lev1.glb" // [doc] Configura "path" con "/models/toycar/palmtree_1.007.004.001_lev1.glb".
    },
    {
        "name": "palmtree_1.007.004.002_lev1", // [doc] Configura "name" con "palmtree_1.007.004.002_lev1".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/palmtree_1.007.004.002_lev1.glb" // [doc] Configura "path" con "/models/toycar/palmtree_1.007.004.002_lev1.glb".
    },
    {
        "name": "palmtree_1.007.004_lev1", // [doc] Configura "name" con "palmtree_1.007.004_lev1".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/palmtree_1.007.004_lev1.glb" // [doc] Configura "path" con "/models/toycar/palmtree_1.007.004_lev1.glb".
    },
    {
        "name": "palmtree_1.007.005_lev1", // [doc] Configura "name" con "palmtree_1.007.005_lev1".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/palmtree_1.007.005_lev1.glb" // [doc] Configura "path" con "/models/toycar/palmtree_1.007.005_lev1.glb".
    },
    {
        "name": "palmtree_1.007.006_lev1", // [doc] Configura "name" con "palmtree_1.007.006_lev1".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/palmtree_1.007.006_lev1.glb" // [doc] Configura "path" con "/models/toycar/palmtree_1.007.006_lev1.glb".
    },
    {
        "name": "palmtree_1.007.007_lev1", // [doc] Configura "name" con "palmtree_1.007.007_lev1".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/palmtree_1.007.007_lev1.glb" // [doc] Configura "path" con "/models/toycar/palmtree_1.007.007_lev1.glb".
    },
    {
        "name": "palmtree_1.007.008_lev1", // [doc] Configura "name" con "palmtree_1.007.008_lev1".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/palmtree_1.007.008_lev1.glb" // [doc] Configura "path" con "/models/toycar/palmtree_1.007.008_lev1.glb".
    },
    {
        "name": "palmtree_1.007.009_lev1", // [doc] Configura "name" con "palmtree_1.007.009_lev1".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/palmtree_1.007.009_lev1.glb" // [doc] Configura "path" con "/models/toycar/palmtree_1.007.009_lev1.glb".
    },
    {
        "name": "palmtree_1.007.010_lev1", // [doc] Configura "name" con "palmtree_1.007.010_lev1".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/palmtree_1.007.010_lev1.glb" // [doc] Configura "path" con "/models/toycar/palmtree_1.007.010_lev1.glb".
    },
    {
        "name": "palmtree_1.007.011_lev1", // [doc] Configura "name" con "palmtree_1.007.011_lev1".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/palmtree_1.007.011_lev1.glb" // [doc] Configura "path" con "/models/toycar/palmtree_1.007.011_lev1.glb".
    },
    {
        "name": "palmtree_1.007.012_lev1", // [doc] Configura "name" con "palmtree_1.007.012_lev1".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/palmtree_1.007.012_lev1.glb" // [doc] Configura "path" con "/models/toycar/palmtree_1.007.012_lev1.glb".
    },
    {
        "name": "palmtree_1.007_lev1", // [doc] Configura "name" con "palmtree_1.007_lev1".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/palmtree_1.007_lev1.glb" // [doc] Configura "path" con "/models/toycar/palmtree_1.007_lev1.glb".
    },
    {
        "name": "plane_lev1", // [doc] Configura "name" con "plane_lev1".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/plane_lev1.glb" // [doc] Configura "path" con "/models/toycar/plane_lev1.glb".
    },
    {
        "name": "rock_11.001_lev1", // [doc] Configura "name" con "rock_11.001_lev1".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/rock_11.001_lev1.glb" // [doc] Configura "path" con "/models/toycar/rock_11.001_lev1.glb".
    },
    {
        "name": "saffron_city_house_1_lev1", // [doc] Configura "name" con "saffron_city_house_1_lev1".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/saffron_city_house_1_lev1.glb" // [doc] Configura "path" con "/models/toycar/saffron_city_house_1_lev1.glb".
    },
    {
        "name": "saffron_city_house_2_lev1", // [doc] Configura "name" con "saffron_city_house_2_lev1".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/saffron_city_house_2_lev1.glb" // [doc] Configura "path" con "/models/toycar/saffron_city_house_2_lev1.glb".
    },
    {
        "name": "simple_tree_5.001.001_lev1", // [doc] Configura "name" con "simple_tree_5.001.001_lev1".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/simple_tree_5.001.001_lev1.glb" // [doc] Configura "path" con "/models/toycar/simple_tree_5.001.001_lev1.glb".
    },
    {
        "name": "simple_tree_5.001.002_lev1", // [doc] Configura "name" con "simple_tree_5.001.002_lev1".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/simple_tree_5.001.002_lev1.glb" // [doc] Configura "path" con "/models/toycar/simple_tree_5.001.002_lev1.glb".
    },
    {
        "name": "simple_tree_5.001.003_lev1", // [doc] Configura "name" con "simple_tree_5.001.003_lev1".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/simple_tree_5.001.003_lev1.glb" // [doc] Configura "path" con "/models/toycar/simple_tree_5.001.003_lev1.glb".
    },
    {
        "name": "simple_tree_5.001.004_lev1", // [doc] Configura "name" con "simple_tree_5.001.004_lev1".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/simple_tree_5.001.004_lev1.glb" // [doc] Configura "path" con "/models/toycar/simple_tree_5.001.004_lev1.glb".
    },
    {
        "name": "simple_tree_5.001.005_lev1", // [doc] Configura "name" con "simple_tree_5.001.005_lev1".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/simple_tree_5.001.005_lev1.glb" // [doc] Configura "path" con "/models/toycar/simple_tree_5.001.005_lev1.glb".
    },
    {
        "name": "simple_tree_5.001.006_lev1", // [doc] Configura "name" con "simple_tree_5.001.006_lev1".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/simple_tree_5.001.006_lev1.glb" // [doc] Configura "path" con "/models/toycar/simple_tree_5.001.006_lev1.glb".
    },
    {
        "name": "simple_tree_5.001.007_lev1", // [doc] Configura "name" con "simple_tree_5.001.007_lev1".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/simple_tree_5.001.007_lev1.glb" // [doc] Configura "path" con "/models/toycar/simple_tree_5.001.007_lev1.glb".
    },
    {
        "name": "simple_tree_5.001.008_lev1", // [doc] Configura "name" con "simple_tree_5.001.008_lev1".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/simple_tree_5.001.008_lev1.glb" // [doc] Configura "path" con "/models/toycar/simple_tree_5.001.008_lev1.glb".
    },
    {
        "name": "simple_tree_5.001.009_lev1", // [doc] Configura "name" con "simple_tree_5.001.009_lev1".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/simple_tree_5.001.009_lev1.glb" // [doc] Configura "path" con "/models/toycar/simple_tree_5.001.009_lev1.glb".
    },
    {
        "name": "simple_tree_5.001.010_lev1", // [doc] Configura "name" con "simple_tree_5.001.010_lev1".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/simple_tree_5.001.010_lev1.glb" // [doc] Configura "path" con "/models/toycar/simple_tree_5.001.010_lev1.glb".
    },
    {
        "name": "simple_tree_5.001.011_lev1", // [doc] Configura "name" con "simple_tree_5.001.011_lev1".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/simple_tree_5.001.011_lev1.glb" // [doc] Configura "path" con "/models/toycar/simple_tree_5.001.011_lev1.glb".
    },
    {
        "name": "simple_tree_5.001.012_lev1", // [doc] Configura "name" con "simple_tree_5.001.012_lev1".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/simple_tree_5.001.012_lev1.glb" // [doc] Configura "path" con "/models/toycar/simple_tree_5.001.012_lev1.glb".
    },
    {
        "name": "simple_tree_5.001.013_lev1", // [doc] Configura "name" con "simple_tree_5.001.013_lev1".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/simple_tree_5.001.013_lev1.glb" // [doc] Configura "path" con "/models/toycar/simple_tree_5.001.013_lev1.glb".
    },
    {
        "name": "simple_tree_5.001.014_lev1", // [doc] Configura "name" con "simple_tree_5.001.014_lev1".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/simple_tree_5.001.014_lev1.glb" // [doc] Configura "path" con "/models/toycar/simple_tree_5.001.014_lev1.glb".
    },
    {
        "name": "simple_tree_5.001_lev1", // [doc] Configura "name" con "simple_tree_5.001_lev1".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/simple_tree_5.001_lev1.glb" // [doc] Configura "path" con "/models/toycar/simple_tree_5.001_lev1.glb".
    },



{
        "name": "baked_lev1_lev2", // [doc] Configura "name" con "baked_lev1_lev2".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/baked_lev1_lev2.glb" // [doc] Configura "path" con "/models/toycar/baked_lev1_lev2.glb".
    },
    {
        "name": "coin_1.001_lev1_lev2", // [doc] Configura "name" con "coin_1.001_lev1_lev2".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/coin_1.001_lev1_lev2.glb" // [doc] Configura "path" con "/models/toycar/coin_1.001_lev1_lev2.glb".
    },
    {
        "name": "coin_1.002_lev1_lev2", // [doc] Configura "name" con "coin_1.002_lev1_lev2".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/coin_1.002_lev1_lev2.glb" // [doc] Configura "path" con "/models/toycar/coin_1.002_lev1_lev2.glb".
    },
    {
        "name": "coin_1.003_lev1_lev2", // [doc] Configura "name" con "coin_1.003_lev1_lev2".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/coin_1.003_lev1_lev2.glb" // [doc] Configura "path" con "/models/toycar/coin_1.003_lev1_lev2.glb".
    },
    {
        "name": "coin_1.004_lev1_lev2", // [doc] Configura "name" con "coin_1.004_lev1_lev2".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/coin_1.004_lev1_lev2.glb" // [doc] Configura "path" con "/models/toycar/coin_1.004_lev1_lev2.glb".
    },
    {
        "name": "coin_1.005_lev1_lev2", // [doc] Configura "name" con "coin_1.005_lev1_lev2".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/coin_1.005_lev1_lev2.glb" // [doc] Configura "path" con "/models/toycar/coin_1.005_lev1_lev2.glb".
    },
    {
        "name": "coin_1.006_lev1_lev2", // [doc] Configura "name" con "coin_1.006_lev1_lev2".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/coin_1.006_lev1_lev2.glb" // [doc] Configura "path" con "/models/toycar/coin_1.006_lev1_lev2.glb".
    },
    {
        "name": "coin_1.008_lev1_lev2", // [doc] Configura "name" con "coin_1.008_lev1_lev2".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/coin_1.008_lev1_lev2.glb" // [doc] Configura "path" con "/models/toycar/coin_1.008_lev1_lev2.glb".
    },
    {
        "name": "coin_1_lev1.001_lev2", // [doc] Configura "name" con "coin_1_lev1.001_lev2".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/coin_1_lev1.001_lev2.glb" // [doc] Configura "path" con "/models/toycar/coin_1_lev1.001_lev2.glb".
    },
    {
        "name": "coin_1_lev1_lev2", // [doc] Configura "name" con "coin_1_lev1_lev2".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/coin_1_lev1_lev2.glb" // [doc] Configura "path" con "/models/toycar/coin_1_lev1_lev2.glb".
    },
    {
        "name": "nuvema_town_house_1_lev2", // [doc] Configura "name" con "nuvema_town_house_1_lev2".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/nuvema_town_house_1_lev2.glb" // [doc] Configura "path" con "/models/toycar/nuvema_town_house_1_lev2.glb".
    },
    {
        "name": "object_0.001_lev1_lev2", // [doc] Configura "name" con "object_0.001_lev1_lev2".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/object_0.001_lev1_lev2.glb" // [doc] Configura "path" con "/models/toycar/object_0.001_lev1_lev2.glb".
    },
    {
        "name": "object_0_lev1_lev2", // [doc] Configura "name" con "object_0_lev1_lev2".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/object_0_lev1_lev2.glb" // [doc] Configura "path" con "/models/toycar/object_0_lev1_lev2.glb".
    },
    {
        "name": "object_0_lev2", // [doc] Configura "name" con "object_0_lev2".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/object_0_lev2.glb" // [doc] Configura "path" con "/models/toycar/object_0_lev2.glb".
    },
    {
        "name": "object_1.001_lev1_lev2", // [doc] Configura "name" con "object_1.001_lev1_lev2".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/object_1.001_lev1_lev2.glb" // [doc] Configura "path" con "/models/toycar/object_1.001_lev1_lev2.glb".
    },
    {
        "name": "object_1_lev1_lev2", // [doc] Configura "name" con "object_1_lev1_lev2".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/object_1_lev1_lev2.glb" // [doc] Configura "path" con "/models/toycar/object_1_lev1_lev2.glb".
    },
    {
        "name": "object_1_lev2", // [doc] Configura "name" con "object_1_lev2".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/object_1_lev2.glb" // [doc] Configura "path" con "/models/toycar/object_1_lev2.glb".
    },
    {
        "name": "object_2.001_lev1_lev2", // [doc] Configura "name" con "object_2.001_lev1_lev2".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/object_2.001_lev1_lev2.glb" // [doc] Configura "path" con "/models/toycar/object_2.001_lev1_lev2.glb".
    },
    {
        "name": "object_2_lev1_lev2", // [doc] Configura "name" con "object_2_lev1_lev2".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/object_2_lev1_lev2.glb" // [doc] Configura "path" con "/models/toycar/object_2_lev1_lev2.glb".
    },
    {
        "name": "object_2_lev2", // [doc] Configura "name" con "object_2_lev2".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/object_2_lev2.glb" // [doc] Configura "path" con "/models/toycar/object_2_lev2.glb".
    },
    {
        "name": "object_3_lev1_lev2", // [doc] Configura "name" con "object_3_lev1_lev2".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/object_3_lev1_lev2.glb" // [doc] Configura "path" con "/models/toycar/object_3_lev1_lev2.glb".
    },
    {
        "name": "object_3_lev2", // [doc] Configura "name" con "object_3_lev2".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/object_3_lev2.glb" // [doc] Configura "path" con "/models/toycar/object_3_lev2.glb".
    },
    {
        "name": "object_4_lev1_lev2", // [doc] Configura "name" con "object_4_lev1_lev2".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/object_4_lev1_lev2.glb" // [doc] Configura "path" con "/models/toycar/object_4_lev1_lev2.glb".
    },
    {
        "name": "obj_lev2", // [doc] Configura "name" con "obj_lev2".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/obj_lev2.glb" // [doc] Configura "path" con "/models/toycar/obj_lev2.glb".
    },
    {
        "name": "palmtree_1.007.009_lev1.001.001_lev2", // [doc] Configura "name" con "palmtree_1.007.009_lev1.001.001_lev2".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/palmtree_1.007.009_lev1.001.001_lev2.glb" // [doc] Configura "path" con "/models/toycar/palmtree_1.007.009_lev1.001.001_lev2.glb".
    },
    {
        "name": "palmtree_1.007.009_lev1.001_lev2.002", // [doc] Configura "name" con "palmtree_1.007.009_lev1.001_lev2.002".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/palmtree_1.007.009_lev1.001_lev2.002.glb" // [doc] Configura "path" con "/models/toycar/palmtree_1.007.009_lev1.001_lev2.002.glb".
    },
    {
        "name": "palmtree_1.007.009_lev1.001_lev2", // [doc] Configura "name" con "palmtree_1.007.009_lev1.001_lev2".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/palmtree_1.007.009_lev1.001_lev2.glb" // [doc] Configura "path" con "/models/toycar/palmtree_1.007.009_lev1.001_lev2.glb".
    },
    {
        "name": "palmtree_1.007.009_lev1.002.001_lev2", // [doc] Configura "name" con "palmtree_1.007.009_lev1.002.001_lev2".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/palmtree_1.007.009_lev1.002.001_lev2.glb" // [doc] Configura "path" con "/models/toycar/palmtree_1.007.009_lev1.002.001_lev2.glb".
    },
    {
        "name": "palmtree_1.007.009_lev1.002.002_lev2", // [doc] Configura "name" con "palmtree_1.007.009_lev1.002.002_lev2".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/palmtree_1.007.009_lev1.002.002_lev2.glb" // [doc] Configura "path" con "/models/toycar/palmtree_1.007.009_lev1.002.002_lev2.glb".
    },
    {
        "name": "palmtree_1.007.009_lev1.002.003_lev2", // [doc] Configura "name" con "palmtree_1.007.009_lev1.002.003_lev2".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/palmtree_1.007.009_lev1.002.003_lev2.glb" // [doc] Configura "path" con "/models/toycar/palmtree_1.007.009_lev1.002.003_lev2.glb".
    },
    {
        "name": "palmtree_1.007.009_lev1.002.004_lev2", // [doc] Configura "name" con "palmtree_1.007.009_lev1.002.004_lev2".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/palmtree_1.007.009_lev1.002.004_lev2.glb" // [doc] Configura "path" con "/models/toycar/palmtree_1.007.009_lev1.002.004_lev2.glb".
    },
    {
        "name": "palmtree_1.007.009_lev1.002.005_lev2", // [doc] Configura "name" con "palmtree_1.007.009_lev1.002.005_lev2".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/palmtree_1.007.009_lev1.002.005_lev2.glb" // [doc] Configura "path" con "/models/toycar/palmtree_1.007.009_lev1.002.005_lev2.glb".
    },
    {
        "name": "palmtree_1.007.009_lev1.002_lev2", // [doc] Configura "name" con "palmtree_1.007.009_lev1.002_lev2".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/palmtree_1.007.009_lev1.002_lev2.glb" // [doc] Configura "path" con "/models/toycar/palmtree_1.007.009_lev1.002_lev2.glb".
    },
    {
        "name": "palmtree_1.007.009_lev1.003_lev2", // [doc] Configura "name" con "palmtree_1.007.009_lev1.003_lev2".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/palmtree_1.007.009_lev1.003_lev2.glb" // [doc] Configura "path" con "/models/toycar/palmtree_1.007.009_lev1.003_lev2.glb".
    },
    {
        "name": "palmtree_1.007.009_lev1.004_lev2", // [doc] Configura "name" con "palmtree_1.007.009_lev1.004_lev2".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/palmtree_1.007.009_lev1.004_lev2.glb" // [doc] Configura "path" con "/models/toycar/palmtree_1.007.009_lev1.004_lev2.glb".
    },
    {
        "name": "palmtree_1.007.009_lev1.005_lev2", // [doc] Configura "name" con "palmtree_1.007.009_lev1.005_lev2".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/palmtree_1.007.009_lev1.005_lev2.glb" // [doc] Configura "path" con "/models/toycar/palmtree_1.007.009_lev1.005_lev2.glb".
    },
    {
        "name": "palmtree_1.007.009_lev1_lev2", // [doc] Configura "name" con "palmtree_1.007.009_lev1_lev2".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/palmtree_1.007.009_lev1_lev2.glb" // [doc] Configura "path" con "/models/toycar/palmtree_1.007.009_lev1_lev2.glb".
    },
    {
        "name": "plane_lev1_lev2", // [doc] Configura "name" con "plane_lev1_lev2".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/plane_lev1_lev2.glb" // [doc] Configura "path" con "/models/toycar/plane_lev1_lev2.glb".
    },
    {
        "name": "rock_11.001_lev1_lev2", // [doc] Configura "name" con "rock_11.001_lev1_lev2".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/rock_11.001_lev1_lev2.glb" // [doc] Configura "path" con "/models/toycar/rock_11.001_lev1_lev2.glb".
    },
    {
        "name": "simple_tree_5.001.001_lev1_lev2", // [doc] Configura "name" con "simple_tree_5.001.001_lev1_lev2".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/simple_tree_5.001.001_lev1_lev2.glb" // [doc] Configura "path" con "/models/toycar/simple_tree_5.001.001_lev1_lev2.glb".
    },
    {
        "name": "simple_tree_5.001.002_lev1_lev2", // [doc] Configura "name" con "simple_tree_5.001.002_lev1_lev2".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/simple_tree_5.001.002_lev1_lev2.glb" // [doc] Configura "path" con "/models/toycar/simple_tree_5.001.002_lev1_lev2.glb".
    },
    {
        "name": "simple_tree_5.001.003_lev1_lev2", // [doc] Configura "name" con "simple_tree_5.001.003_lev1_lev2".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/simple_tree_5.001.003_lev1_lev2.glb" // [doc] Configura "path" con "/models/toycar/simple_tree_5.001.003_lev1_lev2.glb".
    },
    {
        "name": "simple_tree_5.001.004_lev1_lev2", // [doc] Configura "name" con "simple_tree_5.001.004_lev1_lev2".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/simple_tree_5.001.004_lev1_lev2.glb" // [doc] Configura "path" con "/models/toycar/simple_tree_5.001.004_lev1_lev2.glb".
    },
    {
        "name": "simple_tree_5.001.005_lev1_lev2", // [doc] Configura "name" con "simple_tree_5.001.005_lev1_lev2".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/simple_tree_5.001.005_lev1_lev2.glb" // [doc] Configura "path" con "/models/toycar/simple_tree_5.001.005_lev1_lev2.glb".
    },
    {
        "name": "simple_tree_5.001.006_lev1_lev2", // [doc] Configura "name" con "simple_tree_5.001.006_lev1_lev2".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/simple_tree_5.001.006_lev1_lev2.glb" // [doc] Configura "path" con "/models/toycar/simple_tree_5.001.006_lev1_lev2.glb".
    },
    {
        "name": "simple_tree_5.001.007_lev1_lev2", // [doc] Configura "name" con "simple_tree_5.001.007_lev1_lev2".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/simple_tree_5.001.007_lev1_lev2.glb" // [doc] Configura "path" con "/models/toycar/simple_tree_5.001.007_lev1_lev2.glb".
    },
    {
        "name": "simple_tree_5.001.008_lev1_lev2", // [doc] Configura "name" con "simple_tree_5.001.008_lev1_lev2".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/simple_tree_5.001.008_lev1_lev2.glb" // [doc] Configura "path" con "/models/toycar/simple_tree_5.001.008_lev1_lev2.glb".
    },
    {
        "name": "simple_tree_5.001.009_lev1_lev2", // [doc] Configura "name" con "simple_tree_5.001.009_lev1_lev2".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/simple_tree_5.001.009_lev1_lev2.glb" // [doc] Configura "path" con "/models/toycar/simple_tree_5.001.009_lev1_lev2.glb".
    },
    {
        "name": "simple_tree_5.001.010_lev1_lev2", // [doc] Configura "name" con "simple_tree_5.001.010_lev1_lev2".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/simple_tree_5.001.010_lev1_lev2.glb" // [doc] Configura "path" con "/models/toycar/simple_tree_5.001.010_lev1_lev2.glb".
    },
    {
        "name": "simple_tree_5.001.011_lev1_lev2", // [doc] Configura "name" con "simple_tree_5.001.011_lev1_lev2".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/simple_tree_5.001.011_lev1_lev2.glb" // [doc] Configura "path" con "/models/toycar/simple_tree_5.001.011_lev1_lev2.glb".
    },
    {
        "name": "simple_tree_5.001.012_lev1_lev2", // [doc] Configura "name" con "simple_tree_5.001.012_lev1_lev2".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/simple_tree_5.001.012_lev1_lev2.glb" // [doc] Configura "path" con "/models/toycar/simple_tree_5.001.012_lev1_lev2.glb".
    },
    {
        "name": "simple_tree_5.001.013_lev1_lev2", // [doc] Configura "name" con "simple_tree_5.001.013_lev1_lev2".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/simple_tree_5.001.013_lev1_lev2.glb" // [doc] Configura "path" con "/models/toycar/simple_tree_5.001.013_lev1_lev2.glb".
    },
    {
        "name": "simple_tree_5.001.014_lev1_lev2", // [doc] Configura "name" con "simple_tree_5.001.014_lev1_lev2".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/simple_tree_5.001.014_lev1_lev2.glb" // [doc] Configura "path" con "/models/toycar/simple_tree_5.001.014_lev1_lev2.glb".
    },
    {
        "name": "simple_tree_5.001_lev1_lev2", // [doc] Configura "name" con "simple_tree_5.001_lev1_lev2".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/simple_tree_5.001_lev1_lev2.glb" // [doc] Configura "path" con "/models/toycar/simple_tree_5.001_lev1_lev2.glb".
    },



 {
        "name": "baked_lev1_lev3", // [doc] Configura "name" con "baked_lev1_lev3".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/baked_lev1_lev3.glb" // [doc] Configura "path" con "/models/toycar/baked_lev1_lev3.glb".
    },
    {
        "name": "bus02_anim.001_lev3", // [doc] Configura "name" con "bus02_anim.001_lev3".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/bus02_anim.001_lev3.glb" // [doc] Configura "path" con "/models/toycar/bus02_anim.001_lev3.glb".
    },
    {
        "name": "bus02_anim_lev3", // [doc] Configura "name" con "bus02_anim_lev3".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/bus02_anim_lev3.glb" // [doc] Configura "path" con "/models/toycar/bus02_anim_lev3.glb".
    },
    {
        "name": "city_car.002_lev3", // [doc] Configura "name" con "city_car.002_lev3".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/city_car.002_lev3.glb" // [doc] Configura "path" con "/models/toycar/city_car.002_lev3.glb".
    },
    {
        "name": "city_car.003_lev3", // [doc] Configura "name" con "city_car.003_lev3".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/city_car.003_lev3.glb" // [doc] Configura "path" con "/models/toycar/city_car.003_lev3.glb".
    },
    {
        "name": "city_car_lev3", // [doc] Configura "name" con "city_car_lev3".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/city_car_lev3.glb" // [doc] Configura "path" con "/models/toycar/city_car_lev3.glb".
    },
    {
        "name": "city_lev3", // [doc] Configura "name" con "city_lev3".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/city_lev3.glb" // [doc] Configura "path" con "/models/toycar/city_lev3.glb".
    },
    {
        "name": "coin_1.001_lev1_lev3", // [doc] Configura "name" con "coin_1.001_lev1_lev3".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/coin_1.001_lev1_lev3.glb" // [doc] Configura "path" con "/models/toycar/coin_1.001_lev1_lev3.glb".
    },
    {
        "name": "coin_1.002_lev1_lev3", // [doc] Configura "name" con "coin_1.002_lev1_lev3".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/coin_1.002_lev1_lev3.glb" // [doc] Configura "path" con "/models/toycar/coin_1.002_lev1_lev3.glb".
    },
    {
        "name": "coin_1.003_lev1_lev3", // [doc] Configura "name" con "coin_1.003_lev1_lev3".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/coin_1.003_lev1_lev3.glb" // [doc] Configura "path" con "/models/toycar/coin_1.003_lev1_lev3.glb".
    },
    {
        "name": "coin_1.004_lev1.001_lev3", // [doc] Configura "name" con "coin_1.004_lev1.001_lev3".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/coin_1.004_lev1.001_lev3.glb" // [doc] Configura "path" con "/models/toycar/coin_1.004_lev1.001_lev3.glb".
    },
    {
        "name": "coin_1.004_lev1.002_lev3", // [doc] Configura "name" con "coin_1.004_lev1.002_lev3".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/coin_1.004_lev1.002_lev3.glb" // [doc] Configura "path" con "/models/toycar/coin_1.004_lev1.002_lev3.glb".
    },
    {
        "name": "coin_1.004_lev1_lev3", // [doc] Configura "name" con "coin_1.004_lev1_lev3".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/coin_1.004_lev1_lev3.glb" // [doc] Configura "path" con "/models/toycar/coin_1.004_lev1_lev3.glb".
    },
    {
        "name": "coin_1.005_lev1_lev3", // [doc] Configura "name" con "coin_1.005_lev1_lev3".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/coin_1.005_lev1_lev3.glb" // [doc] Configura "path" con "/models/toycar/coin_1.005_lev1_lev3.glb".
    },
    {
        "name": "coin_1.006_lev1_lev3", // [doc] Configura "name" con "coin_1.006_lev1_lev3".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/coin_1.006_lev1_lev3.glb" // [doc] Configura "path" con "/models/toycar/coin_1.006_lev1_lev3.glb".
    },
    {
        "name": "coin_1.007_lev1.001_lev3", // [doc] Configura "name" con "coin_1.007_lev1.001_lev3".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/coin_1.007_lev1.001_lev3.glb" // [doc] Configura "path" con "/models/toycar/coin_1.007_lev1.001_lev3.glb".
    },
    {
        "name": "coin_1.007_lev1_lev3", // [doc] Configura "name" con "coin_1.007_lev1_lev3".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/coin_1.007_lev1_lev3.glb" // [doc] Configura "path" con "/models/toycar/coin_1.007_lev1_lev3.glb".
    },
    {
        "name": "coin_1.008_lev1_lev3", // [doc] Configura "name" con "coin_1.008_lev1_lev3".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/coin_1.008_lev1_lev3.glb" // [doc] Configura "path" con "/models/toycar/coin_1.008_lev1_lev3.glb".
    },
    {
        "name": "coin_1_lev1_lev3", // [doc] Configura "name" con "coin_1_lev1_lev3".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/coin_1_lev1_lev3.glb" // [doc] Configura "path" con "/models/toycar/coin_1_lev1_lev3.glb".
    },
    {
        "name": "dl_ribbonroad2_model_dl_ribbonroad2.001_lev3", // [doc] Configura "name" con "dl_ribbonroad2_model_dl_ribbonroad2.001_lev3".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/dl_ribbonroad2_model_dl_ribbonroad2.001_lev3.glb" // [doc] Configura "path" con "/models/toycar/dl_ribbonroad2_model_dl_ribbonroad2.001_lev3.glb".
    },
    {
        "name": "dl_ribbonroad2_model_dl_ribbonroad2_lev3", // [doc] Configura "name" con "dl_ribbonroad2_model_dl_ribbonroad2_lev3".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/dl_ribbonroad2_model_dl_ribbonroad2_lev3.glb" // [doc] Configura "path" con "/models/toycar/dl_ribbonroad2_model_dl_ribbonroad2_lev3.glb".
    },
    {
        "name": "e_cityhall_cityhall_lev3", // [doc] Configura "name" con "e_cityhall_cityhall_lev3".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/e_cityhall_cityhall_lev3.glb" // [doc] Configura "path" con "/models/toycar/e_cityhall_cityhall_lev3.glb".
    },
    {
        "name": "jubilife_city_building_3_lev3", // [doc] Configura "name" con "jubilife_city_building_3_lev3".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/jubilife_city_building_3_lev3.glb" // [doc] Configura "path" con "/models/toycar/jubilife_city_building_3_lev3.glb".
    },
    {
        "name": "jubilife_city_building_4_lev3", // [doc] Configura "name" con "jubilife_city_building_4_lev3".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/jubilife_city_building_4_lev3.glb" // [doc] Configura "path" con "/models/toycar/jubilife_city_building_4_lev3.glb".
    },
    {
        "name": "jubilife_city_building_5_lev3", // [doc] Configura "name" con "jubilife_city_building_5_lev3".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/jubilife_city_building_5_lev3.glb" // [doc] Configura "path" con "/models/toycar/jubilife_city_building_5_lev3.glb".
    },
    {
        "name": "jubilife_city_building_lev3", // [doc] Configura "name" con "jubilife_city_building_lev3".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/jubilife_city_building_lev3.glb" // [doc] Configura "path" con "/models/toycar/jubilife_city_building_lev3.glb".
    },
    {
        "name": "jubilife_city_street_lamp.001_lev3", // [doc] Configura "name" con "jubilife_city_street_lamp.001_lev3".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/jubilife_city_street_lamp.001_lev3.glb" // [doc] Configura "path" con "/models/toycar/jubilife_city_street_lamp.001_lev3.glb".
    },
    {
        "name": "jubilife_city_street_lamp.002_lev3", // [doc] Configura "name" con "jubilife_city_street_lamp.002_lev3".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/jubilife_city_street_lamp.002_lev3.glb" // [doc] Configura "path" con "/models/toycar/jubilife_city_street_lamp.002_lev3.glb".
    },
    {
        "name": "jubilife_city_street_lamp.003_lev3", // [doc] Configura "name" con "jubilife_city_street_lamp.003_lev3".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/jubilife_city_street_lamp.003_lev3.glb" // [doc] Configura "path" con "/models/toycar/jubilife_city_street_lamp.003_lev3.glb".
    },
    {
        "name": "jubilife_city_street_lamp.004_lev3", // [doc] Configura "name" con "jubilife_city_street_lamp.004_lev3".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/jubilife_city_street_lamp.004_lev3.glb" // [doc] Configura "path" con "/models/toycar/jubilife_city_street_lamp.004_lev3.glb".
    },
    {
        "name": "jubilife_city_street_lamp.005_lev3", // [doc] Configura "name" con "jubilife_city_street_lamp.005_lev3".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/jubilife_city_street_lamp.005_lev3.glb" // [doc] Configura "path" con "/models/toycar/jubilife_city_street_lamp.005_lev3.glb".
    },
    {
        "name": "jubilife_city_street_lamp.006_lev3", // [doc] Configura "name" con "jubilife_city_street_lamp.006_lev3".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/jubilife_city_street_lamp.006_lev3.glb" // [doc] Configura "path" con "/models/toycar/jubilife_city_street_lamp.006_lev3.glb".
    },
    {
        "name": "jubilife_city_street_lamp.007_lev3", // [doc] Configura "name" con "jubilife_city_street_lamp.007_lev3".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/jubilife_city_street_lamp.007_lev3.glb" // [doc] Configura "path" con "/models/toycar/jubilife_city_street_lamp.007_lev3.glb".
    },
    {
        "name": "jubilife_city_street_lamp.008_lev3", // [doc] Configura "name" con "jubilife_city_street_lamp.008_lev3".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/jubilife_city_street_lamp.008_lev3.glb" // [doc] Configura "path" con "/models/toycar/jubilife_city_street_lamp.008_lev3.glb".
    },
    {
        "name": "jubilife_city_street_lamp_lev3", // [doc] Configura "name" con "jubilife_city_street_lamp_lev3".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/jubilife_city_street_lamp_lev3.glb" // [doc] Configura "path" con "/models/toycar/jubilife_city_street_lamp_lev3.glb".
    },
    {
        "name": "pcylinder433_1_metalhalidelamp_lev3", // [doc] Configura "name" con "pcylinder433_1_metalhalidelamp_lev3".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/pcylinder433_1_metalhalidelamp_lev3.glb" // [doc] Configura "path" con "/models/toycar/pcylinder433_1_metalhalidelamp_lev3.glb".
    },
    {
        "name": "plane_lev1_lev3", // [doc] Configura "name" con "plane_lev1_lev3".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/plane_lev1_lev3.glb" // [doc] Configura "path" con "/models/toycar/plane_lev1_lev3.glb".
    },
    {
        "name": "rock_11.001_lev1_lev3", // [doc] Configura "name" con "rock_11.001_lev1_lev3".
        "type": "gltfModel", // [doc] Configura "type" con "gltfModel".
        "path": "/models/toycar/rock_11.001_lev1_lev3.glb" // [doc] Configura "path" con "/models/toycar/rock_11.001_lev1_lev3.glb".
    }





]
