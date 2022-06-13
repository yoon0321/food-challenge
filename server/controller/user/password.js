const { User } = require('../../models/user') //models 경로에 이어줄것
const deletePasswordToken = require('../tokenFunctions/checkToken')
const bcrypt = require('bcrypt')
const { checkAccessToken } = require('../tokenFunctions')
const saltRounds = 10

module.exports =async(req,res) => {
        const userInfo = deletePasswordToken(req)
        if(!userInfo) {
            res.status(401).send('Not authorized, need login')
        } else {
            const correctUser = await User.findOne({
                where: {email: userInfo.email}
            })
            bcrypt.hash(req.body.password, saltRounds, async(err, hash) => {
                try {
                    await correctUser.update({ password: hash})
                } catch (err) {
                    res.status(400).json({
                        message: 'bad request'
                    })
                }
            })
        }
}