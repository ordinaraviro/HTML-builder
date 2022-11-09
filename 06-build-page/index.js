const fs = require('fs');
const fsProms = require('fs/promises');
const path = require('path');
const { stdout } = process;

fs.mkdir(path.join(__dirname, "project-dist"), { recursive: true}, err => {
    if (err)throw err;
    console.log("project-dist created");
});

// create assets
fs.mkdir(path.join(__dirname, "project-dist", "assets"), { recursive: true}, err => {
    if (err)throw err;
});
fs.mkdir(path.join(__dirname, "project-dist", "assets", "fonts"), { recursive: true}, err => {
    if (err)throw err;
});
fs.mkdir(path.join(__dirname, "project-dist", "assets", "img"), { recursive: true}, err => {
    if (err)throw err;
});
fs.mkdir(path.join(__dirname, "project-dist", "assets", "svg"), { recursive: true}, err => {
    if (err){throw err} else {copyAssets()};
});

async function copyAssets() {
    const fontsFiles = await fsProms.readdir(path.join(__dirname, "assets", "fonts"));
    for await (let file of fontsFiles) {
        const oldPath = path.join(__dirname, "assets", "fonts", file);
        const newPath = path.join(__dirname, "project-dist", "assets", "fonts", file);
        fs.copyFile(oldPath, newPath, err => {
            if(err) throw err;
            console.log(`${file} copied`);
        });
    };
    const imgFiles = await fsProms.readdir(path.join(__dirname, "assets", "img"));
    for await (let file of imgFiles) {
        const oldPath = path.join(__dirname, "assets", "img", file);
        const newPath = path.join(__dirname, "project-dist", "assets", "img", file);
        fs.copyFile(oldPath, newPath, err => {
            if(err) throw err;
            console.log(`${file} copied`);
        });
    };
    const svgFiles = await fsProms.readdir(path.join(__dirname, "assets", "svg"));
    for await (let file of svgFiles) {
        const oldPath = path.join(__dirname, "assets", "svg", file);
        const newPath = path.join(__dirname, "project-dist", "assets", "svg", file);
        fs.copyFile(oldPath, newPath, err => {
            if(err) throw err;
            console.log(`${file} copied`);
        });
    };
};

// components copy
async function copyComponents() {
    let templateData = "";
    const componentsPath = path.join(__dirname, "components");
    const components = await fsProms.readdir(componentsPath);
    fs.createReadStream(path.join(__dirname, "template.html")).on("data", data => {
        templateData += data;
    });
    for await (let component of components) {
        fs.createReadStream(path.join(componentsPath, component)).on("data", data => {
            let componentData = "";
            let componentName = component.split(".")[0];
            let modulToChange = `{{${componentName}}}`;
            componentData += data;
            templateData = templateData.replace(modulToChange, componentData);
            fs.writeFile(path.join(__dirname, "project-dist", "index.html"), templateData, (err) => {
                if(err) throw err;
            });
        });
    };
};

copyComponents();

// 5th task script
fs.writeFile(path.join(__dirname, "project-dist", "style.css"), "", (err) => {
    if(err) throw err;
    console.log('style created')
});

async function styleBundle(){
    const styleFiles = await fsProms.readdir(path.join(__dirname, 'styles'));
    console.log(styleFiles);
    for await (let styleFile of styleFiles) {
        const fileStat = await fsProms.stat(path.join(__dirname, 'styles', styleFile));
        if(fileStat.isFile()){
            // console.log(styleFile + " it's file");
            if(`${styleFile.split('.')[1]}` == 'css'){
                // console.log(styleFile + " it's css-file");
                fs.createReadStream(path.join(__dirname, 'styles', styleFile)).on('data', data => {
                    fs.appendFile(path.join(__dirname, 'project-dist', 'style.css'), data, (err) => {if(err)throw err; console.log(styleFile + " copied")})
                });
            };
        }
    };
};

styleBundle();