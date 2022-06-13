const {checkAccessToken, checkRefreshToken} = require('./index')

//1.로그인을 검증하는 상황에서 토큰을 계속 사용해야한다 (사용자의 로그인 여부 판단 및 본인확인을위함)
//2.1을 실행할때 보안이슈로 비밀번호를 계속 삭제해 주어야 하는대 코드에 일일히 적어주면 번거롭기 때문에 
//3.비밀번호를 제거해주는 로직을 작성

module.exports = (req,res) => {
    const accessToken = checkAccessToken(req);
    const refreshToken = checkRefreshToken(req.cookies.refreshToken)
    if (!accessToken && !refreshToken) {
        res.status(404).send('Not Authorization')
    } else if (accessToken) {
        delete accessToken.password
        return accessToken
    } else {
        delete refreshToken.password
        return refreshToken
    }
}