const {
    createService,
    allServices,
    singleServices


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
