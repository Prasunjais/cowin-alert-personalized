// user controller 
const ctrl = require('./states.controller');
// custom joi validation
const {
  joiLogInValidate
} = require('./states.validators');

// custom hooks 
const {
  getTheStatesList, // get the list of states  
} = require('../../hooks');

// exporting the user routes 
function userRoutes() {
  return (open, closed) => {
    closed.route('/cowin/states').get(
      getTheStatesList, // get the list of states 
      ctrl.getStates // controller function 
    );
  };
}

module.exports = userRoutes();
