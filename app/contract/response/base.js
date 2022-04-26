'use strict';

module.exports = {
  // 测试模块
  testResponse: {
    code:{type:'number'},
    message: { type: 'string' }
  },
  loginResponse: {
    code:{type:'number'},
    message: { type: 'string' },
  },
  userInfoResponse:{
      code:{type:'number'},
      message: { type: 'string' },
      data: { type: 'object' }
  }
};