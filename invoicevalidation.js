const metrics = require('./common/metrics.js');
const common = require('./common/common.js');


const handle = async (context, event) => {
    metrics.update();
    let invoice = event.data;
    return common.createCloudEvent(common.validate(invoice));
};

module.exports = { handle };
