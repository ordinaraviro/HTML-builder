const path = require('path');
const fs = require('fs');

fs.writeFile(
    path.join(__dirname, 'text.txt'),
    '',
    (err) => {
        if(err) throw err;
}
);

const { stdin, stdout } = process;
console.log("Салют! Введите текст.")
stdin.on('data', x => {
    if(x.toString().trim() == "exit"){
        process.exit();
    }
    fs.appendFile(
    path.join(__dirname, 'text.txt'),
    x,
    (err)=> {
        if(err) throw err;
        console.log('Введите еще что-нибудь.')
    }
)})

process.on('exit', () => stdout.write('Ввод окончен. Всего доброго.'));
process.on('SIGINT', () => process.exit());