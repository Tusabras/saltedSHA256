const CryptoJS = require('crypto-js');

function md5(value) {
    return CryptoJS.MD5(value).toString();
}

exports.encryptToMD5 = function(line) {
    try {
        return md5(line);
    } catch (e) {
        handleError(e);
    }
}