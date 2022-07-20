const express = require('express')
const app = express()
const controllerNMiddleware = require('./controllers&middlewares')

const port = 3000

app.listen(port, () => {
  console.log('Sunucu port 3000de başlatıldı')

})



app.use('/login',controllerNMiddleware.middleWare,controllerNMiddleware.login )
