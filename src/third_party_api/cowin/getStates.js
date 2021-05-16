// Controller
const request = require('../../utils/request');

// Responses & others utils 
const {
  error,
  info
} = require('../../utils').logging;

// exporting the hooks 
module.exports = async () => {
  try {
    info(`Getting the List of States !`);

    // get the api 
    const getStatesUrl = process.env.cowinGetStateList || 'N/A';

    // check whether the document type already exist or not 
    return request.get(getStatesUrl)
      .set('Content-Type', 'application/json')
      .set('accept', 'application/json')
      .timeout({
        response: 60000, // Wait 10 seconds for the server to start sending,
        deadline: 60000, // but allow 1 minute for the file to finish loading.
      })
      .retry(1)
      .then((res) => {
        // checking whether the user is authentic
        if (res.status === 200 && res.body && res.body.states && Array.isArray(res.body.states)) {
          return {
            success: true,
            data: res.body.states
          };
        } else {
          return {
            success: false
          };
        }
        // catch any runtime error
      }, (err) => {
        error(err);
        if (err.timeout) {
          return {
            success: false,
            error: 'API timeout'
          };
        } else {
          return {
            success: false,
            error: err
          };
        }
      });

    // catch any runtime error 
  } catch (e) {
    error(e);
    return {
      success: false,
      error: e
    };
  }
};
