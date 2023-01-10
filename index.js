require('dotenv').config();
const app = require("./app");

( async _=> {

    let resultado

    /*Conexion Base De Datos */
    const db_config = {
        host     : process.env.db_host,
        user     : process.env.db_user,
        password : process.env.db_password,
        database : process.env.db_database
    }

    const { Connection } = require('./services/mysql')
    resultado = await Connection( db_config )
    
    /*Liste System */
    await app.listen( process.env.PORT)
    console.log(`Servidor Corriendo Por El Puerto :${process.env.PORT}`)


})()
