const { connect, pluralize } = require('mongoose')
require('dotenv').config()

const dbCon = async () => {
    try {
        pluralize(null)
        await connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
        console.log('DB ONLINE');
    } catch (er) {
        console.log(er);
        // process.exit(1);
        throw new Error('ERROR al inicializar la BD');
    }
}
module.exports = { dbCon } 
