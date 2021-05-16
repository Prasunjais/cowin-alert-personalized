const BaseController = require('../baseController');
const Model = require('./models/alerts.model');
const {
  error,
  info
} = require('../../utils').logging;

// getting the model 
class alertCtrl extends BaseController {
  // constructor 
  constructor() {
    super();
    this.messageTypes = this.messageTypes.alert;
  }

  // do something 
  getStates = async (req, res) => {
    try {
      info('running the controller');

      const resp = {
        status: 200,
        message: 'Its working'
      };

      // success response 
      return this.success(req, res, this.status.HTTP_OK, resp, this.messageTypes.loggedInSuccess);

      // catch any runtime error 
    } catch (e) {
      error(e);
      this.errors(req, res, this.status.HTTP_INTERNAL_SERVER_ERROR, this.exceptions.internalServerErr(req, err));
    }
  }

  // do something else 
  doSomethingElse = async (req, res) => {
    try {
      const resp = {
        status: 200,
        message: 'Its working'
      };

      // success response 
      return this.success(req, res, this.status.HTTP_OK, resp);

      // catch any runtime error 
    } catch (e) {
      error(e);
      this.errors(req, res, this.status.HTTP_INTERNAL_SERVER_ERROR, this.exceptions.internalServerErr(req, err));
    }
  }
}

// exporting the modules 
module.exports = new alertCtrl();
