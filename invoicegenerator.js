const common = require('./common/common.js')
const metrics = require('./common/metrics.js');

require('log-timestamp');

const handle = async (context, event) => {
   // console.log(event);
   metrics.update(); 
    const invoice = common.newInvoice(event.data.custID, event.data.amount);
    return common.createCloudEvent(invoice);
};

module.exports = { handle };
