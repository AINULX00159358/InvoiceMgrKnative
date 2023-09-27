const common = require('./common/common.js')
console.log("common ", common)


const handle = async (context, event) => {
    console.log( event);
    let invoice = event.data;
    return common.createCloudEvent(common.validate(invoice));
};

module.exports = { handle };
