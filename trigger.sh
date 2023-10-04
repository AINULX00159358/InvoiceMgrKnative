kn trigger create invoicegenerator-trigger --broker invoicemgr-event-broker --filter type=InvoiceGenRequest --sink invoicegenerator
sleep 5
kn trigger create invoiceregister-trigger --broker invoicemgr-event-broker --filter type=invoice.NEW --sink invoiceregister
sleep 5
kn trigger create invoicepayment-trigger --broker invoicemgr-event-broker --filter type=invoice.PENDING --sink invoicepayment
sleep 5
kn trigger create invoicevalidation-trigger --broker invoicemgr-event-broker --filter type=invoice.PAID --sink invoicevalidation
sleep 5
kn trigger create auditwriter-trigger --broker invoicemgr-event-broker --filter type=invoice.CLOSED --sink auditwriter
sleep 5
kn trigger list
