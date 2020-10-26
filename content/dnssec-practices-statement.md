---
path: /dnssec-practices-statement
title: DNSSEC Practices Statement (DPS)
type: standard
metaDesc: DNSSEC Practices Statement (DPS)
---
<div class="container-fluid">
  <div class="row">

# DNSSEC Practices Statement (DPS)

Table of contents
1. [Introduction](#introduction)</a>
2. [Publication and Repositories](#publication-and-repositories)
3. [Operational Requirements](#operational-requirements)
4. [Facility, Management and Operational Controls](#facility-management-and-operational-controls)
5. [Technical Security Controls](#technical-security-controls)
6. [Zone Signing](#zone-signing)
7. [Compliance Audit](#compliance-audit)
8. [Legal Matters](#legal-matters)

-------
[Back to top](#top)


## Introduction
A Domain Name System Security Extension (DNSSEC) Policy and Practice Statement (DPS) defines the policy, practices and summarises procedures an entity uses to sign and manage a Domain Name System (DNS) Zone.

The document is intended to provide information on how the Digital Transformation Agency (DTA), as the custodian of the gov.au namespace, will direct the implementation and management of DNSSEC signing within the gov.au DNS namespace.

The information contained in this document is to assist stakeholders in determining the level of confidence and trust they wish to confer in the gov.au namespace.

When forming an opinion on the overall level of confidence an entity can place on the gov.au DNS namespace this document should be read in conjunction with the [DPS of auDA](https://www.auda.org.au/assets/public-comment/corp/auDA-DNSSEC-Policy-Practice-Statement-CLEAN.pdf), who manage the .au DNS zones and ICANN who manage signing of the [root zone](https://www.iana.org/dnssec/dps). The overall confidence of the namespace is dependent on confidence and trust in their respective processes.

This DPS is based on the [IETF RFC 6841, A Framework for DNSSEC Policies and DNSSEC Practice Statements](https://tools.ietf.org/html/rfc6841).

### 1.1 Overview
The Domain Name System (DNS) was not originally designed with strong security mechanisms to provide integrity and authenticity of its data. Over the years, several vulnerabilities have been discovered that threaten the reliability and trustworthiness of the system.

The document is intended to provide information on how the Australian Government, represented by the Digital Transformation Agency (DTA), will implement and manage DNSSEC operations as they relate to the gov.au DNS namespace. It defines the technical and operational procedures and parameters for the management of DNSSEC in the following registration only DNS zones (gov.au namespace):

- gov.au
- vic.gov.au
- nsw.gov.au
- act.gov.au
- qld.gov.au
- sa.gov.au
- wa.gov.au

### 1.2 Document name and identification
    
  **Document title**: gov.au DNSSEC Practice Statement (DPS)
  
  **Version**: 0.2
  
  **Date created**: 19 December 2018
  
  **Date last modified**: 1 April 2019

###  1.3 Community and applicability
The following entities have been identified as stakeholders in the gov.au namespace and thus play a role in the implementation of DNSSEC.

#### 1.3.1 auDA
.au Domain Administration Ltd (auDA) is a not-for-profit, membership run industry body tasked with being the policy authority and self-regulatory body for the .au ccTLD domain namespace (au namespace).

In December 2000 the Australian Government formally endorsed auDA as the appropriate body to administer the au namespace. The Government holds reserve powers in relation to domain names under the Telecommunications Act 1997. In October 2001 ICANN recognised auDA as the suitable operator for the au namespace under a Sponsorship Agreement.

As part of that sponsorship agreement auDA is responsible for the management of the .au zone file, ensuring it is accurate, up to date and continuously available. This responsibility also extends to management of the DNSSEC operation practices for the .au zone file. auDA achieves this through the technical management of the primary and (multiple) secondary name servers as well as DNS signing infrastructure that make up part of the .au DNS infrastructure.

auDA oversees and deploys new technologies and initiatives in the .au name space, which includes DNSSEC.

With respect to DNSSEC, auDA is responsible for:

- generating DNSSEC key pairs for signing the .au zone
- protecting the confidentiality of the DNSSEC key private components used to sign the .au zone
- signing all authoritative DNS resource records in the .au zone
- providing and maintaining the DS resource record in the root zone
- facilitating necessary additions, updates and removals of entries within the .au zone file with respect to the zones listed above
- providing a process for each Registry Operator to submit their respective zones’ DS resource record
- validating a Registry Operator’s DS record prior to publishing it into the .au zone
- providing a policy for Emergency Key Rollovers for the Registry Operators
- Performing Emergency Key Rollover at the request of a Registry Operator
- ensuring that each Registry Operator operates the DNS zones and registration functions outsourced to them in compliance with the applicable - operation, security and administrative requirements
- setting policy for the use of DNSSEC within the ‘public’ au registrations zones (e.g. com.au, net.au, org.au, asn.au, id.au etc)
- appointing, certifying and managing Registrars who are authorised to provide registration services (including processing of DNSSEC information) for the public au registration zones.

#### 1.3.2 DoCA, DTA and state government agencies

The Department of Communications and the Arts (DoCA) is the government agency that oversees the Australian Government endorsement of auDA to manage the au namespace and ensures that auDA’s performance is adequately meeting the interests of the Australian Government and the Australian people.

DTA is the agency that is acts as the custodian of the gov.au namespace on behalf of the Australian Government, and is responsible for policy and management of the gov.au namespace in co operation with auDA. DTA set the policy direction for the gov.au namespace in consultation with representatives of the relevant state government agencies whom have been delegated administrative control over gov.au namespace policy within their allotted gov.au 3LD. At this point in time, DTA holds a sub-sponsorship agreement with auDA for management of the technical functions of the gov.au namespace. This agreement assigns the day to day technical operational aspects of the gov.au namespace DNS and domain name registry services to auDA, who work co-operatively with the DTA to ensure that the technical platform can meet the policy, operational and security requirements set by the DTA.

With respect to DNSSEC the DTA is currently responsible for:

- setting the policy, technical and operational requirements for the gov.au namespace (including those related to DNSSEC) for both the technical registry operations (currently managed by auDA) and the gov.au registrar operations (currently managed in-house by the DTA)
- overseeing auDA’s technical operation of the gov.au namespace ensuring it continues to meet the requirements of government agencies
- overseeing the gov.au Registrar operation of the gov.au namespace registrar function.

#### 1.3.3 Registry Operator - Afilias

Afilias is the current outsourced technical Registry Operator, appointed by auDA, to perform the technical registry and DNS functions for the ‘public’ au registration zones as well as the gov.au namespace. This includes management of DNSSEC functions.

With respect to DNSSEC in the gov.au namespace Afilias are responsible for:

- operating the DNSSEC functions in compliance with the operational and security requirements defined by the DTA and agreed with auDA
- generating DNSSEC key pairs for signing DNS zones within the gov.au namespace
- protecting the confidentiality of the DNSSEC key private components used to sign DNS zones
- signing all required authoritative DNS resource records within a DNS zone
- Ensuring that DS records for child zones are published in the parent zone (either managed by themselves or upward to auDA as the .au zone manager)
- facilitating necessary additions, updates and removals for DNS and DNSSEC records within DNS zones
- providing a mechanism for the gov.au Registrar to submit a Registrant’s DS resource record into the applicable zone
- providing a policy for Emergency Key Rollovers
- performing Emergency Key Rollovers at the request of a Registrar.

#### 1.3.4 gov.au Registrar

The gov.au Registrar function is currently performed by DTA (domainname.gov.au). The gov.au Registrar is the entity that gov.au Registrants interact with to obtain, administer and renew their domain registrations in the gov.au namespace. The gov.au Registrar is also responsible for collecting DNSSEC information from gov.au Registrants and transferring that information to the technical registry manager for publishing in the DNS.

With respect to DNSSEC in the gov.au namespace, the gov.au Registrar is responsible for:

- providing a mechanism for gov.au Registrants to manage the DS record that is published in the DNS for their domain
- identifying Registrants prior to accepting change requests
- providing a policy for Emergency key rollovers
- performing Emergency Key Rollovers at the request of a Registrant.

#### 1.3.5 Registrants

Registrants are holders of domain names registered under one of the zones in the gov.au namespace. Registrants who choose to implement DNSSEC are responsible for:

- ensuring their DNS zones are properly signed and managed
- ensuring that DNSSEC signing keys are appropriately secured
- using the functions available from the gov.au Registrar to publish their DS records in the parent zone (at the appropriate time).

#### 1.3.6 Relying party

A relying party is the entity that makes use of DNSSEC signatures, such as DNSSEC validators and other applications. DS records for the gov.au namespace will only be published in the relevant parent DNS zone. It is not a recommended or supported configuration for a relying party to configure any static Trust Anchors. Any relying party who creates a Trust Anchor from a DS Resource Record does so at their own risk. Relying parties must ensure they stay informed of any relevant DNSSEC-related events in the gov.au namespace.

### 1.4 Specification administration

This DPS is a living document and will be periodically reviewed and updated. DTA is responsible for maintaining this specification.

#### 1.4.1 Specification administration organization

Organisation: The Digital Transformation Agency (DTA)
Website: [www.dta.gov.au](www.dta.gov.au)

#### 1.4.2 Contact information

Name: Chief Technology Officer

Office location: 50 Marcus Clarke Street, Canberra, ACT 2601

Postal address: PO Box 457

Telephone: [0437 653 861](tel:+61437653861)

Email: [dna@dta.gov.au](mailto:dna@dta.gov.au)

Web: [https://www.domainname.gov.au/contact-us](/contact)

Date last modified: 1 April 2019

#### 1.4.3 Specification change procedures

Queries with regards to the content of this document may be made directly via email, post or telephone to the contacts listed. Some requests may only be made in writing via email or post and requestors may be notified to do so should they place the initial request via telephone.

The DPS is reviewed periodically and updated as appropriate. All changes are reviewed by the Domain Name Administration team within the DTA and submitted to executive management for approval. Once accepted, action is taken to implement changes. Action may include update to procedures, changes requested of auDA, suppliers and other organisations. Once all preparatory work has been completed, the DPS is published and becomes effective as of its publication.

[Back to top](#top)

----------------------------------------------

## Publication and Repositories

### 2.1 Repositories

Information that the DTA deems publicly viewable is published as public documents on the DTA’s website ([https://www.dta.gov.au](https://www.dta.gov.au)). Other information may be requested by writing to the contact specified in Section 1.4.1. Provision of requested information is at the sole discretion of the DTA. This document may refer to documents that are confidential in nature or considered for internal use of the DTA or one of the other entities identified in Section 1.3. These documents may be made available on request after consideration on a case by case basis.

The DTA publishes the current version of the DPS at [https://www.domainname.gov.au/dps](/dnssec-practices-statement).

### 2.2 Publication of public keys

DS records of Secure Entry Point (SEP) keys are made available by publication in the relevant parent zone (.au zone for gov.au, gov.au zone for state zones). No other trust anchors or repositories are used.

[Back to top](#top)

----------------------------------------------

## Operational Requirements

### 3.1 Meaning of domain names
Valid domain names in the .gov.au name space are regulated by policies, which can be found at [https://www.domainname.gov.au/domain-policies](/policies), and include policies relating to:

- gov.au management and governance framework
- gov.au eligibility and allocation
- gov.au dispute resolution
- application of auDA.
- In addition, each state and territory have policies and guidelines specific to their jurisdictions.

The gov.au Domain Name Policies apply to domain names registered at the 3rd level (3LDs) within the gov.au registration only zone (e.g. example.gov.au) and domain names registered at the 4th level (4LDs) within the gov.au namespace (e.g. example.act.gov.au). gov.au policies are periodically reviewed.

### 3.2 Identification and authentication of child zone manager

The only mechanism for a child zone manager to make changes to their DNS information, including the publication of DS records, is through the gov.au Registrar function managed by the DTA. The gov.au Registrar function is responsible for defining the mechanisms for identification and authentication of child zone managers. The gov.au Registrar must perform adequate identification and authentication of a gov.au domain name registrant prior to accepting requests for changes to domain name information from them.

### 3.3 Registration of delegation signer (DS) resource records

A child zone manager (Registrant) submits their DS record to the Registrar via email. During this submission process, the gov.au Registrar will conduct basic testing and alert the Registrant of any potential issues identified. The Registrant can choose to proceed regardless. Once confirmed, the gov.au Registrar will submit the record to the auDA appointed technical outsourcer (Registry Operator - currently Afilias) for publication in the relevant gov.au namespace DNS zone.

Once submitted to the Registry Operator, the WHOIS data is changed, and the zone changes are automatically propagated out to the authoritative DNS infrastructure.

### 3.4 Method to prove possession of private key

The DTA does not require a Registrant to prove possession of the private key that corresponds to the DS record being requested for publishing. It is the Registrant’s responsibility to ensure that the information they request to be published is correct.

### 3.5 Removal of DS resource records

#### 3.5.1 Who can request removal?

Only an identified and authenticated registrant of a domain name (or their nominated agent) can request removal of a DS record for their domain name.

#### 3.5.2 Procedure for removal request

Removal requests are submitted to the Registrar via request forms on the domainname.gov.au website.

#### 3.5.3 Emergency removal request

If an emergency removal is required, the gov.au Registrar support center should be contacted for assistance.

[Back to top](#top)

----------------------------------------------

## Facility, Management and Operational Controls

### 4.1 Physical controls

The following outlines the physical controls that are required to be in place for all parties involved in providing gov.au namespace DNSSEC services. Where a party is using a cloud-based service these provisions don't apply however the cloud service must be one that is approved by ASD for use by Australian Government agencies as identified here: [https://acsc.gov.au/infosec/irap/certified_clouds.htm](https://acsc.gov.au/infosec/irap/certified_clouds.htm).

#### 4.1.1 Site location and construction

The DTA requires that all parties involved in providing aspects of the DNSSEC services for the gov.au namespace choose data centre facilities that meet the following minimum set of requirements:

- redundant power feed
- uninterruptible power supply (minimum 30 minutes)
- backup power source (generator)
- fire detection system (high sensitivity smoke detectors)
- fire suppression system
- water detection system
- multiple (diverse) internet links
- stringent physical security (on-site security personnel, continuous CCTV, bio-metric access control)
- 24/7 access availability
- robust cooling system (HVAC)
- real time/pro-active power and environmental monitoring.

#### 4.1.2 Physical access

Physical access is restricted and limited to authorised personnel only. Third parties, including co located staff, are not permitted access to racks containing DNSSEC equipment without first obtaining permission, and only when authorised personnel are present. All physical access is recorded via CCTV and entry alarms are present.

#### 4.1.3 Power and air conditioning

N+1 power is present to maximise uptime availability. Uninterruptible Power Supply (UPS) systems are used to prevent power spikes, surges, and brownouts, and redundant backup diesel generators are available to provide additional runtime. Alerts must be set on all power provision systems to allow failover preparation in the event of a potential power provision issue to ensure a smooth and controlled failover if required. Similarly, N+1 monitored air conditioning is configured to provide maximum temperature control for the installed equipment in order to provide a stable operating environment.

#### 4.1.4 Water exposures

Facilities are not to be selected if they are in flood-prone areas. Facilities must be fitted with 24x7 monitored water detection systems and must use fire suppression systems that do not use water.

#### 4.1.5 Fire prevention and protection

Fire protection in each location must include very early smoke detection apparatus (VESDA) which must be use set as one element of a multi-stage, human controlled multi-zone dry-pipe, double interlock, electrical equipment safe, pre-action fire suppression system in a configuration that complies with local regulations and industry best practice.

#### 4.1.6 Media storage

All sensitive media must be stored securely and be protected by appropriate access restrictions with need to know access only. Such media is also reasonably protected from fire, water and other disastrous environmental elements.

#### 4.1.7 Waste Disposal

Sensitive documents must be securely shredded before disposal. Where sensitive data is stored electronically, appropriate means for the media type must be used to render the data unsalvageable prior to disposal. Where cryptographic devices are used, they are physically destroyed or zeroized in accordance with the manufacturers' guidance prior to disposal.

#### 4.1.8 Off-site backup

Regular, off-site backups of critical data, audit logs and other sensitive information are required for disaster recovery. All backups are encrypted and stored off-site in a secure storage facility with appropriate physical and logical access controls like those implemented for online systems and data.

### 4.2 Procedural controls

The following outlines the procedural controls that are required to be in place for all parties involved in providing gov.au namespace DNSSEC services.

#### 4.2.1 Trusted roles

The DTA has no specific requirements for the names and/or assignment of roles only that each organisation identifies the roles involved in the DNSSEC activities and/or who have access to the secure DNSSEC infrastructure and that no one single role can perform the identified tasks in isolation.

#### 4.2.2 Number of persons required per task

The DTA requires that an N of M scheme is put in place for all sensitive DNSSEC activities. In all cases N is never allowed to be 1.

#### 4.2.3 Identification and authentication for each role

Entities must have procedures in place to ensure that personnel are identified and authenticated before performing any of the stipulated tasks.

#### 4.2.4 Tasks requiring separation of duties

The following tasks (or access to systems that facilitate the following tasks) must be protected by N of M schemes:

- key generation signing
- zone signing
- key revocations
- operations on any Hardware Security Modules (HSMs).

### 4.3 Personnel controls

The following outlines the personnel controls that are required to be in place for all parties involved in providing gov.au namespace DNSSEC services.

#### 4.3.1 Qualifications, experience, and clearance requirements

Each person who fulfils a DNSSEC role must:

- be employed full-time by the entity in question
- not be within their initial employment probation period
- have completed a National Police Check with the Australian Federal Police or as otherwise directed by the DTA.
- demonstrated appropriate background knowledge and understanding of DNS and DNSSEC principles
- have sufficient experience, and where applicable, qualifications in the DNS industry
- be approved for access to the gov.au namespace by the DTA.

#### 4.3.2 Background check procedures

The DTA requires all personnel dealing with secure DNSSEC material and systems to have completed a National Police Check with the Australian Federal Police (or other body as directed by the DTA). The DTA reserves the right to interpret the findings of the check equitably with respect to the secure nature of this DNSSEC implementation and requires all entities involved in signing to not grant (or remove) access from individuals not expressly approved by the DTA. The DTA may require a ‘re check’ to be performed on request and at least once every five years.

#### 4.3.3 Training requirements

The DTA requires all entities to put in place training programs for personnel performing DNSSEC roles. This training must include specific knowledge and testing of DNS, DNSSEC and the Domain Name ecosystem. Personnel must be required to perform ‘refresher’ or supplemental training annually.

#### 4.3.4 Job rotation frequency and sequence

The DTA requires that there is more than one person capable of performing each trusted role and that each person could perform functions required by that role at least once every quarter.

#### 4.3.5 Sanctions for unauthorized actions

The DTA requires that organisations have appropriate disciplinary procedures in place to deal with unauthorised actions performed by personnel in trusted roles. Disciplinary actions may include:

measures up to and including termination
damage liability
prosecution.
Entities are required to report to the DTA when such circumstances occur as it relates to the DNSSEC signing of the gov.au namespace and what action was taken. In extreme circumstances the DTA will conduct its own investigation and may request that a person is removed from holding a trusted role.

#### 4.3.6 Contracting personnel requirements

The DTA requires that contractors and consultants of entities are not allowed to perform trusted roles unless explicitly approved by the DTA, which will include the entity demonstrating how the requirements of this section will be met.

#### 4.3.7 Documentation supplied to personnel

The DTA requires that DNSSEC procedures are specifically documented and must include both procedural and technical steps.

### 4.4 Audit logging procedures

The following outlines the audit logging controls that are required to be in place for all parties involved in providing gov.au namespace DNSSEC services. Audit logs must be kept for at least seven years and must be made available to the DTA on request.

#### 4.4.1 Types of events recorded

Logs of the following events must be maintained:

- access to DNSSEC systems
- changes to DNS Zones
- key operations
- DNSSEC operations
- hardware and system failures
- incidents and outages (planned and unplanned)
- changes to security controls
- system updates
- security breaches and other security incidents
- unauthorised actions.

#### 4.4.2 Frequency of processing log

Logs should be reviewed immediately following any DNSSEC operation (for example key roll over), after any incident (security or otherwise) and in response to monitoring alerts or other events. The DTA also requires organisations to have automated systems monitoring logs for unusual activity.

#### 4.4.3 Retention period for audit log information

The DTA requires all logs to be kept for seven years.

#### 4.4.4 Protection of audit log

Logs are to be securely stored and only accessible by authorised personnel. Systems must be in place to detect/prevent ‘after-the-fact’ modification of logs. Logs must be redundantly stored, backed up and stored securely. Logs must not contain sensitive information, such as private keys or user credentials.

#### 4.4.5 Audit log backup procedures

Where practical, logs must be shipped to a separate system as soon as they are generated and replicated to a redundant site. Logs must be backed up to a secondary site, encrypted and stored securely.

#### 4.4.6 Audit collection system

In addition to information recorded manually by staff while conducting operations, audit information is to be collected in audit logs automatically. Methods specific to applications and operating environments should be used to record audit logs (e.g. syslog on linux systems). Manual logs must be scanned and the original documents archived in a fireproof safe.

#### 4.4.7 Vulnerability assessments

The DTA required entities to have in place systems that perform automated vulnerability scanning of network and server assets. These scans must include network-based vulnerability scanning of both internal and external network ranges. In addition, entities must have third party penetration tests of DNS, DNSSEC and associated systems annually. The results of such tests must be made available for review by the DTA and include actions (with dates) proposed to be taken to address identified vulnerabilities and issues.

### 4.5 Compromise and disaster recovery

The following outlines the compromise and disaster recovery requirements the DTA expects to be in place for all parties involved in providing gov.au namespace DNSSEC services.

#### 4.5.1 Incident and compromise handling procedures

Any event that may cause or has caused an outage, damage to the DNS, registry or registrar system, disruption to service or security breach is classified as an incident. Any event that is an incident and has resulted in exposure of private DNSSEC components is classified as a compromise.

The DTA requires that entities have a formal incident management/compromise process. The process should include:

- internal and external notification requirements and processes
- escalation processes
- restoration of services/reinstate secure state
- conducting an investigation
- post-incident report
- root causes analysis
- remediation activities and actions

The process must include isolations of compromised components, rotation of keys and authentication information (regardless if proven compromised or not) and other proactive remediation measures.

Incident reports, including remediation activity plans and due dates, are to be made available to the DTA upon request.

#### 4.5.2 Corrupted computing resources, software, and/or data

The DTA requires entities to have mechanisms in place to detect corruption in software, data and resources, and restore those systems as appropriate. The DTA especially requires entities to verify zone data (including DNSSEC signatures) prior to publishing zones to the public DNS servers to prevent corrupt or incorrect DNS information being published.

#### 4.5.3 Entity private key compromise procedures

In the event of a private key compromise the DTA requires that an emergency Zone Signing Key (ZSK) and Key Signing Key (KSK) rollover is carried out immediately.

On suspicion of compromise, the entity must immediately attempt to validate such suspicion and, if it cannot satisfactorily explain why no compromise has occurred, perform an emergency roll over.

The DTA must be notified in these situations and will then use the notification method identified in 2.1 to notify other gov.au namespace stakeholders.

#### 4.5.4 Business continuity and IT disaster recovery capabilities

The DTA requires that entities responsible for DNSSEC operations in the gov.au namespace have a Business Continuity Plan (BCP) which includes the DNSSEC signing services in scope. The BCP plan should be designed in compliance with ISO22301. Entities must also have a Disaster Recovery Plan (DRP) for the DNSSEC specific services. The DRP must be tested quarterly and maintained as systems are updated/evolved.

### 4.6 Entity termination

If the responsibility for .gov.au domain name administration is assigned to a different entity, for example, as part of machinery of government changes, the DTA will coordinate with the incoming entity in order transfer knowledge, documentation and key personnel to ensure service continuity.

The DTA requires all entities involved in the DNSSEC signing of the gov.au namespace to have a termination plan for transition of the services they are responsible for to the incoming party. This plan must include a commitment to co-operation and assurances that continuity of service will be a number one priority.

[Back to top](#top)

----------------------------------------------

## Technical Security Controls

The DTA requires that entities involved providing DNSSEC services for the gov.au namespace have a formal Information Security Management System (ISMS) in place which includes the DNSSEC services in scope. The ISMS should be ISO27001 compliant and comply with the Australia Government ISM to an unclassified level. Controls from the following must be considered:

- [Australian Government Essential Security Controls](https://acsc.gov.au/publications/protect/essential-eight-explained.htm)
- [Australian Government ISM Controls](https://acsc.gov.au/infosec/ism/index.htm)
- [ISO27001 Controls](https://www.iso.org/standard/54534.html)

In addition, the following requirements are stipulated:

### 5.1 Key pair generation and installation

#### 5.1.1 Key pair generation

All entities must document how they intend to generate key pairs that are to be used in DNSSEC signing operations. This document must include which roles generate the keys, where they are generated and where they are stored. It is expected that a FIPS 140-2 level 3 HSM that is common criteria or equivalent certified is used for generation and storage of keys. Different key pairs must be used for each zone under management.

#### 5.1.2 Public key delivery

The public component of the key pair is to be used to generate the DS record. The DS record is then transferred to the parent zone operator securely (by following the parent zone’s secure transfer process - which is documented in the parent zone’s DPS).

#### 5.1.3 Public key parameters generation and quality checking

The DTA requires entities to document the key generation process. This process must include:

- parameters in compliance with the requirements of this DPS
- quality assurance checks of the key before it is used in production service.

#### 5.1.4 Key usage purposes

Entities must only use the DNSSEC keys for the purpose of DNSSEC signing DNS resource records. Keys identified as ZSK keys must only be used as ZSK keys and keys identified as KSK keys must only be used as KSK keys. Changing a key from one type to another is not allowed, using keys for any purpose other than resource record signing is not allowed.

### 5.2 Private key protection and cryptographic module engineering controls

All cryptographic operations must be performed in an HSM and no private keys are made available, unprotected, outside of the HSM. ASD security guidelines on key sizes, acceptable algorithms and use of HSMs must be followed. Redundant HSMs must be in use with ‘replication’ or synchronisation between them being performed as per manufacturer’s instructions. All key operations must consider the N of M requirement outlined in section 4.2.2.

#### 5.2.1 Cryptographic module standards and controls

HSMs must conforms to the requirements in FIPS 140-2 level 3 and be common criteria or equivalent certified.

#### 5.2.2 Private key (N of M) multi-person control

As described in section 4.2.2, N of M scheme must be used for all tasks performed by trusted roles including relevant HSM operations.

#### 5.2.3 Private key escrow

Escrow of private key is not allowed for keys used in gov.au namespaces. Instead the DTA requires the use of a pre-published emergency key controlled by the DTA.

#### 5.2.4 Private key backup

Private keys must be backed up securely following the HSM manufactures instructions. The backup medium must be encrypted and securely stored.

#### 5.2.5 Private key storage on cryptographic module

Private keys must be stored in an encrypted state on the HSM following the manufacturer’s instructions.

#### 5.2.6 Private key archival

Private keys must only be archived in an encrypted state on the HSM and for no longer than 30 days after their last use.

#### 5.2.7 Private key transfer into or from a cryptographic module

Private keys are only permitted to be transferred to or from the HSM for the purpose of backup or replication. The keys must always be encrypted before removal from the HSM and must remain encrypted at all times. Medium holding keys extracted for the purpose of replication must be securely erased once the keying material has been loaded into backup HSMs. All activities must be performed in accordance with the manufacturer’s instructions.

#### 5.2.8 Method of activating private key

Keys are to be activated in a ‘just in time’ fashion. That is, keys are not to be activated until needed for key rotation activities.

#### 5.2.9 Method of deactivating private key

Keys are to be deactivated as soon as they are no longer required for DNSSEC signing operations.

#### 5.2.10 Method of destroying private key

Private keys are to be destroyed in a secure manner following the instructions of the HSM manufacturer.

### 5.3 Other aspects of key pair management

The DTA requires the following additional requirements for key pair management:

#### 5.3.1 Key usage periods

Key pairs that are used for ZSKs are not to be used for longer than one month.

Key pairs that are used for KSKs are not be used for longer than one year.

### 5.4 Activation data

The following describes DTA’s requirements for DNSSEC entities with respect to activation data. Activation data refers to the data required to access or activate a DNSSEC system or key.

#### 5.4.1 Activation data generation and installation

Activation data must be generated securely and meet appropriate length and complexity requirements. Activation data should be used to enforce the N of M requirements stipulated in section 4.2.2 of this document.

#### 5.4.2 Activation data protection

Trusted users who hold activation data must be advised of the proper method of securely storing and using activation data. This includes:

- obligations to not disclose activation data
- notification requirements when it is suspected the activation data has been compromised.

#### 5.4.3 Other aspects of activation data

Activation data must be rotated at a frequency that is commensurate with the type of activation data in use.

### 5.5 Computer security controls

The DTA requires that entities responsible for DNSSEC operations in the gov.au namespace implement the following computer security controls as part of their ISMS:

- operating system baselines (example CIS baselines)
- role based access control following the principle of least access
- full logging and auditing
- endpoint security protections
- authentication (including multi-factor authentication)
- encryption at rest
- host based firewalls
- application whitelisting or equivalent
- patch management
- use of secure access workstations or equivalent.

### 5.6 Network security controls

The DTA requires that entities responsible for DNSSEC operations in the gov.au namespace implement the following network security controls as part of their ISMS:

- network segmentation with next generation firewalls
- encryption in transit
- remote access VPNs
- secure remote access
- intrusion detection and prevention
- patch management of network equipment
- network traffic logging and analysis.

### 5.7 Timestamping

All systems must have their clocks properly synchronized to a Stratum 2 or Stratum 3 time-source and use the Coordinated Universal Time (UTC) time zone. All logs must include the date and time down to the second in UTC.

### 5.8 Life cycle technical controls

The DTA requires that applications developed or used by entities conform to its standard development and change management procedures. These include requirements such as:

- All developed software is traceable, stored in version control systems and subject to regular review for malicious code.
- Deployments are tracked and able to be rolled back.
- The peer review of change and release plans
- Update and patching processes.
- Change and release plans include testing, post deployment verification and roll back plans.
- Separation and use of testing, staging and development environments.

[Back to top](#top)

----------------------------------------------

## Zone Signing

The DTA stipulates the following requirements for the gov.au namespace:

### 6.1 Key lengths, key types, and algorithms

The use of separate KSKs and ZSKs using the RSA algorithm with a minimum length 2048 bits.

### 6.2 Hashed authenticated denial of existence

NSEC3 with opt-out denial of existence method should be used with a yearly rotated salt and an iteration count of at least 100.

### 6.3 Signature format

Signature format used is to be RSA with SHA256.

### 6.4 Key rollover

The DTA requires that, in normal circumstances, the ZSK be rotated using a pre-publishing methodology and the KSK be rotated with a double-signing methodology.

### 6.5 Signature lifetime and re-signing frequency

Signature should have a validity period of no more than 14 days with regeneration occurring no later than four days before expiry (10 days lifetime). Jitter should be used.

### 6.6 Verification of resource records

The DTA requires that all zones are published to the public DNS through a ‘validation gate’. The validation gate is a mechanism that will prohibit the publishing of the zone if it doesn’t pass validation. A zone will not pass validation if it has invalid DNSSEC records (expired, not matching any keys published in the zone, invalid NSEC/NSEC3 chain etc).

### 6.7 Resource records time-to-live

DTA expects the maximum time-to-live (TTL) for each DNSSEC Resource Record to be (in seconds):

- DNSKEY: 3600
- DS: 3600
- NSEC3: 1800
- RRSIG: same as covered Resource Record

With respect to other resource records the DTA suggest a TTL of four hours is appropriate for delegation-only zones, like the gov.au namespace zones, although the choice of TTL is subjective. If the TTL meets the requirement to be less than the signature validity period, then the DTA requirements can be considered met.

[Back to top](#top)

----------------------------------------------

## Compliance Audit

The DTA requires an audit of DNSSEC systems be conducted in accordance with the following:

### 7.1 Frequency of entity compliance audit

Audits must be conducted annually.

### 7.2 Identity/qualifications of auditor

The auditor must be approved by the DTA and proficient in conducting IT security audits with an understanding of DNS and DNSSEC.

### 7.3 Auditor's relationship to audited party

Auditors must be completely independent of and not related in any way to the entity under audit.

### 7.4 Topics covered by audit

The audit must cover:

- operational and security controls of the DNSSEC system
- review of processes and practices including logs of activities
- key management practices
- security review of the ISMS.
 

If the entity maintains an independently audited ISMS to a standard such as ISO27001 the results of this may be used in place of the security review specified here.

### 7.5 Actions taken as a result of deficiency

The DTA requires that any deficiencies identified in the audit are addressed with remediation activities commensurate with the nature of the deficiency. Remediation activities should be completed as soon as is reasonably practical. Activities and time lines must be included as an attachment to the audit report when provided to the DTA.

### 7.6 Communication of results

Audit reports must be provided to the DTA, along with remediation activities and timelines, within 14 days of completion of the audit.

[Back to top](#top)

----------------------------------------------

## Legal Matters

### 8.1 Fees

Not applicable.

### 8.2 Financial responsibility

Not applicable.

### 8.3 Confidentiality of business information

#### 8.3.1 Scope of confidential information

The following information is kept confidential and requires privileged access:

- secure DNSSEC information
- audit logs
- reports created by auditors
- procedures
- policies that relate to security.

#### 8.3.2 Types of information not considered confidential

Information that is classified as public as part of the DNSSEC extensions to DNS are considered to be public by the DTA and will not be subject to access restriction.

#### 8.3.3 Responsibility to protect confidential information

DTA is committed to the confidentiality of information and takes all measures reasonably possible to prevent the compromise of such information.

### 8.4 Privacy of personal information

#### 8.4.1 Information treated as private

Not applicable.

#### 8.4.2 Information not deemed private

Not applicable.

#### 8.4.3 Responsibility to protect private information

Not applicable.

#### 8.4.4 Disclosure pursuant to judicial or administrative process

The DTA shall be entitled to disclose confidential/private Information if the DTA believes that disclosure is necessary in response to judicial, administrative, or other legal process.

### 8.5 Limitations of liability

The DTA, to the extent permitted by law excludes liability for any losses, direct or indirect, punitive, special, incidental or consequential damage, in connection with or arising out of this DNSSEC Practice Statement or the actions of it or any third party (including for loss of profits, use, data, or other economic advantage), however it arises, and even if DTA has been previously advised of the possibility of such.

### 8.6 Term and termination

#### 8.6.1 Term

DNSSEC Practice Statement becomes effective upon publication with the most current version being published at the following link: [www.domainname.gov.au/dps](/dnssec-practices-statement)

#### 8.6.2 Termination

This DNSSEC Practice Statement will be amended as required and will remain in force until it is replaced by a new version.

#### 8.6.3 Dispute resolution provisions

Disputes among DNSSEC participants shall be resolved pursuant to provisions in the applicable agreements among the parties. Except for injunctive or provisional relief, disputes involving the DTA require an initial negotiation period of no less than 60 days prior to the commencement of legal action. Subject to the foregoing, any legal action in relation to this DNSSEC Practice Statement against any party or its property may be brought in any court of competent jurisdiction in the Commonwealth of Australia and the parties irrevocably, generally and unconditionally submit to the nonexclusive jurisdiction of any court specified in this provision in relation to both itself and its property.

#### 8.6.4 Governing law

This DNSSEC Practice Statement shall be governed by and construed under the law in the Commonwealth of Australia.

#### 8.6.5 Jurisdiction

The DTA operates in the Commonwealth of Australia.
  </div>
</div>