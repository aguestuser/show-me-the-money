const uuid = require('uuid');
const helpers = {};

helpers.generateId = () => uuid.v4();

module.exports = helpers;
