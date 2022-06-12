// TODO: import module bila dibutuhkan di sini
const fs = require('fs');

// ! JANGAN DIMODIFIKASI
let file1 = "./data1.json";
let file2 = "./data2.json";
let file3 = "./data3.json";

// ! JANGAN DIMODIFIKASI
let modifyFile1 = (val) => {
  file1 = val;
};
let modifyFile2 = (val) => {
  file2 = val;
};
let modifyFile3 = (val) => {
  file3 = val;
};

// TODO: Kerjakan bacaData
// gunakan variabel file1, file2, dan file3
const fileResult = data => {
  let result;
  let parseData = data ? JSON.parse(data) : {}

  result = parseData.message || ''

  if (Array.isArray(parseData) && parseData.length) {
    for (const item of parseData) {
      result = item.data ? item.data.message : item.message
    }
  }

  result = String(result).split(' ')[1]

  return result
}

const bacaData = fnCallback => {
  const files = [file1, file2, file3];
  let store = []

  for (const file of files) {
    let fileProcess = new Promise((resolve, reject) => {
      fs.readFile(file, (err, data) => {
        if (err) {
          reject(err)
        }
        resolve(fileResult(data))
      })
    })
    store.push(fileProcess)

  }

  Promise.all(store)
    .then(res => fnCallback(null, res))
    .catch(err => fnCallback(err, null))

}

// ! JANGAN DIMODIFIKASI
module.exports = {
  modifyFile1,
  modifyFile2,
  modifyFile3,
  bacaData,
};
