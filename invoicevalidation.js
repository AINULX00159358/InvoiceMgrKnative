const common = require('./common/common.js');


const handle = async (context, event) => {
    let invoice = event.data;
    invoice.latency = common.calculateLatency(invoice.latency, event.time);
    return common.createCloudEvent(common.validate(invoice));
};

module.exports = { handle };
