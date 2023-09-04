const express = require('express');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const router = express.Router();
require('../db/conn');
const User = require('../model/userSchema');
const authenticate = require('../middleware/authenticate')


router.get('/', (req, res) => {
    res.send("This is the home page from the router file");
});

router.post('/register', async (req, res) => {

    const { name, email, phone, work, password, confirmpassword } = req.body;

    if (!name || !email || !phone || !work || !password || !confirmpassword) {
        return res.status(422).json({ status: 422, error: "Please fill all fields properly..." });
    }

    try {
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(422).json({ status: 422, error: "email already taken..." });
        } else if (password !== confirmpassword) {
            return res.status(422).json({ status: 422, error: "Password are not matching..." });
        } else {
            const user = new User({ name, email, phone, work, password, confirmpassword });

            await user.save();
            res.status(201).json({ status: 201, message: "register successully..." })
        }
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

router.post('/login', async (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    try {
        if (!email || !password) {
            return res.status(422).json({ status: 422, error: "Please fill all fields properly..." });
        }

        const user = await User.findOne({ email });
        if(!user){
            return   res.status(403).json({error:"User does not exist"});
        }

        const isMatch = bcrypt.compare(password, user.password);

        // if(user.password === password){
        //     res.json({message : "Successfully loged in..."});
        // } else {
        //     res.status(422).json({message : "Invalid email or password..."});
        // }

        const token = await user.generateAuthToken();
        // console.log(token);

        res.cookie("myCookie", token, {
            expires: new Date(Date.now() + 25892000000),
            httpOnly: true
        });

        if (isMatch) {
            res.status(201).json({ message: "Successfully loged in..." });
        } else {
            res.status(422).json({ status: 422, error: "Invalid email or password..." });
        }


    } catch (error) {
        res.status(409).json({ message: error.message });
    }



});



router.get('/about', authenticate, (req, res) => {
    // console.log("about page...");
    res.send(req.rootUser);
});

router.post('/contact', authenticate, async (req, res) => {

    try {
        const { name, email, phone, message } = req.body;
        if (!name || !email || !phone || !message) {
            return res.status(422).json({ status: 422, error: "All field are required" });
        }

        const userDetail = await User.findOne({ _id: req.id })

        if (userDetail) {
            const messageData = await userDetail.addMessage(name, email, phone, message);
            // console.log(messageData);
            res.status(201).json({ message: "message send succesfully..." });
        }



    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

router.put('/edit/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { name, email, phone, work } = req.body;
        if (!name || !email || !phone || !work) {
            return res.status(422).json({ status: 422, error: "all fields are require" });
        }
        const updatedUserData = { name, email, phone, work };
        const updateResult = await User.updateOne({ _id: id }, updatedUserData, { new: true });
        if (updateResult === null) {
            return res.status(503).json({ "status": 503, "error": "server is not responding" })
        } else {
            res.status(201).json({ status: "201", message: "update successfully" });
        };

    } catch (error) {
        res.status(409).json({ message: error.message });
    }

})

router.delete('/delete/:id', async (req, res) => {
    try {
        res.clearCookie("myCookie");
        const id = req.params.id;
        const deleteUser = await User.deleteOne({ _id: id });
        if (!deleteUser) {
            return res.status(503).send("Server Not Responding");
        } else {
            res.status(201).json({ "status": "201", "message": "deleted Successfully" })
        };
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
})
   


router.get('/getdata', authenticate, (req, res) => {
    res.send(req.rootUser);
});


router.get('/logout', (req, res) => {
    res.clearCookie('myCookie', { path: '/' });
    res.status(200).send("Logout succesfull...")
});



module.exports = router;