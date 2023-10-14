const common = require('./common/common.js');

const handle = async (context, event) => {
    let invoice = common.register(event.data);
    invoice.latency = common.calculateLatency(invoice.latency, event.time);
    return common.createCloudEvent(invoice);    
};

module.exports = { handle };
