var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
const sequelize = require('./models/database');

sequelize.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.error('Database connection failed:', err));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

const jobPostingsRouter = require('./routes/jobPostings');
app.use('/job-postings', jobPostingsRouter);
const applicationsRouter = require('./routes/applications');
app.use('/applications', applicationsRouter);

const faqRouter = require('./routes/faq');
const feedbackRouter = require('./routes/feedback');
const announcementRouter = require('./routes/announcement');

app.use('/faqs', faqRouter);
app.use('/feedback', feedbackRouter);
app.use('/announcements', announcementRouter);


const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');


const swaggerOptions = {
  definition: {
      openapi: '3.0.0',
      info: {
          title: 'My API',
          version: '1.0.0',
      },
      components: {
          securitySchemes: {
              bearerAuth: {
                  type: 'http',
                  scheme: 'bearer',
                  bearerFormat: 'JWT',
              },
          },
      },

      security: [
          {
              bearerAuth: [],
          },
      ],
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
