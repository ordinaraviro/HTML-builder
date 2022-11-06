const fs = require('fs/promises');
const path = require('path');

async function myFunc() {
  const files = await fs.readdir(path.join(__dirname, 'secret-folder'));
  for await (let file of files) {
    const st = await fs.stat(path.join(__dirname, 'secret-folder', file))
      if (st.isFile()) {
        console.log(`${file.split('.')[0]} - ${file.split('.')[1]} - ${st.size/1024} kb`);
      }
  }
};

myFunc();