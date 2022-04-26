'use strict';

const Controller = require('egg').Controller;
const defaultAvatar = 'http://s.yezgea02.com/1615973940679/WeChat77d6d2ac093e247c361f0b8a7aeb6c2a.png';
/**
 *  笔记路由note
 * @Controller 
 */
class UserController extends Controller {
    /**
     * @summary 注册
     * @description 注册
     * @Router post /api/user/register
     * @request body registParams *body
     * @response 200 testResponse 
    * */
    async register(){
        const { ctx } = this;
        const { username, password } = ctx.request.body;
        if (!username || !password) {
            ctx.body = {
              code: 500,
              msg: '账号密码不能为空',
              data: null
            }
            return
        }
        const userInfo = await ctx.service.user.getUserByName(username) // 获取用户信息
        if (userInfo && userInfo.id) {
            ctx.body = {
              code: 500,
              msg: '账户名已被注册，请重新输入',
              data: null
            }
            return
        }
        const result = await ctx.service.user.register({
            username,
            password,
            signature: '世界和平。',
            avatar: defaultAvatar
        });
        if (result) {
            ctx.body = {
              code: 200,
              msg: '注册成功',
              data: null
            }
          } else {
            ctx.body = {
              code: 500,
              msg: '注册失败',
              data: null
            }
          }
    }
    /**
     * @summary 登陆
     * @description 登陆
     * @Router post /api/user/login
     * @request body loginParams *body
     * @response 200 testResponse 
    * */
    async login(){
        const { ctx, app } = this;
        const { username, password } = ctx.request.body;
        const userInfo = await ctx.service.user.getUserByName(username);
        if(!userInfo){
            ctx.body = {
                code:-1,
                msg:'账号不存在',
                data:null
            }
        }
        if (userInfo && password != userInfo.password) {
            ctx.body = {
              code: -1,
              msg: '账号密码错误',
              data: null
            }
            return
        }
        const token = app.jwt.sign({
            id: userInfo.id,
            username: userInfo.username,
            exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // token 有效期为 24 小时
          }, app.config.jwt.secret);
          
          ctx.body = {
            code: 200,
            message: '登录成功',
            data: {
              token
            },
        };
    }

    async test() {
        const { ctx, app } = this;
        const token = ctx.request.header.authorization; // 请求头获取 authorization 属性，值为 token
        // 通过 app.jwt.verify + 加密字符串 解析出 token 的值 
        const decode = await app.jwt.verify(token, app.config.jwt.secret);
        // 响应接口
        ctx.body = {
            code: 200,
            message: '获取成功',
            data: {
                ...decode
            }
        }
    }
    /**
     * @summary 登陆
     * @description 登陆
     * @Router get /api/user/getUserInfo
     * @request header string authorization token值
     * @response 200 userInfoResponse 
    * */
    async getUserInfo(){
        const { ctx, app } = this;
        const token = ctx.request.header.authorization;
        const decode = await app.jwt.verify(token,app.config.jwt.secret);
        
        const res = await ctx.service.user.getUserByName(decode.username);
        ctx.body = {
            code: 200,
            msg: 'success',
            data: res
        }
    }

    async editUserInfo(){
        const { ctx, app } = this;
        const { signature = '' } = ctx.request.body;
        try{
            let user_id;
            const token = ctx.request.header.authorization;
            const decode = await app.jwt.verify(token,app.config.jwt.secret);
            if (!decode) return
            user_id = decode.id;
            const userInfo = await ctx.service.user.getUserByName(decode.username)
            const result = await ctx.service.user.editUserInfo({
                ...userInfo,
                signature
            });
            ctx.body = {
                code: 200,
                msg: '请求成功',
                data: {
                  id: user_id,
                  signature,
                  username: userInfo.username
                }
            }
        }catch(error){
            console.log(error);
            return null;
        }
    }
}

module.exports = UserController;
