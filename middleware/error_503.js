//////////////////////////////////////////////////////////////////
const Error_503 = (req, res, next) => {
    
    const ms = ( 7 * 1000 )
    const time = setTimeout( __=> req.emit('timeout',{}), ms)	
    
    req.on('timeout', __ => {

        clearInterval( time )
        
        if(res.statusMessage == undefined)
        {
            res.status(503).send( { mensaje:"Servidor Tiempo Agotado" } )
            res.send = (...args) => new Error('ERR_HTTP_HEADERS_SENT')  
        }
          
    }) 

    req.on('end', __ => {

        clearInterval( time )

        try { guardar_auditoria(req,res) }  
        catch (error) { console.log(error) }

    }) 

    next()
    
}
//////////////////////////////////////////////////////////////////
module.exports = { Error_503 }
//////////////////////////////////////////////////////////////////