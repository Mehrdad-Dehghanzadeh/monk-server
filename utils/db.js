const path = require('path')
const { readFiles } = require('./files');

async function conectDB() {
    const filePath = path.resolve(__dirname, "../data/db.json");
    return await readFiles(filePath)
}

module.exports = { conectDB }