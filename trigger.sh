kn trigger create invoicegenerator-trigger --broker invoicemgr-event-broker --filter type=InvoiceGenRequest --sink ksvc:invoicegenerator
sleep 5
kn trigger create invoiceregister-trigger --broker invoicemgr-event-broker --filter type=invoice.NEW --sink ksvc:invoiceregister
sleep 5
kn trigger create invoicepayment-trigger --broker invoicemgr-event-broker --filter type=invoice.PENDING --sink ksvc:invoicepayment
sleep 5
kn trigger create invoicevalidation-trigger --broker invoicemgr-event-broker --filter type=invoice.PAID --sink ksvc:invoicevalidation
sleep 5
kn trigger create auditwriter-trigger --broker invoicemgr-event-broker --filter type=invoice.CLOSED --sink ksvc:auditwriter
sleep 5
kn trigger list
