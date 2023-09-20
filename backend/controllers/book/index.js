const createActions = require("./create");
const readActions= require("./read");
const updateActions = require("./update");
const deleteActions = require("./delete");

module.exports = {
    ...createActions,
    ...readActions,
    ...updateActions,
    ...deleteActions,
};
