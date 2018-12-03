const { handleError } = require('./utils/errorHandler');
const { writeFileAsync, createReadStream } = require('./utils/file');
const { encryptToSaltedSHA256 } = require('./utils/sha256');
const { wordlist } = require('./seed/wordlist');
const es = require('event-stream');

wordlist().then(md5HashesObj => {
    let newContentPlainPasswords = '';
    let newContentHashedPasswords = '';
    var lineNr = 0;
    var s = createReadStream('./assets/txt/passwords.txt')
        .pipe(es.split(' '))
        .pipe(es.mapSync(async (line) => {
            try {
                console.time("Read entire file")
                // pause the readstream
                s.pause();

                // process line here and call s.resume() when ready
                
                // Miramos si tenemos el MD5 en nuestra lista de hashes, 
                // si existe miramos que valor tiene y lo añadimos.
                let newLinePlainPasswords = '';
                let newLineHashedPasswords = '';
                if(md5HashesObj[line]) {
                    newLinePlainPasswords = md5HashesObj[line];
                    // como salt variable añadimos el número de la linea de ese usuario,
                    // aunque lo ideal seria añadir el e-mail o nombre usuario de la contraseña.
                    newLineHashedPasswords = encryptToSaltedSHA256(line, lineNr);
                }
                newLinePlainPasswords += '\n';
                newLineHashedPasswords += '\n';


                // resume the readstream, possibly from a callback
                s.resume();

                newContentPlainPasswords += newLinePlainPasswords;
                newContentHashedPasswords += newLineHashedPasswords;
                lineNr += 1;
            } catch (e) {
                handleError(e);
            }
        })
        .on('error', (err) => {
            handleError('Error while reading file.', err)
        })
        .on('end', async () => {
            try {
                const filePathToPlainPasswords = './plain.txt';
                await writeFileAsync(filePathToPlainPasswords, newContentPlainPasswords);
                const filePathToEncriptedPasswords = './new_passwords.txt';
                await writeFileAsync(filePathToEncriptedPasswords, newContentHashedPasswords);
            } catch (e) {
                handleError(e);
            } finally {
                console.timeEnd("Read entire file")
            }
        })
    );
})
