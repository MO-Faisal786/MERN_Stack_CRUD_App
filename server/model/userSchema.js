const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    
    email : {
        type : String,
        required : true,
        unique : true
    },

    phone : {
        type : Number,
        required : true,
        unique : true
    },
    
    work : {
        type : String,
        required : true,
    },
    
    password : {
        type : String,
        required : true,
    },

    confirmpassword : {
        type : String,
        required : true
    },

    date : {
        type: Date,
        default:Date.now()
    },

    messages:[
        {
            name : {
                type : String,
                required : true
            },
            
            email : {
                type : String,
                required : true
            },
                
            phone : {
                type : Number,
                required : true,
            },
            
            message : {
                type : String,
                required : true,
            },   
        }
    ],

    tokens : [{
        token:{
            type : String,
            required : true
        }
    }]

});


// converting the password into hash
userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 12);
        this.confirmpassword = await bcrypt.hash(this.confirmpassword, 12);
    }
    next();
})

// to generate token
userSchema.methods.generateAuthToken = async function(){
    try {
        const token = jwt.sign({_id : this._id}, process.env.SECRET_KEY);

        this.tokens = this.tokens.concat({token:token});
        await this.save();

        return token;
    } catch (error) {
        console.log(error);
    }
}// to add message in database

userSchema.methods.addMessage = async function(name, email, phone, message){
    try {
        this.messages = this.messages.concat({name:name, email:email, phone:phone, message:message});
        await this.save();
        return this.messages;
    } catch (error) {
        console.log(error);
    }
}




const User = mongoose.model('USER', userSchema);

module.exports = User;

