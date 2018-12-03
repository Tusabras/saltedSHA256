const { handleError } = require('../utils/errorHandler');
const { writeFileAsync, createReadStream } = require('../utils/file');
const { encryptToMD5 } = require('../utils/md5');

const es = require('event-stream');

exports.wordlist = function () {
    return new Promise((resolve, reject) => {
        let newContent = '';
        let md5HashesObj = {};
        var s = createReadStream('./assets/txt/wordlist.txt')
            .pipe(es.split())
            .pipe(es.mapSync(async (line) => {
                try {
                    console.time("Read entire file")
                    // pause the readstream
                    s.pause();
                    // process line here and call s.resume() when ready
                    let newLine = encryptToMD5(line);

                    // resume the readstream, possibly from a callback
                    s.resume();

                    newContent += `${newLine}\n`;
                    md5HashesObj[newLine] = line;
                } catch (e) {
                    handleError(e);
                }
            })
            .on('error', (err) => {
                handleError('Error while reading file.', err)
            })
            .on('end', async () => {
                try {
                    const filePathToMD5Wordlist = './assets/txt/hashedWordlist.txt';
                    await writeFileAsync(filePathToMD5Wordlist, newContent);

                    resolve(md5HashesObj);
                } catch (e) {
                    reject(e)
                    handleError(e);
                } finally {
                    console.timeEnd("Read entire file")
                }
            })
        )
    });
}

