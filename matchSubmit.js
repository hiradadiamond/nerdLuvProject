var fs = require("fs");
var submit = function (req, res, mycallback) {
  var login = false;
  var favoriteOs;
  fs.readFile("singles.txt", "utf-8", function (err, data) {
    if (err) throw err;
    console.log("success");
    let arr = data.split(/\r?\n/);
    arr.forEach((line, idx) => {
      if (line.includes(req.body.name)) {
        let arrStr = arr[idx].split(",");
        findMatch(arrStr, req.body.name, function (err, data) {
          if (err) throw err;
          mycallback(null, data);
        });
      }
    });
  });
};
var findMatch = function (arrStr, user, mycallback) {
  var output = [];
  fs.readFile("singles.txt", "utf-8", function (err, data) {
    if (err) throw err;
    let arr = data.split(/\r?\n/);
    arr.forEach((line, idx) => {
      let dataSplit = arr[idx].split(",");
      console.log(dataSplit + "DataSplit");
      console.log(arrStr + "ArrSplit");
      if (
        dataSplit[4] == arrStr[4] &&
        dataSplit[1] != arrStr[1] &&
        dataSplit[0] != arrStr[0] &&
        commonChar(dataSplit[3], arrStr[3]) >= 1 &&
        parseInt(dataSplit[5]) >= parseInt(arrStr[5]) &&
        parseInt(dataSplit[6]) <= parseInt(arrStr[6])
      ) {
        let curLine = {
          name: dataSplit[0],
          gender: dataSplit[1],
          age: dataSplit[2],
          type: dataSplit[3],
          os: dataSplit[4],
          minAge: dataSplit[5],
          maxAge: dataSplit[6],
        };
        console.log(curLine);
        output.push(curLine);
      }
    });
    mycallback(null, output);
  });
};
function commonChar(str1, str2) {
  let count = 0;
  const splitStr2 = str2.split("");
  for (str of str1) {
    let idx = splitStr2.findIndex((s) => s === str);
    if (idx >= 0) {
      count++;
      splitStr2.splice(idx, 1);
    }
  }
  return count;
}

exports.match = findMatch;
exports.matches = submit;
