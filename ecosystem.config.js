module.exports = {
  apps: [{
    name: 'Cowin Alert Vaccination',
    script: '.server.js',
    watch: false,
    env: {
      'watch': false,
      'PORT': 3030,
      'NODE_ENV': 'development',
      'cowinGetStateList': 'https://cdn-api.co-vin.in/api/v2/admin/location/states',
      'cowinGetDistrictList': 'https://cdn-api.co-vin.in/api/v2/admin/location/districts/',
      'cowinGetSlotsAvailable': 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/calendarByDistrict'
    },
    env_staging: {
      'watch': false,
      'PORT': 3030,
      'NODE_ENV': 'staging',
      'cowinGetStateList': 'https://cdn-api.co-vin.in/api/v2/admin/location/states',
      'cowinGetDistrictList': 'https://cdn-api.co-vin.in/api/v2/admin/location/districts/',
      'cowinGetSlotsAvailable': 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/calendarByDistrict'
    },
    env_production: {
      'watch': false,
      'PORT': 3030,
      'NODE_ENV': 'production',
      'cowinGetStateList': 'https://cdn-api.co-vin.in/api/v2/admin/location/states',
      'cowinGetDistrictList': 'https://cdn-api.co-vin.in/api/v2/admin/location/districts/',
      'cowinGetSlotsAvailable': 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/calendarByDistrict'
    }
  }]
};
