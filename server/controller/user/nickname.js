const { User } = require('../../models/user') // 데이터베이스의 models와 연결
const deletePasswordToken = require('../tokenFunctions/checkToken')

module.exports = {
    post: async (req, res) => {
        const { nickname } = req.body
        if (!nickname) {
            res.status(400).json({
                message: '닉네임을 입력하세요'
            })
        }
        //닉네임 중복확인
        const sameNickname = await User.findOne({
            where: {nickname}
        })
        if(sameNickname) { 
            res.status(400).json({
                message: '중복된 닉네임 입니다'
            })
        } else {
            res.status(200).json({
                message: '사용가능한 닉네임 입니다'
            })
        }
    },
    //닉네임 수정시 patch가 오류가 날확률이 적어 패치활용
    patch: async(req, res) => {
        const userInfo = deletePasswordToken(req)
        if (!userInfo) {
            res.status(401).json({
                message: '로그인 상태가 아닙니다'
            })
        } else {
            const correctUser = await User.findOne({
                where: {email: userInfo.email}
            })
            await correctUser.update({
                nickname:req.body.nickname
            })
            res.status(200).json({
                nickname:correctUser.nickname, message: '닉네임이 수정되었습니다'
            })
        }
    }
}