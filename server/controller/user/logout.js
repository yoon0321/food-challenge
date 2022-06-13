//토큰을 검증하는 페이지 작성 필요.
const deletePasswordToken = require('../tokenFunctions/checkToken')


module.exports =async(req,res) =>  {
    const userInfo = deletePasswordToken(req)
    // 토큰을 이용해 로그인 유무를 확인 (단, 사용자 비밀번호는 삭제처리)
    //로그인이 안되어 있는 경우
    if (!userInfo) {
        res.status(401).json({
            message : 'Need login'
        })
    //로그인이 되어 있는 경우
    } else {
        try {
            return res.clearCookie('refreshToken', {
                sameSite: 'none',
                httpOnly : true,
                secure : true,
            })
            .status(200).json({ message : 'logout success'})
        } catch (err) {
            res.status(400).json({ message : 'Bad request'})
        }
    } 
}