var fs = require('fs');
var submit = function(req, res,mycallback){
    var name = req.body.name;
    var gender = req.body.gender;
    var age = req.body.age;
    var personalitytype = req.body.personalitytype;
    var favoriteOs = req.body.favoriteOs;
    var seekingAgemin = req.body.seekingAgemin;
    var seekingAgemax = req.body.seekingAgemax;
    var data = name + ", " + gender + ", "+ age + ", " + personalitytype + ", "+ favoriteOs + ", "+ seekingAgemin + ", "+ seekingAgemax + "\n";
    if(name!=null && gender != null && age != null && personalitytype!= null && favoriteOs!= null && seekingAgemin!= null && seekingAgemax!= null){
        fs.appendFile('singles.txt', data,function(err){
            console.log(err);
            if(err) mycallback(null,err);
            console.log("successfully append");
            mycallback("success",null);
        });   
    }
};
exports.formSubmit = submit;