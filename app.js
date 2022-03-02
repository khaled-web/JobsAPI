//dotenv...to secure you database
require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

//connectDB

//routers
const authRouters = require('./routes/auth');
const jobsRouters = require('./routes/jobs')

// error handler
// incase of...Route isn't found
const notFoundMiddleware = require('./middleware/not-found');
// incase of...There are an error
const errorHandlerMiddleware = require('./middleware/error-handler');
//middleware...to use req.body
app.use(express.json());
// extra packages

// Activate authRouters
app.use('/domain/api/v1/auth', authRouters);
//Activate jobsRouters
app.use('/domain/api/v1/jobs', jobsRouters);
// app.use('/domain/api/v1/jobs/:id', jobsRouters)


// ActivateMiddleware...incase of route isn't found
app.use(notFoundMiddleware);
// ActivateMiddleware...incase of there are an error
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 7000;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();