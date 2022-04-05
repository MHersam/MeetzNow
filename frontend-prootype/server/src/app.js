const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

var port = process.env.PORT || 3000;

app.get('/login?', (req, res) => {
    var email = req.query.userEmail
    var password = req.query.userPassword
    console.log("user with email: " + email + " and password: " + password + " tried to sign in")
    res.send(
      [{
        firstName: "John",
        lastName: "Doe"
      }]
    )
  })

  app.listen(port, function () {
    console.log('meetznow.io is listening on port ' + port);
});