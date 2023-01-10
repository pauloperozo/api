///////////////////////////////////////////////////
const Login = async ( data ) => {

    /* Validaciones */
    const {username,password} = data

    if(!username) return { status:400,respuesta:{"mensaje":"Campo username faltante."}}
    if(!password) return { status:400,respuesta:{"mensaje":"Campo password faltante."}}
    
    if(username.length) return { status:400,respuesta:{"mensaje":"Campo username vacio"}}
    if(password.length) return { status:400,respuesta:{"mensaje":"Campo password vacio"}}
    /* Validaciones */

    /*Consulta y Repuesta */
    const { Query } = require('../services/crud')
    sql = `SELECT * FROM credenciales WHERE username = "${username}" AND password = "${password}"`
    resultado = await Query(sql)
    if(resultado.error) return { status:500,respuesta:{"mensaje":"Problema Con  El Servidor"}}
    
    return  { status:500,respuesta: resultado}
    /*Consulta y Repuesta */


    
}

///////////////////////////////////////////////////
module.exports = { Login }
///////////////////////////////////////////////////