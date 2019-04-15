
var express=require('express');
var bodyParser=require('body-parser');
var mongoose=require('mongoose');
var app=express();
var PORT =process.env.PORT||3000;
var upload = require('express-fileupload');
var indexcontroller=require('./controllers/indexcontroller');

app.use(bodyParser.urlencoded({extended:true}));

var db=require('./config/keys');
mongoose.connect(db.mongoURI)
    .then(()=> console.log('mongodb connected'))
    .catch(err => console.log(err));

app.set('view engine','ejs');
app.use(express.static('./public'));
app.use(upload());
indexcontroller(app);

app.listen(PORT);
