const {
    createService,
    allServices,
    singleServices,
    updateServices,
    deleteService
} = require ('../Services/serviceUser.js');

exports.addUsers = (req, res) => {
    var controllerAdd = createService(req.body);

        if(controllerAdd.success === true ){
            res.status(200).send(controllerAdd.body);
        }else{
            res.status(400).send(controllerAdd.error);
    }
 };
exports.viewAllUsers =(req, res) =>{
  var controllerAdd = allServices;
  res.status(200).send(controllerAdd());
};

exports.viewSingleUser =(req,res) =>{
var controllerAdd = singleServices(req.params.id);
if (controllerAdd === false) {
    res.status(400).send("Value doesn't exists");
  } else;
  res.status(200).send(controllerAdd);
};

exports.updateUser = (req,res) =>{
    var controllerAdd = updateServices(req.params.id, req.body);
    if(controllerAdd.success === true) {
        res.status(200).send(controllerAdd.response);
      } else {
        res.status(400).send(controllerAdd.response);
      }
    };
exports.deleteUser =(req,res) =>{
    var controllerAdd = deleteService (req.params.id);
    if(controllerAdd.success === true){
        res.status(200).send(controllerAdd.response);
    }
    else {
        res.status(400).send(controllerAdd.response);
    }
};
