const common = require('./common/common.js')
console.log("common ", common)
const startuptime = new Date().now;
let startuplatency = null;

const handle = async (context, event) => {
    if ( startuplatency == null){
        startuplatency = new Date().now - startuptime;
    }   
    console.log(event);
    const invoice = common.newInvoice(event.data.custID, event.data.amount);
    invoice.startuplatency = startuplatency;
    return common.createCloudEvent(invoice);
};

module.exports = { handle };
