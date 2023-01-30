const express = require ("express");
const fs = require("fs");
const bcrypt = require("bcrypt");
const validator = require("validator");
const { v4: uuidv4 } = require("uuid");

exports.createService =(user)=>{
    if (user.firstName.trim() === "" || !validator.isAlpha(user.firstName) ||
            user.lastName.trim() === "" || !validator.isAlpha(user.lastName) ||
         !validator.isEmail(user.email)){
         return { success: false, error: "Please enter valid data" };
     }
      else if (checkExistingEmail(user.email)) {
         return {success: false, error:"email already exist" }
  }
       else {
            const hash = bcrypt.hashSync(user.password, 10);
            user.password = hash;
            let fileData = readFile();
            console.log("reading");
            user = { id: uuidv4(), ...user};
            fileData.push(user);
            let json = JSON.stringify(fileData);
            fs.writeFile("userData.json", json, (err) => {
                 if (err) {
                console.log("error writing file");
                }
                 else {
                    console.log("user registration successful");
                }
              });
              return {
                success: true,
                body: `Thank You For The Registration ${user.firstName}`,
              };
        }
};
exports.allServices= () =>{
    var responseArray =readFile();
    return responseArray;
};

exports.singleServices =(id)=>{
    const fileData =readFile();
    var result = fileData.find(function(e){
        return e.id === id;
    });
    if (result === undefined) {
        return false;
      } else {
        return result;
      }
    };
    
const readFile = () => {
        const jsonData = fs.readFileSync("userData.json");
        return JSON.parse(jsonData);
    };
const checkExistingEmail = (email) => {
    const fileData = readFile();
    for (let i = 0; i < fileData.length; i++) {
        if (fileData[i].email === email) {
            return true;
        }
    }
};
