import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({

        email: {
            type: String,
            required: true,
            unique: true,
        },
        country: {
            type: String,
        },
        verified: Boolean,
        passwordHash: {
            type: String,
            required: true,
        },
        personalInformation:
            {
                firstName: {
                    type: String,
                    required: true,
                },
                lastName: {
                    type: String,
                    required: true,
                },
                birth: String,
                permAddress: String,
                postal: String,
                phone: String,
                presAddress: String,
                city: String,
                countryFake: String,
            },
        wallet: [{
            name: String,
            value: Number
        }],
        transactionHistory: [{
            time: Number,
            transactionType: String,
            coin: String,
            amount: Number,
            status: String,
            color: String
        }],
        convertHistory: [{
            time: Number,
            pairs: String,
            buySell: String,
            amount: Number,
            status: String
        }],
        apiKeys: [{
            key: String,
            read: Boolean,
            withdraw: Boolean,
            spot: Boolean,
            margin: Boolean,
        }],
    }, {
        timestamps: true,
    },
);

export default mongoose.model('User', UserSchema);