const { Schema, model } = require('mongoose')

const schema = Schema({
    nom: { type: String, required: true, trim: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'usuario' }
}, { versionKey: !1, timestamps: !0, collection: 'proyecto' })

module.exports = model('proyecto', schema);
