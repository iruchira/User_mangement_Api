
const {
    createService,
} = require ('../Services/serviceUser.js');

exports.addUsers = (req, res) => {
    var controllerAdd = createService(req.body);

        if(controllerAdd.success === true ){
            res.status(200).send(controllerAdd.body);
        }else{
            res.status(400).send(controllerAdd.error);
    }
 };

