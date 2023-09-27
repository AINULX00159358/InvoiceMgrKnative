const common = require('./common/common.js')
console.log("common ", common)

const handle = async (context, event) => {
    common.calculateStartup();
    console.log(event);
    let invoice = event.data;
    invoice.amountPaid = invoice.balance;
    return common.createCloudEvent(common.payment(invoice, null));
    
};

module.exports = { handle };
