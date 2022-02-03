const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const booksRoute = require('./routes/books');
const winston = require('winston');

const PORT = process.env.PORT || 3000;

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// routes
app.use("/api/books", booksRoute);

// create a logger
const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console({
      format:winston.format.combine(
        winston.format.colorize({all:true}),
      )
    }),
    new winston.transports.File({ filename: 'error.log', level:'error' })
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: 'exceptions.log' })
  ]
});

// throw new Error();

// Connect to mongodb
mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true })
  .then(() => {
    logger.info("Connected to mongoDb atlas");
  })
  .catch((error) => {
    logger.error( error.message);
  });


app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`);
});
