var express = require('express');
var multer = require('multer');
var upload = multer({ dest: __dirname + '/uploads/' });
var exphbs  = require('express-handlebars');
var session = require('express-session');
var fs = require('fs');
var port = process.env.PORT || 8081;
var app = express();

app.use(session({ secret: 'upload service freecodecamp',
  saveUninitialized: true,
   cookie: {
     secure: false,
     maxAge: 43600
   }
 }));

app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');


app.get('/', function(req,res) {
  res.render('index');
});

app.get('/status', function(req,res) {
  if (req.session.fileSize) {
    return res.send({fileSize : req.session.fileSize}).end();
  }
  res.status(404).end();
});

app.post('/upload', upload.single('upfile'), function(req, res) {
  if (req.file && req.file.size) {
    req.session.fileSize = req.file.size;
    fs.unlink(req.file.path);
  }
  res.redirect('/');
});


app.listen(port, function() {
  console.log('Application started on :' + port);
});
