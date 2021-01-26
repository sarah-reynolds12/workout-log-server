require('dotenv').config();
let express = require('express');
let app = express();
const sequelize = require('./db');
let user = require('./controllers/usercontroller');
let log = require('./controllers/logcontroller');

sequelize.sync();
//sequelize.sync({force: true})

app.use(express.json());
app.use('/user', user);

//app.use(require('./middleware/validate-session'));
app.use('/log', log);

app.listen(3000, function(){
    console.log("App is listening on port 3000")
});