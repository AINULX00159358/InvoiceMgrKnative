const metrics = require('./common/metrics.js');
const common = require('./common/common.js');

const handle = async (context, event) => {
    metrics.update();
    let invoice = event.data;
    invoice.amountPaid = invoice.balance;
    return common.createCloudEvent(common.payment(invoice, null));
    
};

module.exports = { handle };
