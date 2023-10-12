const metrics = require('./common/metrics.js');
const common = require('./common/common.js');
const { CloudEvent } = require('cloudevents');

metrics.doAudit();

const handle = async (context, event) => {
  let starting = event.data.history["invoice_NEW"];
  let ending = event.data.history["invoice_CLOSED"];
  metrics.updateLatency(starting, ending);

return new CloudEvent({
      source: 'Invoice.Audit',
      type: 'Audit',
      data: { "invoiceID": event.data.invoiceID, "starting": starting, "ending": ending}
    });
};

module.exports = { handle };
