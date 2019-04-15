/**
 * Created by rishabh on 24/1/19.
 */
var mongoose=require('mongoose');
var UserSchema= new mongoose.Schema({
   name:
       {
           type:Array,
           required:true
       }
});

module.exports=User=mongoose.model('data',UserSchema);
