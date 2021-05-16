// user controller 
const ctrl = require('./alerts.controller');
// custom joi validation
const {
  joiLogInValidate
} = require('./alerts.validators');

// custom hooks 
const {
} = require('../../hooks');

// exporting the user routes 
function userRoutes() {
  return (open, closed) => {
  };
}

module.exports = userRoutes();
