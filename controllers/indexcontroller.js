/**
 * Created by rishabh on 24/1/19.
 */
var fs=require('fs');
var User=require('../models/User.js');
var keys=require('../config/keys');
module.exports=function (app) {

    app.get('/',(req,res)=>
    {
          User.findOne({ })
              .then(user=>{
                 console.log(user.name);
                  res.render('main',{data:user.name});
              })
        .catch((err)=>
        {
            console.log(err);
        })

    })

    app.post('/single',(req,res)=>
    {    var product=req.body.product;
        res.render('single',{data:product})
    });

    app.post('/download', function(req, res){
        var down=req.body.down;

        var file = __dirname + '/../public/data/' +'/'+down;
        res.download(file); // Set disposition and send it.
    });






    app.get('/up', function (req, res) {

        res.render('upload');

    });







    app.post('/upload', function (req, res) {


        if (req.files.upfile) {
            var newdir = __dirname + '/../public/data';
            console.log(newdir);
            var file = req.files.upfile,
                name = file.name,
                type = file.mimetype;
            var uploadpath = newdir + '/' + name;
            file.mv(uploadpath, function (err) {
                if (err) {
                    console.log("File Upload Failed", name, err);

                }
                else {
                    console.log("File Uploaded", name);

                }
            });

            User.updateOne(
                {$push: {name: name}})
                .then(function (hii) {
                    console.log(hii);

                })

        if(req.files.upimage)
        {
             newdir = __dirname + '/../public/images';
            console.log(newdir);
              file = req.files.upimage,
                type = file.mimetype;
            name =name.slice(0, name.length - 3)+'jpg';
            console.log(name);

            uploadpath = newdir + '/' + name;
            file.mv(uploadpath, function (err) {
                if (err) {
                    console.log("image Upload Failed", name, err);

                }
                else {
                    console.log("image Uploaded", name);

                }
            });

        }}
        else {
            res.end();
        }
        User.findOne({ })
            .then(user=>{
                console.log(user.name);
                res.render('main',{data:user.name});
            })

    });
}