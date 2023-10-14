const { CloudEvent } = require('cloudevents');
const common = require('./common/common.js')

const handle = async (context, event) => {
  let starting = event.data.history["invoice_NEW"];
  let ending = event.data.history["invoice_CLOSED"];
  let maxLatency = common.calculateLatency(event.data.latency, event.time);
return new CloudEvent({
      source: 'Invoice.Audit',
      type: 'Audit',
      data: { "invoiceID": event.data.invoiceID, "starting": starting, "ending": ending, "maxlatency": maxLatency}
    });
};

module.exports = { handle };
