const fs = require('fs');
const fsProms = require('fs/promises');
const path = require('path');

fs.writeFile(
    path.join(__dirname, 'project-dist', 'bundle.css'),
    '',
    (err) => {
        if(err) throw err;
        console.log('bundle created')
}
);

async function styleBundle(){
    const styleFiles = await fsProms.readdir(path.join(__dirname, 'styles'));
    console.log(styleFiles);
    for await (let styleFile of styleFiles) {
        const fileStat = await fsProms.stat(path.join(__dirname, 'styles', styleFile));
        if(fileStat.isFile()){
            console.log(styleFile + " it's file");
            if(`${styleFile.split('.')[1]}` == 'css'){
                console.log(styleFile + " it's css-file");
                fs.createReadStream(path.join(__dirname, 'styles', styleFile)).on('data', data => {
                    fs.appendFile(path.join(__dirname, 'project-dist', 'bundle.css'), data, (err) => {if(err)throw err; console.log(styleFile + " copied")})
                });
            };
        }
    };
};

styleBundle();