echo "Deleteing Services if Exist"
kn service delete auditwriter || true
kn service delete invoicegenerator || true
kn service delete invoiceregister || true
kn service delete invoicepayment || true
kn service delete invoicevalidation || true
sleep 5
echo "Deploying Services"
kn service create auditwriter --env STARTUP=auditwriter --image x00159358/invoicemgrimg:latest --label app.solution=invoicemgr --scale-metric=rps
sleep 5
kn service create invoicegenerator --env STARTUP=invoicegenerator --image x00159358/invoicemgrimg:latest --label app.solution=invoicemgr --scale-metric=rps
sleep 5
kn service create invoiceregister --env STARTUP=invoiceregister --image x00159358/invoicemgrimg:latest --label app.solution=invoicemgr --scale-metric=rps
sleep 5 
kn service create invoicepayment --env STARTUP=invoicepayment --image x00159358/invoicemgrimg:latest --label app.solution=invoicemgr --scale-metric=rps
sleep 5
kn service create invoicevalidation --env STARTUP=invoicevalidation --image x00159358/invoicemgrimg:latest --label app.solution=invoicemgr --scale-metric=rps
sleep 5
kn service list

