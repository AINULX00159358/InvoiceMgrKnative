'use strict'
const { process } = require('process');
const { setInterval } = require('timers');
require('log-timestamp');

const timeToEmitReqInSec = 120;

console.log(process.env.STARTUP, " COLD_START ",  process.uptime(), " SECONDS");

let audit = false;

let totalRequests = 0;
let reqPerSec = 0
let maxReqPerSec = 0;

let maxLatency = 0
let sumlatency = 0
let avgLatency  = 0; 

 function update(){
    totalRequests= totalRequests + 1;
 }

 function calculateReqPerSec(){
    let tempTotalRequests = totalRequests;
    totalRequests = 0;
    reqPerSec = tempTotalRequests / timeToEmitReqInSec;
    if (maxReqPerSec < reqPerSec) {
        maxReqPerSec = reqPerSec;
    }
    console.log("reqPerSec ", reqPerSec , " maxReqPerSec ", maxReqPerSec);
 }

function updateLatency(starting, ending){
    update();
    let latency = ending - starting;
    sumlatency = sumlatency + latency;
    if ( latency > maxLatency ) {
        maxLatency = latency;
    }
}

function doAudit() {
    audit = true;
}

function calculateAvgLatency(){
    if (audit ) {
        avgLatency = (sumlatency/totalRequests);
        sumlatency = 0;
        console.log("AvgE2ELatency="+avgLatency + ", MaxE2ELatency="+ maxLatency);
    }
}

setInterval(function() { 
        calculateAvgLatency(); 
        calculateReqPerSec(); 
    } , timeToEmitReqInSec * 1000)

module.exports = {doAudit, update, updateLatency}