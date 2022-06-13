const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {generateAccessToken, generateRefreshToken, sendAccessToken, sendRefreshToken} = require('../tokenFunctions')
const { User } = require('../../models/user')

module.exports = async(req,res) => {
     const {email , password} = req.body 

        try {
            const userInfo = await User.findOne({
                where : {email: email}
            })
            const hash = userInfo.password

            await bcrypt.compare(password, hash, (err, result) => {
                if(result) {
                    delete userInfo.dataValues.password;
                    //비밀번호 처리
                    //아래 변수 그대로 잘 쓸것.
                    const accessToken = generateAccessToken(userInfo.dataValues)
                    const refreshToken= generateRefreshToken(userInfo.dataValues)
                    sendAccessToken(res, accessToken)
                    sendRefreshToken(res, refreshToken)
                    res.status(200).json({
                        message : 'login success'
                    })
                } else {
                    return res.status(400).json({
                        message : '아이디 혹은 비밀번호를 확인해 주세요'
                    })
                }
            })
        } catch (err) {
            return res.status(500).json({
                message : 'login failure'
            })
        }
    
}
