const common = require('./common/common.js');

const handle = async (context, event) => {
    let invoice = event.data;
    invoice.amountPaid = invoice.balance;
    invoice.latency = common.calculateLatency(invoice.latency, event.time);
    return common.createCloudEvent(common.payment(invoice, null));
    
};

module.exports = { handle };