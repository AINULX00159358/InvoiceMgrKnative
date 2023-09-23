const common = require('./common/common.js')
console.log("common ", common)

const handle = async (context, event) => {
    
    console.log(event);
    const invoice = common.newInvoice(event.data.custID, event.data.amount);
    return common.createCloudEvent(invoice);
};

module.exports = { handle };
