const Proyecto = require("../models/Proyecto");
const Tarea = require("../models/Tarea");
const Usuario = require("../models/Usuario");

const query = {
    Query: {
        getUsuarios: async () => await Usuario.find(),
        getProyectos: async (_, __, { id }) => await Proyecto.find({ createdBy: id }).populate('createdBy'),
        getTareas: async (_, __, { id }) => await Tarea.find({ usuario: id }).populate('usuario'),
        getTareasByProyecto: async (_, { proyecto }, { id }) => await Tarea.find({ usuario: id, proyecto }).populate('usuario'),
    }
}

module.exports = query;
