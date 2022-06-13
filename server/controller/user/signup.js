const { User } = require('../../models/user') //이부분은 데이터베이스를 받으면 수정이 필요함.
const bcrypt = require('bcrypt')
const saltRounds = 10

module.exports = async(req,res) =>  {
   // post:(req, res) =>{
        const {email, password, nickname } = req.body;
    if (!email || !password || !nickname) {
        res.status(400).json({
            message: 'email, password, nickName을 확인해 주세요'
        })
    } else {
        bcrypt.hash(password, saltRounds, async (err, hash) => {
            try {
                await User.create({
                    email: email,
                    password: password,
                    nickname: nickname,
                })
                res.status(201).json({
                    message: '회원가입이 되었습니다'
                })
            } catch (err) {
                res.status(400).json({
                    message: '올바른 정보를 입력해주세요'
                })
            }
        })
    }
    }
//}