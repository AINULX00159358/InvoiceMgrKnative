const metrics = require('./common/metrics.js');
const common = require('./common/common.js');

const handle = async (context, event) => {
    metrics.update();
    let invoice = common.register(event.data);
    return common.createCloudEvent(invoice);    
};

module.exports = { handle };
