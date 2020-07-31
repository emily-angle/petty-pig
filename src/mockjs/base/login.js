export default[
    {
        url: '/account/login',
        type: 'post',
        response: config => {
            return {
                message: "登陆成功",
                status: 1
            }
        }
    }
]