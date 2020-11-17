const jwt = require('jsonwebtoken')

const valJwt = (rq) => {
    const tk = rq.header('tk')
    if (!tk) return { valid: false, msg: 'No hay Tk' };
    try {
        const { id } = jwt.verify(tk, process.env.TK_KEY);
        return { valid: true, msg: 'success', id };
    } catch (er) {
        return { valid: false, msg: 'Tk no válido' };
        // throw new Error('Tk no válido');  
    }
}

module.exports = { valJwt }
