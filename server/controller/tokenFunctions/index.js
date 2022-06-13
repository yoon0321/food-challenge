require('dotenv').config() //env 이용파일 

const jwt = require('jsonwebtoken')
//어세스 토큰 & 리프래쉬 토큰 생성하기 및 보내주기
module.exports = {
    //어세스토큰생성
    generateAccessToken: (data) => {
        return jwt.sign(data, process.env.ACCESS_SECRET, {expiresIn: '1d'})
    },
    //리프래쉬토큰생성
    generateRefreshToken: (data) => {
        return jwt.sign(data, process.env.REFRESH_SECRET, {expiresIn: '30d'})
    },
    //토큰 보내주기
    sendAccessToken: (res, accessToken) => {
        res.json({
            accessToken: accessToken, message: 'login success'
        })
    },
    sendRefreshToken: (res, refreshToken) => {
        res.cookie('refreshToken', refreshToken, {
            sameSite: 'none',
            httpOnly: true,
            secure: true,
        })
    },
    //토큰검증하기
    checkAccessToken: (req) => {
        const authorization = req.headers.authorization
        if (!authorization) {
           return res.status(404).send({data:null, message:'invalid access token'})
        }
        const token = authorization.split(' ')[1]
        try {
            return jwt.verify(token, process.env.ACCESS_SECRET)
        } catch (err) {
            return null;
        }
    },
    checkRefreshToken: (req) => {
        try {
            return jwt.verify(refreshToken, process.env.REFRESH_SECRET)
        } catch (err) {
            return null;
        }
    },

}