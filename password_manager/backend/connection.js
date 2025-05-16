const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/user-info').then(()=>{console.log('Database connected succesfully !!')}).catch((err)=>{console.log(err)})

const schema = mongoose.Schema({
    url:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
        
    },
    password:{
        type:String,
        required:true,
    }
})

schema.index({ url: 1, username: 1 }, { unique: true });

const model = mongoose.model('passwords',schema)

module.exports=model