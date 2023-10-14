export SCALE_TARGET=150
export SCALE_UTIL_PERC=95
export REQUEST=cpu=500m,memory=512Mi
export LIMIT=cpu=1000m,memory=1024Mi

kn_service_create() {
    echo "DEPLOYING KNATIVE SERVICE $1"
    kn service create $1 --env STARTUP=$1 --image x00159358/invoicemgrimg:latest --pull-policy=IfNotPresent --label app.solution=invoicemgr --request ${REQUEST} --limit ${LIMIT} --scale-metric=rps --scale-target=${SCALE_TARGET} --scale-utilization=${SCALE_UTIL_PERC}
}

echo "Resources Requrested is ${REQUEST} with limit of ${LIMIT}"
echo "Target RPS is ${SCALE_TARGET} and Utilization is ${SCALE_UTIL_PERC}"
echo "Application will scale once TPS is increased over $(($SCALE_TARGET * $SCALE_UTIL_PERC/100)) (i.e scale_target * (scale_utilization/100))"

echo "-------------Deploying Services------------"

kn_service_create invoiceaudit
kn_service_create invoicegenerator
kn_service_create invoiceregister
kn_service_create invoicepayment
kn_service_create invoicevalidation


kn service list
