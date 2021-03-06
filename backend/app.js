const path = require('path');
const compression = require('compression');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// var logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
// Import API endpoint routes
const authRoutes = require('./routes/auth');
const emailRoutes = require('./routes/email');
const userRoutes = require('./routes/user');
const contractorRoutes = require('./routes/contractor');
const contractRoutes = require('./routes/contract');
const invoiceRoutes = require('./routes/invoice');

const app = express();

// Connect to the database before starting the application server.
mongoose
  .connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    autoIndex: false,
    authSource: 'admin',
    ssl: true,
    poolSize: 100,
    keepAlive: 29000,
    connectTimeoutMS: 29000,
  })
  .then(() => {
    console.log('Database connection ready!');
  })
  .catch((error) => {
    console.log('Database Connection failed! ', error);
    process.exit(1);
  });
mongoose.set('useCreateIndex', true);

// app.use(logger('dev'));
app.use(compression());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', express.static(path.join(__dirname, 'angular')));
// For all GET requests, send back index.html
// so that PathLocationStrategy can be used
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '/angular/index.html'));
});

// API endpoint routes
app.use('/api/auth', authRoutes);
app.use('/api/sendmail', emailRoutes);
app.use('/api/user', userRoutes);
app.use('/api/contractor', contractorRoutes);
app.use('/api/contract', contractRoutes);
app.use('/api/invoice', invoiceRoutes);

module.exports = {
  express: app,
  db: mongoose.connection,
};
