const common = require('./common/common.js')
const { CloudEvent } = require('cloudevents');
/**
 * Your CloudEvent handling function, invoked with each request.
 * This example function logs its input, and responds with a CloudEvent
 * which echoes the incoming event data
 *
 * It can be invoked with 'func invoke'
 * It can be tested with 'npm test'
 *
 * @param {Context} context a context object.
 * @param {object} context.body the request body if any
 * @param {object} context.query the query string deserialzed as an object, if any
 * @param {object} context.log logging object with methods for 'info', 'warn', 'error', etc.
 * @param {object} context.headers the HTTP request headers
 * @param {string} context.method the HTTP request method
 * @param {string} context.httpVersion the HTTP protocol version
 * See: https://github.com/knative/func/blob/main/docs/function-developers/nodejs.md#the-context-object
 * @param {CloudEvent} event the CloudEvent
 */
let maxLatency = 0
let counter = 0
let sumlatency = 0
let avgLatency  = 0;

const handle = async (context, event) => {
  counter = counter + 1;
  let starting = event.data.history["invoicegenerator_NEW"];
  let ending = event.data.history["invoicevalidation_CLOSED"];
  let startupDelay = event.data.startuplatency;
  let latency = ending - starting;
  sumlatency = sumlatency + latency;
  if ( latency > maxLatency ) {
      maxLatency = latency;
  }
  if (counter > 100) {
    counter = 0;
    avgLatency = (sumlatency/100);
    sumlatency = 0;
  }
  console.log(event.data.invoiceID + ", avgLatency="+avgLatency + " maxLatency="+ maxLatency+ " startupDelay="+ startupDelay);
 
  return new CloudEvent({
    source: 'Invoice.Audit',
    type: 'Audit',
    data: { "invoiceID": event.data.invoiceID, "avglatency": avgLatency, "maxlatency": maxLatency, " startupDelay": startupDelay}
  });
};

module.exports = { handle };
