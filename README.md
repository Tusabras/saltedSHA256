# UCAM - CONVERT MD5 to Salted SHA256 
[![Creative Commons License](https://i.creativecommons.org/l/by/3.0/80x15.png)](https://creativecommons.org/licenses/by/3.0/)


## Install
```
npm install
```

## Usage
```
node main.js
```

## Project structure
```
    - utils: contains reusable functions. 
    - seed: contains code that inits the app files.
    - assets: contains the assets of the app.
main.js: main execution file.
```

## Result
```
Un fichero [plain.txt] que contenga las contraseñas en plano que se hayan podido revertir (dejando líneas en blanco, para aquellas que no)
```

```
Un fichero [new_passwords.txt] que contenga los hashes de las nuevas contraseñas ya resumidas y hasheadas (dejando nuevamente líneas en blanco, para aquellas que no se hayan podido calcular)
```

```
En el main se puede ver todo programa o script utilizado (si existe) para automatizar el proceso de conversión de contraseñas en MD5 y la generación de los ficheros solicitados.
```
