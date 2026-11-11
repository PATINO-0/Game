/**
 * Consulta bloques por nivel e inserta registros individuales o lotes en MongoDB.
 */
const Block = require('../models/Block') // [doc] Guarda require('../models/Block') en Block.

exports.getBlocks = async (req, res) => { // [doc] Asigna la función de respuesta en exports.getBlocks.
    try { // [doc] Ejecuta el bloque con manejo de errores.
        const level = parseInt(req.query.level) || 1; // [doc] Guarda parseInt(req.query.level) || 1 en level.

        const blocks = await Block.find({ level: level }).select('name x y z level role -_id'); // [doc] Guarda await Block.find({ level: level }).select('name x y z level ro… en blocks.

        res.json(blocks); // [doc] Envía la respuesta HTTP en formato JSON.
    } catch (error) { // [doc] Atiende el error capturado.
        res.status(500).json({ message: 'Error al obtener bloques', error }); // [doc] Envía la respuesta HTTP en formato JSON.
    }
};

exports.addBlock = async (req, res) => { // [doc] Asigna la función de respuesta en exports.addBlock.
    try { // [doc] Ejecuta el bloque con manejo de errores.
        const { name, x, y, z, level, role } = req.body; // [doc] Guarda req.body en { name, x, y, z, level, role }.
        const newBlock = new Block({ name, x, y, z, level, role }); // [doc] Crea newBlock como Block.
        await newBlock.save(); // [doc] Espera la operación: newBlock.save().

        res.status(201).json({ message: 'Bloque guardado', block: newBlock }); // [doc] Envía la respuesta HTTP en formato JSON.
    } catch (error) { // [doc] Atiende el error capturado.
        res.status(500).json({ message: 'Error al guardar bloque', error }); // [doc] Envía la respuesta HTTP en formato JSON.
    }
};

exports.addMultipleBlocks = async (req, res) => { // [doc] Asigna la función de respuesta en exports.addMultipleBlocks.
    try { // [doc] Ejecuta el bloque con manejo de errores.
        const blocks = req.body; // [doc] Guarda req.body en blocks.
        await Block.insertMany(blocks); // [doc] Espera la operación: Block.insertMany(blocks).
        res.status(201).json({ message: 'Bloques guardados', count: blocks.length }); // [doc] Envía la respuesta HTTP en formato JSON.
    } catch (error) { // [doc] Atiende el error capturado.
        res.status(500).json({ message: 'Error al guardar lote de bloques', error }); // [doc] Envía la respuesta HTTP en formato JSON.
    }
};
