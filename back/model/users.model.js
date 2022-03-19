const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// const Schema= mongoose.Schema;

// module.exports=mongoose.model('User',UserSchema);


const uniqueValidator = require('mongoose-unique-validator');
const userSchema = new mongoose.Schema({
    prenom: {
        type: String,
        required: true
    },
    nom: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    numero: {
        type: String,
        required: true,
        unique: true
    },
    profil: {
        type: String,
        required: true
    },
    etat: {
        type: String,
        default: 'actif'
    },
    img: {
        data: Buffer,
        contentType: String
    },
    secret: {
        type: String,
        required: true
    }
    },{
            timestamps: true
});

module.exports = mongoose.model('User', userSchema);




            // const UserSchema = new Schema({
            //     prenom: {
            //         type: String,
            //         trim: true,
            //         required: [true, 'firstname is required'],
            //     },
            //     nom: {
            //         type: String,
            //         trim: true,
            //         required: [true, 'Last name is required'],
            //     },
            //     email: {
            //         type: String,
            //         trim: true,
            //         required: [true, 'email is required'],
            //         unique: 'Two users cannot share the same email ({VALUE})',
            //         lowercase: true,
            //         validate: [validateEmail, 'Please fill a valid email address'],
            //     },
            //     secret: {
            //         type: String,
            //         trim: true,
            //         required: [true, 'password is required']
            //     },
            //     numeros: {
            //         type: String,
            //         unique: 'Two users cannot share the same phone number ({VALUE})',
            //         required: [true, 'numero is required']
            //     },
            //     city: {
            //         type: String
            //     },
            //     avatar_url: {
            //         type: String
            //     },
            //     profil: {
            //         type: String,
            //         required: true,
            //         default: 'client'
            //     },
            //     isGranted: {
            //         type: Boolean,
            //         default: false
            //     }
            // }, {
            //     timestamps: true
            // });
            
            // UserSchema.plugin(beautifyUnique);
            
            // UserSchema.pre('save', function (next) {
            //     if (!this.isModified('secret')) {
            //         return next();
            //     }
                
            //     const user = this;
            //     this.secret = bcrypt.hashSync(this.secret, saltRounds);
            //     next();
                
            // });
            
            
            // function validateEmail(email) {
            //     var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            //     return re.test(email);
            // }
            
            // UserSchema.methods.toJSON = function () {
            //     var obj = this.toObject();
            //     delete obj.secret;
            //     return obj;
            // };