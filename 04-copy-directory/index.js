const fs = require('fs');
const fsProms = require('fs/promises');
const path = require('path');

async function copyFunc() {
    fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true}, err => {
        if (err)throw err;
        console.log('dir created');
    });
    const files = await fsProms.readdir(path.join(__dirname, 'files'));
    for await (let file of files) {
        const oldPath = path.join(__dirname, 'files', file);
        const newPath = path.join(__dirname, 'files-copy', file);
        fs.copyFile(oldPath, newPath, err => {
            if(err) throw err;
            console.log(`${file} copied`);
        });
    };
};

fs.rm(path.join(__dirname, 'files-copy'), { recursive: true }, err => {
    if(err) {
        console.log("dir not exist")
        copyFunc();
    };
    if(!err){
        console.log('dir deleted');
        copyFunc();
    };
});
