/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {
    mysql:{
      client: {
        host:'localhost',
        port:'',
        // host: '121.89.207.81',
        // port: '3306',
        user: 'root',
        password: 'Kxy940831',
        database: 'cost'
      }
    }
  };
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true
    },
    domainWhiteList: ['*']
  };
  config.cors = {
    origin: '*',
    credentials: true, // 允许 Cookie 跨域跨域
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
  };
  config.logger = {
    disableConsoleAfterReady: false,
  };
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1648102183172_2119';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    uploadDir: 'app/public/upload'
  };
  config.jwt = {
    secret: 'Nick',
  };
  config.multipart = {
    mode:'file'
  }
  return {
    ...config,
    ...userConfig,
  };
};
