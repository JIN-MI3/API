const express = require("express");
const path = require("path");
const cors = require("cors")

require("dotenv").config();

console.log(process.env.NODE_ENV)

// const Sequelize = require("sequelize");
// const sequelize = new Sequelize(
//     process.env.DB_NAME,
//     process.env.DB_USER,
//     process.env.DB_PASS,
//     {
//         host: process.env.DB_HOST,
//         dialect: process.env.DB_DIALECT,
//         port: process.env.DB_PORT,
//     }
// );

// sequelize
//     .authenticate()
//     .then(() => {
//         console.log("Connection has been established successfully.");
//     })
//     .catch((error) => {
//         console.error("Unable to connect the database: ", error);
//     });

const app = express();

// set up view
app.set('views', './views');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static('public'));

app.use(cors());

const indexRoute = require("./routes/index");
const webRoute = require("./routes/web_route");

app.use("/", indexRoute);
app.use("/web", webRoute);


app.listen(process.env.PORT, () => console.log("Server started!"));