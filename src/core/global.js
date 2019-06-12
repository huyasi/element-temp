(function() {
    'use strict';
    var APP_GL = (window.APP_GL = window.appGlobal = window.appGlobal || {});

    // 应用信息
    APP_GL.appInfo = {
        version: '1.0.0',
        name: ''
    };


    APP_GL.appConfig = {
        // API 服务端发布地址，主数据源
        // domain: 'http://htsec.tigerobo.com',
        // service: 'http://htsec.tigerobo.com',
        // domain: 'http://doc.indesys.net/',
        // service: 'http://doc.indesys.net/',
        domain: '',
        service: '',
    };

})();
