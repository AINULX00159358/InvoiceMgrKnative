const common = require('./common/common.js')
console.log("common ", common)

const handle = async (context, event) => {
    common.calculateStartup();
    console.log(event);
    let invoice = common.register(event.data);
    return common.createCloudEvent(invoice);    
};

module.exports = { handle };
