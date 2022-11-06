const path = require('path');
const fs = require('fs/promises');
const ffs = require('fs')

const files = fs.readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true });
files.then((value)=> {
    value.forEach(el => {
        if (el.isFile()){
            let stat = ffs.statSync(path.join(__dirname, 'secret-folder', el.name))
            console.log(`${el.name.split('.')[0]} - ${el.name.split('.')[1]} - ${stat.size/1024} kb`)
        }
    });
})