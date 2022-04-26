
module.exports = {
    registParams: {
      username: { type: 'string', required: true, description: '账户名' },
      password: { type: 'string', required: true, description: '密码' }
    },
    loginParams: {
        username: { type: 'string', required: true, description: '账户名' },
        password: { type: 'string', required: true, description: '密码' }
      }
}