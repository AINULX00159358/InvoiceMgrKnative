kn service create auditwriter --env STARTUP=auditwriter --image x00159358/invoicemgrimg:latest --label app.solution=invoicemgr --request memory=256Mi,cpu=250m --limit cpu=250m,memory=256Mi --scale-metric=rps
sleep 5
kn service create invoicegenerator --env STARTUP=invoicegenerator --image x00159358/invoicemgrimg:latest --label app.solution=invoicemgr --request memory=256Mi,cpu=250m --limit cpu=250m,memory=256Mi --scale-metric=rps
sleep 5
kn service create invoiceregister --env STARTUP=invoiceregister --image x00159358/invoicemgrimg:latest --label app.solution=invoicemgr --request memory=256Mi,cpu=250m --limit cpu=250m,memory=256Mi --scale-metric=rps
sleep 5 
kn service create invoicepayment --env STARTUP=invoicepayment --image x00159358/invoicemgrimg:latest --label app.solution=invoicemgr --request memory=256Mi,cpu=250m --limit cpu=250m,memory=256Mi --scale-metric=rps
sleep 5
kn service create invoicevalidation --env STARTUP=invoicevalidation --image x00159358/invoicemgrimg:latest --label app.solution=invoicemgr --request memory=256Mi,cpu=250m --limit cpu=250m,memory=256Mi --scale-metric=rps
sleep 5
kn service list
