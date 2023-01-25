const fs = require("fs");
const validator = require("validator");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

exports.addUsers = (req, res) => {
    let userDetails = req.body;
    if (userDetails.firstName.trim() === "" || !validator.isAlpha(userDetails.firstName) ||
        userDetails.lastName.trim() === "" || !validator.isAlpha(userDetails.lastName) ||
        !validator.isEmail(userDetails.email)) {
        res.status(400).send("Please send valid data");
    }
    else if (checkExistingEmail(userDetails.email)) {
        res.status(400).send("email already exist");
    }
    else {
        const hash = bcrypt.hashSync(userDetails.password, 10);
        userDetails.password = hash;
        let fileData = readFile();
        console.log("reading");
        userDetails = { id: uuidv4(), ...userDetails };
        fileData.push(userDetails);
        let json = JSON.stringify(fileData);
        fs.writeFile("userData.json", json, (err) => {
            if (err) {
                res.status(204);
            }
            else {
                console.log("user registration successful");
                res.status(200).send("Thank you for Registration...");
            }
        });
    }
};

exports.viewAllUsers = (req, res) => {
    res.send(readFile());
}

exports.viewSingleUser = (req, res) => {
    const fileData = readFile();
    const { id } = req.params;
    const findId = (userDetails) => {
        return userDetails.id === id;
    };
    var checkId = fileData.find(findId);
    if (checkId === undefined) {
        res.status(404).send("id not found");
    }
    else {
        res.send(checkId);
    }
}
exports.updateUser = (req, res) => {
    const { id } = req.params;
    const fileData = readFile();
    updatedetails = req.body;
    const findId = (userDetails) => {
        return userDetails.id === id;
    };
    var checkId = fileData.find(findId);
    if (checkId === undefined) {
        res.status(404).send("id not found");
    } else {
        checkId.firstName = updatedetails.firstName;
        checkId.lastName = updatedetails.lastName;
        checkId.email = updatedetails.email;
        const hash = bcrypt.hashSync(updatedetails.password, 10);
        checkId.password = hash;
        checkId.gender = updatedetails.gender;
        checkId.address = updatedetails.address;
        checkId.date_of_birth = updatedetails.date_of_birth;
        checkId.contactNo = updatedetails.contactNo;
        let filteredUsers = fileData.filter((file) => file.id !== id);
        filteredUsers.push(checkId);
        let json = JSON.stringify(filteredUsers);
        fs.writeFile("userData.json", json, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log(`User Data Updated ${req.params.id}`);
                res.status(200).send(`Data updated for id ${req.params.id}`);
            }
        });
    }
}
exports.deleteUser = (req,res)=>{
const {id} = req.params;
const fileData = readFile();
let filteredUsers = fileData.filter((file) => file.id !== id);
let json = JSON.stringify(filteredUsers);
fs.writeFile("userData.json",json,(err)=>{
    if (err) {
        console.log("err deleting id");
      } else {
        console.log("User Deleted");
        res.status(200).send(`User with ${id} is deleted`);
      }
});
};
const checkExistingEmail = (email) => {
    const fileData = readFile();
    for (let i = 0; i < fileData.length; i++) {
        if (fileData[i].email === email) {
            return true;
        }
    }
}
const readFile = () => {
    const jsonData = fs.readFileSync("userData.json");
    return JSON.parse(jsonData);
};
