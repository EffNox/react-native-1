const Proyecto = require("../models/Proyecto");
const Tarea = require("../models/Tarea");
const Usuario = require("../models/Usuario");

const mutation = {
    Mutation: {
        login: async (_, { dt }) => await Usuario.authenticate(dt),
        createUsuario: async (root, { dt }, ctx, inf) => await Usuario.create(dt),
        
        createProyecto: async (_, { dt }, { id, valid, msg }) => {
            if (!valid) throw new Error(msg);
            return await Proyecto.create({ ...dt, createdBy: id })
        },
        updateProyecto: async (_, { id, dt }, ctx) => {
            return await Proyecto.findByIdAndUpdate(await validation(id, ctx), dt, { new: !0 })
        },
        deleteProyecto: async (_, { id }, ctx) => {
            return await Proyecto.findByIdAndDelete(await validation(id, ctx))
        },

        createTarea: async (_, { dt }, { id, valid, msg }) => {
            if (!valid) throw new Error(msg);
            return await Tarea.create({ ...dt, usuario: id })
        },
        updateTarea: async (_, { id, dt }, ctx) => {
            return await Tarea.findByIdAndUpdate(await validation2(id, ctx), dt, { new: !0 })
        },
        deleteTarea: async (_, { id }, ctx) => {
            return await Tarea.findByIdAndDelete(await validation2(id, ctx))
        }
    }
}

async function validation(id, { id: idUsu, valid, msg }) {
    if (!valid) throw new Error(msg);
    let proyecto = await Proyecto.findById(id);
    if (!proyecto) throw new Error('No existe el registro');
    if (proyecto.createdBy.toString() !== idUsu) throw new Error('No tienes las credenciales suficientes');
    return id
}
async function validation2(id, { id: idUsu, valid, msg }) {
    if (!valid) throw new Error(msg);
    let data = await Tarea.findById(id);
    if (!data) throw new Error('No existe el registro');
    if (data.usuario.toString() !== idUsu) throw new Error('No tienes las credenciales suficientes');
    return id
}

module.exports = mutation;
