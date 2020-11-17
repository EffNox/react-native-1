const { Schema, model } = require('mongoose')

const schema = Schema({
    nom: { type: String, required: true, trim: true },
    usuario: { type: Schema.Types.ObjectId, ref: 'usuario' },
    proyecto: { type: Schema.Types.ObjectId, ref: 'proyecto' },
    est: { type: Boolean, default: false },
}, { versionKey: !1, timestamps: !0, collection: 'tarea' })

module.exports = model('tarea', schema);
