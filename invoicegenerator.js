const common = require('./common/common.js')

const handle = async (context, event) => {
    const invoice = common.newInvoice(event.data.custID, event.data.amount);
    invoice.latency = common.calculateLatency(invoice.latency, event.time);
    return common.createCloudEvent(invoice);
};

module.exports = { handle };
