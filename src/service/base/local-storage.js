/**
 * 本地数据存储操作服务
 *
 * - 键值对方式存储
 * - 当某个 key 对应的 value 为 undefined 时（不包括 null），视为该条数据不存在
 */

/**
 * 获取数据
 * @param  {String} key 键
 * @return {Object}     值
 */

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}

export const localStorageService = {
    /**
     * 是否支持本地存储
     * @return {Boolean} [description]
     */
    isSupport: function() {
        try {
            return 'localStorage' in window && window.localStorage !== null;
        } catch (e) {
            return false;
        }
    },

    /**
     * 计算可清除的缓存大小，M单位兆，目前没有数据缓存，可优化点
     * @return {String}   保留2位小数
     */
    calcSize: function() {
        var key, value, chars, result;
        chars = '';
        for (key in window.localStorage) {
            if (
                window.localStorage.hasOwnProperty(key) &&
                key.indexOf('diamond-') > -1
            ) {
                value = window.localStorage[key];
                chars += value;
            }
        }

        result = chars.length * 8 / (1024 * 1024);
        return result.toFixed(2);
    },

    /**
     * 清除缓存
     */
    clear: function() {
        for (var key in window.localStorage) {
            if (
                window.localStorage.hasOwnProperty(key) &&
                key.indexOf('diamond-') > -1
            ) {
                this.removeItem(key);
            }
        }
    },

    /**
     * 判断数据是否存在
     * @param  {String} key     存储的键值
     * @return {Boolean}
     */
    has: function(key) {
        return !!window.localStorage[key];
    },

    /**
     * 设置数据
     * 若 options 存在，则同时存储 cookie
     * @param  {String} key   键
     * @param  {Object} value 值
     * @param  {Object} options 扩展参数 {expires: 7, path: '/', domain: '', secure: ''}
     */
    setItem: function(key, value, options) {
        if (this.isSupport()) {
            if (value === undefined) {
                this.removeItem(key);
            } else {
                // 若value是对象则存储对象，否则存储字符串
                value =
                    typeof value === 'object' ? JSON.stringify(value) : value;
                window.localStorage[key] = value;
            }
        }

        if (options) {
            this.cookie.setItem(key, value, options);
        }
    },

    /**
     * 获取数据
     * 先读 localStorge，不存在则读取 cookie
     * @param  {String} key 键
     * @return {Object}     值
     */
    getItem: function(key) {
        var value;

        if (this.isSupport()) {
            value = window.localStorage[key];
        }

        if (!value) {
            return this.cookie.get(key);
        }

        var result;
        try {
            result = JSON.parse(value);
        } catch (e) {
            result = value;
        }
        return result || undefined;
    },

    /**
     * 移除数据
     * @param  {String} key 键
     * @param  {Object} options 扩展参数 {expires: 7, path: '/', domain: '', secure: ''}
     * @return {Object}     链式对象
     */
    removeItem: function(key, options) {
        if (this.isSupport()) {
            delete window.localStorage[key];
        }
        this.cookie.remove(key, options);
    },

    // 操作 cookies
    cookie: {
        /**
         * 判断是否支持 cookie
         * @return {Boolean} [description]
         */
        isSupport: function() {
            if (window.navigator && window.navigator.cookieEnabled) return true;
            else {
                return false;
            }
        },

        /**
         * 设置数据
         * @param  {String} key     键
         * @param  {Object} value   值
         * @param  {Object} options 扩展参数 {expires: 7, path: '/', domain: '', secure: ''}
         * @return {undefined}
         */
        setItem: function(key, value, options) {
            if (this.isSupport()) {
                $.cookie(key, value, options);
            }
        },

        /**
         * 设置数据
         * @param  {String} key     键
         * @return {undefined}
         */
        get: function(key) {
            if (this.isSupport()) {
                var value;

                if (document.cookie.length > 0) {
                    let cStart = document.cookie.indexOf(key + '=');
                    if (cStart != -1) {
                        cStart = cStart + key.length + 1;
                        let cEnd = document.cookie.indexOf(';', cStart);
                        if (cEnd == -1) cEnd = document.cookie.length;
                        value = unescape(
                            document.cookie.substring(cStart, cEnd)
                        );
                    }
                } else {
                    value = '';
                }

                var result;
                try {
                    result = JSON.parse(value);
                } catch (e) {
                    result = value;
                }
                return result || undefined;
            }
        },

        /**
         * 删除数据
         * @param  {String} key     键
         * @param  {Object} options 扩展参数 {expires: 7, path: '/', domain: '', secure: ''}
         * @return {undefined}
         */
        remove: function(key, options) {
            if (this.isSupport()) {
                // return $.removeCookie(key, options);
                return setCookie(key, '', options);
            }
        }
    }
};
