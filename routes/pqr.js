//////////////////////////////////////////////////////////////////////////////////////////
const { Router } = require('express')
const router = Router()
//////////////////////////////////////////////////////////////////////////////////////////
router.get('/',(req, res)=>{
    res.send({mensaje:"Login"})
})
//////////////////////////////////////////////////////////////////////////////////////////
router.post('/',(req, res)=>{
  res.send({mensaje:"Login"})
})
//////////////////////////////////////////////////////////////////////////////////////////
module.exports = router
//////////////////////////////////////////////////////////////////////////////////////////