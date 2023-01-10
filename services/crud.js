//////////////////////////////////////////////////////
const Create = async ( table = '', data ) => {

    const { Query } = require("../services/mysql")
    const resultado = await Query(`INSERT INTO ${ table } SET ?;`, data ) 
    if(resultado.error) return { error:true, message:'problema al insertar registro tabla' }
    else 
    {
        if( resultado.insertId  > 0 ) return { success:true, id:resultado.insertId  } 
        else if(resultado.affectedRows > 0) return { success:true }
    }

}
//////////////////////////////////////////////////////
const Read = async ( table = '', condition ) => {

    const { Query } = require("../services/mysql")

    let sql = `SELECT * FROM ${ table }`

    if(!condition) sql = sql.concat(';') 
    else 
    {
        const [ key, value ] = Object.entries( condition )[0]
        sql = sql.concat( `WHERE ${ key } = "${ value }";`) 
    }

    const resultado = await Query( sql ) 
    
    return { success:true, rows:resultado  } 

}
//////////////////////////////////////////////////////
const Update = async( table = '', data , condition ) => {

    const { Query } = require("../services/mysql")
    const [ key, value ] = Object.entries( condition )[0]
    const resultado = await Query(`UPDATE ${ table } SET ? WHERE ${ key } = "${ value }"`, data ) 
    if(resultado.error) return { error:true, message:'problema al actualizar registro de la tabla' }
    else 
    {
        if(resultado.affectedRows > 0) return { success:true }
        else return { error:true, message:'sin cambios en la tabla' }
    }

}
//////////////////////////////////////////////////////
const Delete = async( table = '', condition ) => {

    const { Query } = require("../services/mysql")
    const [ key, value ] = Object.entries( condition )[0]
    const resultado = await Query(`DELETE FROM ${ table } WHERE ${ key } = "${ value }"`) 
    if(resultado.error) return { error:true, message:'problema al actualizar registro de la tabla' }
    else 
    {
        if(resultado.affectedRows > 0) return { success:true, message:'registro borrado con exito' }
        else return { error:true, message:'sin cambios en la tabla' }
    }

}
//////////////////////////////////////////////////////
module.exports = { Create, Read , Update ,Delete, Query }
//////////////////////////////////////////////////////