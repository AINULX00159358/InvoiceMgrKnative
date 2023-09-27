kn service create auditwriter --env STARTUP=auditwriter --image x00159358/invoicemgrimg --tag @latest
sleep 5
kn service create invoicegenerator --env STARTUP=invoicegenerator --image x00159358/invoicemgrimg --tag @latest
sleep 5
kn service create invoiceregister --env STARTUP=invoiceregister --image x00159358/invoicemgrimg --tag @latest
sleep 5 
kn service create invoicepayment --env STARTUP=invoicepayment --image x00159358/invoicemgrimg --tag @latest
sleep 5
kn service create invoicevalidation --env STARTUP=invoicevalidation --image x00159358/invoicemgrimg --tag @latest
sleep 5
kn service list
