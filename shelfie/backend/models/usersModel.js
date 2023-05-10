import crypto from "crypto";
import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: [function () {
            //make name required only on creation
            return this.isNew
        }, "Please add a name"],
        maxlength: [50, "Name cannot be more than 50 characters"]
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
        unique: true,
        lowercase: true,
        trim: true,
        validate: [validator.isEmail, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
        minlength: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, "Please confirm your password"],
        validate: {
            validator: function (el) {
                return this.password === el;
            },
            message: "Passwords are not the same"
        }
    },

    passwordChangedAt: Date,

    profilePic: {
        type: String,
        default: "../images/default_profile.png"
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
        type: Boolean,
        default: true,
        select: false
    }
    // role: {
    //     type: String,
    //     enum:['owner', 'friend'],
    //     default: 'owner'
    // }
}, { timestamps: true })



UserSchema.pre("save", async function (next) {
    try {
        if (!this.isModified("password")) {
            next();
        }
        if (this.isModified('password')) {
            const salt = await bcrypt.genSalt(12);
            this.password = await bcrypt.hash(this.password, salt);
            this.passwordConfirm = undefined;
        }
        next();
    } catch (err) {
        next(err);
    }
})

UserSchema.pre('save', function (next) {
    if (!this.isModified('password') || this.isNew) {
        next();
    }
    this.passwordChangedAt = Date.now() - 1000;
    next();

})

UserSchema.pre(/^find/, function (next) {
    this.find({ active: { $ne: false } });
    next();
})


//instance method:

UserSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(
            this.passwordChangedAt.getTime() / 1000, 10
        )
        //if the password(changedTimestamp) was changed after the token was issued(JWTTimestamp), its timestamp will be greater than the token timestamp and so it will return true
        return JWTTimestamp < changedTimestamp
    }
    //false means NOT Changed
    return false
}

UserSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
}


UserSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString("hex");

    this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    console.log(resetToken, this.passwordResetToken);

    return resetToken;
}

export default mongoose.model("User", UserSchema);