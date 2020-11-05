var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');
var schema = require('./schema');
var cfenv = require('cfenv');

const credentials = cfenv.getAppEnv().getService('dna-credentials').credentials;

const zendeskEndpoint = credentials.zendeskEndpoint;
const zendeskUser = credentials.zendeskUser;
const zendeskAPIKey = credentials.zendeskAPIKey;
const zendeskBrandId = credentials.zendeskBrandId;
const zendeskAuth = Buffer.from(zendeskUser + ':' + zendeskAPIKey).toString('base64');

const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Basic ' + zendeskAuth
}

router.options("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*'); // TODO - Limit the allowed origins
  res.header('Access-Control-Allow-Methods', 'POST,PATCH,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.sendStatus(200);
  return;
});

router.use("/*", function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); // TODO - Limit the allowed origins
  res.header('Access-Control-Allow-Methods', 'POST,PATCH,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
});


/**
 * Method check
 */
router.use(async function(req, res, next) {
  const allowedMethods = [
    'post',
    'patch',
    'delete'
  ]

  const method = req.method.toLowerCase();

  console.log(method);

  if(! allowedMethods.includes(method) ) {
    res.status(405).send("Method not allowed");
    return;
  }

  next();
});


/**
 * Backend validation
 */
router.use(async function(req, res, next) {
  var postData;
  var userId;
  const method = req.method.toLowerCase();

  try {
    postData = await schema[method].validate(req.body,{abortEarly: false});
    res.postData = postData;
  }
  catch(err) {
    console.log('validation failed', err);
    res.status(400).send(err.inner);
    return;
  }

  next();
});


/**
 * Create or update Zendesk user
 *
 * Use email address for both name and email so that there's no way to anonymously modify anyone's display name in Zendesk.
 */
router.use(async function(req, res, next) {
  console.log("trying to get user");
  const usersUrl = zendeskEndpoint + 'users/create_or_update.json';
  const userData = { "user": { "name": res.postData.applicantEmail, "email": res.postData.applicantEmail } };

  try {
    const response = await fetch(usersUrl, { method: 'POST', headers: headers, body: JSON.stringify(userData) });
    const response_json = await response.json();
    console.log(response_json);
    console.log("createOrUpdateUser succeeded", response_json.user.id);
    res.zendeskUserId = response_json.user.id;
    next();
  }
  catch(err) {
    console.log("createOrUpdateUser failed", err);
    res.status(500).send(err);
    return;
  }
});


/**
 * POST - Create a new domain name application
 *
 *  - Create or update user account associated with the email address
 *  - Create a ticket
 *  - Zendesk sends confirmation request to the email address
 */
router.post('/domain', async function(req, res, next) {

  console.log('building ticket body');

  const ticketBody = `
    New domain name application.
    ==Applicant Details==
    Applicant name: ${res.postData.applicantName}
    Applicant email: ${res.postData.applicantEmail}
    Applicant phone: ${res.postData.applicantPhone}
    ==Domain Details==
    Domain name: ${res.postData.domainName}
    Stated purpose: ${res.postData.statedPurpose}
    Name servers: 
    ${res.postData.nameServers}
    ==WHOIS Contacts==
    Registrant organisation: ${res.postData.registrantOrganisation}
    Registrant name: ${res.postData.registrantName}
    Registrant email: ${res.postData.registrantEmail}
    Registrant phone: ${res.postData.registrantPhone}
    Registrant city: ${res.postData.registrantCity}
    Registrant state: ${res.postData.registrantState}
    Technical organisation: ${res.postData.technicalOrganisation}
    Technical name: ${res.postData.technicalName}
    Technical email: ${res.postData.technicalEmail}
    Technical phone: ${res.postData.technicalPhone}
    Technical city: ${res.postData.technicalCity}
    Technical state: ${res.postData.technicalState}
    `
    res.ticketData = {
      "ticket": {
        "requester_id": res.zendeskUserId,
        "subject": "New domain application: " + res.postData.domainName,
        "comment": {
          "body": ticketBody
        },
        "type": "task",
        "tags": "create_domain",
        "brand_id": zendeskBrandId
    }
  }

  next();
});


/**
 * PUT
 */
router.put('/domain', async function(req, res, next) {
  res.sendStatus(501); // Not implemented yet
});


/**
 * PATCH
 */
router.patch('/domain', async function(req, res, next) {

  const ticketBody = `
    Domain update request.
    Only fields with data should be updated. Empty fields should remain unchanged.
    ==Applicant Details==
    Applicant name: ${res.postData.applicantName}
    Applicant email: ${res.postData.applicantEmail}
    Applicant phone: ${res.postData.applicantPhone}
    ==Domain Details==
    Domain name(s): 
    ${res.postData.domainName}
    Reason for transfer: ${res.postData.statedPurpose}
    Name servers: 
    ${res.postData.nameServers}
    ==WHOIS Contacts==
    Registrant organisation: ${res.postData.registrantOrganisation}
    Registrant name: ${res.postData.registrantName}
    Registrant email: ${res.postData.registrantEmail}
    Registrant phone: ${res.postData.registrantPhone}
    Registrant city: ${res.postData.registrantCity}
    Registrant state: ${res.postData.registrantState}
    Technical organisation: ${res.postData.technicalOrganisation}
    Technical name: ${res.postData.technicalName}
    Technical email: ${res.postData.technicalEmail}
    Technical phone: ${res.postData.technicalPhone}
    Technical city: ${res.postData.technicalCity}
    Technical state: ${res.postData.technicalState}
    `
    res.ticketData = {
      "ticket": {
        "requester_id": res.zendeskUserId,
        "subject": "Domain update request: " + res.postData.domainName,
        "comment": {
          "body": ticketBody
        },
        "type": "task",
        "tags": "",
        "priority": "urgent",
        "brand_id": zendeskBrandId
    }
  }

  next();
});


/**
 * DELETE
 */
router.delete('/domain', async function(req, res, next) {
  const ticketBody = `
    Domain deletion request.
    ==Applicant Details==
    Applicant name: ${res.postData.applicantName}
    Applicant email: ${res.postData.applicantEmail}
    Applicant phone: ${res.postData.applicantPhone}
    ==Domain Details==
    Domain name: ${res.postData.domainName}
    `
  res.ticketData = {
    "ticket": {
      "requester_id": res.zendeskUserId,
      "subject": "Domain name removal request: " + res.postData.domainName,
      "comment": {
        "body": ticketBody
      },
      "type": "task",
      "tags": "delete_domain",
      "brand_id": zendeskBrandId
    }
  }

  next();
});


/**
 * Create the Zendesk ticket
 */
router.use(async function(req, res, next) {
  try {
    console.log("creating ticket");

    const ticketUrl = zendeskEndpoint + 'tickets.json';
    const ticketResponse = await fetch( ticketUrl, { method: 'POST', headers: headers, body: JSON.stringify(res.ticketData) });
    const ticketResponseJson = await ticketResponse.json();

    console.log( ticketResponseJson );
    res.status(202).send( ticketResponseJson );

    // HTTP 202 (Accepted) - https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/202
  }
  catch(err) {
    console.log('fetch failed', err);
    res.send(err);
  }
});

module.exports = router;