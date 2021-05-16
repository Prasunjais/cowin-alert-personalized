const BaseController = require('../baseController');
const Model = require('./models/states.model');
const camelCase = require('camelcase');

const {
  error,
  info
} = require('../../utils').logging;

// getting the model 
class alertCtrl extends BaseController {
  // constructor 
  constructor() {
    super();
    this.messageTypes = this.messageTypes.states;
  }

  // do something 
  getStates = async (req, res) => {
    try {
      info('running the controller');

      // get the state list as required 
      let stateList = req.body.statesList.map((data) => {
        return {
          stateId: data.state_id,
          name: camelCase(data.state_name),
          nameToDisplay: data.state_name,
          status: 1,
          isDeleted: 0
        }
      })

      // inserting into the db 
      for (let i = 0; i < stateList.length; i++) {
        await Model.updateOne({
          stateId: stateList[i].stateId
        }, {
          $set: {
            ...stateList[i]
          }
        }, {
          upsert: true,
          new: true
        });
      }

      // success response 
      return this.success(req, res, this.status.HTTP_OK, stateList, this.messageTypes.fetchedSuccessfully);

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
