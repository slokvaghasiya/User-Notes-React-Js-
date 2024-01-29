const { Router } = require("express");
const user = require('../model/User')
const authRoute = Router()
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const fetchUser = require('../Middleware/fetchUser')

const USER_ACCESS_TOKEN = '5891247$%^$%CVDFVDFergergesry%^@4536'

authRoute.post('/register', [
    body('emailId', 'Enter valid Email').isEmail(),
    body('name', 'Enter valid Email').isLength({ min: 3 }),
    body('password', 'Password must be 5 character !').isLength({ min: 5 }),
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {

        let getData = await user.findOne({ emailId: req.body.emailId });
        if (getData) {
            return res.send({ status: 400, message: "Email Already Registered" });
        } else {


            const salt = await bcrypt.genSalt(10)
            const secPass = await bcrypt.hash(req.body.password, salt)
            let newUser = await user.create({
                name: req.body.name,
                emailId: req.body.emailId,
                password: secPass
            })
            const data = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(data, USER_ACCESS_TOKEN)
            res.send({ status: 200, token: token })
        }
    } catch (err) {
        console.error(err.message);
        res.send({ status: 500, message: "Something went Wrong !" })
    }

})


authRoute.post('/login', [
    body('emailId', 'Enter valid Email').isEmail(),
    body('password', 'Password cannot be blank !').exists(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { emailId, password } = req.body;
        let getData = await user.findOne({ emailId });
        if (!getData) {
            return res.send({ status: 404, message: "Email & Password Wrong !" })
        } else {
            const passCompare = await bcrypt.compare(password, getData.password);
            if (!passCompare) {
                return res.send({ status: 404, message: "Email & Password Wrong...." })
            } else {
                // let token = jwt.sign({ id: getData._id }, USER_ACCESS_TOKEN)
                // let data1 = {
                //     id: getData._id,
                //     token: token
                // }
                // res.send({ status: 200, data: data1 })
                const data = {
                    user: {
                        id: getData._id
                    }
                }
                const token = jwt.sign({id: getData._id}, USER_ACCESS_TOKEN)
                res.send({ status: 200, token: token })
            }
        }
    } catch (err) {
        console.error(err.message);
        res.send({ status: 500, message: "Something went Wrong !" })
    }
})


authRoute.get('/getUser', fetchUser, async (req, res) => {
    try {
        let userId = req.user
        const getData = await user.findById(userId).select('-password')
        res.send({status:200,data:getData})
    } catch (err) {
        console.error(err.message);
        res.send({ status: 500, message: "Something went Wrong !" })
    }
})

module.exports = authRoute
