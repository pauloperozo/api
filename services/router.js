//////////////////////////////////////////////////////////////////
const Routers = __ => {
    
    const { existsSync,readdirSync } = require('fs')
    const routepath = require('path').join(__dirname, '../routes')
  
    if( !existsSync(routepath) ) return Array()
    else 
    {
        return readdirSync( routepath ).map( file => {  
        
            let obj = { name:'', path: `./routes/${file}` }
                obj.name = file == `index.js` ?  '/' : `/${file.replace('.js','')}`
        
            return obj 
        })
    }
     
}
//////////////////////////////////////////////////////////////////
module.exports = { Routers }
//////////////////////////////////////////////////////////////////