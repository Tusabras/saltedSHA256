const CryptoJS = require('crypto-js');

function saltedSHA256(value, variableSalt) {
    const fixedSalt = 'campus256';
    return CryptoJS.SHA256(`${fixedSalt}${variableSalt}${value}`).toString();
}

exports.encryptToSaltedSHA256 = function(line, variableSalt) {
    try {
        return saltedSHA256(line);
    } catch (e) {
        handleError(e);
    }
}