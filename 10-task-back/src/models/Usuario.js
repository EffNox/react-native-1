const { Schema, model } = require('mongoose')
const { genJwt } = require('../../config/jwt')

const scUser = Schema({
    nom: String,
    cor: { type: String, unique: true, required: true, trim: true, lowercase: true },
    pwd: { type: String, required: true, bcrypt: true },
}, { versionKey: !1, timestamps: !0, collection: 'usuario' })
scUser.plugin(require('mongoose-bcrypt'));

scUser.methods.toJSON = function () {
    let userObject = this.toObject();
    delete userObject.pwd;
    return userObject;
}

scUser.statics.authenticate = async function ({ cor, pwd }) {
    let rs = {};
    const msg = await this.findOne({ cor }).then(async (dt) => {
        if (!dt) throw Error('Usuario y/o contraseña incorrectos - cor');
        if (!await dt.verifyPwd(pwd)) throw Error('Usuario y/o contraseña incorrectos - pwd');
        rs = { dt, tk: await genJwt(dt.id) };
    }).catch(err => String(err).replace('Error: ', ''))

    return (!msg) ? rs : { msg };
};

module.exports = model('usuario', scUser);
