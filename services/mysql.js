////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let MysqlConexion = undefined
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Connection = ( config = {} ) => {

    const { createConnection } = require('mysql')  
    return new Promise( resolve => {

            const connect = createConnection( config )
            connect.connect( err => { 

            if( err ) resolve( { error : true, message:"Error -> No Se Pudo Conectar Con la Base De Datos"} ) 
            else 
            {
                const { createPool } = require('mysql')
                MysqlConexion = createPool( config ) 
                connect.destroy()  
                resolve({ success:true } )                 
            }

        })

    })
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Query = (sql = "", obj = {} ) => {

    return new Promise( resolve => {

        if(!MysqlConexion) resolve( { error : true, message : "Error Conexion Base De Datos" } )
        else 
        {
            
            MysqlConexion.getConnection( ( err, connection ) => {

                if( err ) resolve( { error : true, message : err.message } ) 
                else 
                {   
                    const { format } = require('mysql')
                    const out = format(sql,obj)
    
                    connection.query( out, (error, results, fields) => {
                        
                        connection.release()
                        if (error) resolve( { error : true, message : err.message } )          					
                        else resolve( results )
                    
                    })
                }
            })

        }

    })

}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = { Connection, Query }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////







