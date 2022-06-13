//get , 토큰확인 (내정보, 찜한 지도목록 ,내 지도 목록)
const deletePasswordToken = require('../tokenFunctions/checkToken')
const nickname = require('./nickname')
const { User } = require('../../models/user')
//const { mapFinderOptions } = require('sequelize/dist/lib/utils')
const { maps } = require('../../models/map')
const { like } = require('../../models/like')

module.exports = async(req,res) => {
   // get: async (req, res) => {
        const userInfo = deletePasswordToken(req)
    if (!userInfo) {
        res.status(401).json({
            message : 'Need login'
        })
    } else {
        //내정보
        try{
        const myData = await User.findOne({
            email: email,
            nickname: nickname,
        })
        //내 지도 목록
        const myMaplist = await maps.findOne({
            user_id: id,
            description: description,
         })
        //내 찜 목록
        const myLike = await like.findOne({
            user_id: id,
            map_id: id,
        })
        const result = {myData , myMaplist , myLike}
        return res.status(200).json({
            data: result
        })
    } catch(err) {
        console.log(err)
    }
    }
    }
//}