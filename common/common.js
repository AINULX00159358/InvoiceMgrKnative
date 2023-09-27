
'use strict'
const { CloudEvent, HTTP } = require('cloudevents')
const { v4: uuidv4 } = require('uuid');

const source = 'urn:event:from:invoice';
const type = 'invoice';
const serviceName = process.env.STARTUP;

const invoiceTemplate = {
       'custID': null,
       'amount': null,
       'dateCreated': null,
       'amountPaid': null,
       'dateDue': null,
       'datePaid': null,
       'invoiceID': null,
       'paymentID': null,
       'status': null,
       'balance': null,
       'startuplatency': null,
       'history': {}
    };

const paymentTemplate = {
    'custID': null,
    'invoiceID': null,
    'amountPaid': null,
    'paymentID': null
}


function updatetHistory(invoice) {
    let history = invoice.history;
    history[serviceName+"_"+invoice.status] = Date.now();
    invoice.history = history;
    return invoice;
}

function createCloudEventResponse(invoice){
    return HTTP.binary(createCloudEvent(invoice));
}

function createCloudEvent(invoice){
    return new CloudEvent({
       id: invoice.invoiceID || invoice.clientID,
       type: type + "." + invoice.status,
       source: source + "/" + invoice.status,
       data: updatetHistory(invoice),
       subject: "invoice-"+ ( invoice.status || "UNKNOWN" ),
       time: new Date().toISOString()
      });
}


function createJsonResponse(invoice){
     return {
            "specversion" : "1.0",
            "id" : uuidv4(),
            "type" : type + "." + invoice.status,
            "source" : source + "/" + invoice.status,
            "subject" : "invoice-"+ ( invoice.status || "UNKNOWN" ),
            "time" : new Date().toISOString(),
            "data" : updatetHistory(invoice)
     };
}

function createJsonPayment(invoice, amount){
    invoice.status = "NEW-PAYMENT";
    invoice.datePaid = new Date().toISOString();
    invoice.amountPaid = amount;
     return {
            "specversion" : "1.0",
            "id" : uuidv4(),
            "type" : 'invoicePayment',
            "source" : source + "/payment",
            "subject" : "invoice-payment",
            "time" : new Date().toISOString(),
            "data" : updatetHistory(invoice)
     };
}

function newInvoice(custID, amount) {
      let newInvoice = Object.assign({}, invoiceTemplate);
      newInvoice.custID = custID;
      newInvoice.amount = amount;
      newInvoice.balance = amount;
      newInvoice.dateCreated = new Date().toISOString();
      newInvoice.status = 'NEW';
     return newInvoice;
};

function register(invoice) {
    let newInvoice = Object.assign({}, invoice);
    newInvoice.status = 'PENDING';
    newInvoice.invoiceID = uuidv4();
    newInvoice.dateDue = new Date().toISOString();
    return newInvoice;
};

function payment(invoice, paymentID)  {
    let newInvoice = Object.assign({}, invoice);
    newInvoice.status = 'PAID';
    newInvoice.balance = newInvoice.amount - newInvoice.amountPaid ;
    newInvoice.datePaid = new Date().toISOString();
    newInvoice.paymentID = paymentID || uuidv4();
    return newInvoice
}

function validate(invoice)  {
    let newInvoice = Object.assign({}, invoice);
    newInvoice.status = 'CLOSED';
    if (newInvoice.balance > 0 ){
        newInvoice.status = 'PENDING';
    }
    return newInvoice
}

 
module.exports = { newInvoice, register, payment, createCloudEventResponse, createJsonResponse, createJsonPayment, validate, createCloudEvent  }