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
    mysql: {
      client: {
        // host:'localhost',
        host: '121.89.207.81',
        port: '3306',
        user: 'root',
        password: 'Kxy940831',
        database: 'cost',
      },
    },
  };
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: [ '*' ],
  };
  config.cors = {
    origin: '*',
    credentials: true, // 允许 Cookie 跨域跨域
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
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
    uploadDir: 'app/public/upload',
  };
  config.jwt = {
    secret: 'Nick',
  };
  config.multipart = {
    mode: 'file',
  };
  config.swaggerdoc = {
    dirScanner: './app/controller', // 插件扫描的文档路径
    apiInfo: {
      title: 'swagger文档',
      description: 'egg.js swagger-demo文档',
      version: '1.0.0',
    },
    consumes: [ 'application/json', 'multipart/form-data' ], // 指定处理请求的提交内容类型（Content-Type），例如application/json, text/html
    produces: [ 'application/json', 'multipart/form-data' ], // 指定返回的内容类型，仅当request请求头中的(Accept)类型中包含该指定类型才返回
    schemes: [ 'http', 'https' ],
    routerMap: true, // 是否自动生成route
    enable: true,
  };

  config.cluster = {
    listen: {
      path: '',
      port: 7001,
      hostname: '0.0.0.0',
      host: 'http://121.89.207.81',
    },
  };
  return {
    ...config,
    ...userConfig,
  };
};
