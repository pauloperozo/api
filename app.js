const express = require("express")
const logger  = require('morgan')
const cors    = require('cors')
const bodyp   = require('body-parser')

const app = express()
      app.use( cors() )
      app.use( logger("dev") )
      app.use( bodyp.json({limit: '50mb'}) )
      app.use( bodyp.urlencoded( { limit: '50mb', extended: true } ) ) /* Tamaño De 50MB  */

      /*Cargamos Rutas */
      const { Routers } = require('./services/router')
      
      Routers().forEach( router => {
            app.use( router.name,require(router.path) )
      })

      /*Cargamos Errores */
      const { Error_503 } = require('./middleware/error_503')
      app.use( Error_503 )

      const { Error_404 } = require('./middleware/error_404')
      app.use( Error_404 )

      module.exports = app