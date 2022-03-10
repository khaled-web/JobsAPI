//dotenv...to secure you database
require('dotenv').config();
require('express-async-errors');

//extra security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

const express = require('express');
const app = express();

//connectDB
const connectDB = require('./db/connect');
//importingMiddlewareAuthentication
const authenticateUser = require('./middleware/authentication')
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
// activate secure packages
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(rateLimiter({
  windowMs: 60 * 1000,
  max: 60
}));
// Activate authRouters
app.use('/domain/api/v1/auth', authRouters);
//Activate jobsRouters
app.use('/domain/api/v1/jobs', authenticateUser, jobsRouters);
// app.use('/domain/api/v1/jobs/:id', jobsRouters)


// ActivateMiddleware...incase of route isn't found
app.use(notFoundMiddleware);
// ActivateMiddleware...incase of there are an error
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 7000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();