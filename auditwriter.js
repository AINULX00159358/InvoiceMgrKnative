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
const handle = async (context, event) => {
  let starting = event.data.history["invoicegenerator_NEW"];
  let ending = event.data.history["invoicevalidation_CLOSED"];
  let latency = ending - starting;
  console.log(event.data.invoiceID + ", latency="+latency);
 
  return new CloudEvent({
    source: 'Invoice.Audit',
    type: 'Audit',
    data: event.data 
  });
};

module.exports = { handle };
