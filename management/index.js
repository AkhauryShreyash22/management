const express = require("express");
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const serverless = require("serverless-http");


const { connect_mongo } = require('./connection.js');

require('./models/user.js');
const user_router = require('./routes/user.js');

const app = express();

app.use(express.json({extended: false}));


connect_mongo('mongodb+srv://akhauryshreyash:rxtXC5UJJcfBtz5b@cluster0.eyrqlec.mongodb.net/shreyash_test')
.then(() => console.log('Connected to mongodb'))
.catch(err => console.log(err));

const swaggerDocument = YAML.load('./openapi/apis.yaml');

app.use("/user", user_router);

app.use('/openapi/app', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.listen(8000, () => console.log('Application Started For Development'));

// module.exports.handler = serverless(app);