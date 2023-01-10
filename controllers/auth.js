///////////////////////////////////////////////////
const Login = async ( data ) => {

    /* Validaciones */
    const { username,password } = data

    if(!username) return { status:400,respuesta:{"mensaje":"Campo username faltante."}}
    if(!password) return { status:400,respuesta:{"mensaje":"Campo password faltante."}}
    
    if(username.length == 0) return { status:400,respuesta:{"mensaje":"Campo username vacio"}}
    if(password.length == 0) return { status:400,respuesta:{"mensaje":"Campo password vacio"}}

    /*Consulta y Repuesta */
    const { Query } = require('../services/mysql')
    sql = `SELECT * FROM users WHERE username = "${username}" AND password = "${password}"`
    resultado = await Query(sql)

    if(resultado.error) return { status:500,respuesta:{"mensaje":"Problema Con  El Servidor"}}
    if(resultado.length === 0) return { status:400,respuesta:{"mensaje":"Username o Password Incorrecto."}}
    
    const {idUser} = resultado[0]
    const { GenerateToken } = require('../services/jws')

    const respuesta = {
        success:true,
        token: GenerateToken({idUser}),
        unix: new Date().getTime()
    }

    return  { status:200,respuesta: respuesta}

}

///////////////////////////////////////////////////
module.exports = { Login }
///////////////////////////////////////////////////