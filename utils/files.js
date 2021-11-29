/** @format */

const fs = require("fs");

async function readFiles(filePath) {
  let fileData;
  try {
    fileData = await fs.readFileSync(filePath, "utf-8");
  } catch (error) {
    throw new Error(error);
  }

  return JSON.parse(fileData);
}

function addToFile(item, prop, filePath) {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await readFiles(filePath);
      data[prop].push(item);
      await fs.writeFileSync(filePath, JSON.stringify(data), "utf-8");
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

function validateItem(item) {
  const props = Object.keys(item);
  return props.includes("title") && props.includes("message");
}

function removeItem(array, id) {
  const index = array.findIndex((el) => el.id == id);
  if (index > -1) {
    array.splice(index, 1);
    return array;
  } else {
    throw new Error(404);
  }
}

module.exports = {
  readFiles,
  addToFile,
  validateItem,
  removeItem,
};
