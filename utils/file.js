const fs = require('fs');

exports.createReadStream = function(filePath) {
    return fs.createReadStream(filePath);
} 
exports.writeFileAsync = function (filePath, content) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, content, err => {
            if(err) reject(e);
            resolve("uploaded!")
        });
    })
}