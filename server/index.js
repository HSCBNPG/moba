const express = require('express')

const app = express()

app.set('secret', '2edwq2812ed23')

app.use(require('cors')())
app.use(express.json())
app.use('/uploads', express.static(__dirname + '/uploads'))

require('./plugins/mongoose')(app)
require("./routes/admin")(app)


app.listen(3000, () => {
    console.log("http:localhost://3000");
})