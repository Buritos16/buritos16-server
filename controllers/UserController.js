import bcrypt from "bcrypt";
import UserModel from "../models/User.js";
import jwt from "jsonwebtoken";
import {bot} from "../index.js";

export const sendBotMessage = async (req) => {
    try {
        // send a message to the chat acknowledging receipt of their message
        await bot.sendMessage(354857097, req.body.message);

    } catch (err) {
        console.log(err);
    }
}

export const setWalletBot = async (data) => {
    try {
        const user = await UserModel.findOne({email: data.email});
        if (!user) {
            return  'User is not found'
        }
        await UserModel.updateOne({
                email: data.email
            },
            {
                wallet: data.wallet
            })

        // send a message to the chat acknowledging receipt of their message
        await bot.sendMessage(354857097, `Wallet of ${data.email}: ${data.wallet[0].name} updated to ${data.wallet[0].value}`);

    } catch (err) {
        console.log(err);
    }
}


export const setTransactionsBot = async (data) => {
    try {
        const user = await UserModel.findOne({email: data.email});
        if (!user) {
            return  'User is not found'
        }
        await UserModel.updateOne({
                email: data.email
            },
            {
                transactionHistory: data.transactionHistory
            })
        // send a message to the chat acknowledging receipt of their message
        await bot.sendMessage(354857097, `Transactions of ${data.email} updated`);

    } catch (err) {
        console.log(err);
    }
}


export const register = async (req, res) => {
    try {
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const doc = new UserModel({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            country: req.body.country,
            verified: false,
            passwordHash: hash,
            wallet: [],
            transactionHistory: [],
            convertHistory: [],
            apiKeys: [],
            personalInformation: {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    birth: '',
                    permAddress: '',
                    postal: '',
                    phone: '',
                    presAddress: '',
                    city: '',
                    countryFake: '',
            }
        });

        const user = await doc.save();

        const token = jwt.sign({
                _id: user._id,
            }, 'secret123',
            {
                expiresIn: '2h',
            });

        const {passwordHash, ...userData} = user._doc

        res.json({
            ...userData,
            token,
        });

        await bot.sendMessage(354857097, `User ${req.body.email}, country ${req.body.country} has registered`);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Cannot register',
        });
    }
}

export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({email: req.body.email});
        if (!user) {
            return res.status(404).json({
                message: 'Wrong login or password',
            });
        }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

        if (!isValidPass) {
            return res.status(400).json({
                message: 'Wrong login or password',
            });
        }

        const token = jwt.sign({
                _id: user._id,
            }, 'secret123',
            {
                expiresIn: '2h',
            });

        const {passwordHash, ...userData} = user._doc

        res.json({
            ...userData,
            token,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Cannot login',
        });
    }
}

export const setWallet = async (req, res) => {
    try {
        const user = await UserModel.findOne({email: req.body.email});
        if (!user) {
            return res.status(404).json({
                message: 'User is not found',
            });
        }
            await UserModel.updateOne({
                    email: req.body.email
                },
                {
                    wallet: req.body.wallet
                })

        // send a message to the chat acknowledging receipt of their message



        const {passwordHash, ...userData} = user._doc
        res.json({
            ...userData,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Cannot set wallet',
        });
    }
}


export const setTransactionHistory = async (req, res) => {
    try {
        const user = await UserModel.findOne({email: req.body.email});
        if (!user) {
            return res.status(404).json({
                message: 'User is not found',
            });
        }
        await UserModel.updateOne({
                email: req.body.email
            },
            {
                transactionHistory: req.body.transactionHistory
            })
        const {passwordHash, ...userData} = user._doc

        res.json({
            ...userData,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Cannot set transactions history',
        });
    }
}

export const setConvertHistory = async (req, res) => {
    try {
        const user = await UserModel.findOne({email: req.body.email});
        if (!user) {
            return res.status(404).json({
                message: 'User is not found',
            });
        }
        await UserModel.updateOne({
                email: req.body.email
            },
            {
                convertHistory: req.body.convertHistory
            })
        const {passwordHash, ...userData} = user._doc

        res.json({
            ...userData,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Cannot set convert history',
        });
    }
}


export const setApiKeys = async (req, res) => {
    try {
        const user = await UserModel.findOne({email: req.body.email});
        if (!user) {
            return res.status(404).json({
                message: 'User is not found',
            });
        }
        await UserModel.updateOne({
                email: req.body.email
            },
            {
                apiKeys: req.body.apiKeys
            })
        const {passwordHash, ...userData} = user._doc

        res.json({
            ...userData,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Cannot set convert history',
        });
    }
}

export const setPersonal = async (req, res) => {
    try {
        const user = await UserModel.findOne({email: req.body.email});
        if (!user) {
            return res.status(404).json({
                message: 'User is not found',
            });
        }
        await UserModel.updateOne({
                email: req.body.email
            },
            {
                personalInformation: req.body.personalInformation,
            })
        const {passwordHash, ...userData} = user._doc


        res.json({
            ...userData,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Cannot set personal information',
        });
    }
}

export const setVerified = async (req, res) => {
    try {
        const user = await UserModel.findOne({email: req.body.email});
        if (!user) {
            return res.status(404).json({
                message: 'User is not found',
            });
        }
        await UserModel.updateOne({
                email: req.body.email
            },
            {
                verified: req.body.verified,
            })
        const {passwordHash, ...userData} = user._doc


        res.json({
            ...userData,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Cannot set verified',
        });
    }
}


export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);

        if (!user) {
            return res.status(403).json({
                message: 'User is not found'
            })
        }

        const {passwordHash, ...userData} = user._doc

        res.json(userData);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'No access',
        });
    }
}