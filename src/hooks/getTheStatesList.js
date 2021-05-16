// third party controller 
const {
  getStates, // get states list 
} = require('../third_party_api/cowin');

// Responses & others utils 
const Response = require('../responses/response');
const StatusCodes = require('../facades/response');
const MessageTypes = require('../responses/types');
const Exceptions = require('../exceptions/Handler');
const _ = require('lodash');
const {
  error,
  info
} = require('../utils').logging;

// exporting the hooks 
module.exports = async (req, res, next) => {
  try {
    info('Get the List of States !');

    // getting all the states
    let listOfStates = await getStates(); // get the list of states from cowin 

    // if state list fetched 
    if (listOfStates.success) {
      info('State List Fetched from Cowin Server !');
      req.body.statesList = listOfStates.data;
    } else {
      error('Error while fetching States List from Cowin Server !');
    }

    // move on 
    return next();

    // catch any runtime error 
  } catch (e) {
    error(e);
    return Response.errors(req, res, StatusCodes.HTTP_INTERNAL_SERVER_ERROR, Exceptions.internalServerErr(req, e));
  }
};
