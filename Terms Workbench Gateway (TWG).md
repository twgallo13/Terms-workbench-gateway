# **Section 1 — Product Purpose, Scope, and Core Business Rules**

## **1.1 Document Purpose**

This document defines the product requirements, business rules, and technical behavior for a **Vendor Quote and Agreement Management Platform** for Shiekh’s dropship program the app is called **Terms Workbench Gateway (TWG)**.

This platform will replace the current process of managing vendor commercial terms, approvals, and agreements through email, shared documents, verbal confirmation, and manual follow-up. The new system must create a structured, auditable, easy-to-manage workflow that clearly captures vendor pricing, site approvals, operating expectations, terms and conditions, and agreement acceptance before the vendor is handed off to Workbench (“WB”).

This specification is written so that an AI can use it to build:

* frontend  
* backend  
* database  
* workflows  
* automation  
* admin controls  
* user permissions  
* document generation  
* reporting  
* legal recordkeeping

This document is intended to be implementation-ready and should be treated as a build source, not a brainstorm.

---

## **1.2 Product Name and System Role**

### **Working Product Name**

**Terms Workbench Gateway (TWG)**

### **System Role**

This platform is the **pre-WB commercial and legal onboarding layer**.

It exists to manage everything that happens **before** a vendor is loaded into Workbench, including:

* vendor/company/contact intake  
* brand setup  
* site approval selection  
* quote creation  
* pricing and fee presentation  
* agreement generation  
* terms and conditions acceptance  
* shipping and operational expectation capture  
* final signed record storage  
* handoff status to WB

### **System Boundary**

This platform must stop at the point where:

1. the vendor has reviewed and accepted the agreement package, and  
2. the internal team is ready to upload the vendor into WB.

After that point, WB handles the operational workflow.

---

## **1.3 Business Context**

Shiekh is growing and needs a cleaner, more scalable way to manage dropship vendors. Historically, many vendor relationships were managed through long-standing relationships, email threads, shared documents, verbal agreements, and manual follow-up. That process may have been workable at a smaller scale, but it creates risk as the business grows.

The current pain points include:

* inconsistent pricing communication  
* unclear vendor expectations  
* scattered agreement records  
* hard-to-track approvals  
* no single source of truth for vendor commercial terms  
* reliance on people remembering what to ask, what to charge, and what to include  
* outdated legacy documents that are difficult to maintain  
* no clean internal workflow for quote-to-agreement-to-WB handoff

This platform must solve those issues with a structured system that is easy for a small business team to manage without relying on developers, logistics engineers, or attorneys for day-to-day execution.

---

## **1.4 Primary Business Goals**

The platform must be designed to achieve the following business outcomes:

### **Goal 1 — Faster Vendor Setup**

Internal users must be able to create and send vendor quotes and agreements quickly, without rebuilding documents manually each time.

### **Goal 2 — Clear Expectations and Pricing**

The system must clearly present:

* commercial terms  
* fees  
* pricing  
* shipping expectations  
* agreement terms  
* site approvals  
* required vendor information

The vendor should know exactly what they are agreeing to.

### **Goal 3 — Clean, Defensible Records**

The business must have a permanent, searchable, auditable record of:

* what was offered  
* what was approved  
* what was signed  
* what version of terms was accepted  
* who accepted it  
* when it was accepted

### **Goal 4 — Reduced Operational Memory Burden**

The system must reduce dependence on team memory, email history, verbal instructions, and tribal knowledge.

### **Goal 5 — No-Developer Maintenance**

Normal business updates must be handled by admins through settings and content controls, not by code changes.

---

## **1.5 Product Vision**

The product should function as a **world-class internal commercial workflow system** for dropship vendor setup.

It should feel like:

* a structured internal admin tool for Shiekh  
* a clean vendor-facing review and acceptance experience  
* a central source of truth for vendor quotes and agreements  
* a bridge between legacy onboarding documents and modern workflow automation

The product must be:

* robust  
* secure  
* modular  
* easy to maintain  
* configurable  
* legally defensible  
* scalable for future expansion

---

## **1.6 In-Scope Capabilities**

The platform must support the following capabilities in scope for the initial product.

### **Vendor and Company Management**

* create and manage vendor records  
* store company information  
* store brand information  
* store contact information  
* track who manages which brand  
* maintain a clean internal vendor profile

### **Site Approval Management**

* select which sites a vendor brand is approved to sell on  
* support current sites:  
  * Shiekh.com  
  * Karmaloop.com  
  * MLTD.com  
* allow new sites to be added later through admin settings  
* allow approvals to vary by brand

### **Quote Management**

* create one quote per vendor and brand  
* define pricing, fees, services, and commercial terms  
* support versioning and revision  
* send quote to vendor  
* track quote status  
* maintain a history of changes

### **Agreement Management**

* generate one agreement package per vendor and brand  
* include current terms, brand/site approvals, and commercial terms  
* support versioned legal content  
* support secure review and acceptance  
* generate final PDF copy  
* store final signed record indefinitely

### **Vendor Review and Acceptance**

* provide secure one-time access for review and signing  
* support optional vendor login by email  
* allow vendor to review, accept, reject, or request changes if enabled  
* provide downloadable final copy after acceptance

### **Handoff to Workbench**

* record that the vendor is ready for WB  
* track handoff status, date, owner, and notes  
* provide a clean internal checklist for post-signature handoff

### **Admin Configuration**

* allow admins to update the system without development  
* manage sites, fees, services, templates, terms, approval rules, required fields, notifications, and company details through settings

---

## **1.7 Out-of-Scope Capabilities**

This platform is **not** intended to replace WB or operate the full dropship business after onboarding.

The following are explicitly out of scope for this system:

### **Not a Workbench Replacement**

The platform must not be used to manage:

* product creation  
* product activation  
* image/photo workflows  
* catalog sync  
* product approval queues  
* inventory updates  
* order shipping  
* tracking uploads  
* cancellations  
* returns processing  
* Shopify sync operations  
* product taxonomy maintenance inside WB

### **Not a Full ERP / CRM**

The platform is not intended to be:

* a full CRM  
* a full accounting system  
* a full vendor operations portal  
* a warehouse system  
* a product information management system

### **Not a Credential Vault for WB Integrations**

The platform should not store sensitive WB or Shopify connection credentials unless explicitly approved in a future phase. For now, it only needs to track WB handoff readiness and internal checklist status.

---

## **1.8 Core Business Entities**

The system must be built around the following business entities.

### **Vendor**

The business partner entity that signs the agreement and participates in the dropship program.

### **Brand**

A brand managed by a vendor. A single vendor may manage one or more brands.

### **Site**

A storefront or selling destination where a vendor brand may be approved to sell. Initial sites are:

* Shiekh.com  
* Karmaloop.com  
* MLTD.com

Sites must be **admin-configurable**.

### **Vendor Brand Record**

A relationship record connecting:

* one vendor  
* one brand  
* one or more approved sites  
* one quote history  
* one agreement history  
* one WB handoff status

### **Quote**

A commercial record for one vendor and one brand. It defines pricing, fees, services, and offer terms.

### **Agreement**

A legal/commercial record for one vendor and one brand. It represents the terms accepted by the vendor and becomes the permanent record once signed.

### **Terms Version**

A version-controlled legal text or clause set used in quotes and agreements.

### **WB Handoff Record**

An internal status record showing that a vendor-brand agreement is complete and ready to be uploaded into Workbench.

---

## **1.9 Core Product Rules**

The following rules are mandatory and should be treated as system-level requirements.

### **Rule 1 — One Quote Per Vendor and Brand**

The system must create and manage quotes at the **vendor \+ brand** level.

A vendor that manages multiple brands must be able to have:

* separate quotes for each brand  
* separate agreement histories for each brand  
* separate site approvals for each brand

### **Rule 2 — One Agreement Package Per Vendor and Brand**

The system must create and manage agreements at the **vendor \+ brand** level.

Each agreement package must be able to include:

* approved sites  
* pricing and fee terms  
* shipping and operational expectations  
* active terms and conditions  
* required legal language  
* acceptance evidence

### **Rule 3 — Site Approvals Are Per Brand**

A vendor may manage multiple brands, and each brand may be approved for different sites.

Example:

* Vendor A / Brand 1 may be approved for Shiekh.com and Karmaloop.com  
* Vendor A / Brand 2 may be approved for MLTD.com only

The system must support that structure.

### **Rule 4 — Pricing Is Standard Across Sites for Now**

Commercial pricing is currently standard regardless of site.

The system must:

* use one pricing model across sites for the initial release  
* be architected so site-specific pricing can be supported later without redesign

### **Rule 5 — Sites Must Be Admin-Configurable**

The site list must not be hardcoded.

Admins must be able to:

* add sites  
* deactivate sites  
* rename display labels  
* control which sites are selectable  
* apply future site-specific rules

### **Rule 6 — Legacy Defaults Must Be Preloaded but Editable**

The historical values and guidance from the legacy packet may be used as seed defaults, but they must not be treated as permanent policy.

All seeded business values must be editable by admin users, including:

* fees  
* pricing defaults  
* payout rules  
* shipping expectations  
* cancellation rules  
* service language  
* operational guidance

### **Rule 7 — Post-Signature Flow Ends With WB Handoff**

Once the vendor signs the agreement package, this platform’s main workflow is complete.

The system must then support:

* internal marking of “Ready for WB”  
* assignment of internal owner  
* WB handoff notes/checklist  
* WB upload status tracking

The system must not attempt to replace WB.

### **Rule 8 — Signed Records Are Permanent**

All final accepted and signed agreement records must be retained indefinitely.

The final accepted record must be stored as:

* a locked version snapshot  
* a downloadable final PDF  
* a permanent audit record  
* a searchable historical record

### **Rule 9 — Admins Must Control Required Fields**

Admins must be able to define which fields are required and which are optional.

This is important so the team can:

* tighten requirements when needed  
* loosen requirements when needed  
* avoid unnecessary user blocking  
* adapt quickly without development

### **Rule 10 — Normal Updates Must Not Require Development**

Business-side updates must be possible through admin settings.

Anything that changes operationally over time should be treated as **admin-configurable** unless there is a strong security reason to hardcode it.

---

## **1.10 User Access Model Summary**

A full permission model will be defined in Section 2\. At the product level, the following access rules are confirmed.

### **Internal Access**

* any user with `@shiekhshoes.org` must be treated as an internal admin by default  
* other internal emails or domains must be supported through an explicit allowlist  
* `theo@shiekhshoes.org` must be created as an admin  
* `theo@shiekh.com` must also be supported as an admin through allowlist or equivalent admin control

### **Vendor Access**

The system must support both:

* secure one-time review access  
* email-based account login

The expected default flow is:

* send secure review access to vendor  
* allow optional login if needed for review history, revisions, or repeated access

Because WB handles everything after agreement completion, vendor access in this system is focused on the quote/agreement phase, not long-term operations.

---

## **1.11 Product Workflow Summary**

At a high level, the product workflow must follow this sequence.

### **Internal Workflow**

1. Internal admin creates or updates vendor  
2. Internal admin creates or updates vendor brand  
3. Internal admin selects approved site(s) for that brand  
4. Internal admin configures pricing, fees, services, and expected terms  
5. Internal admin generates quote and agreement package  
6. Internal admin sends vendor secure review access

### **Vendor Workflow**

7. Vendor reviews quote, agreement terms, site approvals, and expectations  
8. Vendor accepts, rejects, or requests changes if enabled  
9. System stores acceptance evidence and final version snapshot  
10. System generates final downloadable copy

### **Internal Completion Workflow**

11. Internal admin marks vendor-brand record ready for WB  
12. Internal admin completes WB handoff checklist  
13. System stores handoff status and history

---

## **1.12 Required Business Information Capture**

The platform must be able to capture and manage all information needed to support a complete vendor quote and agreement process.

This includes, at minimum:

### **Vendor Information**

* legal company name  
* DBA  
* tax/business details  
* website  
* business address  
* return address  
* primary contact info  
* legal contact info  
* operations contact info  
* support contact info

### **Brand Information**

* brand name  
* owner/vendor relationship  
* internal notes  
* approval status  
* selected sites

### **Commercial Information**

* services  
* fees  
* pricing structure  
* discounts if allowed  
* commission or commercial rate structure if applicable  
* payout-related language if applicable  
* custom notes

### **Operational Expectations**

* shipping SLA  
* carrier expectations  
* blind shipping requirements if applicable  
* return timing expectations  
* cancellation language  
* tracking expectations  
* support response expectations

### **Legal / Agreement Information**

* terms version  
* custom clauses if approved  
* quote version  
* agreement version  
* acceptance data  
* final document copy

---

## **1.13 Key Product Principles**

The system must be built according to the following principles.

### **Principle 1 — Configurable by Admin**

Wherever possible, business rules must be managed by settings, not code.

### **Principle 2 — Clear Internal Workflow**

The system should reduce ambiguity and guesswork for the internal team.

### **Principle 3 — Clean Vendor Experience**

The vendor experience should be simple, professional, and easy to complete.

### **Principle 4 — Versioned Legal Records**

Every accepted agreement must be tied to a versioned record of what was shown and accepted.

### **Principle 5 — Future Expansion Without Rebuild**

The product must be ready for future additions such as:

* site-specific pricing  
* more sites  
* more internal roles  
* more agreement types  
* more brands per vendor  
* approval workflows  
* vendor portal expansion

### **Principle 6 — Secure but Practical**

The system should be secure and auditable without creating unnecessary friction for a small internal team.

---

## **1.14 Success Criteria**

Section 1 will be considered successfully implemented when the built application can do the following:

* create a vendor and one or more brands  
* assign one or more approved sites to each brand  
* create one quote per vendor and brand  
* generate one agreement package per vendor and brand  
* present pricing, expectations, and legal terms clearly  
* allow vendor access by secure link and optional login  
* capture acceptance and generate final locked record  
* retain final records indefinitely  
* allow internal admin handoff to WB  
* allow business-side users to update core settings without development

---

## **1.15 Section 1 Implementation Directive**

All later sections of this PRD/spec must follow the decisions in this section.

If a later workflow, schema, or UI design conflicts with the core rules defined here, the build must prioritize:

1. vendor-brand structure  
2. per-brand site approvals  
3. one quote per vendor-brand  
4. one agreement per vendor-brand  
5. admin-configurable business rules  
6. permanent legal record retention  
7. pre-WB workflow boundary 

# **Section 2 — Users, Access, and Permissions**

## **2.1 Section Purpose**

This section defines:

* who can access the platform  
* how users authenticate  
* how roles and permissions work  
* how access is granted, restricted, and revoked  
* what vendors can and cannot do  
* what admins can control without development  
* how access changes are audited

This section must be used by the AI build system to implement:

* authentication  
* user provisioning  
* role-based access control  
* vendor access flows  
* admin user management  
* security rules  
* audit logging for access events

---

## **2.2 Access Design Principles**

The access model must follow these principles.

### **Principle 1 — Low Friction for Internal Users**

Internal Shiekh users should be able to get into the system easily without manual setup when they use an approved internal email identity.

### **Principle 2 — Tight Control for External Users**

Vendors must only see the records that are explicitly assigned to them. They must never be able to see another vendor’s data.

### **Principle 3 — Future-Ready RBAC**

Even though launch access will be simple, the system must be built with a full role and permission engine so access can become more granular later without redevelopment.

### **Principle 4 — Admin-Managed Without Developers**

Admins must be able to manage:

* user access  
* allowlisted emails and domains  
* roles  
* permissions  
* signer assignments  
* magic link behavior  
* required field behavior  
* vendor edit rights

through settings, not code.

### **Principle 5 — Document-Phase Vendor Access**

Vendor access is primarily for the quote/agreement phase. After signature and WB handoff, vendor access may remain available as read-only or may be disabled by admin.

### **Principle 6 — Every Sensitive Access Event Must Be Auditable**

The system must record all meaningful access events, including:

* invites  
* logins  
* failed logins  
* role changes  
* permission changes  
* link generation  
* link revocation  
* document views  
* signature/acceptance events  
* account disablement

### **Principle 7 — Default Deny for External Data**

No external user should receive access by inference. All vendor access must be explicitly assigned by vendor, brand, or document scope.

### **Principle 8 — Final Legal Records Must Remain Protected**

Once a vendor accepts/signs a final agreement record, that record becomes locked. Access may be granted for viewing/downloading, but the content cannot be edited.

---

## **2.3 User Categories**

The system must support three high-level user categories.

### **2.3.1 Internal Users**

These are Shiekh-side users managing the platform.

Initial internal access model:

* any verified user with `@shiekhshoes.org` must automatically become an internal admin  
* other internal users may be granted access through an explicit allowlist of emails or domains  
* `theo@shiekhshoes.org` must be seeded as an internal admin  
* `theo@shiekh.com` must also be seeded as an internal admin through the allowlist mechanism

Even though all `@shiekhshoes.org` users will start as admins, the system must still support future internal role differentiation.

### **2.3.2 External Users**

These are vendor-side users who need access during quote and agreement review.

External access must support:

* one-time secure review access  
* full login by email if enabled  
* signer access  
* viewer access  
* limited record maintenance access for vendor-side contacts if allowed by admin

### **2.3.3 System Actors**

These are non-human actors such as:

* workflow jobs  
* notification services  
* PDF generation services  
* handoff automation services

System actors must never use normal human roles. They must use service-specific permissions and must always be logged as system actions in audit history.

---

## **2.4 Access Scope Model**

The system must support access at multiple scopes.

### **2.4.1 Global Scope**

Access to all records and all modules across the platform.

Used by:

* internal admins  
* system owners  
* system actors with narrowly defined service permissions

### **2.4.2 Vendor Scope**

Access to all records for one vendor company.

Used when a contact needs access across multiple brands managed by the same vendor.

### **2.4.3 Brand Scope**

Access to one vendor-brand record and its related documents.

This is the primary external scope for this platform.

### **2.4.4 Site Scope**

Access limited to one or more approved sites under a brand record.

This should be supported in the data model for future expansion, even if it is not heavily used at launch.

### **2.4.5 Document Scope**

Access to a specific quote version or agreement version only.

This is the default scope for one-time review links.

---

## **2.5 Initial Role Model**

The system must support a full role engine, but the launch configuration should use the following roles.

### **2.5.1 System Owner**

A protected internal role used for platform ownership safeguards.

Purpose:

* prevent accidental loss of top-level control  
* manage owner-level recovery tasks  
* protect against all admin accounts being removed or locked out

Daily operational permissions should be the same as Internal Admin.

Initial seeded owner accounts:

* `theo@shiekhshoes.org`  
* `theo@shiekh.com`

### **2.5.2 Internal Admin**

Full operational access to the platform.

Launch rule:

* every verified `@shiekhshoes.org` user must receive this role automatically  
* allowlisted internal users may also receive this role

Internal Admin permissions must include:

* full vendor management  
* full quote and agreement management  
* full site and brand management  
* full pricing and template management  
* full settings management  
* full WB handoff management  
* full reporting and audit access  
* full user and access management

### **2.5.3 Vendor Primary Contact**

Primary vendor-facing business contact for one vendor-brand or vendor scope.

May be allowed to:

* view assigned quotes and agreements  
* view approved sites  
* view final documents  
* update limited company/contact fields if enabled  
* upload requested documents if enabled  
* receive notifications  
* request changes if enabled

May not:

* edit pricing directly  
* change internal-only notes  
* change approval state  
* publish anything  
* manage system settings

### **2.5.4 Vendor Signer**

External signer role.

May:

* view the active sent/current quote or agreement assigned to them  
* accept/sign if designated as a signer  
* download the final executed copy  
* view limited legal and commercial history tied to their assigned scope

May not:

* edit pricing  
* edit terms  
* change site approvals  
* manage contacts unless also assigned another role with that capability

### **2.5.5 Vendor Viewer**

Read-only external role.

May:

* view assigned records  
* download permitted documents  
* receive notifications

May not:

* edit  
* sign  
* approve  
* reject on behalf of the vendor unless separately designated

### **2.5.6 System Actor**

Service or automation role.

Used only by backend processes such as:

* sending notifications  
* generating PDFs  
* running scheduled jobs  
* creating audit records  
* updating workflow states through approved logic

---

## **2.6 Launch Access Policy**

The launch access behavior is mandatory.

### **2.6.1 Internal Access at Launch**

* every verified `@shiekhshoes.org` user becomes an Internal Admin automatically  
* all such users have the same operational power at launch  
* system owners exist only as a safety layer to prevent lockout, not to create a separate daily workflow tier  
* internal access must support email login in addition to any Google login option

### **2.6.2 Allowlisted Internal Access**

The system must support explicit allowlists for:

* individual email addresses  
* entire email domains

Allowlisted internal users must be assignable to:

* Internal Admin  
* System Owner  
* future internal roles if later enabled

### **2.6.3 External Access at Launch**

Vendor access must support both:

* one-time secure access links  
* email-based login accounts

Default expected use case:

* vendor receives secure review link  
* vendor reviews quote/agreement  
* vendor accepts/signs  
* team moves vendor to WB  
* external access may later remain read-only or be disabled by admin

---

## **2.7 Authentication Methods**

The product must support different authentication methods by user type.

## **2.7.1 Internal Authentication**

Internal users must be able to sign in using:

* Google-based sign-in using their verified email identity  
* email-based login

Email-based login may be implemented as:

* email/password  
* passwordless email link  
* email OTP

The exact implementation can be finalized in Section 7, but the product behavior must support both Google identity and email login.

### **Internal authentication requirements**

* verified `@shiekhshoes.org` users auto-provision as Internal Admin  
* allowlisted non-`@shiekhshoes.org` internal users may sign in after verification  
* first login creates the user profile automatically  
* unverified internal emails must not receive admin access  
* disabled users must immediately lose access

## **2.7.2 External Authentication**

External users must be able to access the system through:

### **A. One-Time Secure Review Link**

Used for:

* quote review  
* agreement review  
* one-time signing flow  
* fast access without full account creation

Requirements:

* link must be tied to a specific contact and scope  
* link must be revocable  
* link must have an expiration time  
* expiration must be **admin-configurable**  
* default expiration should be configurable at the system level  
* the system should support regeneration/reissue without manual developer work

### **B. External Email Login**

Used when:

* a vendor needs repeated access  
* a vendor is managing revisions  
* a vendor needs to re-download records  
* a vendor is assigned multiple brand records

Requirements:

* login must be bound to an approved vendor contact  
* login must be scoped to assigned vendor/brand/document permissions  
* admin must be able to disable the account at any time

## **2.7.3 Fresh Verification for Signature Actions**

For stronger legal defensibility, the system must require fresh verification before final acceptance/signature.

Approved approaches:

* email one-time passcode to the invited signer email  
* re-authentication prompt  
* signature confirmation step tied to the email identity

A forwarded link alone must not be enough to complete final acceptance without verifying the intended signer identity.

---

## **2.8 Required Access Objects**

The platform must be built with the following access-related objects. Full schema will be defined in Section 5\.

### **Required objects**

* User  
* Role  
* Permission  
* Permission Bundle  
* Access Scope Assignment  
* Domain Allowlist Entry  
* Email Allowlist Entry  
* Vendor Contact Access Assignment  
* Signer Assignment  
* Magic Link Token / Review Link Token  
* Authentication Event Log  
* Access Change Log

---

## **2.9 Permission Framework**

### **2.9.1 Permission Naming Standard**

Permissions must use the format:

`module.action`

Examples:

* `users.view`  
* `users.manage`  
* `vendors.create`  
* `quotes.send`  
* `agreements.generate`  
* `settings.manage`  
* `audit.export`

### **2.9.2 Minimum Modules**

The system must support permissions for at least these modules:

* access  
* users  
* roles  
* vendors  
* brands  
* sites  
* contacts  
* quotes  
* agreements  
* documents  
* templates  
* terms  
* pricing  
* settings  
* notifications  
* reports  
* audit  
* wbHandoff  
* validation  
* workflow

### **2.9.3 Standard Actions**

The permission engine must support these action types where applicable:

* view  
* create  
* edit  
* archive  
* restore  
* delete  
* send  
* revoke  
* sign  
* accept  
* reject  
* generate  
* publish  
* configure  
* export  
* assign  
* manage  
* override

---

## **2.10 Minimum Permission Catalog**

The following permissions must exist in the build. More may be added later, but these are required.

### **Access and Identity**

* `access.login_internal`  
* `access.login_external`  
* `access.manage_allowlist`  
* `access.manage_domains`  
* `access.reissue_magic_link`  
* `access.revoke_magic_link`

### **Users and Roles**

* `users.view`  
* `users.invite_internal`  
* `users.invite_external`  
* `users.edit`  
* `users.disable`  
* `users.enable`  
* `users.reset_auth`  
* `roles.view`  
* `roles.manage`  
* `roles.assign`

### **Vendor, Brand, Contact, Site**

* `vendors.view`  
* `vendors.create`  
* `vendors.edit`  
* `vendors.archive`  
* `brands.view`  
* `brands.create`  
* `brands.edit`  
* `brands.archive`  
* `brands.assign_sites`  
* `contacts.view`  
* `contacts.create`  
* `contacts.edit`  
* `contacts.assign_access`  
* `sites.view`  
* `sites.manage`

### **Quotes**

* `quotes.view`  
* `quotes.create`  
* `quotes.edit_draft`  
* `quotes.send`  
* `quotes.revise`  
* `quotes.withdraw`  
* `quotes.archive`  
* `quotes.override_status`

### **Agreements**

* `agreements.view`  
* `agreements.generate`  
* `agreements.send`  
* `agreements.edit_draft`  
* `agreements.revise`  
* `agreements.lock`  
* `agreements.archive`  
* `agreements.override_status`

### **Documents**

* `documents.view`  
* `documents.upload`  
* `documents.download_internal`  
* `documents.download_external`  
* `documents.delete_unlocked`  
* `documents.generate_pdf`

### **Templates, Terms, Pricing**

* `templates.view`  
* `templates.edit`  
* `templates.publish`  
* `terms.view`  
* `terms.edit`  
* `terms.publish`  
* `pricing.view`  
* `pricing.edit`  
* `pricing.publish`

### **Settings and Configuration**

* `settings.view`  
* `settings.manage`  
* `settings.manage_required_fields`  
* `settings.manage_notifications`  
* `settings.manage_branding`  
* `settings.manage_workflows`

### **Vendor-Side Actions**

* `vendor.view_assigned`  
* `vendor.edit_limited_profile`  
* `vendor.upload_requested_files`  
* `vendor.request_changes`  
* `vendor.accept_quote`  
* `vendor.sign_agreement`

### **Reporting and Audit**

* `reports.view`  
* `reports.export`  
* `audit.view`  
* `audit.export`

### **WB Handoff**

* `wbHandoff.view`  
* `wbHandoff.mark_ready`  
* `wbHandoff.update_status`  
* `wbHandoff.complete_checklist`

### **Validation and Workflow Overrides**

* `validation.override_required_fields`  
* `workflow.override_steps`  
* `workflow.reassign_owner`  
* `workflow.reopen_record`

---

## **2.11 Role-to-Permission Mapping**

## **2.11.1 System Owner**

System Owner must have all Internal Admin permissions plus ownership safeguards.

Additional safeguarded actions:

* designate or remove other owners  
* protect against removal of the last owner account  
* manage internal auth policy defaults  
* recover access in break-glass scenarios

These ownership actions should be rarely used and always heavily audited.

## **2.11.2 Internal Admin**

Internal Admin must have full operational access to all normal product modules.

At launch, this includes:

* all user management  
* all vendor and brand management  
* all site management  
* all quote and agreement actions  
* all pricing/template/terms actions  
* all reporting and audit access  
* all settings access  
* all WB handoff access  
* override permissions where needed

Business rule:

* all verified `@shiekhshoes.org` users receive this role automatically

## **2.11.3 Vendor Primary Contact**

Vendor Primary Contact should receive:

* `vendor.view_assigned`  
* `documents.download_external`  
* optional `vendor.edit_limited_profile`  
* optional `vendor.upload_requested_files`  
* optional `vendor.request_changes`

Vendor Primary Contact must not receive:

* pricing edit permissions  
* template permissions  
* terms publish permissions  
* settings access  
* internal audit access

## **2.11.4 Vendor Signer**

Vendor Signer should receive:

* `vendor.view_assigned`  
* `vendor.accept_quote` when configured  
* `vendor.sign_agreement`  
* `documents.download_external`

Vendor Signer must only be able to sign documents for scopes explicitly assigned to them.

## **2.11.5 Vendor Viewer**

Vendor Viewer should receive:

* `vendor.view_assigned`  
* `documents.download_external` where allowed

Vendor Viewer must not be allowed to:

* sign  
* accept  
* upload internal documents  
* change commercial or legal terms

## **2.11.6 System Actor**

System actors must not receive human permission bundles. They must use narrowly defined service permissions that only cover their function.

Example:

* a notification service can create/send notifications but not manage users  
* a PDF generation service can generate PDFs but not change pricing  
* a scheduled workflow can expire records through system rules but not publish terms

---

## **2.12 Module Access Rules**

The system must enforce the following module-level access rules.

### **2.12.1 Users, Roles, and Access Settings**

Internal only.

External users must never see:

* user directory  
* roles  
* permission settings  
* domain allowlists  
* internal auth policy settings

### **2.12.2 Vendors, Brands, Contacts**

Internal admins may fully manage these.

External users may only see:

* their assigned vendor record  
* their assigned brand records  
* limited contact/company information if admin has allowed those fields to be visible/editable

### **2.12.3 Sites**

Internal only for management.

External users may only view the sites/brands approved within the quote/agreement they were sent. They must not manage the site list.

### **2.12.4 Quotes**

Internal admins may:

* create  
* edit drafts  
* revise  
* send  
* withdraw  
* archive  
* override status when permitted

External users may:

* view only the quote versions sent to them  
* accept/reject only if that workflow is enabled  
* never edit pricing or internal notes directly

### **2.12.5 Agreements**

Internal admins may:

* generate  
* edit drafts before lock  
* send  
* revise  
* archive  
* manage handoff status

External users may:

* review assigned agreement versions  
* sign only if designated as signer  
* download final executed documents when allowed

### **2.12.6 Templates, Terms, Pricing, Settings**

Internal only.

These modules must not be exposed to vendor users in launch scope.

### **2.12.7 Reports and Audit**

Internal only.

External users must not access:

* system-wide reports  
* internal dashboards  
* audit exports  
* user activity logs

### **2.12.8 WB Handoff**

Internal only.

Vendors may be informed that onboarding will continue in WB, but they should not see the internal WB handoff checklist or internal status notes unless explicitly designed later.

---

## **2.13 Internal Domain and Allowlist Rules**

The platform must support two internal access control methods.

## **2.13.1 Auto-Admin Internal Domain Rule**

Any verified user with the email domain:

* `@shiekhshoes.org`

must automatically be:

* provisioned as an internal user  
* assigned the Internal Admin role  
* granted access upon successful authentication

This auto-provisioning must happen on first successful login.

## **2.13.2 Explicit Allowlist Rule**

The system must also support allowlisting for:

* specific email addresses  
* entire domains

Use cases:

* `theo@shiekh.com`  
* future Shiekh-owned domains  
* temporary internal consultants  
* approved partner/internal cross-brand users

Each allowlist entry must support:

* email or domain value  
* assigned role  
* status  
* optional note  
* created by  
* created date  
* updated by  
* updated date

## **2.13.3 Remove/Disable Behavior**

If an allowlist entry is removed:

* existing users should not be silently deleted  
* admin must be able to choose whether to keep, disable, or revoke that user’s access  
* all actions must be audited

## **2.13.4 Ownership Protection**

The system must not allow removal of the last active System Owner.

---

## **2.14 Vendor Access Rules**

The vendor access model must support both ease of use and strong control.

### **2.14.1 Default Vendor Access Pattern**

Default recommended pattern:

1. internal admin sends secure review link  
2. vendor reviews quote/agreement  
3. vendor verifies identity before acceptance/signature  
4. system locks final record  
5. internal team completes WB handoff  
6. vendor access may remain read-only or be disabled

### **2.14.2 Vendor Scope Assignment**

Every vendor access grant must be explicitly scoped to one of the following:

* vendor  
* vendor-brand  
* site  
* document version

Launch default:

* vendor-brand scope for account-based access  
* document scope for magic-link access

### **2.14.3 Multi-Brand Support**

A single vendor-side user may be assigned to:

* one brand  
* multiple brands under the same vendor  
* future multi-vendor scope if explicitly allowed later

The build must support multiple scope assignments even if most launch cases use one vendor-brand.

### **2.14.4 Revised Quote / Agreement Handling**

When a quote or agreement is revised:

* prior sent links should become read-only or invalid based on admin-configurable policy  
* the vendor must be clearly shown which version is current  
* the system must prevent signing an obsolete version unless explicitly allowed through an override workflow

### **2.14.5 Post-WB Access**

Because this platform is primarily pre-WB, vendor access after WB handoff should be configurable.

Admins must be able to choose:

* keep access active  
* make access read-only  
* disable access after handoff  
* reissue access later for document retrieval

---

## **2.15 Account Lifecycle**

The platform must support full account lifecycle management.

### **2.15.1 Internal Account States**

Internal user states:

* invited  
* pending\_verification  
* active  
* locked  
* disabled  
* archived

### **2.15.2 External Account States**

External user/contact states:

* created\_no\_access  
* invite\_sent  
* pending\_verification  
* active  
* expired  
* disabled  
* archived

### **2.15.3 Lifecycle Rules**

* users with audit history must never be hard-deleted from the system record  
* disabling a user must revoke future access immediately  
* active sessions/tokens must be invalidated when a user is disabled  
* archived users remain searchable in history  
* changing a login email must require verification  
* access revocation must never remove historical audit ownership

---

## **2.16 Admin Controls for User and Access Management**

All of the following must be manageable by admins through the UI without development.

### **2.16.1 User Management Controls**

* invite internal user  
* invite vendor user  
* disable user  
* re-enable user  
* resend invite  
* reset external access  
* change role  
* add or remove scope assignment  
* designate signer  
* designate primary contact  
* view user history

### **2.16.2 Access Policy Controls**

* manage approved internal domains  
* manage internal allowlisted emails  
* set default internal role by domain  
* control whether external users can create full logins  
* set magic link expiration  
* set token reuse policy  
* revoke active links  
* control whether old links become invalid after revision

### **2.16.3 Vendor Access Behavior Controls**

* allow vendor to edit limited company info  
* allow vendor to edit limited contact info  
* allow vendor to upload requested files  
* allow vendor to request changes/comments  
* allow vendor to see historical versions or only current version  
* choose which fields are required  
* turn required fields on or off to reduce blocking

### **2.16.4 Owner Safeguard Controls**

* designate additional owners  
* transfer ownership  
* prevent accidental loss of owner coverage

---

## **2.17 Required Admin Screens**

The application must include the following access-related screens.

### **Internal screens**

* User Management  
* Roles and Permission Bundles  
* Domain Allowlist  
* Email Allowlist  
* Vendor Contact Access  
* Signer Management  
* Access Policy Settings  
* Login/Invite History  
* Security Event Log

### **Vendor-facing screens**

* Review Access Landing Page  
* Login / Verify Identity Page  
* Assigned Documents Page  
* Final Document Download Page

---

## **2.18 Security and Audit Requirements for Access**

The following requirements are mandatory.

### **2.18.1 Audit Requirements**

The system must log:

* who invited the user  
* who granted access  
* who changed permissions  
* who disabled access  
* who added or removed a domain allowlist entry  
* who generated or reissued a magic link  
* who revoked a magic link  
* every document view tied to external access  
* every signature/acceptance action  
* every authentication event relevant to business records

### **2.18.2 Access Enforcement Requirements**

* all permission checks must be enforced server-side  
* client-side UI hiding alone is not enough  
* external access must be explicit and scoped  
* expired or revoked links must stop working immediately  
* disabled users must lose access immediately  
* signed/final records must remain immutable

### **2.18.3 Download Security Requirements**

* file downloads must use secure, time-limited access methods  
* external users must only download documents tied to their scope  
* internal downloads may be broader but still audited for sensitive/legal records

### **2.18.4 Legal Defensibility Requirements**

For every final acceptance/signature action, the access system must preserve:

* the identity used  
* verification method  
* timestamp  
* IP address  
* user agent/device metadata  
* version signed  
* document snapshot reference

---

## **2.19 Required Business Rules for Launch**

The following are launch-critical and non-negotiable.

1. Any verified `@shiekhshoes.org` email must auto-provision as Internal Admin.  
2. `theo@shiekhshoes.org` must be seeded as System Owner and Internal Admin.  
3. `theo@shiekh.com` must be seeded as System Owner and/or Internal Admin through allowlist.  
4. Internal users must support email login.  
5. Vendor users must support secure review links and optional login.  
6. Vendor access must be scoped to explicit vendor-brand or document assignments.  
7. Vendors must never see another vendor’s data.  
8. Admins must be able to manage all user/access behavior through settings.  
9. Required fields must be admin-configurable so users are not blocked unnecessarily.  
10. Access changes and signature events must be fully auditable.

---

## **2.20 Acceptance Criteria for Section 2**

Section 2 will be considered implemented correctly when the built product can do all of the following:

* automatically create an Internal Admin account for any verified `@shiekhshoes.org` user  
* allow an admin to allowlist `theo@shiekh.com` and other internal emails/domains  
* let internal admins manage users and roles in settings  
* let internal admins create vendor contacts and assign external access  
* send secure vendor review links  
* support optional vendor login by email  
* restrict vendor access to assigned vendor-brand or document scope only  
* designate one or more vendor signers  
* revoke vendor access or reissue links without development  
* record every meaningful access and permission event in audit history  
* protect final signed records from unauthorized edits

---

## **2.21 Section 2 Implementation Directive**

All later sections of the PRD/spec must follow these access decisions.

If a later workflow or UI conflicts with this section, the build must prioritize:

1. automatic internal admin access for `@shiekhshoes.org`  
2. explicit allowlist support for other internal emails/domains  
3. dual vendor access model: secure link plus optional login  
4. vendor-brand/document scoped external access  
5. admin-managed settings for access behavior  
6. complete auditability of access and signature-related events

---

# **Section 3 — Workflows, Navigation, and Dashboard**

## **3.1 Section Purpose**

This section defines the operational flow, user journey, navigation structure, dashboard behavior, record movement, and screen-level workflow logic for the platform.

This section must guide the AI build for:

* app navigation  
* page structure  
* user flow  
* status flow  
* queues and worklists  
* dashboard cards and KPIs  
* vendor review experience  
* WB handoff process  
* no-code workflow controls  
* validation behavior  
* record lifecycle movement

This section is not only a UX reference. It is a product logic specification.

---

## **3.2 Workflow Design Principles**

The workflow and navigation model must follow these principles.

### **Principle 1 — The System Must Reduce Memory Work**

The application must guide users through the process so they do not have to remember:

* what information to ask for  
* what pricing to include  
* what sites are approved  
* what shipping expectations apply  
* what documents to send  
* what happens next

### **Principle 2 — The Primary Working Unit Is the Vendor-Brand Record**

The main operational unit is not just the vendor. It is the **vendor \+ brand** record.

This is because:

* one vendor may manage multiple brands  
* each brand may be approved for different sites  
* each brand may have its own quote and agreement history  
* WB handoff readiness must be tracked at the vendor-brand level

### **Principle 3 — Workflows Must Be Clean, Linear, and Easy to Recover**

The standard workflow should move forward clearly, but users must still be able to:

* save drafts  
* pause work  
* reopen drafts  
* revise sent records  
* reissue vendor access  
* recover from incomplete or rejected flows

### **Principle 4 — Drafts Must Never Be Fragile**

Users must be able to save incomplete work without being blocked unless they are at a configured gating step such as:

* sending a quote/agreement package  
* marking ready for signature  
* marking ready for WB

### **Principle 5 — Vendor Experience Must Be Simple**

The vendor should not need to understand the internal system structure. The vendor-facing experience should feel like one clear review package, even if the underlying system stores separate quote and agreement records.

### **Principle 6 — Internal UI Must Be Task-First**

The internal dashboard should prioritize:

* what needs attention  
* what is missing  
* what is overdue  
* what is ready to send  
* what is ready for WB

before broad reporting.

### **Principle 7 — Workflow Rules Must Be Admin-Configurable**

Admins must be able to control workflow behavior without development, including:

* required fields  
* reminder timing  
* quote expiry rules  
* whether vendors can request changes  
* whether old links are invalidated  
* whether workflow steps are enforced or optional

### **Principle 8 — Final Records Must Be Easy to Find**

Once a vendor signs, the final signed package and related history must be easy to retrieve from:

* vendor page  
* brand page  
* agreement page  
* documents page  
* global search  
* WB handoff page

---

## **3.3 Master Workflow Overview**

The product workflow must follow this high-level sequence.

### **Phase 1 — Vendor and Brand Setup**

1. Internal admin creates or finds vendor  
2. Internal admin creates or selects brand under that vendor  
3. Internal admin assigns approved site(s) for that brand  
4. Internal admin enters contacts and required business details

### **Phase 2 — Commercial Package Preparation**

5. Internal admin creates or updates quote for the vendor-brand  
6. Internal admin reviews pricing, fees, services, and site approvals  
7. Internal admin adds shipping/operational expectations  
8. Internal admin generates agreement draft from current commercial data  
9. Internal admin previews the vendor package

### **Phase 3 — Vendor Review**

10. Internal admin sends secure review access  
11. Vendor opens package by secure link or login  
12. Vendor reviews pricing, approved sites, legal terms, and expectations  
13. Vendor accepts, signs, rejects, or requests changes depending on workflow settings

### **Phase 4 — Finalization**

14. System locks the accepted version  
15. System generates final downloadable PDF and permanent record  
16. Internal admin verifies completion and marks vendor-brand as ready for WB

### **Phase 5 — WB Handoff**

17. Internal admin completes WB handoff checklist  
18. Internal admin marks handoff status  
19. Record moves to completed / active historical state

---

## **3.4 Workflow Modes**

The platform must support two workflow modes.

## **3.4.1 Default Launch Mode — Combined Review Package**

This is the recommended default for launch.

In this mode:

* the internal team creates a quote and agreement package together  
* the vendor sees one combined review experience  
* the vendor is not forced through separate commercial and legal portals  
* acceptance/signature finalizes the commercial and legal record together

Internally, the system still stores:

* quote record  
* agreement record  
* terms version  
* acceptance evidence  
* final PDF

This is the simplest experience for a small team and small vendor network.

## **3.4.2 Optional Future Mode — Sequential Quote Then Agreement**

The system must be designed so a later configuration can support:

1. quote acceptance first  
2. agreement generation second  
3. agreement signature third

This should be a workflow setting, not a system rewrite.

---

## **3.5 Primary Navigation Model**

The navigation must reflect how the business works.

### **3.5.1 Internal Navigation Tree**

```
Dashboard

Vendor Management
- Vendors
- Brands
- Contacts
- Sites / Channels

Commercial
- Quotes
- Pricing & Fees
- Services
- Templates
- Terms & Clauses

Agreements
- Agreements
- Signatures
- Documents

Operations
- WB Handoff
- Tasks / Queues
- Notifications
- Activity Log

Reporting
- Reports
- Saved Views

Settings
- User Access
- Roles & Permissions
- Company Profile
- Branding
- Site Configuration
- Workflow Settings
- Required Field Rules
- Notification Rules
- Document Rules
- Retention Rules
- Integrations
```

### **3.5.2 Navigation Priorities**

The left navigation should prioritize the pages used most often:

* Dashboard  
* Vendors  
* Brands  
* Quotes  
* Agreements  
* WB Handoff  
* Documents  
* Settings

Less frequently used configuration areas may be grouped under expandable sections.

### **3.5.3 Global Header**

The top application header must include:

* global search  
* quick create button  
* notification bell  
* current user menu  
* environment label if not production  
* company/brand logo

### **3.5.4 Quick Create Menu**

The quick create menu must allow:

* new vendor  
* new brand  
* new quote  
* new agreement draft  
* new contact  
* new site  
* new WB handoff record  
* upload document

---

## **3.6 Core Record Navigation Model**

The application must use a clear detail-page structure so users always know where they are.

## **3.6.1 Vendor Detail Page Tabs**

Each vendor detail page must include:

* Overview  
* Brands  
* Contacts  
* Quotes  
* Agreements  
* Documents  
* Activity  
* WB Handoff  
* Internal Notes

The vendor page is the parent directory page.

## **3.6.2 Brand Workspace Tabs**

The **brand workspace** is the main working page for operations.

Each brand workspace must include:

* Overview  
* Site Approvals  
* Commercial Terms  
* Quote  
* Agreement  
* Documents  
* Contacts  
* Activity  
* WB Handoff

This is where most daily work should happen.

## **3.6.3 Quote Detail Tabs**

Each quote detail page must include:

* Summary  
* Line Items / Pricing  
* Sites  
* Contacts  
* Terms Snapshot  
* Version History  
* Activity  
* Send / Access Log

## **3.6.4 Agreement Detail Tabs**

Each agreement detail page must include:

* Summary  
* Legal Terms  
* Commercial Schedule  
* Approved Sites  
* Signers  
* Version History  
* Final Documents  
* Activity  
* WB Handoff

## **3.6.5 WB Handoff Detail Tabs**

Each WB handoff page must include:

* Overview  
* Checklist  
* Assigned Owner  
* Status History  
* Notes  
* Related Quote  
* Related Agreement  
* Documents

---

## **3.7 Page Layout Standard**

All major internal pages must use a consistent layout.

### **Standard layout**

* **Header area:** title, status badge, primary actions, breadcrumbs  
* **Main content area:** current record or module content  
* **Right rail or side panel:** activity timeline, tasks, validation warnings, related records  
* **Tab/subnav area:** page-specific sections  
* **Footer action bar:** save, send, generate, archive, handoff actions where relevant

This layout is important so an AI can build a consistent frontend.

### **Required behavior**

* status must always be visible  
* primary action must always be visible  
* latest version indicator must always be visible  
* current approved sites must be visible from the main summary area  
* missing critical information must show as warnings, not hidden errors

---

## **3.8 Internal Dashboard**

The internal dashboard must be the primary command center for the team.

## **3.8.1 Dashboard Objective**

The dashboard should answer:

* what needs action now  
* what is blocked  
* what is waiting on vendor  
* what is ready for WB  
* what is overdue  
* what changed recently

## **3.8.2 Required Dashboard Sections**

### **A. Action Required**

This is the highest-priority dashboard section.

It must show:

* records missing required information  
* quotes ready to send  
* vendor packages awaiting review  
* agreements awaiting signature  
* WB handoffs waiting for action  
* overdue items

### **B. My Queue**

This must show records assigned to the current user, including:

* my draft records  
* my pending sends  
* my vendor follow-ups  
* my WB handoff items  
* my recently viewed records

### **C. Team Queue**

This must show team-level work such as:

* quotes in progress  
* sent packages awaiting response  
* vendor revisions requested  
* signed packages awaiting WB  
* blocked handoffs

### **D. Snapshot Metrics**

This must show top KPI cards, such as:

* total active vendor-brand records  
* quotes in draft  
* quotes sent  
* quotes awaiting vendor response  
* agreements awaiting signature  
* signed this month  
* ready for WB  
* WB handoffs overdue  
* completed this month

### **E. Alerts and Exceptions**

This must show:

* expired quotes  
* broken or revoked review links  
* records with missing signer  
* records with no approved site selected  
* records with no agreement attached  
* validation failures  
* failed document generation  
* failed reminder delivery

### **F. Recent Activity**

This must show a time-ordered feed of:

* quote sent  
* vendor viewed package  
* vendor requested changes  
* agreement signed  
* site approval changed  
* record marked ready for WB  
* WB handoff completed

---

## **3.8.3 KPI Cards**

The dashboard must support configurable KPI cards. At launch, the following cards are required:

* Vendors in Setup  
* Brands Ready for Quote  
* Quotes in Draft  
* Quotes Sent  
* Vendor Responses Pending  
* Agreements Awaiting Signature  
* Signed This Week  
* Ready for WB  
* WB Handoff In Progress  
* Completed / Archived

Each card must support click-through to a filtered list view.

---

## **3.8.4 Dashboard Filters**

The dashboard must support filtering by:

* site  
* brand  
* vendor  
* owner  
* status  
* date range  
* assigned user  
* completion state

These filters should persist during the session.

---

## **3.9 Vendor-Facing Navigation and Experience**

The vendor-facing experience must be simpler than the internal app.

## **3.9.1 Vendor Navigation Tree**

```
Review Package
- Summary
- Quote
- Agreement
- Approved Sites
- Company Info
- Contacts
- Documents
- Final Acceptance / Signature
```

If the vendor is using a one-time secure link, the navigation may be simplified into a step flow instead of a permanent side menu.

## **3.9.2 Vendor UX Principles**

The vendor experience must:

* feel professional  
* be readable on desktop and mobile  
* minimize clicks  
* clearly show current version  
* clearly show approved sites  
* clearly show pricing and fees  
* clearly show next action  
* clearly show support contact information

## **3.9.3 Vendor Summary Page**

The vendor summary page must show:

* brand name  
* vendor name  
* approved sites  
* package status  
* agreement version  
* key dates  
* support contact  
* primary action button

## **3.9.4 Vendor Review Pages**

The vendor must be able to access:

* quote summary  
* pricing detail  
* agreement text  
* site approvals  
* operational expectations  
* downloadable supporting documents

## **3.9.5 Vendor Final Action Page**

The final action page must:

* restate what is being accepted  
* show signer identity  
* allow final review  
* allow accept/sign  
* allow reject or request changes if enabled  
* show confirmation after completion  
* provide final document download

---

## **3.10 Detailed Workflow Stages**

## **3.10.1 Workflow A — New Vendor-Brand Setup**

### **Purpose**

Create a complete vendor-brand workspace ready for a quote.

### **Internal steps**

1. Create vendor or search for existing vendor  
2. Create new brand under the vendor  
3. Assign brand to one or more sites  
4. Add primary contacts  
5. Add operational and legal contact information  
6. Enter base business and shipping information  
7. Save draft

### **Output**

A vendor-brand record with status:

* `draft`  
* `collecting_info`  
* or `ready_for_quote`

### **Rules**

* draft can be saved with missing information  
* required fields at this stage are controlled by admin settings  
* missing information must appear as visible warnings  
* admins with override permission may continue even with warnings

---

## **3.10.2 Workflow B — Quote Preparation**

### **Purpose**

Create the commercial offer for one vendor-brand.

### **Required internal steps**

1. Open brand workspace  
2. Create quote draft  
3. Select pricing defaults  
4. Add or confirm fees  
5. Add services or commercial items  
6. Confirm approved sites  
7. Confirm contact roles  
8. Add shipping/operational expectations  
9. Attach required terms version  
10. Preview quote

### **Output**

A quote in status:

* `draft`  
* or `ready_to_send`

### **Rules**

* one active current quote per vendor-brand at a time  
* old quotes remain in history  
* new revisions supersede earlier versions  
* price structure is standard across sites for launch  
* system must support future site-specific price logic without redesign

---

## **3.10.3 Workflow C — Agreement Preparation**

### **Purpose**

Create the legal/commercial agreement tied to the current vendor-brand quote.

### **Required internal steps**

1. Generate agreement from current quote and settings  
2. Pull current approved sites  
3. Pull active terms and conditions version  
4. Pull operational expectation text  
5. Pull company and signer details  
6. Preview final package  
7. Assign signer(s)  
8. Confirm vendor access method

### **Output**

An agreement in status:

* `draft`  
* or `ready_to_send`

### **Rules**

* agreement must be created at the vendor-brand level  
* agreement should inherit the approved sites for that brand  
* agreement must attach the current versioned legal content  
* final vendor-facing package may display quote and agreement together

---

## **3.10.4 Workflow D — Send Vendor Review Package**

### **Purpose**

Send the vendor a secure review experience.

### **Internal actions**

1. Select send method  
   * secure one-time link  
   * vendor login  
   * both  
2. Set recipient(s)  
3. Set signer(s)  
4. Set access expiry  
5. Preview email  
6. Send

### **Output**

* quote status becomes `sent`  
* agreement status becomes `sent`  
* top-level vendor-brand status becomes `vendor_review` or `agreement_sent`

### **Required system behavior**

* send event logged  
* access token created  
* link expiration set  
* current version marked as vendor-visible  
* prior vendor-visible versions handled according to admin-configurable policy

---

## **3.10.5 Workflow E — Vendor Review**

### **Purpose**

Allow the vendor to review the current package.

### **Vendor actions**

* view package summary  
* view quote  
* view agreement  
* view approved sites  
* view downloadable files  
* accept/sign  
* reject  
* request changes if enabled

### **Required system behavior**

* record first view timestamp  
* show current version clearly  
* show outdated version warning if applicable  
* save access logs  
* prevent viewing of records outside assigned scope

### **Vendor-facing statuses**

* package opened  
* package under review  
* changes requested  
* rejected  
* signed / completed

---

## **3.10.6 Workflow F — Revision / Change Request**

### **Purpose**

Allow internal users to respond to vendor feedback without losing history.

### **Trigger conditions**

* vendor requests changes  
* internal team notices an error  
* pricing needs correction  
* site selection changes  
* signer/contact changes  
* template/legal content changes before signature

### **Internal steps**

1. Reopen current package as revision  
2. Clone latest version into editable draft  
3. Apply changes  
4. Review differences  
5. Re-send new current version

### **Rules**

* prior version must remain in history  
* prior version must become superseded or read-only  
* vendor must be shown only the current active version by default  
* admin can configure whether old links remain viewable or are invalidated

---

## **3.10.7 Workflow G — Acceptance and Signature**

### **Purpose**

Capture final vendor agreement.

### **Vendor steps**

1. Open final action page  
2. Verify signer identity  
3. Confirm acceptance of current terms  
4. Sign/accept  
5. Receive confirmation  
6. Download final document

### **Required system behavior**

* final action must use current active version only  
* signer identity must be verified before completion  
* acceptance timestamp must be recorded  
* version accepted must be recorded  
* final PDF must be generated and locked  
* quote and agreement should both be marked finalized according to configured workflow mode

### **Resulting statuses**

* quote becomes `accepted` or equivalent final accepted state  
* agreement becomes `signed`  
* vendor-brand status becomes `signed` then `ready_for_wb`

---

## **3.10.8 Workflow H — WB Handoff**

### **Purpose**

Complete the internal transition after signature.

### **Internal steps**

1. Open WB handoff page  
2. Confirm signed package exists  
3. Confirm approved sites are final  
4. Confirm required contacts are present  
5. Confirm operational details are complete  
6. Assign internal owner  
7. Mark as ready for WB  
8. Update handoff progress  
9. Mark complete when vendor-brand is uploaded to WB

### **Required WB handoff checklist items**

At minimum:

* signed agreement on file  
* final document generated  
* approved sites confirmed  
* primary contact confirmed  
* legal/signer contact confirmed  
* shipping expectations confirmed  
* return information confirmed if required  
* internal owner assigned  
* notes entered if anything is unusual

### **Status result**

* `ready_for_wb`  
* `wb_in_progress`  
* `wb_complete`

---

## **3.10.9 Workflow I — Completed / Historical State**

### **Purpose**

Preserve the record after the main process is finished.

### **Completed state behavior**

* record remains searchable  
* documents remain downloadable according to permissions  
* vendor access can remain active, become read-only, or be disabled  
* WB handoff status remains visible  
* final signed version remains immutable  
* later amendments must create a new version path, not overwrite history

---

## **3.11 Top-Level Status Models**

The system must maintain clear statuses at multiple layers.

## **3.11.1 Vendor-Brand Operational Status**

This is the main status shown in lists and dashboards.

Required statuses:

* `draft`  
* `collecting_info`  
* `ready_for_quote`  
* `quote_in_progress`  
* `quote_sent`  
* `vendor_review`  
* `revision_needed`  
* `agreement_preparing`  
* `agreement_sent`  
* `awaiting_signature`  
* `signed`  
* `ready_for_wb`  
* `wb_in_progress`  
* `wb_complete`  
* `suspended`  
* `archived`

### **Status rules**

* only one top-level active operational status at a time  
* status should auto-update from quote/agreement actions where possible  
* admins may override with audit reason if permitted

---

## **3.11.2 Quote Status**

Required statuses:

* `draft`  
* `ready_to_send`  
* `sent`  
* `viewed`  
* `changes_requested`  
* `rejected`  
* `accepted`  
* `expired`  
* `withdrawn`  
* `superseded`

### **Quote rules**

* only one current active quote version per vendor-brand  
* superseded versions remain in history  
* expired quotes can be revised into new versions  
* accepted quote state may be auto-derived from signed agreement in combined workflow mode

---

## **3.11.3 Agreement Status**

Required statuses:

* `draft`  
* `ready_to_send`  
* `sent`  
* `viewed`  
* `changes_requested`  
* `awaiting_signature`  
* `signed`  
* `superseded`  
* `voided`  
* `archived`

### **Agreement rules**

* signed agreements cannot be edited directly  
* amendments create new versions, not direct edits  
* only one current executable agreement version may be active at a time for a vendor-brand unless future business rules explicitly support multiple parallel agreements

---

## **3.11.4 WB Handoff Status**

Required statuses:

* `not_started`  
* `ready`  
* `assigned`  
* `queued`  
* `uploaded`  
* `verified`  
* `complete`  
* `blocked`  
* `canceled`

### **WB rules**

* this is internal only  
* WB status must be visible from vendor-brand and agreement pages  
* blocked WB handoffs must appear in dashboard alerts

---

## **3.12 Required Screen Inventory**

The build must include at least the following internal screens.

## **3.12.1 Internal Core Screens**

* Dashboard  
* Vendor List  
* Vendor Detail  
* Brand List  
* Brand Workspace  
* Contact Directory  
* Quote List  
* Quote Detail  
* Quote Builder  
* Agreement List  
* Agreement Detail  
* Agreement Builder / Preview  
* Documents Repository  
* WB Handoff List  
* WB Handoff Detail  
* Tasks / Queue View  
* Activity Log  
* Reports  
* Notifications Center  
* Settings

## **3.12.2 Configuration Screens**

* Site Configuration  
* Pricing & Fees  
* Services  
* Template Manager  
* Terms & Clauses  
* Workflow Settings  
* Required Field Rules  
* User Access  
* Branding  
* Company Profile  
* Retention Rules  
* Integrations

## **3.12.3 Vendor-Facing Screens**

* Secure Access Landing Page  
* Vendor Login  
* Review Package Summary  
* Quote Review  
* Agreement Review  
* Approved Sites Review  
* Company / Contact Confirmation  
* Signature / Acceptance Screen  
* Completion / Download Screen

---

## **3.13 Quote Builder Flow**

The quote builder must use a guided step-based interface.

### **Required quote builder steps**

1. Vendor  
2. Brand  
3. Sites  
4. Contacts  
5. Commercial Terms  
6. Fees and Pricing  
7. Shipping / Operational Expectations  
8. Terms and Legal References  
9. Review and Preview  
10. Save or Send

### **Builder rules**

* each step autosaves  
* users can move backward and forward freely  
* incomplete steps show warnings  
* current validation state is visible at all times  
* admin-configurable required fields apply at step level  
* users can save incomplete drafts without losing progress

---

## **3.14 Agreement Builder Flow**

The agreement builder should be driven by quote data and active templates.

### **Required agreement builder steps**

1. Source Quote Selection  
2. Approved Sites Confirmation  
3. Signer and Contact Assignment  
4. Legal Template Selection  
5. Commercial Schedule Review  
6. Shipping / Operational Terms Review  
7. Supporting Documents  
8. Preview  
9. Send

### **Agreement builder rules**

* the agreement should inherit brand, site, and commercial data from the current quote  
* signer assignment is mandatory before send  
* preview must show final package exactly as vendor will see it  
* any changes after send must create a new version or revision flow

---

## **3.15 Search, Filters, and Saved Views**

The platform must support fast retrieval of records.

## **3.15.1 Global Search**

The global search must support:

* vendor name  
* brand name  
* contact name  
* contact email  
* quote number  
* agreement number  
* site name  
* WB status  
* signer email

## **3.15.2 List Filters**

All core list pages must support filters relevant to that module.

Examples:

* status  
* owner  
* site  
* vendor  
* brand  
* signer  
* date created  
* date sent  
* date signed  
* ready for WB  
* overdue  
* archived state

## **3.15.3 Saved Views**

Internal admins must be able to save common views such as:

* My Draft Quotes  
* Waiting on Vendor  
* Ready for WB  
* Signed This Week  
* Missing Contacts  
* Karmaloop Pending  
* MLTD Ready to Send

Saved views must be:

* user-specific by default  
* shareable if enabled later

---

## **3.16 Tasks, Queues, and Action Lists**

The system must generate queue-based workflows for internal users.

### **Required queue types**

* Drafts Needing Completion  
* Ready to Send  
* Waiting on Vendor  
* Vendor Changes Requested  
* Awaiting Signature  
* Ready for WB  
* WB Blocked  
* Completed This Week  
* Exceptions / Errors

### **Queue behavior**

* each queue must be clickable from dashboard  
* queues must support bulk actions where safe  
* queues must show owner, status, next action, and age  
* queues must sort by urgency by default

---

## **3.17 Validation and Gating Logic**

Validation must help users without creating unnecessary friction.

## **3.17.1 Validation Levels**

The system must support three levels of validation.

### **Informational**

A helpful note that does not block progress.

### **Warning**

A notable issue that should be resolved before send, but may be bypassed by an authorized admin.

### **Blocking Error**

A configured gating failure that prevents the next step until resolved.

## **3.17.2 Draft Behavior**

Drafts must never be blocked from saving because of missing non-system-critical data.

## **3.17.3 Send Behavior**

When a user tries to send a quote/agreement package, the system must run a send-readiness check.

This check should validate items such as:

* vendor exists  
* brand exists  
* at least one site selected  
* pricing present  
* signer/contact assigned  
* required legal version selected  
* required fields present based on current settings

## **3.17.4 Admin Override**

Admins with override permission may bypass warnings or blocking rules if the setting allows it.

Every override must:

* require a reason  
* be logged in activity history  
* be visible in audit logs

## **3.17.5 Required Field Controls**

Admins must be able to make fields:

* required  
* optional  
* hidden  
* internal-only  
* vendor-editable  
* vendor-view-only

This must be manageable without code.

---

## **3.18 Reminder and Follow-Up Logic**

Workflow automation must support reminder behavior.

### **Required reminder events**

* package sent but not opened  
* package opened but not completed  
* changes requested but not updated  
* signature pending  
* ready for WB but not assigned  
* WB assigned but not completed

### **Reminder rules**

* timing must be admin-configurable  
* reminders can be paused per record  
* reminders must stop once the record reaches a completed terminal state  
* reminder history must be visible from the record activity panel

---

## **3.19 Mobile and Responsive Behavior**

The internal application should be optimized primarily for desktop, but the vendor-facing experience must be mobile-friendly.

### **Internal requirements**

* desktop-first  
* responsive down to tablet width  
* dense table views allowed where useful

### **Vendor requirements**

* mobile-friendly summary and signature flow  
* readable legal and pricing views on smaller screens  
* large clear action buttons  
* final sign/accept step must work on mobile

---

## **3.20 Admin-Configurable Workflow Controls**

The following workflow controls must be manageable in settings without development.

### **Workflow controls**

* default workflow mode  
  * combined package  
  * sequential quote then agreement  
* default quote expiry period  
* reminder intervals  
* whether vendor can request changes  
* whether vendor can reject  
* whether old links are invalidated after revision  
* whether vendor can see prior versions  
* required step gating rules  
* required field rules by module  
* default owner assignment  
* WB checklist template  
* ability to pause or disable certain workflow steps  
* ability to mark fields non-required to reduce user blocking

---

## **3.21 Activity Timeline Requirements**

Every major record must have an activity timeline.

### **Activity types**

* vendor created  
* brand created  
* site assigned  
* quote draft created  
* quote updated  
* package sent  
* link opened  
* changes requested  
* agreement revised  
* signed  
* final PDF generated  
* record marked ready for WB  
* WB handoff completed  
* override applied

### **Timeline behavior**

* newest first  
* filterable by activity type  
* show actor, timestamp, summary  
* link to related version where relevant

---

## **3.22 UX Requirements for Clarity**

The following UI requirements are mandatory.

### **Required visual indicators**

* always show current status  
* always show approved sites  
* always show current version  
* always show primary action  
* always show if a record is missing required information  
* always show if a vendor is awaiting action or internal team is awaiting action

### **Required workflow aids**

* breadcrumbs  
* version compare view  
* validation summary panel  
* send preview  
* confirmation modals for irreversible actions  
* duplicate / clone action for repeat work

### **Required clarity rules**

* use business language, not technical jargon  
* do not expose internal database concepts to vendors  
* label status clearly  
* keep action labels plain, such as:  
  * Save Draft  
  * Send to Vendor  
  * Mark Ready for WB  
  * Reissue Access  
  * Download Final Agreement

---

## **3.23 Acceptance Criteria for Section 3**

Section 3 will be considered implemented correctly when the built application can do all of the following:

* let an internal admin create a vendor and brand workspace  
* assign approved sites per brand  
* guide the admin through a quote builder  
* generate an agreement package from the vendor-brand record  
* send a vendor review package through secure access or login  
* let the vendor review and sign in a simple, current-version-only experience  
* preserve revision history while keeping only one current active version  
* display clear statuses across vendor-brand, quote, agreement, and WB handoff records  
* show internal dashboard queues for action required, waiting on vendor, and ready for WB  
* allow admins to save incomplete drafts without blocking  
* allow admins to configure required fields and workflow gates without code  
* provide an internal WB handoff checklist and status flow  
* keep completed records searchable and easy to retrieve

---

## **3.24 Section 3 Implementation Directive**

All later sections of the PRD/spec must follow this workflow and navigation structure.

If later module design conflicts with this section, the build must prioritize:

1. vendor-brand as the main operational workspace  
2. per-brand site approvals  
3. simple vendor-facing review experience  
4. clean internal queue-based workflow  
5. save-draft flexibility with configurable gates  
6. clear handoff into WB after signature  
7. admin-configurable workflow behavior without development

---

# **Section 4 — Vendor/Site Management, Quotes, and Agreements**

## **4.1 Section Purpose**

This section defines the core business modules that the platform must manage:

* vendors  
* brands  
* sites / channels  
* site approvals  
* commercial terms  
* quotes  
* agreements  
* supporting documents  
* final vendor package generation

This section must guide the AI build for:

* data relationships  
* screen design  
* workflow logic  
* form behavior  
* document composition  
* revisions and versioning  
* vendor review package structure  
* final agreement locking  
* WB handoff readiness

This section follows the business decisions already confirmed in Sections 1–3 and should be treated as the main source for how the app manages vendor-facing commercial and legal records.

This section also reflects the legacy dropship guidance and WB handoff context from your uploaded reference documents, which should be treated as seed input rather than current hardcoded policy: Dropship Guidelines and Welcome Packet, Workbench Shopify Instructions, and Karmaloop Workbench Update.

---

## **4.2 Module Design Principles**

The modules in this section must follow these rules.

### **Principle 1 — Vendor-Brand Is the Main Commercial Unit**

The operational unit is not just the vendor. It is the **vendor \+ brand**.

That means:

* one vendor may manage multiple brands  
* each brand may have different approved sites  
* each brand may have its own quote history  
* each brand may have its own agreement history  
* each brand must have its own WB handoff state

### **Principle 2 — Site Approval Must Be Controlled Per Brand**

A vendor may be approved for one site, multiple sites, or all sites, and that approval must be set at the brand level.

### **Principle 3 — Pricing Is Standard Across Sites at Launch**

Commercial pricing must be standard across sites for the first version of the system.

However, the system must be built so site-specific pricing can be added later without changing the core data model.

### **Principle 4 — One Current Quote and One Current Agreement Per Vendor-Brand**

The system must preserve full history, but at any point in time there should only be:

* one current working quote  
* one current working agreement package

Older versions must remain in history and become superseded when replaced.

### **Principle 5 — Final Agreement Package Must Be Clear to the Vendor**

The vendor should experience the package as one clean review flow, even if the system stores quote, terms, and agreement records separately.

### **Principle 6 — Legacy Defaults Must Be Seeded but Not Hardcoded**

Any values imported from old Karmaloop / dropship documents must be loaded as editable defaults and marked as requiring admin review before production use.

### **Principle 7 — Business Users Must Be Able to Maintain the Module**

Admins must be able to update:

* sites  
* services  
* fees  
* quote defaults  
* agreement text  
* shipping expectation fields  
* required fields  
* document templates  
* support contacts  
* vendor package structure

without developer involvement.

### **Principle 8 — The Module Must End at WB Handoff**

This system must prepare a vendor for WB, not replace WB.

---

## **4.3 Core Business Objects**

The platform must support the following business objects in this section.

### **4.3.1 Vendor**

The legal or commercial business entity entering the dropship relationship.

A vendor can:

* manage one or more brands  
* have multiple contacts  
* have multiple quote and agreement histories through its brands  
* have one or more shipping and operational profiles

### **4.3.2 Brand**

A brand managed by a vendor.

A brand is required because:

* some vendors manage 2–3 brands  
* site approvals may differ by brand  
* quotes and agreements are created at the vendor-brand level

### **4.3.3 Site / Channel**

A destination where a vendor brand may be approved to sell.

Initial seeded sites:

* Shiekh.com  
* Karmaloop.com  
* MLTD.com

These must be seeded in settings but remain fully editable and admin-configurable.

### **4.3.4 Site Approval Record**

A structured record tying one brand to one site and defining whether that brand is allowed to sell there.

### **4.3.5 Commercial Profile**

A set of pricing, fee, service, and operational values used to generate a quote and agreement package.

### **4.3.6 Quote**

A commercial offer record for one vendor-brand.

### **4.3.7 Agreement**

A legal/commercial acceptance record for one vendor-brand.

### **4.3.8 Vendor Package**

The vendor-facing package shown for review. It may combine:

* quote summary  
* fee schedule  
* approved sites  
* operational expectations  
* legal terms  
* supporting attachments  
* signature / acceptance step

### **4.3.9 WB Handoff Record**

An internal record showing the vendor-brand package is signed and ready to move into WB.

---

## **4.4 Vendor Management Module**

## **4.4.1 Module Purpose**

The Vendor module stores the master business record for each external partner.

This module must act as the parent record for:

* brands  
* contacts  
* agreements  
* documents  
* internal notes  
* compliance or setup materials  
* WB handoff relationships

## **4.4.2 Vendor Screen Requirements**

The vendor detail page must support:

* Overview  
* Brands  
* Contacts  
* Commercial Summary  
* Agreements  
* Documents  
* Activity  
* WB Handoff  
* Internal Notes

## **4.4.3 Vendor Required Fields**

The vendor module must support, at minimum:

### **Identity**

* legal company name  
* display name  
* DBA / trade name  
* website  
* business type  
* tax or business identifier if required  
* status

### **Business Contact Information**

* primary business contact  
* legal contact  
* operations contact  
* support contact  
* finance contact  
* email(s)  
* phone(s)

### **Address Information**

* business address  
* remit / payout address if needed  
* returns address  
* warehouse / ship-from address  
* mailing address

### **Program Information**

* onboarding source  
* notes  
* internal owner  
* active/inactive state  
* vendor tags  
* risk / exception flags if later enabled

## **4.4.4 Vendor Actions**

Internal admins must be able to:

* create vendor  
* edit vendor  
* archive vendor  
* reactivate vendor  
* add notes  
* assign owner  
* add contacts  
* add brands  
* attach documents  
* view historical activity

## **4.4.5 Vendor Rules**

* a vendor may exist without a brand  
* a vendor cannot be sent a quote or agreement until a brand exists  
* vendors with historical audit activity must not be hard-deleted  
* archived vendors remain searchable  
* any vendor edits after a signed agreement must not retroactively change the historical agreement snapshot

---

## **4.5 Brand Management Module**

## **4.5.1 Module Purpose**

The Brand module is the main operational layer under each vendor.

The brand workspace must be where the team manages:

* site approvals  
* commercial terms  
* quotes  
* agreements  
* operational expectations  
* signer selection  
* WB handoff readiness

## **4.5.2 Brand Required Fields**

Each brand record must support:

### **Identity**

* brand name  
* internal reference code if used  
* status  
* vendor relationship  
* description / notes

### **Ownership / Relationship**

* parent vendor  
* primary internal owner  
* primary external contact  
* signer contact  
* legal contact  
* operations contact

### **Commercial Context**

* pricing profile  
* fee profile  
* service selections  
* active quote reference  
* active agreement reference

### **Site Context**

* one or more site approval records  
* default selling sites  
* internal restrictions or notes by site

### **Operational Context**

* shipping profile  
* return profile  
* support expectations  
* WB handoff notes

## **4.5.3 Brand Statuses**

Required brand-level statuses:

* draft  
* info\_incomplete  
* ready\_for\_quote  
* quote\_in\_progress  
* vendor\_review  
* revision\_needed  
* signed  
* ready\_for\_wb  
* wb\_complete  
* suspended  
* archived

## **4.5.4 Brand Rules**

* one vendor may have multiple brand records  
* each brand may have different site approvals  
* each brand may have separate quote and agreement histories  
* each brand may have separate WB handoff status  
* the brand page must always show current approved sites, active quote state, agreement state, and handoff state

---

## **4.6 Site / Channel Management Module**

## **4.6.1 Module Purpose**

The Site module defines the list of destinations where a vendor brand may be approved to sell.

At launch, the system must seed:

* Shiekh.com  
* Karmaloop.com  
* MLTD.com

These must be created through system seed data, but then controlled through admin settings.

## **4.6.2 Site Fields**

Each site record must support:

* site name  
* display label  
* internal code  
* status  
* description  
* active / inactive  
* sort order  
* default branding if needed later  
* notes  
* future site-specific configuration placeholders

## **4.6.3 Site Actions**

Admins must be able to:

* add a site  
* rename a site  
* deactivate a site  
* reorder a site  
* hide a site from selection  
* mark a site available for new approvals only  
* attach future site-specific configuration

## **4.6.4 Site Approval Record**

The system must store site approval separately from the site definition itself.

Each **site approval record** must belong to:

* one vendor  
* one brand  
* one site

### **Site approval fields**

* site reference  
* approval status  
* internal approval date  
* effective date  
* end date if applicable  
* approval notes  
* restrictions if any  
* go-live ready flag  
* created by  
* updated by  
* historical changes

## **4.6.5 Site Approval Statuses**

Required statuses:

* not\_selected  
* selected  
* pending\_internal\_review  
* approved  
* restricted  
* inactive  
* denied  
* revoked

Launch default behavior can be simplified to selected / approved unless internal review is enabled later.

## **4.6.6 Site Approval Rules**

* site approval must be selected per brand  
* a brand may be approved on one or more sites  
* site approval should appear in both the quote and the agreement  
* vendors must clearly see which sites they are approved for  
* site approval must be editable before signature  
* changing site approval after signature must require a revision or amendment flow

---

## **4.7 Contacts and Signers Within the Commercial Module**

## **4.7.1 Contact Types**

The system must support multiple contact roles per vendor-brand, including:

* primary business contact  
* legal contact  
* operations contact  
* finance contact  
* returns contact  
* support contact  
* signer

A single person may fill multiple roles.

## **4.7.2 Contact Rules**

* at least one external contact is required before send  
* at least one signer is required before final agreement send  
* signer may be the same as the primary contact  
* contact role requirements must be admin-configurable  
* contacts may be reused across multiple brands under the same vendor

## **4.7.3 Contact Visibility**

The internal team should see all assigned contacts.

Vendors should only see:

* the contacts included in their review package  
* or the contacts admins have marked vendor-visible

---

## **4.8 Commercial Terms and Pricing Model**

## **4.8.1 Module Purpose**

The platform must support a structured commercial profile used to generate quotes and agreements consistently.

This module must replace one-off email pricing discussions and legacy document edits.

## **4.8.2 Launch Pricing Rule**

Pricing is standard across sites for launch.

That means:

* Shiekh.com  
* Karmaloop.com  
* MLTD.com

must all use the same base pricing model at launch unless manually overridden through an admin-approved exception path.

## **4.8.3 Future Pricing Design Rule**

Even though pricing is standard at launch, the data model must still support future expansion for:

* site-specific fees  
* site-specific services  
* site-specific clauses  
* site-specific commissions  
* site-specific schedules

These future fields may exist in the schema but remain inactive in the launch UI.

## **4.8.4 Commercial Components**

The commercial model must support the following categories:

### **Services**

Examples:

* dropship program participation  
* onboarding service  
* platform access service  
* category participation  
* special marketing/service line items  
* custom internal commercial items

### **Fees**

Examples:

* monthly program fee  
* setup fee  
* service fee  
* cancellation fee  
* chargeback-style fee  
* negotiated custom fee

### **Rate / Commission Terms**

Examples:

* commission percentage  
* payout logic  
* reimbursement logic  
* discount handling  
* exception-based overrides

### **Operational Financial Terms**

Examples:

* monthly minimum thresholds  
* payout timing rules  
* cancellation timing rules  
* shipping reimbursement language  
* exceptions and negotiated terms

---

## **4.9 Legacy Seed Commercial Defaults**

The system must support loading legacy values from the historical dropship packet as **seed defaults** only. These values must not go live automatically without admin confirmation.

These seeded defaults should be loaded into a `draft_seed` or similar review state so admins can approve, modify, or discard them.

## **4.9.1 Seeded Legacy Defaults to Preload for Review**

The initial seed set should include the following historical defaults from the legacy packet:

* monthly fee default: **$40/month**  
* payout hold threshold: **$300 minimum**  
* inactive/low-sales forfeiture rule after **60 days**  
* aged order cancellation threshold: **5 days without approved exception**  
* cancellation fee default: **$10 per canceled order**  
* additional chargeback / gift-code recovery rule: **30% of sold item cost**  
* commission default: **40% of net sales unless otherwise negotiated**  
* payment timing: prior month shipped sales paid in the following month  
* shipping reimbursement language based on customer-collected shipping charges

These must be editable and version-controlled in settings before use.

## **4.9.2 Legacy Seed Operational Defaults to Preload for Review**

The initial seed set should also include editable operational defaults such as:

* shipping timeframe expectations  
* returns handling expectations  
* support contact routing  
* accounting contact routing  
* dropship support contact information  
* marketing asset routing contacts  
* WB-related support contacts

These values must be editable and must never be hardcoded into generated documents.

## **4.9.3 Legacy Seed Rule**

Every seeded default from legacy docs must display as:

* seeded from historical policy  
* admin review required  
* not final until published

---

## **4.10 Quote Module**

## **4.10.1 Module Purpose**

The Quote module creates the commercial offer for a vendor-brand.

Each quote must define:

* what the vendor is being offered  
* what sites are included  
* what fees and rates apply  
* what operational expectations apply  
* what legal version is being attached

## **4.10.2 Quote Scope Rule**

There must be **one quote per vendor and brand** per active negotiation cycle.

This means:

* one vendor can have multiple brand quotes  
* one brand should only have one current active quote  
* revisions create new quote versions, not entirely separate unrelated records

## **4.10.3 Quote Screen Requirements**

Each quote detail page must show:

* quote number  
* vendor  
* brand  
* approved sites  
* pricing summary  
* line items  
* services  
* fees  
* operational expectations summary  
* version number  
* current status  
* dates  
* linked agreement  
* linked documents  
* activity timeline

## **4.10.4 Quote Header Fields**

Each quote must support:

* quote number  
* vendor reference  
* brand reference  
* status  
* version number  
* currency  
* issue date  
* valid until date  
* created by  
* owner  
* recipient contact(s)  
* signer candidate(s)  
* notes internal  
* notes vendor-visible

## **4.10.5 Quote Content Sections**

Each quote must support the following sections:

### **Commercial Summary**

High-level explanation of the offer.

### **Site Approval Summary**

Which sites the brand is approved for.

### **Services and Program Scope**

What the vendor is joining or receiving.

### **Fees and Pricing**

Line-level commercial structure.

### **Operational Expectations**

Shipping, returns, tracking, and support expectations.

### **Legal Reference Section**

A short summary pointing to the attached terms/agreement package.

### **Signature / Next Step Section**

Whether the quote is informational, accepting, or leading directly into the agreement flow.

## **4.10.6 Quote Line Item Types**

The quote builder must support these line item types:

* service line item  
* recurring fee  
* one-time fee  
* percentage-based term  
* informational non-priced line  
* discount  
* adjustment  
* negotiated exception item  
* internal-only note item not shown to vendor

## **4.10.7 Quote Actions**

Internal admins must be able to:

* create quote  
* save draft  
* duplicate quote  
* revise quote  
* preview quote  
* send quote  
* withdraw quote  
* expire quote  
* archive quote  
* convert quote into agreement package  
* regenerate quote document output

Vendor users may be allowed to:

* view quote  
* download quote  
* accept quote if enabled  
* reject quote if enabled  
* request changes if enabled

## **4.10.8 Quote Rules**

* a quote cannot be sent without a vendor, brand, site selection, and recipient  
* a quote must show approved sites  
* a quote must reference the current commercial settings snapshot  
* a quote must retain the pricing snapshot used at send time  
* quote validity period must be admin-configurable  
* quote expiration must be extendable by admin  
* sending a revised quote must supersede the previous current version

---

## **4.11 Agreement Module**

## **4.11.1 Module Purpose**

The Agreement module creates the legal/commercial acceptance record for one vendor-brand.

The agreement must be the official record that the vendor reviewed and accepted the package.

## **4.11.2 Agreement Scope Rule**

There must be **one agreement package per vendor and brand** for each current active negotiation cycle.

Like quotes:

* a vendor can have multiple brand agreements over time  
* each brand should only have one current active executable agreement package  
* revisions and amendments create new versions

## **4.11.3 Agreement Screen Requirements**

Each agreement detail page must show:

* agreement number  
* vendor  
* brand  
* approved sites  
* agreement template version  
* terms version  
* commercial schedule summary  
* signer(s)  
* status  
* sent date  
* signed date  
* final PDF  
* linked quote  
* linked WB handoff record  
* activity timeline

## **4.11.4 Agreement Content Structure**

Each agreement package must support these major sections:

### **Section A — Cover / Summary**

* vendor name  
* brand name  
* approved sites  
* package status  
* effective date or proposed date  
* internal owner/support contact

### **Section B — Commercial Schedule**

* services  
* fees  
* rates  
* commercial commitments  
* negotiated exceptions  
* pricing summary

### **Section C — Site Approval Schedule**

* list of approved sites  
* notes or restrictions by site if any

### **Section D — Operational Expectations**

* shipping SLA  
* carrier expectations  
* tracking expectations  
* return address / return handling  
* cancellation expectations  
* service/support obligations

### **Section E — Legal Terms and Conditions**

* current terms version  
* clause insertions  
* legal disclosure blocks  
* version date / version ID

### **Section F — Signer / Acceptance**

* signer name  
* signer email  
* acceptance text  
* signature action  
* timestamp and verification capture

### **Section G — Supporting Attachments**

Optional attached documents or schedules.

## **4.11.5 Agreement Actions**

Internal admins must be able to:

* create agreement draft  
* generate from quote  
* edit draft before send  
* assign signers  
* preview final package  
* send package  
* revise package  
* void package before signing  
* archive final record  
* generate final PDF  
* download final PDF  
* mark ready for WB

Vendor users may be allowed to:

* view package  
* sign / accept  
* reject  
* request changes if enabled  
* download final document after completion

## **4.11.6 Agreement Rules**

* agreement must inherit vendor, brand, and approved site data from the vendor-brand workspace  
* agreement must inherit current commercial schedule from the active quote or approved commercial profile  
* agreement must bind to a versioned legal record  
* agreement must preserve a snapshot of what was shown to the vendor  
* signed agreements must become immutable  
* any post-sign change must create a revised version or amendment path

---

## **4.12 Vendor Package Composition**

## **4.12.1 Package Goal**

The vendor should receive one clean review package, even if the system internally stores separate quote and agreement objects.

## **4.12.2 Required Package Components**

The vendor-facing package must include:

* summary page  
* vendor and brand identification  
* approved sites  
* commercial summary  
* fee / pricing schedule  
* operational expectations  
* legal terms  
* supporting documents  
* signer action  
* confirmation page after completion

## **4.12.3 Package Readability Rules**

The package must:

* use plain business language  
* clearly separate pricing from legal text  
* clearly identify approved sites  
* clearly identify next step  
* clearly identify signer  
* clearly show whether the package is draft, current, or signed

## **4.12.4 Package Version Rules**

* vendor must be shown the current active version only by default  
* prior versions must be retained internally  
* prior versions may be visible read-only only if admin settings allow it  
* obsolete versions must not be signable

---

## **4.13 Shipping and Operational Expectations Module**

## **4.13.1 Module Purpose**

The app must capture the key operational expectations needed before WB handoff, without becoming a full operational platform.

This module exists because the legacy dropship process relied on written expectations around shipping, cancellations, returns, and support.

## **4.13.2 Required Operational Fields**

The system must support, at minimum:

* ship-from location  
* warehouse or fulfillment address  
* primary carrier(s)  
* domestic shipping capability  
* international shipping capability if relevant  
* standard handling time / SLA  
* order exception timing  
* cancellation timing rules  
* tracking expectations  
* blind shipping requirement if applicable  
* return address  
* return window / handling notes  
* support response expectation  
* special shipping restrictions  
* internal notes for WB handoff

## **4.13.3 Operational Rules**

* all operational fields must be admin-configurable as required or optional  
* values must be editable before signature  
* values used in the final signed package must be snapshotted  
* post-sign changes must require a revision or amendment flow if they affect the agreement

## **4.13.4 Operational Scope Boundary**

This module must not try to manage:

* live order operations  
* live return processing  
* shipping label generation  
* inventory sync  
* product-level fulfillment rules in daily production

Those remain outside this system.

---

## **4.14 Supporting Documents and Attachments**

## **4.14.1 Purpose**

The platform must support optional and required supporting documents tied to vendor-brand records, quotes, and agreements.

## **4.14.2 Supported Attachment Categories**

The system must support categories such as:

* vendor-provided business document  
* legal attachment  
* service schedule  
* fee schedule  
* site addendum  
* shipping guideline  
* onboarding checklist  
* signed final PDF  
* internal reference document  
* WB handoff support file

## **4.14.3 Attachment Rules**

* attachments may be required by admin settings  
* required attachments must be configurable per workflow stage  
* attachments can be internal-only or vendor-visible  
* final signed PDF must be treated as immutable  
* documents with historical or legal significance must not be hard-deleted from history

---

## **4.15 Required Fields and Configurable Form Logic**

## **4.15.1 Requirement**

Admins must be able to control requiredness without development.

For each relevant field, admins must be able to set:

* required  
* optional  
* hidden  
* internal-only  
* vendor-visible  
* vendor-editable

## **4.15.2 Modules Covered by Required Field Logic**

This configurability must apply to:

* vendor fields  
* brand fields  
* site approval fields  
* contact fields  
* quote fields  
* agreement fields  
* shipping fields  
* WB handoff fields

## **4.15.3 Send-Time Minimum Validation**

Even though requiredness is configurable, the system must still enforce a minimum send-time validation for safe operation.

At minimum, a package cannot be sent unless:

* vendor exists  
* brand exists  
* at least one site is selected  
* recipient exists  
* signer exists if the package requires signature  
* quote has commercial content  
* agreement has legal content  
* current version is valid  
* package has not already been finalized

Admins may override certain warnings if the access policy allows it, but overrides must be audited.

---

## **4.16 Versioning, Revisions, and Change Control**

## **4.16.1 Quote Versioning**

Each quote must support version history.

A new version must be created when:

* pricing changes  
* fee schedule changes  
* site approvals change  
* service scope changes  
* shipping expectations change materially  
* vendor-visible text changes

## **4.16.2 Agreement Versioning**

Each agreement must support version history.

A new version must be created when:

* legal terms change  
* signer changes  
* approved sites change  
* operational expectations change materially  
* commercial schedule changes  
* package is reissued after vendor feedback

## **4.16.3 Version Control Rules**

* only one version may be current at a time  
* older versions remain historically visible internally  
* current version must be clearly labeled  
* superseded versions must not be signable  
* signed versions are immutable  
* material post-sign changes must be handled through amendment logic, not overwrite

## **4.16.4 Revision Reasons**

When a quote or agreement is revised, the system should require a revision reason such as:

* vendor requested update  
* pricing correction  
* site approval change  
* signer/contact change  
* legal wording correction  
* internal error correction  
* administrative update

---

## **4.17 Status Logic for Core Records**

## **4.17.1 Vendor-Brand Status**

The vendor-brand workspace must serve as the main status indicator and roll up the state of the quote, agreement, and WB handoff.

Required statuses:

* draft  
* collecting\_info  
* ready\_for\_quote  
* quote\_in\_progress  
* quote\_sent  
* vendor\_review  
* revision\_needed  
* agreement\_preparing  
* agreement\_sent  
* awaiting\_signature  
* signed  
* ready\_for\_wb  
* wb\_in\_progress  
* wb\_complete  
* suspended  
* archived

## **4.17.2 Quote Status**

Required statuses:

* draft  
* ready\_to\_send  
* sent  
* viewed  
* changes\_requested  
* rejected  
* accepted  
* expired  
* withdrawn  
* superseded

## **4.17.3 Agreement Status**

Required statuses:

* draft  
* ready\_to\_send  
* sent  
* viewed  
* changes\_requested  
* awaiting\_signature  
* signed  
* superseded  
* voided  
* archived

## **4.17.4 Site Approval Status**

Required statuses:

* not\_selected  
* selected  
* approved  
* restricted  
* denied  
* revoked  
* inactive

---

## **4.18 Combined Package Logic at Launch**

## **4.18.1 Launch Default**

The default launch flow should be a **combined review package**.

That means:

* the vendor sees one clear review package  
* quote and agreement do not feel like separate disconnected steps  
* pricing, site approvals, operational expectations, and legal terms are reviewed together  
* signing/accepting finalizes the package

## **4.18.2 Internal Record Separation**

Even though the vendor sees one flow, the system must still retain:

* quote record  
* agreement record  
* terms snapshot  
* version history  
* acceptance event  
* final generated PDF

This separation is required for reporting, legal defensibility, and future expansion.

---

## **4.19 WB Handoff Relationship**

## **4.19.1 Trigger**

Once the agreement is signed, the system must enable the internal team to move the vendor-brand record into WB handoff status.

## **4.19.2 Required Handoff Fields**

The WB handoff record must support:

* related vendor  
* related brand  
* signed agreement reference  
* approved sites  
* internal owner  
* handoff status  
* assigned team member  
* handoff notes  
* completed date  
* unusual exception notes

## **4.19.3 Required Handoff Checklist**

The system must support a configurable checklist including, at minimum:

* signed agreement on file  
* final PDF stored  
* approved sites confirmed  
* primary external contact confirmed  
* signer confirmed  
* shipping expectations captured  
* returns information captured if required  
* any missing operational notes documented  
* internal owner assigned

## **4.19.4 WB Boundary Rule**

The app must not store WB or Shopify credentials as part of normal launch scope.

It should track readiness and handoff status only.

---

## **4.20 Required Internal Screens for This Section**

The following screens must exist for these modules:

### **Vendor and Brand**

* Vendor List  
* Vendor Detail  
* Brand List  
* Brand Workspace  
* Contact Editor

### **Site and Commercial Setup**

* Site Configuration  
* Brand Site Approval Editor  
* Commercial Profile Editor  
* Pricing and Fees Editor  
* Service Catalog

### **Quote and Agreement**

* Quote Builder  
* Quote Detail  
* Quote Preview  
* Agreement Builder  
* Agreement Detail  
* Agreement Preview  
* Version Compare View  
* Signer Assignment View

### **Vendor-Facing**

* Package Summary  
* Quote Review  
* Agreement Review  
* Approved Sites Review  
* Final Acceptance / Signature  
* Completion / Download

---

## **4.21 Required Admin Controls for This Section**

The following controls must be admin-configurable through settings:

* site list  
* site active/inactive state  
* site default labels  
* commercial defaults  
* fee defaults  
* service catalog  
* operational expectation fields  
* required field rules  
* send-time validation rules  
* quote validity period  
* vendor-visible sections  
* package section order  
* agreement template choice  
* which attachments are required  
* whether vendor can request changes  
* whether vendor can reject  
* whether old versions remain viewable  
* WB checklist template

---

## **4.22 Acceptance Criteria for Section 4**

Section 4 will be considered implemented correctly when the built platform can do all of the following:

* create one vendor with multiple brands  
* assign different site approvals to each brand  
* maintain one current quote per vendor-brand  
* maintain one current agreement package per vendor-brand  
* preload legacy dropship commercial defaults as editable admin-review seed values  
* generate a vendor package that includes pricing, approved sites, operational expectations, and legal terms  
* allow vendors to review a clean combined package  
* preserve historical quote and agreement versions  
* prevent signing of superseded versions  
* lock final signed agreement records  
* mark a signed vendor-brand package ready for WB  
* allow business admins to update sites, fees, templates, required fields, and package rules without development

---

## **4.23 Section 4 Implementation Directive**

All later sections of the PRD/spec must follow the business logic in this section.

If later design decisions conflict with this section, the build must prioritize:

1. vendor-brand as the core commercial record  
2. site approvals at the brand level  
3. one current quote per vendor-brand  
4. one current agreement package per vendor-brand  
5. editable legacy-seeded defaults  
6. combined vendor review package at launch  
7. immutable signed records  
8. clear handoff into WB without trying to replace WB

---

# **Section 5 — Data Model, Admin Controls, and No-Code Configuration**

## **5.1 Section Purpose**

This section defines the canonical data model, configuration model, and admin control model for the platform.

This section must guide the AI build for:

* Firestore collection design  
* document structure  
* field naming  
* relationship handling  
* versioning  
* current vs historical snapshots  
* admin-managed settings  
* no-code configuration  
* reusable defaults  
* required field controls  
* custom field support  
* template and terms publishing  
* dashboard and workflow configuration

This section is the system-of-record blueprint for how the platform stores and controls data.

The design must support:

* one vendor with multiple brands  
* brand-level site approvals  
* one active quote per vendor-brand negotiation cycle  
* one active agreement package per vendor-brand negotiation cycle  
* combined vendor review package  
* indefinite retention of signed records  
* admin-managed updates without development

---

## **5.2 Data Model Principles**

The data model must follow these principles.

### **Principle 1 — Firestore-Friendly, Query-Friendly**

The model must be designed for Firebase Firestore and should favor:

* root collections for major business records  
* direct parent IDs instead of deep relational joins  
* denormalized summary fields for list pages and dashboards  
* immutable version documents for legal and commercial history

### **Principle 2 — Current Record \+ Frozen Snapshot**

Editable working records and finalized historical records must be separated.

That means:

* active records may be updated while in draft  
* sent and signed records must be snapshotted  
* historical versions must not change when settings change later

### **Principle 3 — Config by Reference, Runtime by Snapshot**

Drafts may reference reusable configs, but once a record is sent or signed, it must store a full snapshot of:

* pricing  
* fees  
* approved sites  
* operational expectations  
* template version  
* terms version  
* signer information

### **Principle 4 — No Hard Delete for Business-Critical Records**

The UI must use archiving and disablement, not hard deletion, for:

* vendors  
* brands  
* quotes  
* agreements  
* documents  
* signed records  
* audit-related records

### **Principle 5 — Business Users Must Control Business Settings**

Most operational changes must happen through data and settings, not code.

### **Principle 6 — Customization Without Breaking Core Logic**

Admins must be able to:

* change required fields  
* add custom fields  
* update templates  
* publish new terms  
* update site list  
* update pricing defaults  
* change workflow rules

without corrupting historical records or breaking required system fields.

### **Principle 7 — Single Source of Truth per Record Type**

Each major business object must have one canonical home:

* vendor identity lives on the vendor record  
* brand state lives on the brand record  
* site approval lives on site approval records  
* current quote state lives on quote  
* quote history lives on quote versions  
* current agreement state lives on agreement  
* agreement history lives on agreement versions

### **Principle 8 — All Meaningful States Must Be Explicit**

Statuses must not be inferred from UI alone. They must be stored as fields and updated by controlled workflow logic.

---

## **5.3 Canonical Relationship Model**

The platform must use the following core relationships.

```
Vendor
 ├─ Contacts
 ├─ Brands
 │   ├─ Brand Contact Assignments
 │   ├─ Site Approvals
 │   ├─ Current Quote
 │   │   └─ Quote Versions
 │   ├─ Current Agreement
 │   │   └─ Agreement Versions
 │   │       └─ Signer Assignments / Acceptance Events
 │   ├─ Documents
 │   ├─ Tasks
 │   └─ WB Handoff
 └─ Activity / Notes

Reusable Config
 ├─ Sites
 ├─ Services
 ├─ Fees
 ├─ Pricing Profiles
 ├─ Operational Profiles
 ├─ Quote Templates
 ├─ Agreement Templates
 ├─ Package Layouts
 ├─ Clause Library
 ├─ Terms Versions
 ├─ Notification Templates
 ├─ WB Checklist Templates
 ├─ Required Field Rules
 ├─ Custom Field Definitions
 └─ System Settings
```

### **Core relationship rules**

* one vendor can have many brands  
* one contact can be assigned to multiple brands under the same vendor  
* one brand can have many site approvals  
* one brand can have many quotes over time, but only one current active quote  
* one quote can have many quote versions  
* one brand can have many agreements over time, but only one current active agreement package  
* one agreement can have many agreement versions  
* one agreement version can have many signer assignments and acceptance events  
* one brand can have one active WB handoff at a time  
* reusable configs must never be edited in place when historical integrity requires versioning

---

## **5.4 Shared Data Standards**

## **5.4.1 Field Naming Standard**

All field names must use `camelCase`.

Examples:

* `vendorId`  
* `brandName`  
* `currentQuoteId`  
* `validUntilDate`  
* `isCurrentPublished`

Status values and enum values should use `snake_case`.

Examples:

* `ready_for_quote`  
* `awaiting_signature`  
* `wb_in_progress`

## **5.4.2 Common Fields on Major Documents**

All major top-level records must include:

* `id`  
* `status`  
* `createdAt`  
* `createdByUserId`  
* `updatedAt`  
* `updatedByUserId`  
* `archivedAt`  
* `archivedByUserId`  
* `isArchived`  
* `notesInternal`  
* `customFields`

### **Rules**

* `createdAt` and `updatedAt` must use server-generated timestamps  
* `archivedAt` should be null unless archived  
* `customFields` must be a map keyed by defined custom field keys

## **5.4.3 Common Summary Fields**

All listable business records must include denormalized display fields for faster loading.

Examples:

* `vendorName`  
* `brandName`  
* `siteCodes`  
* `siteNames`  
* `ownerDisplayName`  
* `currentVersionNumber`  
* `currentSignerEmail`  
* `searchText`

These summary fields are for query and display performance and do not replace canonical underlying data.

## **5.4.4 ID and Numbering Rules**

System-generated IDs may use Firestore auto IDs, but user-facing record numbers must be controlled separately.

Required numbering:

* quote number  
* agreement number  
* WB handoff number if desired later

Suggested patterns:

* `Q-2026-00001`  
* `A-2026-00001`

Number generation must be controlled server-side using a sequence/counter mechanism.

## **5.4.5 Date and Time Rules**

Use:

* Firestore `Timestamp` for moments in time  
* ISO date strings `YYYY-MM-DD` for date-only business values

Examples:

* `sentAt` → timestamp  
* `signedAt` → timestamp  
* `effectiveDate` → date string  
* `validUntilDate` → date string

## **5.4.6 Money and Rate Rules**

To avoid precision errors:

### **Money values**

Store as:

* `amountCents: integer`  
* `currencyCode: string`

### **Percentage / commission values**

Store as:

* `basisPoints: integer`

Examples:

* 40.00% \= `4000`  
* 12.50% \= `1250`

Do not store floating point percentages as the source of truth.

## **5.4.7 Visibility Rules**

Fields and documents may use these visibility scopes:

* `internal_only`  
* `vendor_visible`  
* `vendor_editable`  
* `signer_only`  
* `system_only`

Visibility must be controlled by data and permissions, not only by frontend display logic.

---

## **5.5 Reusable Object Blocks**

The schema must reuse the following object structures wherever applicable.

### **Address Block**

```
name
line1
line2
city
state
postalCode
countryCode
attention
phone
```

### **Money Block**

```
amountCents
currencyCode
displayText
```

### **Rate Block**

```
basisPoints
displayText
description
```

### **User Summary Block**

```
userId
displayName
email
```

### **Contact Summary Block**

```
contactId
firstName
lastName
displayName
email
phone
roleKeys[]
```

### **Site Summary Block**

```
siteId
siteCode
siteName
status
```

### **Document Summary Block**

```
documentId
fileName
documentType
storagePath
visibility
isImmutable
```

### **Snapshot Meta Block**

```
snapshotAt
snapshotByUserId
sourceRecordId
sourceVersionId
sourceConfigRefs{}
contentHash
```

These object blocks must be used consistently across version documents.

---

## **5.6 Collection Inventory**

The build must use the following collection structure.

## **5.6.1 Identity and Access Collections**

* `users`  
* `roles`  
* `permissions`  
* `domainAllowlist`  
* `emailAllowlist`  
* `accessAssignments`

## **5.6.2 Core Business Collections**

* `vendors`  
* `brands`  
* `contacts`  
* `brandContactAssignments`  
* `sites`  
* `siteApprovals`

## **5.6.3 Reusable Commercial and Legal Config Collections**

* `services`  
* `fees`  
* `pricingProfiles`  
* `operationalProfiles`  
* `quoteTemplates`  
* `agreementTemplates`  
* `packageLayouts`  
* `clauseLibrary`  
* `termsVersions`  
* `wbChecklistTemplates`  
* `notificationTemplates`

## **5.6.4 Transactional Business Collections**

* `quotes`  
* `quoteVersions`  
* `agreements`  
* `agreementVersions`  
* `signerAssignments`  
* `accessLinks`  
* `acceptanceEvents`  
* `changeRequests`  
* `documents`  
* `wbHandoffs`  
* `tasks`  
* `notifications`  
* `activityLogs`

## **5.6.5 Settings and No-Code Configuration Collections**

* `systemSettings`  
* `requiredFieldRules`  
* `customFieldDefinitions`  
* `dashboardConfigs`  
* `savedViews`  
* `featureFlags`  
* `numberingRules`  
* `integrationConfigs`

---

## **5.7 Identity and Access Collections**

## **5.7.1 `users`**

Purpose: store all internal and external user accounts.

Required fields:

```
authUid
email
normalizedEmail
emailDomain
firstName
lastName
displayName
status
isInternal
isExternal
isSystemOwner
roleKeys[]
loginMethods[]
allowlistSource        // domain, email, manual, external_invite
defaultVendorId
defaultBrandId
lastLoginAt
preferences{}
customFields{}
createdAt
createdByUserId
updatedAt
updatedByUserId
archivedAt
archivedByUserId
isArchived
```

Rules:

* verified `@shiekhshoes.org` users auto-provision as internal admins  
* allowlisted emails/domains can provision additional internal users  
* vendor-side login accounts must be explicitly linked through access assignments  
* user records must never be hard-deleted if they have activity history

## **5.7.2 `roles`**

Purpose: define system roles.

Required fields:

```
key
label
description
permissionKeys[]
isSystemRole
isActive
createdAt
updatedAt
```

## **5.7.3 `permissions`**

Purpose: define atomic permission keys.

Required fields:

```
key
module
action
label
description
isSystemPermission
```

## **5.7.4 `domainAllowlist`**

Purpose: auto-provision internal users by domain.

Required fields:

```
domain
assignedRoleKeys[]
isActive
autoProvision
note
createdAt
createdByUserId
updatedAt
updatedByUserId
```

## **5.7.5 `emailAllowlist`**

Purpose: allow specific internal emails outside the default internal domain.

Required fields:

```
email
normalizedEmail
assignedRoleKeys[]
isActive
note
createdAt
createdByUserId
updatedAt
updatedByUserId
```

## **5.7.6 `accessAssignments`**

Purpose: connect a user or contact to a vendor, brand, or document scope.

Required fields:

```
userId
contactId
vendorId
brandId
scopeType             // vendor, brand, document
scopeRecordId
rolePreset            // vendor_primary, vendor_signer, vendor_viewer
status
canViewHistory
canDownloadFinalDocs
canEditLimitedProfile
canUploadDocuments
createdAt
createdByUserId
updatedAt
updatedByUserId
```

Rules:

* external access must always be explicit  
* one vendor-side user may have multiple brand assignments  
* access assignments drive vendor-side visibility and must be audited

---

## **5.8 Core Business Collections**

## **5.8.1 `vendors`**

Purpose: store the master vendor entity.

Required fields:

```
vendorCode
legalName
displayName
dbaName
website
businessType
taxId
status
ownerUserId
ownerDisplayName
primaryBusinessAddress{}
mailingAddress{}
returnsAddress{}
shipFromAddress{}
notesInternal
tags[]
activeBrandCount
searchText
customFields{}
createdAt
createdByUserId
updatedAt
updatedByUserId
archivedAt
archivedByUserId
isArchived
```

Rules:

* a vendor may exist before any brand is created  
* changing a vendor record must not modify historical snapshots already stored on sent or signed records

## **5.8.2 `brands`**

Purpose: store the main operational workspace under each vendor.

Required fields:

```
vendorId
vendorName
brandName
brandCode
status
ownerUserId
ownerDisplayName
defaultPricingProfileKey
defaultPricingProfileVersion
defaultOperationalProfileKey
defaultOperationalProfileVersion
currentQuoteId
currentQuoteNumber
currentQuoteStatus
currentAgreementId
currentAgreementNumber
currentAgreementStatus
currentWbHandoffId
currentWbStatus
approvedSiteIds[]
approvedSiteCodes[]
approvedSiteNames[]
primarySignerContactId
primaryExternalContactId
notesInternal
searchText
customFields{}
createdAt
createdByUserId
updatedAt
updatedByUserId
archivedAt
archivedByUserId
isArchived
```

Rules:

* one vendor may have many brands  
* one brand may have only one current active quote and one current active agreement package at a time  
* all dashboard and queue screens should load primarily from brand summary fields

## **5.8.3 `contacts`**

Purpose: store reusable vendor contact records.

Required fields:

```
vendorId
firstName
lastName
displayName
email
normalizedEmail
phone
jobTitle
status
linkedUserId
notesInternal
searchText
customFields{}
createdAt
createdByUserId
updatedAt
updatedByUserId
archivedAt
archivedByUserId
isArchived
```

Rules:

* contacts belong to a vendor, not directly to a single brand  
* the same contact can be assigned to multiple brands

## **5.8.4 `brandContactAssignments`**

Purpose: assign vendor contacts to brand-specific roles.

Required fields:

```
vendorId
brandId
contactId
roleKeys[]            // primary_business, legal, operations, finance, returns, support, signer
isPrimary
isActive
vendorVisible
vendorEditable
createdAt
createdByUserId
updatedAt
updatedByUserId
```

Rules:

* at least one active external contact is required before send  
* at least one signer assignment is required before agreement send  
* a contact may hold multiple role keys

## **5.8.5 `sites`**

Purpose: define admin-managed site/channel options.

Required fields:

```
siteCode
siteName
displayLabel
status
sortOrder
isActive
allowNewApprovals
description
defaultBrandingProfileKey
notesInternal
createdAt
createdByUserId
updatedAt
updatedByUserId
```

Rules:

* seed with `shiekh`, `karmaloop`, and `mltd`  
* site list must remain admin-configurable  
* site definitions must never directly change historical site approval snapshots already sent or signed

## **5.8.6 `siteApprovals`**

Purpose: store per-brand site eligibility.

Required fields:

```
vendorId
brandId
siteId
siteCode
siteName
status
selectedAt
selectedByUserId
approvedAt
approvedByUserId
effectiveDate
endDate
goLiveReady
restrictionNotes
notesInternal
createdAt
createdByUserId
updatedAt
updatedByUserId
```

Rules:

* unique per `brandId + siteId`  
* a site approval must exist before that site can appear in a quote or agreement  
* changing site approvals after sign-off requires revision/amendment logic

---

## **5.9 Reusable Commercial and Legal Config Collections**

These collections are admin-managed and must support versioning or publish behavior where appropriate.

## **5.9.1 `services`**

Purpose: define reusable service items.

Required fields:

```
serviceCode
name
category
description
defaultLineItemType
defaultDisplayOrder
pricingType           // none, fixed, recurring, percentage, informational
defaultMoney{}
defaultRate{}
vendorVisible
isNegotiable
isActive
seededFromLegacy
reviewRequired
createdAt
createdByUserId
updatedAt
updatedByUserId
```

## **5.9.2 `fees`**

Purpose: define reusable fee items.

Required fields:

```
feeCode
name
category
description
feeType               // one_time, recurring, per_order, cancellation, custom
pricingType           // fixed, percentage, formula, informational
defaultMoney{}
defaultRate{}
unitLabel
vendorVisible
isNegotiable
isActive
seededFromLegacy
reviewRequired
createdAt
createdByUserId
updatedAt
updatedByUserId
```

## **5.9.3 `pricingProfiles`**

Purpose: define reusable commercial defaults for quotes and agreements.

This collection must be versioned.

Required fields:

```
profileKey
versionNumber
name
status                // draft, published, retired
isCurrentPublished
appliesToSiteCodes[]  // empty or all for launch
serviceItems[]        // structured commercial lines
feeItems[]            // structured fee lines
rateTerms[]           // commission or related terms
payoutTermsText
cancellationTermsText
exceptionTermsText
seededFromLegacy
reviewRequired
publishedAt
publishedByUserId
sourceVersionId
changeSummary
createdAt
createdByUserId
updatedAt
updatedByUserId
```

Rules:

* pricing is standard across sites at launch, but structure must allow future site-specific use  
* publishing a new profile must not update already sent or signed records  
* draft quotes may refresh from a newer published profile if the user chooses

## **5.9.4 `operationalProfiles`**

Purpose: define reusable shipping and operational expectation defaults.

This collection must be versioned.

Required fields:

```
profileKey
versionNumber
name
status                // draft, published, retired
isCurrentPublished
shipFromRequirementsText
handlingTimeText
primaryCarrierText
trackingExpectationText
blindShippingText
returnsHandlingText
cancellationPolicyText
supportExpectationText
internationalShippingText
specialRestrictionsText
seededFromLegacy
reviewRequired
publishedAt
publishedByUserId
sourceVersionId
changeSummary
createdAt
createdByUserId
updatedAt
updatedByUserId
```

## **5.9.5 `quoteTemplates`**

Purpose: define reusable quote template versions.

Required fields:

```
templateKey
versionNumber
name
status                // draft, published, retired
isCurrentPublished
sectionOrder[]
sectionConfigs{}
mergeFieldKeys[]
vendorVisibleSections[]
bodyContent
layoutConfig{}
changeSummary
publishedAt
publishedByUserId
createdAt
createdByUserId
updatedAt
updatedByUserId
```

## **5.9.6 `agreementTemplates`**

Purpose: define reusable agreement template versions.

Required fields:

```
templateKey
versionNumber
name
status
isCurrentPublished
sectionOrder[]
sectionConfigs{}
mergeFieldKeys[]
bodyContent
layoutConfig{}
changeSummary
publishedAt
publishedByUserId
createdAt
createdByUserId
updatedAt
updatedByUserId
```

## **5.9.7 `packageLayouts`**

Purpose: define the vendor-facing combined review package structure.

Required fields:

```
layoutKey
versionNumber
name
status
isCurrentPublished
sectionOrder[]
showQuoteSummary
showCommercialSchedule
showApprovedSites
showOperationalExpectations
showLegalTerms
showAttachments
showSupportContacts
completionScreenConfig{}
changeSummary
publishedAt
publishedByUserId
createdAt
createdByUserId
updatedAt
updatedByUserId
```

## **5.9.8 `clauseLibrary`**

Purpose: define reusable clause blocks for legal content.

Required fields:

```
clauseKey
title
category
bodyContent
isActive
isApprovedForUse
tags[]
createdAt
createdByUserId
updatedAt
updatedByUserId
```

## **5.9.9 `termsVersions`**

Purpose: define versioned terms and conditions.

Required fields:

```
termsKey
versionNumber
versionLabel
title
status                // draft, published, retired
isCurrentPublished
summaryOfChanges
clauseKeys[]
bodyContent
acceptanceText
effectiveDate
contentHash
publishedAt
publishedByUserId
sourceVersionId
createdAt
createdByUserId
updatedAt
updatedByUserId
```

Rules:

* every sent or signed agreement must snapshot the exact terms version and acceptance text  
* publishing a new terms version applies only to new draft work unless explicitly refreshed before send

## **5.9.10 `wbChecklistTemplates`**

Purpose: define internal WB handoff checklist versions.

Required fields:

```
templateKey
versionNumber
name
status
isCurrentPublished
items[]               // each item has key, label, required, helpText, sortOrder
changeSummary
publishedAt
publishedByUserId
createdAt
createdByUserId
updatedAt
updatedByUserId
```

## **5.9.11 `notificationTemplates`**

Purpose: define reusable email and in-app message templates.

Required fields:

```
templateKey
versionNumber
channel               // email, in_app
eventType
name
status
isCurrentPublished
subjectTemplate
bodyTemplate
mergeFieldKeys[]
changeSummary
publishedAt
publishedByUserId
createdAt
createdByUserId
updatedAt
updatedByUserId
```

---

## **5.10 Transactional Business Collections**

## **5.10.1 `quotes`**

Purpose: store the current negotiation-cycle quote record for one vendor-brand.

Required fields:

```
quoteNumber
vendorId
vendorName
brandId
brandName
status
isCurrentForBrand
ownerUserId
ownerDisplayName
pricingProfileKey
pricingProfileVersion
operationalProfileKey
operationalProfileVersion
quoteTemplateKey
quoteTemplateVersion
currentVersionId
currentVersionNumber
siteApprovalIds[]
siteCodes[]
siteNames[]
recipientContactIds[]
signerContactIds[]
issueDate
validUntilDate
sentAt
firstViewedAt
acceptedAt
rejectedAt
withdrawnAt
currentCommercialSummary{}
currentTotals{}
currentDecision
notesInternal
notesVendorVisible
searchText
customFields{}
createdAt
createdByUserId
updatedAt
updatedByUserId
archivedAt
archivedByUserId
isArchived
```

Rules:

* only one current quote per brand at a time  
* earlier negotiation-cycle quotes remain historical and `isCurrentForBrand = false`  
* revisions within a negotiation cycle belong in `quoteVersions`

## **5.10.2 `quoteVersions`**

Purpose: store immutable quote revision history.

Required fields:

```
quoteId
quoteNumber
vendorId
brandId
versionNumber
status
isCurrentVersion
isLocked
revisionReason
vendorSnapshot{}
brandSnapshot{}
siteApprovalSnapshot[]
contactSnapshot[]
pricingSnapshot{}
operationalSnapshot{}
templateSnapshot{}
termsSnapshot{}
lineItems[]
totals{}
renderSummary{}
contentHash
generatedDocumentIds[]
sentAt
viewedAt
acceptedAt
rejectedAt
finalizedAt
createdAt
createdByUserId
```

Rules:

* create a new quote version whenever vendor-visible commercial content changes  
* sent versions must become locked  
* accepted/signed versions must remain immutable forever

## **5.10.3 `agreements`**

Purpose: store the current negotiation-cycle agreement record for one vendor-brand.

Required fields:

```
agreementNumber
vendorId
vendorName
brandId
brandName
quoteId
status
isCurrentForBrand
ownerUserId
ownerDisplayName
agreementTemplateKey
agreementTemplateVersion
termsKey
termsVersionNumber
packageLayoutKey
packageLayoutVersion
currentVersionId
currentVersionNumber
siteApprovalIds[]
siteCodes[]
siteNames[]
primarySignerContactId
currentSignerStatus
proposedEffectiveDate
expirationDate
sentAt
firstViewedAt
signedAt
finalDocumentId
wbHandoffId
accessMode             // secure_link, login, both
searchText
customFields{}
createdAt
createdByUserId
updatedAt
updatedByUserId
archivedAt
archivedByUserId
isArchived
```

Rules:

* only one current active agreement package per brand at a time  
* signed agreement records are immutable at the version level  
* amendments or post-sign changes must create new agreement versions or new negotiation-cycle agreements based on business rule

## **5.10.4 `agreementVersions`**

Purpose: store immutable agreement revision history.

Required fields:

```
agreementId
agreementNumber
vendorId
brandId
versionNumber
status
isCurrentVersion
isLocked
revisionReason
quoteSnapshot{}
vendorSnapshot{}
brandSnapshot{}
siteApprovalSnapshot[]
commercialScheduleSnapshot{}
operationalSnapshot{}
agreementTemplateSnapshot{}
termsSnapshot{}
packageLayoutSnapshot{}
signerSnapshot[]
acceptanceTextSnapshot
contentHash
generatedDocumentIds[]
sentAt
viewedAt
signedAt
finalizedAt
createdAt
createdByUserId
```

Rules:

* every signed agreement must point to the exact agreement version signed  
* superseded versions must remain accessible internally but not signable externally

## **5.10.5 `signerAssignments`**

Purpose: store signer state for each agreement version.

Required fields:

```
agreementId
agreementVersionId
vendorId
brandId
contactId
displayName
email
normalizedEmail
signerRole
signOrder
isRequired
status                // pending, sent, viewed, signed, declined, voided
sentAt
viewedAt
signedAt
declinedAt
createdAt
createdByUserId
updatedAt
updatedByUserId
```

## **5.10.6 `accessLinks`**

Purpose: store secure one-time review access.

Required fields:

```
purpose                // quote_review, agreement_review, signing
entityType
entityId
entityVersionId
vendorId
brandId
contactId
recipientEmail
tokenHash
status                 // active, expired, revoked, superseded, used
expiresAt
maxUses
currentUseCount
invalidatedByRevision
issuedAt
issuedByUserId
lastUsedAt
createdAt
updatedAt
```

Rules:

* never store raw tokens in Firestore  
* revoke or supersede old links based on workflow settings  
* access links must be auditable

## **5.10.7 `acceptanceEvents`**

Purpose: store vendor decisions and final evidence events.

Required fields:

```
entityType             // quote, agreement
entityId
entityVersionId
vendorId
brandId
contactId
contactDisplayName
email
actionType             // viewed, accept, sign, reject, request_changes
verificationMethod
ipAddress
userAgent
comments
acceptedContentHash
evidenceDocumentId
occurredAt
createdAt
```

Rules:

* final acceptance/signature must store verification and snapshot references  
* use idempotency handling so a repeated submit does not create conflicting final states

## **5.10.8 `changeRequests`**

Purpose: store vendor-requested revisions.

Required fields:

```
entityType
entityId
entityVersionId
vendorId
brandId
submittedByContactId
submittedByEmail
message
status                 // open, resolved, dismissed
resolutionNote
submittedAt
resolvedAt
createdAt
updatedAt
```

## **5.10.9 `documents`**

Purpose: store all uploaded and generated files.

Required fields:

```
documentType           // quote_pdf, agreement_pdf, attachment, terms_snapshot, checklist_export, etc.
entityType
entityId
entityVersionId
vendorId
brandId
fileName
mimeType
storagePath
sizeBytes
checksum
visibility             // internal_only, vendor_visible, signer_only
isImmutable
sourceType             // uploaded, generated, system_snapshot
uploadedByUserId
generatedBySystem
createdAt
updatedAt
archivedAt
isArchived
```

Rules:

* final signed PDFs must always have `isImmutable = true`  
* document visibility must be enforced server-side

## **5.10.10 `wbHandoffs`**

Purpose: store the post-sign internal handoff state into WB.

Required fields:

```
handoffNumber
vendorId
vendorName
brandId
brandName
quoteId
agreementId
agreementVersionId
status
assignedUserId
assignedDisplayName
checklistTemplateKey
checklistTemplateVersion
checklistItems[]
readyAt
startedAt
completedAt
blockedReason
notesInternal
customFields{}
createdAt
createdByUserId
updatedAt
updatedByUserId
archivedAt
isArchived
```

### **Checklist item object**

```
key
label
required
status                // not_started, complete, blocked, skipped
completedAt
completedByUserId
note
```

Rules:

* only one active handoff per brand at a time  
* the checklist must snapshot the template version used

## **5.10.11 `tasks`**

Purpose: store action items and queueable workflow work.

Required fields:

```
taskType
entityType
entityId
vendorId
brandId
assignedUserId
assignedDisplayName
status                 // open, in_progress, done, canceled
priority
dueAt
sourceRuleKey
title
description
resolutionNote
createdAt
createdByUserId
updatedAt
updatedByUserId
```

## **5.10.12 `notifications`**

Purpose: store outbound notifications and in-app alerts.

Required fields:

```
eventType
templateKey
templateVersion
channel
recipientType
recipientUserId
recipientContactId
recipientEmail
entityType
entityId
vendorId
brandId
status                 // queued, sent, failed, read
scheduledFor
sentAt
readAt
failureReason
payloadSummary{}
createdAt
updatedAt
```

## **5.10.13 `activityLogs`**

Purpose: store all significant business and admin activity.

Required fields:

```
entityType
entityId
entityVersionId
vendorId
brandId
actionKey
actorType              // user, contact, system
actorId
actorDisplayName
beforeSummary{}
afterSummary{}
metadata{}
occurredAt
createdAt
```

Rules:

* do not use activity logs as the only source of truth for business status  
* activity logs supplement business records and audit history

---

## **5.11 Settings and No-Code Configuration Collections**

## **5.11.1 `systemSettings`**

Purpose: store singleton settings documents.

Use one document per settings area.

Required documents:

* `companyProfile`  
* `branding`  
* `accessPolicy`  
* `workflowPolicy`  
* `documentPolicy`  
* `notificationPolicy`  
* `dashboardDefaults`  
* `supportContacts`

### **Example `companyProfile` fields**

```
legalName
displayName
website
defaultCurrencyCode
mainAddress{}
supportEmails{}
supportPhones{}
defaultFromName
defaultReplyToEmail
updatedAt
updatedByUserId
```

### **Example `workflowPolicy` fields**

```
workflowMode                     // combined_package, sequential_quote_then_agreement
defaultQuoteValidityDays
defaultLinkExpiryHours
invalidateLinksOnRevision
allowVendorRequestChanges
allowVendorReject
requireFreshVerificationForSignature
postWbAccessMode                 // keep_active, read_only, disable
defaultReminderSchedule[]
updatedAt
updatedByUserId
```

### **Example `documentPolicy` fields**

```
retainSignedRecordsIndefinitely
defaultDocumentVisibility
allowVendorHistoricalVersionView
allowVendorDownloadDraftDocs
updatedAt
updatedByUserId
```

## **5.11.2 `requiredFieldRules`**

Purpose: define required/optional/hidden behavior by entity, field, and workflow stage.

Required fields:

```
entityType
fieldKey
fieldLabel
fieldGroup
requirementStage       // draft, send, sign, wb
ruleType               // required, optional, hidden, internal_only
vendorVisible
vendorEditable
overrideAllowed
helpText
isActive
sortOrder
updatedAt
updatedByUserId
```

Rules:

* admins must be able to change field requirement behavior without code  
* some core system fields cannot be hidden or disabled if they are essential for workflow integrity

## **5.11.3 `customFieldDefinitions`**

Purpose: allow admins to add new structured fields without development.

Required fields:

```
entityType
fieldKey
label
description
inputType              // text, textarea, email, phone, number, currency, percent, date, boolean, select, multiselect, file, richtext
optionValues[]
defaultValue
fieldGroup
vendorVisible
vendorEditable
isFilterable
isActive
sortOrder
validationConfig{}
createdAt
createdByUserId
updatedAt
updatedByUserId
```

Rules:

* custom field values must be stored in `customFields` on the target document  
* custom fields must not replace required system fields like vendor, brand, site, signer, or status

## **5.11.4 `dashboardConfigs`**

Purpose: define admin-controlled dashboard layouts.

Required fields:

```
configKey
scopeType              // global, role, user
scopeValue
enabledCardKeys[]
defaultFilters{}
defaultSort
layoutConfig{}
updatedAt
updatedByUserId
```

## **5.11.5 `savedViews`**

Purpose: store reusable filtered list views.

Required fields:

```
ownerUserId
moduleKey
viewName
isShared
filters{}
columns[]
sortConfig{}
createdAt
updatedAt
```

## **5.11.6 `featureFlags`**

Purpose: allow controlled future feature rollout without code deletion.

Required fields:

```
flagKey
label
isEnabled
scopeType              // global, user, role
scopeValue
description
updatedAt
updatedByUserId
```

Examples:

* `vendor_login_enabled`  
* `site_specific_pricing_enabled`  
* `vendor_history_view_enabled`

## **5.11.7 `numberingRules`**

Purpose: define quote/agreement numbering sequences.

Required fields:

```
ruleKey
prefix
currentValue
paddingLength
resetPolicy            // never, yearly
isActive
updatedAt
updatedByUserId
```

## **5.11.8 `integrationConfigs`**

Purpose: store admin-managed integration metadata.

Required fields:

```
integrationKey
status
configSummary{}
isEnabled
updatedAt
updatedByUserId
```

Note:

* sensitive credentials must use secret storage, not Firestore plain text  
* this collection stores only non-secret metadata and runtime config references

---

## **5.12 Versioning and Snapshot Rules**

## **5.12.1 Draft Records**

Draft quotes and agreements may reference current reusable configs such as:

* pricing profile  
* operational profile  
* template version  
* terms version  
* package layout

Drafts may optionally refresh from newer published config versions before send.

## **5.12.2 Sent Records**

When a quote or agreement is sent, the system must create or update a version snapshot containing:

* vendor snapshot  
* brand snapshot  
* approved site snapshot  
* contact and signer snapshot  
* pricing snapshot  
* operational snapshot  
* template snapshot  
* terms snapshot  
* acceptance text snapshot  
* content hash

Sent versions must become locked against direct editing.

## **5.12.3 Signed Records**

When an agreement is signed:

* the signed agreement version becomes immutable  
* the final PDF becomes immutable  
* the acceptance event must point to the signed version and final document  
* later changes must create a new version or new negotiation cycle record

## **5.12.4 Config Version Publish Rule**

Versioned config collections must follow:

* `draft`  
* `published`  
* `retired`

Rules:

* only one current published version per `profileKey`, `templateKey`, `layoutKey`, or `termsKey`  
* publishing a new config version affects only new work or drafts refreshed intentionally  
* old versions must stay available for history rendering

---

## **5.13 No-Code Admin Control Surface**

The application must expose the following admin-maintained modules without requiring development.

## **5.13.1 Master Data Controls**

Admins must be able to manage:

* sites  
* vendor status options if configurable later  
* service catalog  
* fee catalog  
* contact role definitions if safe to expose  
* brand defaults

## **5.13.2 Commercial Controls**

Admins must be able to manage:

* pricing profiles  
* payout/cancellation text  
* fee defaults  
* recurring vs one-time charge settings  
* negotiable item flags  
* legacy seeded defaults

## **5.13.3 Legal and Document Controls**

Admins must be able to manage:

* clause library  
* terms versions  
* quote templates  
* agreement templates  
* package layouts  
* acceptance text  
* supporting attachment requirements

## **5.13.4 Workflow Controls**

Admins must be able to manage:

* workflow mode  
* quote validity period  
* link expiration  
* revision behavior  
* whether vendors can request changes  
* whether vendors can reject  
* post-WB access mode  
* WB checklist template  
* reminder timing

## **5.13.5 Field Controls**

Admins must be able to manage:

* required fields  
* field visibility  
* vendor-visible vs internal-only fields  
* vendor-editable fields  
* custom field definitions

## **5.13.6 Branding and Communication Controls**

Admins must be able to manage:

* company profile  
* support contacts  
* notification templates  
* email sender labels  
* default package wording  
* dashboard defaults

---

## **5.14 Guardrails for No-Code Configuration**

No-code control must be powerful but protected.

### **Guardrail 1 — Core System Fields Cannot Be Removed**

Admins must not be allowed to remove or fully hide essential workflow fields such as:

* vendor  
* brand  
* approved sites  
* signer  
* agreement version  
* status  
* final acceptance controls

### **Guardrail 2 — Signed History Cannot Be Rewritten**

No admin setting change may alter:

* signed agreement content  
* accepted terms snapshot  
* historical pricing snapshot  
* historical approved site list shown at send/sign time

### **Guardrail 3 — Versioned Configs Must Publish Safely**

Terms, templates, pricing profiles, and package layouts must support validation before publish.

Examples:

* do not publish terms without acceptance text  
* do not publish pricing profile without at least one commercial component  
* do not publish agreement template without signer block support  
* do not publish WB checklist with zero required items if handoff policy requires a checklist

### **Guardrail 4 — Changes Must Be Audited**

All admin changes to configuration must create activity history and audit logs.

### **Guardrail 5 — Feature Flags Must Not Bypass Security**

Feature flags may enable UI or workflow behavior, but must not disable core permission checks or immutability controls.

---

## **5.15 Required Field and Custom Field Engine**

## **5.15.1 Required Field Behavior**

The required field engine must support stage-based validation.

Example stages:

* draft save  
* ready to send  
* ready to sign  
* ready for WB

A field may be:

* optional in draft  
* required at send  
* optional for vendor view  
* required for WB handoff

## **5.15.2 Custom Field Storage**

Each major record may have:

```
customFields: {
  fieldKey1: value,
  fieldKey2: value
}
```

Supported target entities:

* vendor  
* brand  
* contact  
* siteApproval  
* quote  
* agreement  
* wbHandoff

## **5.15.3 Custom Field UI Rules**

Admins must be able to define:

* field label  
* help text  
* input type  
* option list  
* whether it is filterable  
* whether it is vendor-visible  
* whether it is vendor-editable  
* whether it is required at certain stages

## **5.15.4 Validation Rules**

Custom fields may support validation such as:

* min/max length  
* allowed values  
* regex pattern for text  
* numeric min/max  
* date required before/after another date

---

## **5.16 Seeded Legacy Defaults Model**

The platform must preload historical dropship defaults as editable configuration, not fixed policy.

## **5.16.1 Seeded Default Strategy**

Legacy values should be imported into:

* `pricingProfiles`  
* `operationalProfiles`  
* `services`  
* `fees`  
* `systemSettings/supportContacts`

Each imported record must include:

* `seededFromLegacy = true`  
* `reviewRequired = true`

## **5.16.2 Legacy Default Behavior**

Seeded defaults must:

* appear in admin settings on first launch  
* be editable before first real use  
* be clearly labeled as imported defaults  
* require admin review before being marked current published

## **5.16.3 Historical Source Safety**

Legacy imported defaults must not be assumed current policy until an internal admin publishes or activates them.

---

## **5.17 Data Integrity and Constraint Rules**

The system must enforce the following constraints.

1. One current active quote per brand at a time.  
2. One current active agreement package per brand at a time.  
3. One site approval record per brand-site pair.  
4. One current published config version per config key.  
5. One active WB handoff per brand at a time.  
6. Signed agreement versions cannot be edited.  
7. Sent quote/agreement versions cannot be edited in place.  
8. Quote and agreement numbering must be unique.  
9. Vendor-side scope must always be explicit through access assignments or access links.  
10. Config changes must not retroactively alter sent or signed historical records.

---

## **5.18 Query and Summary Field Rules**

To support dashboards and fast list loading, all major runtime records must include summary fields.

### **Quote summary fields**

* `vendorName`  
* `brandName`  
* `siteCodes`  
* `status`  
* `ownerUserId`  
* `validUntilDate`  
* `currentVersionNumber`

### **Agreement summary fields**

* `vendorName`  
* `brandName`  
* `siteCodes`  
* `status`  
* `signedAt`  
* `primarySignerContactId`  
* `currentVersionNumber`

### **Brand summary fields**

* `approvedSiteCodes`  
* `currentQuoteStatus`  
* `currentAgreementStatus`  
* `currentWbStatus`

These fields are denormalized for performance and must be updated transactionally or via server-side workflow logic.

---

## **5.19 Server-Side Write Rules**

The following writes must be controlled by backend functions, not direct client writes:

* quote/agreement number generation  
* status transitions  
* publish actions  
* version creation  
* immutable snapshot creation  
* final PDF registration  
* acceptance event finalization  
* access link issue/revoke  
* current-record pointer updates  
* WB handoff state transitions where required  
* audit log creation for protected actions

Simple profile-style edits may be direct if permitted, but protected state transitions must remain server-controlled.

---

## **5.20 Acceptance Criteria for Section 5**

Section 5 will be considered implemented correctly when the built platform can do all of the following:

* store one vendor with multiple brands  
* assign contacts across brands through role assignments  
* manage brand-specific site approvals  
* maintain one current active quote and one current active agreement per brand  
* preserve quote and agreement versions as immutable snapshots  
* store versioned pricing, operational, template, layout, and terms configs  
* allow admins to publish new config versions without altering history  
* preload legacy defaults as editable, review-required config  
* let admins change required fields and visibility rules without code  
* let admins add custom fields without code  
* let admins manage site list, services, fees, templates, and workflow settings without development  
* store final documents, WB handoffs, notifications, and activity logs in structured collections  
* support audit-safe summary fields for dashboards and queues

---

## **5.21 Section 5 Implementation Directive**

All later sections of the PRD/spec must follow the data and configuration model defined here.

If later design choices conflict with this section, the build must prioritize:

1. immutable version snapshots for sent and signed records  
2. vendor-brand as the primary operational key  
3. per-brand site approval records  
4. admin-managed versioned configuration instead of hardcoded business logic  
5. required-field and custom-field controls without development  
6. server-controlled protected writes and numbering  
7. indefinite preservation of historical legal and commercial records

---

# **Section 6 — Legal, Audit Trail, Notifications, and Reporting**

## **6.1 Section Purpose**

This section defines the legal-support structure, audit requirements, notification system, and reporting model for the platform.

This section must guide the AI build for:

* legal document versioning and acceptance evidence  
* immutable recordkeeping  
* audit-grade event capture  
* dispute-ready export packages  
* vendor and internal notifications  
* reminder and escalation logic  
* internal reporting, dashboards, and exports  
* admin-managed legal and communications configuration

This section does **not** provide legal advice. It defines the system behavior needed to support legal, contractual, operational, and reporting workflows in a defensible way.

This section must work with the decisions already established in Sections 1–5:

* one vendor may manage multiple brands  
* quotes and agreements are managed at the vendor-brand level  
* site approvals are set per brand  
* the vendor sees one combined review package at launch  
* final signed records must be retained indefinitely  
* normal updates must be manageable by admins without development  
* the platform ends at WB handoff and does not replace WB

---

## **6.2 Legal and Audit Design Principles**

The legal and reporting layer must follow these principles.

### **Principle 1 — Exact Record of What Was Shown and Accepted**

The system must preserve the exact commercial and legal content that the vendor saw and accepted, not just a reference to current settings.

### **Principle 2 — Signed Records Must Be Immutable**

Once a vendor signs or accepts the final package, the signed version must not be editable. Later changes must create a new version, amendment, or new negotiation cycle.

### **Principle 3 — Audit Trail Must Be Complete and Trustworthy**

Every meaningful action related to record access, record change, publishing, sending, signing, notification, and WB handoff must be captured with enough detail to reconstruct the workflow later.

### **Principle 4 — Legal History Must Survive Business Changes**

If admins later change:

* sites  
* fees  
* pricing defaults  
* templates  
* terms  
* company information  
* support contacts

those changes must not alter the historical record of what was previously sent or signed.

### **Principle 5 — Notifications Support Workflow but Do Not Define Truth**

A notification can fail, be delayed, or be ignored. Workflow truth must always come from the business record and audit events, not from notification success alone.

### **Principle 6 — Reports Must Be Derived from Stable Statuses and Timestamps**

KPIs and reports must use stored statuses, timestamps, and versioned records rather than trying to infer business truth from current settings.

### **Principle 7 — Internal Reporting Is Operationally Useful, Not Just Cosmetic**

Reports must help a small internal team answer:

* what is pending  
* what is blocked  
* what has been signed  
* what changed  
* what is ready for WB  
* what versions were accepted  
* where cycle time is breaking down

### **Principle 8 — Legal and Operational Clarity Must Be Achievable Without Developers**

Admins must be able to publish new terms, update clauses, edit reminders, change acceptance text, and update support/contact messaging without code changes.

---

## **6.3 Legal-Support Scope of the Platform**

The platform must provide system support for the following legal/commercial functions:

* version-controlled terms and conditions  
* version-controlled quote and agreement templates  
* version-controlled package layouts  
* version-controlled commercial and operational schedules  
* signer assignment  
* acceptance text presentation  
* identity-linked acceptance and signature evidence  
* final PDF generation and storage  
* permanent historical retrieval  
* dispute-ready export package generation  
* audit trail of who changed what and when

The platform must **not** be presented as a substitute for attorney review. It is a workflow and recordkeeping system that makes the business process consistent, auditable, and easier to manage.

---

## **6.4 Legal Record Hierarchy**

The platform must preserve legal and commercial data in four layers.

## **6.4.1 Reusable Configuration Layer**

These are admin-managed reusable records that may change over time:

* terms versions  
* clause library  
* quote templates  
* agreement templates  
* package layouts  
* pricing profiles  
* operational profiles  
* support contact defaults  
* acceptance text defaults

These objects are reusable source material. They are not themselves proof of what a vendor accepted unless snapshotted into a sent or signed version.

## **6.4.2 Transaction Version Layer**

These are immutable or lockable record versions tied to a live business record:

* quote versions  
* agreement versions

Each sent or signed version must store a frozen snapshot of:

* vendor information shown  
* brand information shown  
* approved sites shown  
* commercial schedule shown  
* operational expectations shown  
* legal terms shown  
* acceptance text shown  
* signer information shown  
* template/layout versions used

This is the primary evidence layer for what was presented.

## **6.4.3 Execution Evidence Layer**

These are event and document records proving vendor action:

* acceptance events  
* signer assignments  
* secure access history  
* final PDF documents  
* timestamped activity logs  
* document download logs where tracked  
* notification records tied to send and reminder actions

## **6.4.4 Historical Retrieval Layer**

These are the views and export functions that allow the business to reconstruct the full story later:

* activity timeline  
* document history  
* version compare  
* final package download  
* dispute export bundle  
* audit export bundle  
* terms acceptance lookup by version

---

## **6.5 Terms, Clauses, and Legal Content Management**

## **6.5.1 Terms Version Model**

Terms and conditions must be version-controlled. Each published terms version must include:

* version number  
* version label  
* title  
* effective date  
* body content  
* acceptance text  
* clause references  
* summary of changes  
* content hash  
* publish timestamp  
* publisher identity

Only one current published version per `termsKey` may be active at a time.

## **6.5.2 Clause Library Model**

The system must support a reusable clause library for common legal or commercial text blocks.

Clauses must be categorized for reuse, such as:

* general terms  
* cancellation language  
* returns language  
* payment terms  
* site-specific language  
* service-specific language  
* disclosure language  
* support language  
* exception clauses

Each clause must support:

* unique key  
* title  
* body content  
* category  
* active/inactive state  
* approved for use flag  
* tags  
* change history

## **6.5.3 Template Version Model**

Quote templates, agreement templates, and package layouts must all be versioned and publishable.

The system must support:

* draft  
* published  
* retired

Only published versions can be used for new sends.

## **6.5.4 Publish Rules**

When admins publish a new:

* terms version  
* template version  
* package layout  
* pricing profile  
* operational profile

the system must not retroactively change any:

* sent quote version  
* signed agreement version  
* final PDF  
* prior acceptance evidence

A published update affects:

* new drafts by default  
* existing drafts only if refreshed intentionally  
* never already-sent or signed history

## **6.5.5 Acceptance Text Requirement**

Every terms version and final signing flow must include explicit acceptance text.

That text must be:

* version-controlled  
* snapshot into the agreement version at send/sign time  
* stored in acceptance evidence  
* visible on the final acceptance/signature screen

## **6.5.6 Non-Standard Legal Content**

The system must support the possibility of non-standard legal text or negotiated exceptions.

Best-practice rule for launch:

* any manual edit to vendor-visible legal text after template generation must create a revision event  
* the system must require a revision reason  
* the system must flag the agreement as containing a legal exception  
* the system must record who introduced the non-standard language

Future enhancement:

* route non-standard legal language through a dedicated approval rule if internal approval tiers are later introduced

---

## **6.6 Acceptance, Signature, and Evidence Model**

## **6.6.1 Acceptance Objective**

The system must be able to prove:

* who accessed the package  
* who reviewed it  
* who signed or accepted it  
* when the action happened  
* what exact version they accepted  
* what content hash that version had  
* what final document was generated

## **6.6.2 Acceptance Methods**

The platform must support the following launch methods:

* secure one-time link with fresh verification  
* email-based login with fresh verification  
* click-to-accept or sign action inside the platform

The exact UI may vary, but the evidence model must be the same.

## **6.6.3 Minimum Required Evidence for Final Acceptance**

For every final signed or accepted agreement package, the system must store:

* agreement ID  
* agreement version ID  
* quote ID if applicable  
* quote version ID if applicable  
* vendor ID  
* brand ID  
* signer contact ID  
* signer display name  
* signer email  
* verification method  
* access link ID if applicable  
* acceptance text shown  
* accepted content hash  
* terms version key and version  
* agreement template key and version  
* package layout key and version  
* approved site snapshot  
* commercial schedule snapshot reference  
* operational expectations snapshot reference  
* IP address  
* user agent / device metadata  
* occurred timestamp  
* final document ID  
* evidence document ID if separate  
* action type (`accept`, `sign`, `decline`, `request_changes`, `viewed`)

## **6.6.4 Fresh Verification Rule**

Before the final sign/accept action is completed, the system must require fresh verification.

Approved approaches:

* email OTP / code  
* re-authentication within the session  
* signed-in confirmation challenge

This prevents a forwarded link from being the only factor in final execution.

## **6.6.5 Finalization Rule**

Once the final signature or acceptance is complete:

* the agreement version must be marked finalized  
* the final PDF must be generated or confirmed  
* the final PDF must be marked immutable  
* prior active links for that version must be invalidated as needed  
* the vendor-brand record must move to `signed` and then `ready_for_wb`  
* the activity timeline and acceptance event log must be updated immediately

## **6.6.6 Decline and Change Request Evidence**

If the vendor rejects or requests changes, the system must still capture:

* contact identity  
* timestamp  
* comment/reason  
* version being rejected or commented on  
* delivery/access method used

This matters for legal, operational, and support history even if the record is not finalized.

---

## **6.7 Material Change Rules and Legal Change Control**

## **6.7.1 Material Change Definition**

A material change is any change that would reasonably affect what the vendor is agreeing to.

At minimum, the following must be treated as material:

* approved site changes  
* fee changes  
* pricing changes  
* service scope changes  
* payout or commercial term changes  
* signer changes  
* terms version changes  
* legal clause changes  
* shipping or operational expectation changes that affect the agreement  
* support or return obligations if vendor-facing  
* any custom vendor-visible text edit in the package

## **6.7.2 Pre-Send Change Rule**

Before send, changes can be made directly to the current draft.

The system must still capture:

* updated timestamps  
* last editor  
* draft activity log  
* optional revision notes

## **6.7.3 Post-Send, Pre-Sign Change Rule**

After send but before final signature, any material change must:

* create a new quote version and/or agreement version  
* supersede the prior current version  
* update current version pointers  
* follow access-link invalidation rules set by workflow settings  
* preserve the older sent version in history

## **6.7.4 Post-Sign Change Rule**

After signature, the original signed version must never be edited.

Any change after signature must be handled through:

* a new negotiation cycle  
* an amendment flow  
* or a new agreement version path designed for post-sign changes

The original signed version remains the permanent record of the original acceptance.

## **6.7.5 Override Rule**

If an admin uses an override to bypass a normal rule:

* the override must require a reason  
* the reason must be stored  
* the action must be logged as audit-critical  
* the activity timeline must show that an override occurred

---

## **6.8 Final Documents and Legal Storage Requirements**

## **6.8.1 Final Output Requirement**

Each completed vendor package must produce a final, retrievable document set that can be used for:

* vendor download  
* internal retrieval  
* dispute support  
* historical reporting  
* WB handoff reference

## **6.8.2 Required Stored Outputs**

For each finalized package, the system must store:

* final signed agreement PDF  
* final quote snapshot output if kept separate  
* terms snapshot or embedded legal snapshot  
* evidence record  
* approved site snapshot  
* commercial schedule snapshot  
* operational expectation snapshot  
* activity and notification references sufficient for retrieval  
* WB handoff status reference

The final signed PDF is the primary human-readable record. The associated snapshot data is the structured machine-readable record.

## **6.8.3 Immutability Rule**

The final signed document and its corresponding agreement version must be treated as immutable.

That means:

* no editing  
* no overwriting  
* no silent regeneration that changes content  
* no deletion from normal UI  
* no replacement by current templates or current terms

If a corrected PDF ever needs to be created for an operational reason, the system must preserve the original and log the reason.

## **6.8.4 Retention Rule**

Signed and accepted records must be retained indefinitely.

This includes:

* final PDFs  
* agreement versions  
* acceptance events  
* audit trail  
* linked notifications relevant to the transaction  
* related site approval and commercial snapshots

## **6.8.5 Draft and Unsent Record Retention**

Draft and unsent records may have configurable archive policies, but:

* they should not be hard-deleted by default  
* they must remain searchable when business history matters  
* admins may archive stale drafts without affecting signed history

---

## **6.9 Dispute, Audit, and Historical Export Packages**

## **6.9.1 Dispute Export Package**

The system must support generating a dispute-ready export package for a vendor-brand transaction.

At minimum, the export package must include:

* vendor summary  
* brand summary  
* approved sites at time of send/sign  
* quote version snapshot  
* agreement version snapshot  
* terms version snapshot  
* final signed PDF  
* acceptance event details  
* signer details  
* access link and access history summary  
* notification send history summary  
* activity timeline summary  
* WB handoff summary if relevant

## **6.9.2 Export Format**

The export package should be generated as:

* zipped archive  
* or a structured export folder/package document set

It must be easy for a business user to download without developer help.

## **6.9.3 Export Permissions**

Only internal admins or future audit-authorized roles may generate or download dispute exports.

## **6.9.4 Export Audit Rule**

Every dispute or audit export generation must be logged, including:

* who generated it  
* when it was generated  
* what entity it covered  
* why it was generated if reason capture is enabled

---

## **6.10 Audit Trail Model**

## **6.10.1 Audit Store**

The system must use `activityLogs` as the canonical event trail for operational and audit history, with supporting evidence from:

* `acceptanceEvents`  
* `accessLinks`  
* `notifications`  
* `documents`  
* `quoteVersions`  
* `agreementVersions`

The audit model must allow the business to reconstruct the full history of a transaction.

## **6.10.2 Audit Event Naming Standard**

Audit and activity actions must use stable keys in dot notation.

Examples:

* `vendor.created`  
* `brand.created`  
* `brand.site_selected`  
* `brand.site_approved`  
* `quote.created`  
* `quote.version_created`  
* `quote.sent`  
* `quote.viewed`  
* `quote.superseded`  
* `agreement.created`  
* `agreement.sent`  
* `agreement.viewed`  
* `agreement.signer_assigned`  
* `agreement.signed`  
* `agreement.voided`  
* `terms.version_published`  
* `template.version_published`  
* `access.link_issued`  
* `access.link_revoked`  
* `access.login_success`  
* `access.login_failed`  
* `settings.workflow_updated`  
* `notification.sent`  
* `notification.failed`  
* `wb.ready_marked`  
* `wb.completed`

## **6.10.3 Required Audit Event Fields**

Every audit event must include:

* entity type  
* entity ID  
* entity version ID if relevant  
* vendor ID if relevant  
* brand ID if relevant  
* action key  
* actor type (`user`, `contact`, `system`)  
* actor ID  
* actor display name  
* occurred timestamp  
* metadata summary

Where appropriate, audit events must also include:

* before summary  
* after summary  
* reason  
* source rule  
* related document ID  
* related notification ID  
* related access link ID  
* correlation/group ID for grouped actions

## **6.10.4 Before/After Capture Rule**

For protected changes, the audit trail must capture before/after summary data.

Examples:

* site approvals changed  
* pricing profile switched  
* required field rules updated  
* workflow policy changed  
* agreement signer changed  
* terms version published  
* access revoked

Before/after summaries should be human-readable and safe for export.

## **6.10.5 Audit Critical Events**

The following events must be treated as audit-critical and never skipped:

* user access changes  
* allowlist changes  
* send actions  
* version creation  
* supersede actions  
* final sign/accept  
* final PDF creation  
* template publish  
* terms publish  
* settings changes affecting workflow or visibility  
* override actions  
* dispute export generation

## **6.10.6 Audit Edit Rule**

Audit events must not be editable from the UI after creation.

If a correction is needed, the system must write a new corrective event rather than rewriting the original.

---

## **6.11 Notification System Scope**

## **6.11.1 Purpose**

The notification system must support internal workflow clarity and vendor response without requiring manual follow-up for every step.

It must handle:

* transactional notifications  
* reminders  
* escalation notices  
* completion confirmations  
* internal alerts  
* vendor communications tied to the current package version

## **6.11.2 Launch Channels**

Launch channels must include:

* email  
* in-app notifications for internal users

Future channel support may include:

* SMS  
* chat alerts  
* webhook notifications

These future channels should be feature-flagged and not required for launch.

## **6.11.3 Notification Rules**

Notifications must be:

* event-driven  
* template-based  
* version-aware  
* auditable  
* suppressible when no longer relevant  
* retryable when delivery fails  
* configurable by admins without code

---

## **6.12 Notification Event Catalog**

The system must support at least the following events.

## **6.12.1 Vendor-Facing Events**

* `package.sent`  
* `package.reminder_not_opened`  
* `package.reminder_not_completed`  
* `package.superseded`  
* `package.revision_available`  
* `package.change_requested_received_ack`  
* `agreement.signature_requested`  
* `agreement.signature_reminder`  
* `agreement.signed_confirmation`  
* `document.final_available`

## **6.12.2 Internal-Facing Events**

* `vendor.created`  
* `brand.ready_for_quote`  
* `quote.ready_to_send`  
* `quote.sent`  
* `vendor.package_viewed`  
* `vendor.changes_requested`  
* `agreement.awaiting_signature`  
* `agreement.signed`  
* `agreement.failed_finalization`  
* `wb.ready_for_handoff`  
* `wb.blocked`  
* `wb.completed`  
* `notification.failed`  
* `settings.legal_updated`  
* `terms.published`  
* `template.published`  
* `override.used`

## **6.12.3 Optional Future Escalation Events**

* `package.no_response_escalation`  
* `signature.overdue_escalation`  
* `wb.handoff_overdue_escalation`

These should be configurable even if disabled at launch.

---

## **6.13 Notification Recipients and Routing**

## **6.13.1 Vendor Routing**

Vendor notifications must route to:

* the recipient contact(s) selected at send time  
* signer(s) where signature is required  
* optional CC-style contacts if future settings allow

## **6.13.2 Internal Routing**

Internal notifications must route based on:

* record owner  
* assigned user  
* fallback team owner if no owner exists  
* WB handoff assignee  
* admin alert targets for failures

## **6.13.3 Routing Rules**

The system must support routing rules such as:

* send package to primary contact and signer  
* send signed confirmation to primary contact and signer  
* send WB-ready alert to record owner  
* send failed notification alert to admins or owner  
* send blocked handoff alert to assignee and owner

Routing must be **admin-configurable** wherever reasonable.

---

## **6.14 Notification Template and Content Rules**

## **6.14.1 Template Versioning**

Notification templates must be versioned and publishable.

Each template must support:

* template key  
* version  
* event type  
* channel  
* subject/body  
* merge field list  
* status  
* publish timestamp  
* change summary

## **6.14.2 Merge Field Rules**

Templates must support merge fields for:

* vendor name  
* brand name  
* site names  
* quote number  
* agreement number  
* signer name  
* due dates  
* support contact info  
* secure review link  
* final download link  
* owner name

## **6.14.3 Version Snapshot Rule**

When a notification is queued or sent, the system must store:

* template key  
* template version  
* event type  
* payload summary

This preserves what communication logic was used at the time.

## **6.14.4 Message Quality Rules**

Notification copy must be:

* clear  
* professional  
* direct  
* version-aware  
* action-oriented

Vendor notifications must not expose internal-only information, internal notes, or unrelated data.

---

## **6.15 Reminder, Retry, and Suppression Logic**

## **6.15.1 Reminder Logic**

The system must support reminders for:

* package not opened  
* package opened but not completed  
* signature still pending  
* WB handoff ready but unassigned  
* WB handoff assigned but stalled

Reminder timing must be **admin-configurable**.

## **6.15.2 Retry Logic**

If a notification fails to send:

* the system must mark it failed  
* log the failure reason if available  
* retry according to configured retry policy where appropriate  
* notify internal admins if the failure affects a critical vendor workflow

## **6.15.3 Suppression Logic**

Notifications must be suppressed automatically when they are no longer relevant.

Examples:

* do not send a signature reminder after the agreement is signed  
* do not send package reminders after the package is superseded  
* do not send WB overdue reminders after WB is complete

## **6.15.4 Pause Logic**

Admins must be able to pause reminders on a per-record basis.

Examples:

* vendor requested additional time  
* internal correction in progress  
* temporary workflow hold

Pause actions must be logged.

---

## **6.16 Reporting and Analytics Scope**

## **6.16.1 Reporting Purpose**

Reporting must help the business understand:

* pipeline volume  
* completion rates  
* vendor responsiveness  
* team workload  
* agreement turnaround time  
* version and terms usage  
* WB handoff progress  
* operational blockers  
* communication effectiveness

## **6.16.2 Report Audiences**

Reports are internal only and must support:

* admins  
* team leads  
* operations  
* future finance/legal stakeholders if roles expand later

Vendor users must not have access to system-wide internal reporting.

---

## **6.17 Required Report Categories**

## **6.17.1 Pipeline and Workflow Reports**

The system must support reports for:

* vendors in setup  
* brands ready for quote  
* quotes in draft  
* quotes sent  
* vendor responses pending  
* agreements awaiting signature  
* signed this week/month  
* ready for WB  
* WB handoffs in progress  
* WB handoffs blocked  
* completed vendor-brand packages

## **6.17.2 Legal and Acceptance Reports**

The system must support reports for:

* agreements signed by date range  
* agreements signed by site  
* agreements signed by vendor  
* agreements signed by brand  
* terms version acceptance counts  
* agreement template usage  
* non-standard legal exception count  
* rejected package count  
* change request count  
* superseded version count

## **6.17.3 Commercial Reports**

The system must support reports for:

* pricing profile usage  
* fee usage  
* service usage  
* average time from quote draft to send  
* average time from send to vendor first view  
* average time from send to sign  
* acceptance/rejection rate by site  
* acceptance/rejection rate by owner  
* average revisions per brand

## **6.17.4 Notification Performance Reports**

The system must support reports for:

* sent notifications by event type  
* open/view proxies where available  
* failed notification counts  
* reminder counts  
* vendor response after reminder  
* internal notification failure trends

## **6.17.5 Audit and Admin Change Reports**

The system must support reports for:

* settings changes by user  
* terms/template publishes  
* access grants/revocations  
* override usage  
* dispute export generation  
* final document regeneration events if any  
* archived vs active record trends

---

## **6.18 KPI Definitions**

The dashboard and reporting layer must use stable KPI definitions.

### **Required KPIs**

* **Quote Sent Count**: count of quotes with `status = sent` in period  
* **Vendor Response Pending**: current brand records where package is sent/viewed but not completed  
* **Agreement Signed Count**: agreements with signed timestamp in period  
* **Time to First View**: `firstViewedAt - sentAt`  
* **Time to Signature**: `signedAt - sentAt`  
* **Ready for WB Count**: brand records with status `ready_for_wb`  
* **WB Completion Time**: `completedAt - readyAt`  
* **Change Request Rate**: change requests divided by sent packages  
* **Terms Version Usage**: count of signed versions by terms version  
* **Supersede Rate**: superseded versions divided by sent versions

These calculations must be based on stored timestamps and statuses, not inferred from loose activity.

---

## **6.19 Reporting Filters and Dimensions**

All reporting pages must support filtering by at least:

* date range  
* site  
* vendor  
* brand  
* owner  
* quote status  
* agreement status  
* WB handoff status  
* terms version  
* template version  
* pricing profile  
* signer  
* archived vs active state

Reports should also support grouping by:

* site  
* month/week  
* owner  
* vendor  
* brand  
* template  
* terms version

---

## **6.20 Reporting Exports**

## **6.20.1 Export Formats**

Internal reports must be exportable to:

* CSV  
* spreadsheet-friendly format  
* printable summary view  
* PDF summary for selected reports if needed later

## **6.20.2 Export Permissions**

Report export permissions must be controlled by role and permission settings.

## **6.20.3 Snapshot Rule**

When exporting a report, the system should export the current query result set at the time of generation. Export activity should be logged for sensitive legal/audit reports.

---

## **6.21 Saved Views and Operational Reporting**

The platform must support saved operational views that behave like lightweight reports.

Examples:

* Waiting on Vendor  
* Signed This Week  
* Ready for WB  
* Karmaloop Pending  
* MLTD Awaiting Signature  
* Terms Version 3.2 Accepted  
* Notifications Failed Today  
* My Blocked Records

Saved views must support:

* owner-specific views  
* shared views if enabled  
* filter persistence  
* table column configuration  
* default sort

Saved views are part of the reporting system because they help a small team run daily operations without building custom reports each time.

---

## **6.22 Admin Controls for Legal, Audit, Notifications, and Reporting**

The following controls must be available to admins without development.

## **6.22.1 Legal Controls**

Admins must be able to manage:

* terms versions  
* clause library  
* acceptance text  
* quote templates  
* agreement templates  
* package layouts  
* operational/legal disclosure text  
* review/publish state  
* legacy seeded defaults before activation

## **6.22.2 Audit Controls**

Admins must be able to:

* search activity logs  
* filter audit events  
* download dispute export packages  
* view acceptance evidence  
* see who changed what  
* see override reasons  
* view access-link history  
* view notification history tied to a transaction

Admins must **not** be able to edit historical audit events.

## **6.22.3 Notification Controls**

Admins must be able to manage:

* event enablement  
* template versions  
* reminder cadence  
* retry rules  
* escalation recipients  
* support contact references  
* link expiration messaging  
* pause/resume reminder behavior per record

## **6.22.4 Reporting Controls**

Admins must be able to manage:

* dashboard card defaults  
* shared saved views  
* report filters  
* visible report modules  
* export availability by role  
* KPI definitions where safe to expose  
* date default ranges

---

## **6.23 Legal and Audit UI Requirements**

The frontend must include the following internal interfaces.

### **Required internal legal/audit screens**

* Terms Version List  
* Terms Editor / Compare  
* Clause Library  
* Acceptance Evidence View  
* Audit Log Explorer  
* Notification History View  
* Dispute Export Action  
* Report Dashboard  
* Saved Views Manager

### **Required record-level tabs or panels**

Each major quote/agreement/brand page must include access to:

* Activity  
* Version History  
* Documents  
* Notification History  
* Acceptance Evidence  
* WB Handoff status

### **Required vendor-facing screens**

Vendor screens must show:

* current package status  
* current version  
* acceptance text  
* final confirmation page  
* final download page after completion

---

## **6.24 Reporting Freshness and Source Rules**

## **6.24.1 Operational Freshness**

Operational reports and dashboards should update near real time from current Firestore records and server-side events.

## **6.24.2 Historical Accuracy Rule**

Historical reports must use stored snapshots and timestamps, not current settings.

Examples:

* a report on agreements signed under old terms must use the stored old terms version reference  
* a report on Karmaloop-approved brands at signature time must use the snapshot stored in the agreement version  
* a report on notification behavior must use notification records, not guessed workflow timing

## **6.24.3 Signed Record Truth Rule**

For any dispute or legal report, the signed agreement version and final evidence must override any later draft changes or current settings.

---

## **6.25 Security-Sensitive Audit Requirements**

Even though detailed security architecture belongs in Section 7, the following audit-sensitive rules are mandatory here.

### **Required security-related audit events**

* internal login success/failure  
* vendor login success/failure  
* secure link issued/revoked/expired  
* access allowlist changes  
* permission changes  
* user disablement  
* final document download by external signer if tracked  
* dispute export generation  
* override usage

### **Required legal-sensitive event capture**

* agreement viewed  
* final action page opened  
* fresh verification passed  
* agreement signed  
* terms version accepted  
* package superseded after send  
* signer changed after send  
* final PDF created

---

## **6.26 Acceptance Criteria for Section 6**

Section 6 will be considered implemented correctly when the built platform can do all of the following:

* version and publish legal terms, templates, and package layouts without changing signed history  
* store exact snapshots of what the vendor saw at send/sign time  
* require fresh verification before final signature/acceptance  
* generate and store immutable final signed documents  
* retain signed records indefinitely  
* record acceptance evidence including identity, timestamp, version, and content hash  
* create a complete audit trail for access, sending, publishing, signing, overrides, and WB handoff  
* search and filter audit history from the UI  
* send vendor and internal notifications based on workflow events  
* allow admins to edit notification templates and reminder rules without code  
* suppress irrelevant reminders automatically  
* produce reports for pipeline, signatures, terms usage, notification performance, and WB handoff progress  
* generate dispute-ready export packages without developer help  
* keep reports tied to stable statuses, timestamps, and snapshots rather than current mutable settings

---

## **6.27 Section 6 Implementation Directive**

All later sections of the PRD/spec must follow the legal, audit, notification, and reporting rules defined here.

If later design decisions conflict with this section, the build must prioritize:

1. immutable signed records and immutable final PDFs  
2. exact snapshot-based evidence of what was shown and accepted  
3. complete auditability of access, sends, publishes, revisions, and signatures  
4. admin-managed legal text, reminder logic, and reporting controls without development  
5. reporting based on stable statuses, timestamps, and version references  
6. indefinite retention of signed legal and commercial records  
7. dispute-ready exportability for every completed vendor-brand transaction

---

# **Section 7 — Technical Architecture, Security, and Build Plan**

## **7.1 Section Purpose**

This section defines the implementation architecture, security model, deployment structure, operational controls, and phased build plan for the platform.

This section must guide the AI build for:

* frontend architecture  
* backend architecture  
* Firebase and Google Cloud service selection  
* authentication and authorization enforcement  
* Firestore and Storage access patterns  
* document generation  
* workflow execution  
* environment separation  
* secrets management  
* testing  
* CI/CD  
* observability  
* backup and recovery  
* production rollout

This section turns the business and data requirements in Sections 1–6 into a build-ready technical system.

---

## **7.2 Technical Design Principles**

The technical implementation must follow these principles.

### **Principle 1 — Google-Native, Firebase-First**

The product must be built primarily on Firebase and Google Cloud services so the stack is operationally simple, scalable, and easy to maintain.

### **Principle 2 — Serverless by Default**

Use managed services wherever possible. Avoid custom infrastructure unless there is a clear technical reason.

### **Principle 3 — Protected Writes Must Be Server-Controlled**

Anything that changes legal, commercial, or workflow state must run through trusted backend logic, not direct client-side writes.

### **Principle 4 — Configuration Over Code**

Operational behavior should be driven by versioned settings, templates, and rules stored in Firestore, not hardcoded logic.

### **Principle 5 — Immutable History**

Sent and signed records must be snapshotted and immutable. The current state may change; history may not.

### **Principle 6 — Clean Separation of Environments**

Development, staging, and production must be isolated at the project level.

### **Principle 7 — Least Privilege Everywhere**

Frontend, backend, Storage, secrets, and admin controls must all follow least-privilege rules.

### **Principle 8 — Build for a Small Team**

The system must be operationally realistic for a small company. It should be robust, but not over-engineered into unnecessary microservices.

---

## **7.3 Recommended Platform Stack**

## **7.3.1 Web Application**

Use **Next.js \+ TypeScript** as the main web application framework, deployed on **Firebase App Hosting**.

Firebase App Hosting is the best-fit hosting layer for this product because it provides built-in support for Next.js, GitHub integration, and automatic deployment on branch pushes. It is backed by Google Cloud services including Cloud Build, Cloud Run, Cloud CDN, and Secret Manager. ([Firebase](https://firebase.google.com/docs/app-hosting))

## **7.3.2 Authentication**

Use **Firebase Authentication** for:

* internal login  
* vendor login  
* optional email-link login  
* Google sign-in for internal users

Firebase Authentication supports email/password and federated sign-in methods, and email-link sign-in is also supported when the Email/Password provider is enabled. ([Firebase](https://firebase.google.com/docs/auth/))

## **7.3.3 Database**

Use **Cloud Firestore (Native mode)** as the primary operational database.

Firestore is the correct primary store for:

* vendors  
* brands  
* quotes  
* agreements  
* site approvals  
* documents metadata  
* admin settings  
* workflow state  
* audit references  
* notifications  
* saved views

## **7.3.4 Backend Logic**

Use **Cloud Functions for Firebase Gen 2** as the default backend execution layer.

Cloud Functions for Firebase supports HTTPS requests, background events, Admin SDK calls, and Cloud Scheduler-triggered jobs. Current Firebase guidance favors Gen 2, which runs on Cloud Run and provides improved configuration, monitoring, and performance compared with 1st gen. ([Firebase](https://firebase.google.com/docs/functions/))

## **7.3.5 Dedicated Document Rendering Service**

Use a **dedicated Cloud Run service** for heavy document rendering and PDF generation.

Reason:

* headless browser / HTML-to-PDF rendering is more predictable in a dedicated service  
* long-running render tasks are better isolated  
* versioned document rendering can be tested independently  
* the service can be reused by Functions through authenticated HTTP calls

## **7.3.6 File Storage**

Use **Cloud Storage for Firebase** for:

* uploaded attachments  
* generated quote PDFs  
* generated agreement PDFs  
* dispute export bundles  
* supporting documents  
* branding assets

Cloud Storage Security Rules are path-based and can enforce user-based access as well as file validation such as content type and size. ([Firebase](https://firebase.google.com/docs/storage/security/))

## **7.3.7 Async and Scheduled Work**

Use:

* **Cloud Tasks** for delayed, asynchronous, retryable per-record work  
* **Cloud Scheduler** for recurring scheduled jobs

Cloud Tasks is designed for asynchronous task dispatch to arbitrary HTTP endpoints. Cloud Scheduler is intended for recurring cron-like jobs and supports retries. ([Google Cloud Documentation](https://docs.cloud.google.com/tasks/docs))

## **7.3.8 Secrets**

Use **Secret Manager** for all sensitive configuration:

* email transport secrets  
* API keys  
* service credentials  
* webhook secrets  
* signing secrets  
* vendor-access token signing keys

Secret Manager is the correct place for secrets because it provides secret versioning, IAM-based access control, auditing, and encrypted storage. Google’s best-practice guidance recommends least-privilege IAM and separate projects by environment. ([Google Cloud Documentation](https://docs.cloud.google.com/secret-manager/docs/overview))

## **7.3.9 Observability**

Use:

* **Cloud Logging** for structured application logs  
* **Cloud Monitoring** for metrics, dashboards, and alerting  
* **Error Reporting** for grouped production errors

Cloud Logging, Monitoring, and Error Reporting are the recommended Google-native observability layer for this application. ([Google Cloud Documentation](https://docs.cloud.google.com/logging/docs?utm_source=chatgpt.com))

## **7.3.10 Testing**

Use the **Firebase Local Emulator Suite** for local development and CI integration testing across Firestore, Auth, Storage, Functions, and Hosting-related workflows. ([Firebase](https://firebase.google.com/docs/emulator-suite))

---

## **7.4 Environment Architecture**

## **7.4.1 Required Environments**

The platform must use three separate environments:

* **dev**  
* **staging**  
* **prod**

Each environment must be a separate Firebase / Google Cloud project.

## **7.4.2 Environment Separation Rule**

Do not share:

* Firestore database  
* Auth users  
* Storage bucket  
* secrets  
* email configuration  
* App Hosting backend  
* Cloud Tasks queues  
* Scheduler jobs

between environments.

This separation aligns with Google Secret Manager best-practice guidance to segment applications and environments into separate projects for isolation and independent quotas. ([Google Cloud Documentation](https://docs.cloud.google.com/secret-manager/docs/best-practices))

## **7.4.3 Suggested Project Names**

Use a predictable naming scheme such as:

* `shiekh-vendor-docs-dev`  
* `shiekh-vendor-docs-staging`  
* `shiekh-vendor-docs-prod`

## **7.4.4 Environment Data Policy**

* dev may use synthetic data and masked seed data  
* staging should use realistic test data, but not live vendor production data  
* prod is the only source of live legal/commercial truth

## **7.4.5 Promotion Flow**

Code should move:

* local → dev  
* dev → staging  
* staging → prod

No direct local-to-prod deploys.

---

## **7.5 High-Level Architecture**

## **7.5.1 Logical Architecture**

```
Users
 ├─ Internal Admins
 └─ Vendors / Signers

Web App (Next.js on Firebase App Hosting)
 ├─ Internal Admin UI
 └─ Vendor Review / Signature UI

Firebase Authentication
 ├─ Google sign-in
 ├─ Email/password
 └─ Optional email-link sign-in

Cloud Firestore
 ├─ Core business records
 ├─ Version snapshots
 ├─ Admin configuration
 ├─ Activity logs
 └─ Notification/task metadata

Cloud Functions Gen 2
 ├─ Protected writes
 ├─ Workflow orchestration
 ├─ Auth provisioning
 ├─ Notification queueing
 ├─ Status transitions
 └─ WB handoff logic

Cloud Run PDF Service
 ├─ HTML rendering
 ├─ PDF generation
 ├─ Checksum creation
 └─ Final document packaging

Cloud Storage
 ├─ Draft documents
 ├─ Final immutable PDFs
 ├─ Attachments
 └─ Export bundles

Cloud Tasks / Cloud Scheduler
 ├─ Retries
 ├─ Reminder jobs
 ├─ Expiration jobs
 └─ Maintenance jobs

Secret Manager
 ├─ API secrets
 ├─ Mail transport secrets
 └─ Signing keys

Cloud Logging / Monitoring / Error Reporting
 ├─ Logs
 ├─ Metrics
 ├─ Alerts
 └─ Error grouping
```

## **7.5.2 Product Boundary Rule**

This architecture must stop at **WB handoff**.

It must not become:

* a Workbench replacement  
* a Shopify sync engine  
* a product operations platform  
* a long-term vendor operations portal

It is the commercial and legal intake layer before WB.

---

## **7.6 Frontend Architecture**

## **7.6.1 Frontend Framework**

Use:

* **Next.js App Router**  
* **TypeScript**  
* **React Hook Form** for forms  
* **Zod** for client/server schema validation  
* **TanStack Query** for async data state  
* a consistent UI component library  
* responsive layouts for vendor flows

## **7.6.2 Route Structure**

The application should use route groups such as:

```
/app
  /(public)
    /login
    /vendor-access/[token]
    /vendor/review/[packageId]
  /(internal)
    /dashboard
    /vendors
    /vendors/[vendorId]
    /brands
    /brands/[brandId]
    /quotes
    /quotes/[quoteId]
    /agreements
    /agreements/[agreementId]
    /documents
    /wb-handoffs
    /reports
    /settings
```

## **7.6.3 UI Composition Rules**

Build the UI as reusable modules:

* list pages  
* detail header blocks  
* status pills  
* activity timeline panels  
* version history panels  
* document viewers  
* builder step forms  
* admin settings forms  
* template editors  
* required-field rule editors

## **7.6.4 Rendering Strategy**

Use a hybrid approach:

* server-side rendered shell and route protection where useful  
* client-side data fetching for interactive module screens  
* lazy loading for heavy editors and large tables  
* static/public rendering only for minimal landing pages if needed

## **7.6.5 Form Strategy**

All business forms must support:

* autosave draft  
* optimistic local state where safe  
* explicit save for critical transitions  
* stage-based validation  
* admin-configurable required fields  
* custom fields from configuration

## **7.6.6 HTML and Template Safety**

Any admin-authored rich text, legal text, or layout content rendered in the browser must be sanitized with an allowlist of supported tags and attributes. Rendered HTML for signed documents must come from the server-side snapshot, not live client-composed markup.

---

## **7.7 Backend Architecture**

## **7.7.1 Backend Model**

The backend should be organized as a **modular monolith**, not a microservice fleet.

Use one codebase with internal modules such as:

* auth  
* access  
* vendors  
* brands  
* sites  
* quotes  
* agreements  
* documents  
* notifications  
* reporting  
* wbHandoffs  
* settings  
* audit

This keeps the system maintainable for a small team while still preserving clear boundaries.

## **7.7.2 Server-Controlled Actions**

The following actions must only run through trusted backend code:

* number generation  
* quote send  
* agreement send  
* version creation  
* supersede current version  
* final acceptance/signature handling  
* final PDF generation  
* secure link issue/revoke  
* settings publish  
* terms/template publish  
* current record pointer updates  
* WB handoff state transitions  
* dispute export generation  
* audit-critical overrides

## **7.7.3 Function Types**

Use three backend execution types:

### **A. Callable / Authenticated HTTPS Functions**

Use for protected app actions initiated by users:

* create current quote draft  
* send package  
* reissue access  
* mark ready for WB  
* publish new terms version

### **B. Event-Triggered Functions**

Use for:

* auth provisioning  
* document metadata updates  
* notification queue fan-out  
* audit trail emission where event-driven

### **C. Scheduled and Task-Driven Workers**

Use for:

* reminder processing  
* quote expiration  
* stale draft reminders  
* WB overdue checks  
* cleanup of expired access links  
* scheduled reports if later enabled

Cloud Functions supports HTTPS requests, background events, Admin SDK invocation, and Scheduler-triggered jobs, which fits this pattern cleanly. ([Firebase](https://firebase.google.com/docs/functions/))

## **7.7.4 Dedicated PDF Service**

The PDF service should expose authenticated internal endpoints such as:

* `renderQuoteVersionPdf`  
* `renderAgreementVersionPdf`  
* `renderDisputeBundle`  
* `renderVersionPreview`

Workflow:

1. Cloud Function loads immutable snapshot data  
2. backend composes render payload  
3. Cloud Run PDF service renders HTML to PDF  
4. service writes PDF to Storage  
5. backend stores checksum and document metadata in Firestore  
6. backend updates version record with final document reference

## **7.7.5 Idempotency and Concurrency**

Protected state transitions must be idempotent.

Examples:

* double-click on “Send to Vendor” must not create two current sends  
* repeated sign submit must not create two final acceptance events  
* duplicate Scheduler/Task retries must not advance status twice

Implement with:

* idempotency keys  
* transaction checks  
* current status guards  
* version-lock checks  
* task dedupe metadata

---

## **7.8 Auth and Access Implementation**

## **7.8.1 Internal Login**

Support:

* Google sign-in  
* email/password  
* optional email-link sign-in

Firebase Auth supports email/password and federated sign-in, and email-link sign-in can be enabled with the Email provider plus authorized domains. ([Firebase](https://firebase.google.com/docs/auth/))

## **7.8.2 Internal Auto-Provision Rule**

On first successful verified login:

* if email domain is `@shiekhshoes.org`, create/update internal user record  
* assign internal admin role  
* assign owner role if email matches seeded owner list  
* store allowlist source  
* set coarse auth claims if used

## **7.8.3 Allowlisted Internal Access**

For emails outside the default domain:

* check allowlisted email/domain in Firestore  
* provision user if approved  
* deny admin access if not approved

## **7.8.4 Vendor Login**

Vendor access should support two paths:

### **Login Path**

Use Firebase Auth for repeated vendor access.

### **One-Time Review Path**

Use application-generated secure access links stored in `accessLinks`. These are not the same as Firebase Auth email-link login. They are product-specific review tokens with:

* hashed token storage  
* TTL  
* usage count  
* revision invalidation state  
* scope binding

## **7.8.5 Fresh Verification for Signing**

Before final sign/accept:

* require email OTP, re-authentication, or another fresh verification step  
* verify signer identity against the intended contact  
* write acceptance evidence only after fresh verification succeeds

## **7.8.6 Custom Claims Strategy**

Use Firebase custom claims only for coarse-grained flags such as:

* `isInternal`  
* `isAdmin`  
* `isSystemOwner`

Do **not** put full business permissions or vendor-brand assignments in custom claims. Keep detailed authorization in Firestore so it remains configurable.

---

## **7.9 Firestore Access Patterns and Write Model**

## **7.9.1 Read Model**

Use Firestore as the primary live query store for:

* dashboards  
* list pages  
* record detail pages  
* status views  
* audit views  
* settings pages

Use denormalized summary fields on runtime records for speed.

## **7.9.2 Write Model**

Divide writes into three classes:

### **Class A — Safe Direct Client Writes**

Allowed only where low risk, such as:

* user UI preferences  
* draft notes if permitted  
* filter/saved view preferences  
* read-state toggles

### **Class B — Guarded Client Writes**

Allowed only if validated through rules and schema checks, such as:

* low-risk draft field edits  
* vendor limited-profile updates when enabled

### **Class C — Server-Only Writes**

Required for legal/commercial state changes:

* send  
* sign  
* publish  
* supersede  
* finalize  
* numbering  
* WB completion  
* dispute export

## **7.9.3 Transaction Rules**

Use Firestore transactions or batched writes for:

* record number assignment  
* currentQuote/currentAgreement pointer updates  
* isCurrent version updates  
* brand summary status updates  
* handoff status propagation  
* audit-critical multi-document writes

## **7.9.4 Index Strategy**

Firestore requires an index for every query; basic indexes are created automatically, and additional indexes must be created for compound queries. Indexes should be defined as code and deployed with the Firebase CLI, not managed ad hoc in production. ([Firebase](https://firebase.google.com/docs/firestore/query-data/indexing))

Maintain index files in source control, including:

* collection indexes  
* composite indexes  
* single-field overrides if needed

## **7.9.5 Suggested Core Composite Indexes**

At minimum define indexes for:

* brands by `status + ownerUserId + updatedAt`  
* brands by `currentWbStatus + updatedAt`  
* quotes by `brandId + status + updatedAt`  
* quotes by `status + validUntilDate`  
* agreements by `brandId + status + updatedAt`  
* agreements by `status + signedAt`  
* wbHandoffs by `status + assignedUserId + updatedAt`  
* activityLogs by `entityType + entityId + occurredAt`  
* notifications by `recipientUserId + status + scheduledFor`  
* accessLinks by `entityVersionId + status + expiresAt`

---

## **7.10 Security Architecture**

## **7.10.1 Firestore Security Model**

Use **Firebase Authentication \+ Firestore Security Rules v2** for all web/mobile client access. Firestore Security Rules are server-enforced for mobile/web SDK requests, while server client libraries bypass those rules and instead use IAM / Application Default Credentials. ([Firebase](https://firebase.google.com/docs/firestore/security/get-started))

### **Core Firestore rule strategy**

* deny by default  
* allow minimal reads/writes by role and scope  
* internal access validated against user record / admin claims  
* external access validated against access assignments and record scope  
* server-only collections blocked from direct client writes

## **7.10.2 Storage Security Model**

Use Cloud Storage Security Rules with path-based access controls and validation.

Recommended Storage path strategy:

```
/internal/uploads/...
/internal/generated/...
/vendor-visible/{vendorId}/{brandId}/...
/final/{vendorId}/{brandId}/{agreementVersionId}/...
/exports/disputes/...
```

Storage Security Rules can use `request.auth`, path matching, and metadata validation such as file size and content type. ([Firebase](https://firebase.google.com/docs/storage/security/))

## **7.10.3 App Check**

Enable **Firebase App Check** for:

* Firestore  
* Cloud Storage  
* callable Functions

On web, App Check supports reCAPTCHA Enterprise as the attestation provider. App Check also supports protecting custom backends, so any custom HTTP service used by this app should verify App Check tokens where applicable. ([Firebase](https://firebase.google.com/docs/app-check))

## **7.10.4 Secret Management**

All secrets must live in Secret Manager, not Firestore config documents or code. Apply least-privilege IAM and separate access by environment. Secret Manager supports secret versions, auditing, rollback, and encrypted storage. ([Google Cloud Documentation](https://docs.cloud.google.com/secret-manager/docs/overview))

## **7.10.5 Document Security**

Final documents must be accessed through short-lived signed access or backend-validated download endpoints.

Rules:

* external users download only documents tied to their scope  
* final signed documents never become publicly accessible  
* draft documents can have stricter internal-only access  
* dispute export bundles are internal-only

## **7.10.6 HTML / Content Security**

Because admins can edit templates and legal text:

* sanitize all rich text  
* block unsafe tags and attributes  
* apply CSP headers on the web app  
* never trust raw template HTML from the client  
* generate signed PDFs from server snapshots only

## **7.10.7 WB Credential Rule**

Do not store Workbench or Shopify credentials in this app in launch scope.

Only track:

* WB readiness  
* owner  
* checklist state  
* notes  
* dates

---

## **7.11 Data Protection, Backups, and Recovery**

## **7.11.1 Firestore Backups**

Enable scheduled Firestore backups in production.

Google Cloud’s managed Firestore backups support daily or weekly schedules and restore to a new database. Backups include data and index configurations, but not Security Rules or TTL policies. ([Google Cloud Documentation](https://docs.cloud.google.com/firestore/native/docs/backups))

## **7.11.2 Backup Policy**

Recommended production policy:

* daily scheduled Firestore backup  
* weekly retained backup tier  
* manual pre-release backup before major schema changes  
* backup retention aligned with operational needs

## **7.11.3 Storage Protection**

For Cloud Storage:

* keep versioned deployment configuration in git  
* use bucket lifecycle policies carefully  
* never auto-delete final signed documents  
* consider bucket retention / object hold rules for immutable final docs if operationally appropriate

## **7.11.4 Recovery Plan**

Maintain a documented restore runbook covering:

* Firestore restore to a recovery database  
* validation of recovered collections  
* reattachment of app config if needed  
* document bucket verification  
* secret rebind / environment switch if needed

## **7.11.5 Disaster Recovery Testing**

Run restore tests at least quarterly in staging.

Required validation:

* core collections restore correctly  
* indexes exist  
* final PDFs are accessible  
* signed agreement evidence chain still resolves  
* app can point to restored dataset for inspection if required

## **7.11.6 Configuration Recovery**

Because Firestore backups do not include Security Rules, store these in version control and deploy them via CI:

* Firestore rules  
* Storage rules  
* indexes  
* hosting/app-hosting config  
* Scheduler definitions  
* task queue config  
* seed scripts

---

## **7.12 Observability, Logging, and Alerting**

## **7.12.1 Logging**

Use structured JSON logging for all backend services into Cloud Logging.

Cloud Logging can store, search, analyze, and alert on log data. Use consistent fields such as:

* `service`  
* `module`  
* `actionKey`  
* `entityType`  
* `entityId`  
* `vendorId`  
* `brandId`  
* `correlationId`  
* `severity`  
* `status`

([Google Cloud Documentation](https://docs.cloud.google.com/logging/docs?utm_source=chatgpt.com))

## **7.12.2 Monitoring**

Use Cloud Monitoring dashboards for:

* function latency  
* function error rate  
* task backlog  
* scheduler failures  
* document generation latency  
* vendor sign completion rate  
* notification failure rate  
* App Hosting response health

Cloud Monitoring provides metrics and visualization tooling for application performance. ([Google Cloud Documentation](https://docs.cloud.google.com/monitoring/docs?utm_source=chatgpt.com))

## **7.12.3 Error Tracking**

Use Error Reporting for grouped production errors, especially for:

* PDF generation  
* signature flows  
* access link validation  
* publish actions  
* email delivery adapters  
* scheduler workers

Error Reporting aggregates runtime errors and groups them by root cause. ([Google Cloud Documentation](https://docs.cloud.google.com/error-reporting/docs?utm_source=chatgpt.com))

## **7.12.4 Alerts**

Configure alerts for:

* function error spike  
* task retry spike  
* failed final PDF generation  
* failed reminder job  
* failed backup job  
* large backlog of unsent notifications  
* elevated access-link validation failures  
* elevated sign failures  
* staging/prod deploy failures

Cloud Logging can feed log-based metrics and alerting into Cloud Monitoring. ([Google Cloud Documentation](https://docs.cloud.google.com/logging/docs/alerting/monitoring-logs?utm_source=chatgpt.com))

---

## **7.13 Notification and Workflow Infrastructure**

## **7.13.1 Notification Pipeline**

Recommended notification flow:

1. business action occurs  
2. backend writes notification intent  
3. Cloud Task queues delivery  
4. delivery worker renders template version  
5. message sends through configured transport  
6. delivery result stored in `notifications`  
7. failures retried or escalated

## **7.13.2 Recurring Jobs**

Use Cloud Scheduler for recurring jobs such as:

* quote expiration sweep  
* stale vendor reminder sweep  
* WB overdue scan  
* backup validation job  
* metrics rollup job

Cloud Scheduler is intended for recurring jobs and supports automated retries. ([Google Cloud Documentation](https://docs.cloud.google.com/scheduler/docs))

## **7.13.3 Per-Record Delayed Work**

Use Cloud Tasks for delayed per-record actions such as:

* send reminder in 48 hours  
* invalidate access link after TTL  
* retry PDF generation in 5 minutes  
* retry notification delivery  
* defer handoff follow-up

Cloud Tasks is appropriate here because it dispatches asynchronous HTTP work reliably and can target arbitrary endpoints. ([Google Cloud Documentation](https://docs.cloud.google.com/tasks/docs))

## **7.13.4 Email Transport Strategy**

Implement notifications behind a provider abstraction.

Recommended launch approach:

* support Google Workspace-based sending if the organization prefers staying Google-native and volume is modest  
* abstract sending behind an interface so a dedicated transactional provider can be added later without rewriting workflow logic

The app should store:

* template versions  
* payload snapshots  
* send status  
* retry history

but not hardcode vendor communications in code.

---

## **7.14 CI/CD and Release Management**

## **7.14.1 Source Control**

Use a single Git repository with environment-aware configuration.

Suggested structure:

```
/apps
  /web
  /pdf-service
/functions
/shared
  /schemas
  /types
  /utils
/config
  /firestore.indexes.json
  /firestore.rules
  /storage.rules
  /seed
  /scheduler
```

## **7.14.2 Deployment Strategy**

Use Git-based deployments.

Firebase App Hosting supports GitHub integration and can automatically deploy on pushes to configured branches. ([Firebase](https://firebase.google.com/docs/app-hosting))

Suggested branch model:

* `feature/*` → preview/dev testing  
* `develop` → dev  
* `staging` → staging  
* `main` → prod

## **7.14.3 Infrastructure as Code**

Treat the following as code:

* Firestore indexes  
* Firestore rules  
* Storage rules  
* seed data definitions  
* config defaults  
* Scheduler job definitions  
* Cloud Task queue definitions  
* App Hosting configuration  
* build-time environment mapping

## **7.14.4 CI Pipeline**

On every pull request, run:

* install  
* lint  
* typecheck  
* unit tests  
* schema validation tests  
* Firebase Emulator integration tests  
* security rules tests  
* snapshot tests for templates  
* build verification

The Emulator Suite is appropriate for local and CI workflows because it supports Firestore, Auth, Storage, Functions, and related integration testing without touching production data. ([Firebase](https://firebase.google.com/docs/emulator-suite))

## **7.14.5 CD Pipeline**

For environment deploys:

1. deploy web app  
2. deploy functions  
3. deploy rules  
4. deploy indexes  
5. deploy config migrations / seed changes  
6. run smoke tests  
7. verify critical health endpoints  
8. verify key workflows in staging before prod promotion

## **7.14.6 Release Gates**

Do not promote to production unless:

* rules tests pass  
* snapshot rendering tests pass  
* number generation tests pass  
* sign flow passes  
* document generation passes  
* settings publish tests pass  
* backup schedule exists  
* owner account exists  
* alerts are configured

---

## **7.15 Testing Strategy**

## **7.15.1 Test Layers**

The system must use five test layers.

### **Layer 1 — Unit Tests**

Test:

* validators  
* pricing calculators  
* field rule engine  
* status transition guards  
* version snapshot builders  
* merge-field resolution  
* numbering logic

### **Layer 2 — Rules Tests**

Test Firestore and Storage rules for:

* internal admin access  
* allowlisted internal access  
* vendor scoped access  
* forbidden cross-vendor access  
* forbidden final record writes  
* forbidden archive bypass  
* attachment access by visibility level

### **Layer 3 — Integration Tests**

Use Emulator Suite for:

* auth provisioning  
* quote send flow  
* agreement send flow  
* signature finalization  
* WB handoff state changes  
* audit event creation  
* notification intent creation

### **Layer 4 — End-to-End UI Tests**

Test:

* internal admin happy path  
* vendor review via magic link  
* vendor login path  
* signer completion path  
* admin settings update  
* publish new terms version  
* regenerate revised package  
* WB handoff completion

### **Layer 5 — Document Rendering Tests**

Test:

* quote PDF generation  
* agreement PDF generation  
* special character handling  
* long clauses  
* multi-site displays  
* revision labeling  
* checksum stability for locked snapshots

## **7.15.2 Non-Functional Tests**

Include:

* permission regression tests  
* concurrency/idempotency tests  
* retry tests  
* large-record pagination tests  
* export bundle tests  
* backup restore drill tests

---

## **7.16 Performance and Scalability Strategy**

## **7.16.1 Query Performance**

Optimize for:

* denormalized list views  
* small, predictable dashboard queries  
* server-computed summary fields  
* pagination on all large tables  
* limited fan-out writes

Firestore query performance depends on correct index coverage, so index design must be intentional and version-controlled. ([Firebase](https://firebase.google.com/docs/firestore/query-data/indexing))

## **7.16.2 Async Offloading**

Anything heavy or delay-tolerant should be asynchronous:

* PDF generation  
* reminder sends  
* export bundles  
* maintenance sweeps  
* metrics rollups

Use Cloud Tasks and Scheduler instead of long-running user requests. ([Google Cloud Documentation](https://docs.cloud.google.com/tasks/docs))

## **7.16.3 Frontend Performance**

Use:

* server-rendered shell where useful  
* selective client hydration  
* route-level code splitting  
* virtualized large tables if needed  
* debounce in search/filter UIs  
* cached reference data for settings-driven dropdowns

## **7.16.4 Storage and Document Performance**

Do not generate PDFs on every page view.

Instead:

* generate preview HTML on demand  
* generate PDFs when sent/finalized or explicitly requested  
* reuse stored rendered outputs where allowed  
* cache immutable final documents

## **7.16.5 Growth Readiness**

The architecture must support future scale in:

* more sites  
* more brands per vendor  
* more config versions  
* more templates  
* more notifications  
* more audit volume  
* optional analytics warehouse integration

For deeper analytics later, BigQuery can be fed from Firestore exports or Firebase-supported Firestore-to-BigQuery integration patterns. ([Google Cloud Documentation](https://docs.cloud.google.com/bigquery/docs/loading-data-cloud-firestore?utm_source=chatgpt.com))

---

## **7.17 Build Plan**

## **7.17.1 Phase 0 — Platform Foundation**

Build first:

* Firebase/GCP project setup for dev, staging, prod  
* App Hosting configuration  
* Auth setup  
* Firestore base collections  
* Firestore rules and Storage rules  
* Secret Manager setup  
* CI/CD pipeline  
* seed internal owner accounts  
* base navigation shell  
* design system and shared schema package

### **Exit criteria**

* internal admin can log in  
* `@shiekhshoes.org` auto-provision works  
* allowlist works  
* rules deploy successfully  
* environments are isolated

## **7.17.2 Phase 1 — Core Master Data and Settings**

Build next:

* vendors  
* brands  
* contacts  
* sites  
* site approvals  
* services  
* fees  
* pricing profiles  
* operational profiles  
* required-field rules  
* custom-field engine  
* admin settings UI  
* legacy seed-data import and review flow

### **Exit criteria**

* admin can create vendor with multiple brands  
* sites are admin-configurable  
* legacy defaults are loaded as editable review-required config  
* required fields can be changed without code

## **7.17.3 Phase 2 — Quote and Agreement Engine**

Build next:

* quote builder  
* quote versions  
* agreement builder  
* agreement versions  
* combined vendor package layout  
* template engine  
* terms publishing  
* render previews  
* send package flow  
* vendor secure access flow

### **Exit criteria**

* admin can build and send one combined vendor package  
* current version logic works  
* supersede logic works  
* vendor sees current package only

## **7.17.4 Phase 3 — Signature, Documents, and WB Handoff**

Build next:

* signer assignment  
* fresh verification flow  
* acceptance evidence capture  
* PDF generation service  
* immutable final PDF storage  
* notification pipeline  
* WB checklist templates  
* WB handoff UI and status flow

### **Exit criteria**

* vendor can sign/accept  
* final PDF is created and locked  
* agreement version is immutable  
* brand can move to `ready_for_wb`

## **7.17.5 Phase 4 — Reporting, Audit, and Hardening**

Build next:

* audit explorer  
* dispute export  
* saved views  
* operational reporting  
* alerting  
* backup jobs  
* restore runbook  
* performance hardening  
* security review  
* launch smoke suite

### **Exit criteria**

* admins can retrieve full audit history  
* dispute export works  
* alerts are live  
* backup and restore process is validated

---

## **7.18 Go-Live Checklist**

Before production launch, confirm all of the following:

### **Identity and Access**

* owner accounts exist  
* `@shiekhshoes.org` auto-admin works  
* allowlisted internal emails/domains work  
* vendor login and magic-link access work  
* signer verification works

### **Configuration**

* site list reviewed  
* legacy seeded pricing reviewed and published  
* operational defaults reviewed and published  
* support contacts reviewed  
* templates reviewed  
* terms published intentionally  
* required field rules reviewed

### **Workflow**

* quote send flow tested  
* agreement send flow tested  
* revision flow tested  
* final signature tested  
* WB handoff tested

### **Security**

* secrets stored only in Secret Manager  
* Firestore rules validated  
* Storage rules validated  
* App Check enabled where applicable  
* audit logs verified  
* no WB credentials stored in Firestore

### **Operations**

* backups enabled  
* restore drill completed  
* monitoring dashboards live  
* alerts live  
* notification transport validated  
* CI/CD protected branches enabled

---

## **7.19 Acceptance Criteria for Section 7**

Section 7 will be considered implemented correctly when the built platform can do all of the following:

* run as a Next.js application on Firebase App Hosting with separate dev, staging, and prod projects  
* authenticate internal users with Google and/or email login  
* auto-provision verified `@shiekhshoes.org` users as internal admins  
* support allowlisted internal users such as `theo@shiekh.com`  
* store operational data in Firestore and documents in Cloud Storage  
* enforce Firestore and Storage access with server-enforced rules plus backend IAM where appropriate  
* route protected workflow state changes through Cloud Functions Gen 2  
* offload heavy document rendering to a dedicated Cloud Run PDF service  
* use Cloud Tasks for retries and delayed work, and Cloud Scheduler for recurring jobs  
* keep secrets in Secret Manager  
* capture logs, metrics, and errors in Google Cloud observability tools  
* back up Firestore on a schedule and validate recovery  
* deploy through CI/CD with rules, indexes, and emulator-backed tests  
* scale without redesign to support more brands, sites, templates, and workflow volume  
* preserve immutable signed records and final PDFs indefinitely

---

## **7.20 Section 7 Implementation Directive**

All implementation work must follow the architecture in this section.

If build decisions conflict later, the system must prioritize:

1. Firebase-first, Google-native architecture  
2. separate dev, staging, and prod projects  
3. server-controlled protected writes  
4. immutable snapshots and immutable final signed documents  
5. least-privilege security across Firestore, Storage, functions, and secrets  
6. admin-configurable business behavior instead of hardcoded workflow logic  
7. operational simplicity for a small team over unnecessary platform complexity

---

Paste the following directly **after Section 7.20** of the V3 master document.

---

# **Appendix A — Cloud Functions and Background Jobs Inventory**

## **A.1 Purpose**

This appendix defines the required backend function and background job inventory for the platform. It removes ambiguity around how protected workflow actions, asynchronous jobs, reminders, document rendering, and WB handoff transitions must be implemented.

This appendix is implementation-directive. If there is any conflict between earlier workflow language and this appendix, the backend inventory in this appendix controls the technical implementation.

## **A.2 Function Design Rules**

All backend functions and jobs in this appendix must follow these rules:

* all protected state transitions must run server-side  
* all functions must be idempotent  
* all functions must write audit events for protected actions  
* all functions that touch current-version pointers must use transactional writes  
* all functions that create final legal records must use immutable snapshots  
* all async jobs must be retry-safe  
* all functions must accept a `correlationId` or generate one if absent  
* all function names below are logical inventory names and may map to internal modules, callable functions, authenticated HTTP endpoints, event handlers, or scheduled jobs

## **A.3 Identity and Access Functions**

### **A.3.1 `auth.provisionUserOnFirstLogin`**

* Type: Auth-triggered or authenticated bootstrap function  
* Trigger: First successful verified login  
* Purpose: Create or update the `users` record, determine internal vs external access, apply allowlist/domain logic, and seed coarse auth claims if used  
* Reads:  
  * `domainAllowlist`  
  * `emailAllowlist`  
  * `users`  
* Writes:  
  * `users`  
  * `activityLogs`  
* Idempotency Rule:  
  * running this twice for the same auth user must update the same `users` record and not create duplicates

### **A.3.2 `auth.refreshAccessClaims`**

* Type: Callable admin function  
* Trigger: Role change, allowlist change, owner designation, internal access change  
* Purpose: Refresh coarse auth claims such as `isInternal`, `isAdmin`, and `isSystemOwner`  
* Reads:  
  * `users`  
  * `roles`  
* Writes:  
  * auth claims  
  * `activityLogs`  
* Idempotency Rule:  
  * repeated runs must converge to the same claims state

### **A.3.3 `access.issueVendorReviewLink`**

* Type: Callable internal admin function  
* Trigger: Send package or reissue review access  
* Purpose: Create a hashed secure access link scoped to a specific vendor, brand, contact, and current version  
* Reads:  
  * `brands`  
  * `quotes`  
  * `agreements`  
  * `accessAssignments`  
  * `users`  
* Writes:  
  * `accessLinks`  
  * `activityLogs`  
  * optional `notifications`  
* Idempotency Rule:  
  * must not create duplicate active links for the same version, contact, and purpose unless explicitly requested

### **A.3.4 `access.revokeVendorReviewLink`**

* Type: Callable internal admin function  
* Trigger: Manual revoke, revision supersede, signer change, send cancellation  
* Purpose: Revoke one or more active links  
* Reads:  
  * `accessLinks`  
* Writes:  
  * `accessLinks`  
  * `activityLogs`  
* Idempotency Rule:  
  * revoking an already-revoked link must be a no-op with audit visibility

### **A.3.5 `access.expireVendorReviewLinksJob`**

* Type: Scheduled job  
* Trigger: Recurring sweep  
* Purpose: Mark expired access links as expired and suppress further use  
* Reads:  
  * `accessLinks`  
* Writes:  
  * `accessLinks`  
  * `activityLogs`  
* Idempotency Rule:  
  * repeated sweeps must only update still-active expired links

### **A.3.6 `access.validateFreshVerification`**

* Type: Authenticated HTTP/callable function  
* Trigger: Final acceptance/signature step  
* Purpose: Confirm OTP, re-authentication, or other fresh verification before final signing  
* Reads:  
  * verification session data  
  * `users` or vendor contact data  
* Writes:  
  * verification status  
  * `activityLogs`  
* Idempotency Rule:  
  * same verification token/session should not create duplicate successful verifications

---

## **A.4 Vendor, Brand, Contact, and Site Functions**

### **A.4.1 `vendors.createVendorRecord`**

* Type: Callable internal admin function  
* Trigger: New vendor creation  
* Purpose: Create canonical vendor record and initial summary fields  
* Reads:  
  * `numberingRules` if vendor codes are generated  
* Writes:  
  * `vendors`  
  * `activityLogs`  
* Idempotency Rule:  
  * duplicate submissions should resolve to one vendor if the same dedupe key is used

### **A.4.2 `brands.createBrandWorkspace`**

* Type: Callable internal admin function  
* Trigger: New brand creation under a vendor  
* Purpose: Create brand workspace with default summary fields and current pointers  
* Reads:  
  * `vendors`  
  * published settings defaults  
* Writes:  
  * `brands`  
  * `activityLogs`  
* Idempotency Rule:  
  * duplicate create requests with same dedupe key must not create duplicate brand workspaces

### **A.4.3 `brands.upsertBrandContactAssignments`**

* Type: Callable internal admin function  
* Trigger: Brand contact edits  
* Purpose: Create/update contact-role assignments for a brand  
* Reads:  
  * `contacts`  
  * `brands`  
* Writes:  
  * `brandContactAssignments`  
  * `brands` summary fields  
  * `activityLogs`  
* Idempotency Rule:  
  * same contact-role assignment should update existing assignment instead of duplicating

### **A.4.4 `brands.upsertBrandSiteApprovals`**

* Type: Callable internal admin function  
* Trigger: Site selection or site approval changes  
* Purpose: Add, update, revoke, or deactivate site approvals for a brand  
* Reads:  
  * `brands`  
  * `sites`  
  * existing `siteApprovals`  
* Writes:  
  * `siteApprovals`  
  * `brands.approvedSite*` summary fields  
  * `activityLogs`  
* Idempotency Rule:  
  * one site approval record per `brandId + siteId`; repeated updates modify the same record

### **A.4.5 `brands.rebuildBrandSummaryState`**

* Type: Callable admin or scheduled maintenance job  
* Trigger: Manual repair or integrity sweep  
* Purpose: Recalculate current quote/agreement/WB summary pointers for a brand  
* Reads:  
  * `brands`  
  * `quotes`  
  * `agreements`  
  * `wbHandoffs`  
  * `siteApprovals`  
* Writes:  
  * `brands`  
  * `activityLogs`  
* Idempotency Rule:  
  * repeated runs must converge to the same summary state

---

## **A.5 Quote and Package Lifecycle Functions**

### **A.5.1 `quotes.createQuoteDraft`**

* Type: Callable internal admin function  
* Trigger: Start a new quote  
* Purpose: Create the current editable quote record for a vendor-brand  
* Reads:  
  * `brands`  
  * published pricing/operational/template defaults  
  * `numberingRules`  
* Writes:  
  * `quotes`  
  * initial `quoteVersions` if desired  
  * `brands.currentQuote*`  
  * `activityLogs`  
* Idempotency Rule:  
  * must not create more than one current active draft quote per brand unless explicitly creating a new negotiation cycle

### **A.5.2 `quotes.refreshDraftFromPublishedConfigs`**

* Type: Callable internal admin function  
* Trigger: User chooses refresh on a draft  
* Purpose: Pull latest published pricing, operational, terms, or template defaults into an editable draft  
* Reads:  
  * `quotes`  
  * `pricingProfiles`  
  * `operationalProfiles`  
  * `quoteTemplates`  
  * `termsVersions`  
* Writes:  
  * `quotes`  
  * optional draft `quoteVersions`  
  * `activityLogs`  
* Idempotency Rule:  
  * refreshing the same draft against the same source versions should not create duplicate changes

### **A.5.3 `quotes.createQuoteVersionSnapshot`**

* Type: Callable internal admin function  
* Trigger: Material vendor-visible draft change, send action, revision action  
* Purpose: Freeze an immutable quote version snapshot  
* Reads:  
  * `quotes`  
  * `brands`  
  * `vendors`  
  * `siteApprovals`  
  * contacts  
  * active config versions  
* Writes:  
  * `quoteVersions`  
  * `quotes.currentVersion*`  
  * `activityLogs`  
* Idempotency Rule:  
  * same source state and dedupe key must not create duplicate version numbers

### **A.5.4 `packages.sendVendorPackage`**

* Type: Callable internal admin function  
* Trigger: Send package to vendor  
* Purpose: Validate send-readiness, create current quote/agreement version snapshots if needed, issue access links, queue notifications, and mark send timestamps  
* Reads:  
  * `quotes`  
  * `agreements`  
  * `brands`  
  * `requiredFieldRules`  
  * `accessAssignments`  
  * `systemSettings.workflowPolicy`  
* Writes:  
  * `quotes`  
  * `agreements`  
  * `quoteVersions`  
  * `agreementVersions`  
  * `accessLinks`  
  * `notifications`  
  * `activityLogs`  
* Idempotency Rule:  
  * duplicate send attempts for same current package version must not create duplicate sends, duplicate current versions, or duplicate active links beyond policy

### **A.5.5 `packages.markVendorPackageViewed`**

* Type: Authenticated HTTP handler or link landing handler  
* Trigger: Vendor opens package  
* Purpose: Mark first-view and latest-view timestamps  
* Reads:  
  * `accessLinks`  
  * `quotes`  
  * `agreements`  
* Writes:  
  * `quotes.firstViewedAt`  
  * `agreements.firstViewedAt`  
  * `acceptanceEvents` for `viewed`  
  * `activityLogs`  
* Idempotency Rule:  
  * first-view must only be written once; later views update latest-view metadata only

### **A.5.6 `quotes.expireStaleQuotesJob`**

* Type: Scheduled job  
* Trigger: Recurring sweep  
* Purpose: Mark quotes as expired when `validUntilDate` passes and business rules require expiration  
* Reads:  
  * `quotes`  
  * `brands`  
* Writes:  
  * `quotes`  
  * `brands` summary status if needed  
  * `activityLogs`  
* Idempotency Rule:  
  * already expired or superseded quotes must not be updated again

---

## **A.6 Agreement and Signature Functions**

### **A.6.1 `agreements.createAgreementDraftFromQuote`**

* Type: Callable internal admin function  
* Trigger: Create agreement package from current quote  
* Purpose: Build agreement draft using current commercial, site, and legal references  
* Reads:  
  * `quotes`  
  * `brands`  
  * `siteApprovals`  
  * `agreementTemplates`  
  * `termsVersions`  
  * `packageLayouts`  
  * `numberingRules`  
* Writes:  
  * `agreements`  
  * `brands.currentAgreement*`  
  * `activityLogs`  
* Idempotency Rule:  
  * repeated generation for the same quote and negotiation cycle must update or replace the same current draft, not create duplicate current agreements

### **A.6.2 `agreements.assignSigners`**

* Type: Callable internal admin function  
* Trigger: Signer assignment or change  
* Purpose: Create/update signer assignments for the current agreement version or draft  
* Reads:  
  * `contacts`  
  * `agreements`  
* Writes:  
  * `signerAssignments`  
  * `agreements`  
  * `activityLogs`  
* Idempotency Rule:  
  * same contact assignment must update existing signer assignment, not duplicate it

### **A.6.3 `agreements.createAgreementVersionSnapshot`**

* Type: Callable internal admin function  
* Trigger: Send action, revision action, legal/commercial material change  
* Purpose: Freeze a vendor-visible agreement version snapshot  
* Reads:  
  * `agreements`  
  * `quotes`  
  * `brands`  
  * `vendors`  
  * `siteApprovals`  
  * current config versions  
* Writes:  
  * `agreementVersions`  
  * `agreements.currentVersion*`  
  * `activityLogs`  
* Idempotency Rule:  
  * same source state and dedupe key must not create duplicate version numbers

### **A.6.4 `agreements.submitVendorChangeRequest`**

* Type: Authenticated vendor function  
* Trigger: Vendor requests changes  
* Purpose: Store structured change request linked to current version  
* Reads:  
  * `accessLinks`  
  * `accessAssignments`  
  * `agreements`  
* Writes:  
  * `changeRequests`  
  * `agreements` or `quotes` status  
  * `activityLogs`  
  * optional `notifications`  
* Idempotency Rule:  
  * repeated submits with same request payload and client token must not create duplicate change requests

### **A.6.5 `agreements.finalizeVendorSignature`**

* Type: Authenticated server-side signing function  
* Trigger: Final accept/sign action after fresh verification  
* Purpose: Verify signer, create final acceptance evidence, mark agreement signed, generate final immutable documents, update brand status, and create WB handoff if configured  
* Reads:  
  * `agreements`  
  * `agreementVersions`  
  * `signerAssignments`  
  * fresh verification state  
  * `accessLinks`  
* Writes:  
  * `acceptanceEvents`  
  * `signerAssignments`  
  * `agreements`  
  * `quote` current status if combined workflow  
  * `documents`  
  * `wbHandoffs` if auto-create is enabled  
  * `brands`  
  * `activityLogs`  
* Idempotency Rule:  
  * the same agreement version and signer cannot finalize twice; repeated requests must return the existing final state

### **A.6.6 `agreements.voidOrSupersedePackage`**

* Type: Callable internal admin function  
* Trigger: Revision after send, signer replacement, send cancellation  
* Purpose: Void a package or supersede its current version and invalidate affected links  
* Reads:  
  * `agreements`  
  * `agreementVersions`  
  * `accessLinks`  
* Writes:  
  * `agreements`  
  * `agreementVersions`  
  * `accessLinks`  
  * `activityLogs`  
* Idempotency Rule:  
  * already voided/superseded records must not be transitioned again

---

## **A.7 Document and Rendering Functions**

### **A.7.1 `documents.renderQuoteVersionPdf`**

* Type: Internal HTTP call to Cloud Run PDF service  
* Trigger: Explicit preview/export or send-time generation  
* Purpose: Render quote version HTML snapshot to PDF  
* Reads:  
  * `quoteVersions`  
* Writes:  
  * Storage object  
  * `documents`  
  * `activityLogs`  
* Idempotency Rule:  
  * immutable quote version renders may reuse existing document if content hash matches policy

### **A.7.2 `documents.renderAgreementVersionPdf`**

* Type: Internal HTTP call to Cloud Run PDF service  
* Trigger: Send-time preview or finalization  
* Purpose: Render agreement version HTML snapshot to PDF  
* Reads:  
  * `agreementVersions`  
* Writes:  
  * Storage object  
  * `documents`  
  * `activityLogs`  
* Idempotency Rule:  
  * once a final immutable PDF exists for a signed version, reruns must not overwrite it

### **A.7.3 `documents.createFinalExecutionBundle`**

* Type: Callable internal/admin or internal worker  
* Trigger: Final signature or explicit export action  
* Purpose: Build bundled final record set for download or dispute package preparation  
* Reads:  
  * signed version records  
  * `documents`  
  * `acceptanceEvents`  
* Writes:  
  * Storage export object  
  * `documents`  
  * `activityLogs`  
* Idempotency Rule:  
  * same version and bundle type should produce a single canonical bundle unless regeneration is explicitly requested

### **A.7.4 `documents.registerGeneratedDocumentMetadata`**

* Type: Internal helper function  
* Trigger: After any successful render or upload  
* Purpose: Create/update canonical document metadata record  
* Reads:  
  * render/upload output metadata  
* Writes:  
  * `documents`  
* Idempotency Rule:  
  * same `storagePath + checksum` should not produce duplicate document metadata

---

## **A.8 Notification and Reminder Functions**

### **A.8.1 `notifications.queueNotificationForEvent`**

* Type: Internal worker/helper or event-triggered function  
* Trigger: Business event emitted  
* Purpose: Determine recipients, select notification template version, and queue notification delivery tasks  
* Reads:  
  * `notificationTemplates`  
  * `systemSettings.notificationPolicy`  
  * routing data from runtime records  
* Writes:  
  * `notifications`  
  * Cloud Tasks enqueue  
  * `activityLogs`  
* Idempotency Rule:  
  * must dedupe on `eventKey + entityVersionId + recipient + templateVersion` unless resend is intentional

### **A.8.2 `notifications.deliverNotificationTask`**

* Type: Task-driven HTTP worker  
* Trigger: Cloud Task execution  
* Purpose: Render final message payload and send through configured delivery transport  
* Reads:  
  * `notifications`  
  * `notificationTemplates`  
  * related business records  
* Writes:  
  * `notifications`  
  * `activityLogs`  
* Idempotency Rule:  
  * must safely handle retry without double-sending where provider idempotency is available; otherwise mark duplicate protection metadata

### **A.8.3 `notifications.processReminderSweep`**

* Type: Scheduled job  
* Trigger: Recurring sweep  
* Purpose: Identify records needing reminder notifications and enqueue them  
* Reads:  
  * `quotes`  
  * `agreements`  
  * `wbHandoffs`  
  * `notifications`  
  * workflow policy  
* Writes:  
  * `notifications`  
  * Cloud Tasks enqueue  
  * `activityLogs`  
* Idempotency Rule:  
  * must not enqueue duplicate reminder windows for the same entity and reminder type

### **A.8.4 `notifications.handleFailedNotificationEscalation`**

* Type: Scheduled job or task worker  
* Trigger: Notification failure threshold reached  
* Purpose: Escalate high-severity delivery failures to internal admins  
* Reads:  
  * `notifications`  
  * policy settings  
* Writes:  
  * new `notifications`  
  * `activityLogs`  
* Idempotency Rule:  
  * same failure cohort should escalate once per policy interval

---

## **A.9 WB Handoff Functions**

### **A.9.1 `wb.createHandoffFromSignedAgreement`**

* Type: Internal function  
* Trigger: Final signature if auto-create is enabled  
* Purpose: Create initial WB handoff record using current signed agreement and checklist template  
* Reads:  
  * `agreements`  
  * `agreementVersions`  
  * `wbChecklistTemplates`  
* Writes:  
  * `wbHandoffs`  
  * `brands.currentWb*`  
  * `activityLogs`  
* Idempotency Rule:  
  * only one active handoff per brand; repeated calls must return/update the existing current handoff

### **A.9.2 `wb.markReadyForWb`**

* Type: Callable internal admin function  
* Trigger: User marks signed package ready  
* Purpose: Validate minimum handoff readiness and move status to `ready`  
* Reads:  
  * `wbHandoffs`  
  * related signed records  
  * required field rules for WB stage  
* Writes:  
  * `wbHandoffs`  
  * `brands.currentWbStatus`  
  * `activityLogs`  
* Idempotency Rule:  
  * repeated ready actions should not create duplicate state changes

### **A.9.3 `wb.updateChecklistItem`**

* Type: Callable internal admin function  
* Trigger: Checklist item completion, skip, or block  
* Purpose: Update one checklist item and recompute aggregate WB state  
* Reads:  
  * `wbHandoffs`  
* Writes:  
  * `wbHandoffs`  
  * `activityLogs`  
* Idempotency Rule:  
  * same item update with same target state is a no-op

### **A.9.4 `wb.completeHandoff`**

* Type: Callable internal admin function  
* Trigger: Internal confirmation that WB upload/handoff is complete  
* Purpose: Mark final WB handoff completion status and timestamps  
* Reads:  
  * `wbHandoffs`  
* Writes:  
  * `wbHandoffs`  
  * `brands`  
  * `activityLogs`  
* Idempotency Rule:  
  * completed handoffs must not be completed again

### **A.9.5 `wb.processOverdueHandoffSweep`**

* Type: Scheduled job  
* Trigger: Recurring sweep  
* Purpose: Identify ready/in-progress WB handoffs past SLA and enqueue alerts/reminders  
* Reads:  
  * `wbHandoffs`  
  * workflow settings  
* Writes:  
  * `notifications`  
  * `activityLogs`  
* Idempotency Rule:  
  * must respect reminder windows and not spam repeated escalations

---

## **A.10 Publish and Settings Functions**

### **A.10.1 `settings.publishPricingProfile`**

### **A.10.2 `settings.publishOperationalProfile`**

### **A.10.3 `settings.publishTermsVersion`**

### **A.10.4 `settings.publishQuoteTemplate`**

### **A.10.5 `settings.publishAgreementTemplate`**

### **A.10.6 `settings.publishPackageLayout`**

For all publish functions:

* Type: Callable internal admin function  
* Trigger: Publish action from settings UI  
* Purpose: Validate draft config, enforce one current published version per key, and publish new version  
* Reads:  
  * relevant config collection  
  * related validation dependencies  
* Writes:  
  * relevant config collection  
  * `activityLogs`  
* Idempotency Rule:  
  * repeated publish on same draft must not create multiple published versions

### **A.10.7 `settings.updateRequiredFieldRules`**

* Type: Callable internal admin function  
* Trigger: Required-field config changes  
* Purpose: Update stage-based required/optional/hidden logic  
* Reads:  
  * `requiredFieldRules`  
* Writes:  
  * `requiredFieldRules`  
  * `activityLogs`  
* Idempotency Rule:  
  * applying the same ruleset twice must converge to the same stored rule state

### **A.10.8 `settings.updateCustomFieldDefinitions`**

* Type: Callable internal admin function  
* Trigger: Custom field create/update/deactivate  
* Purpose: Manage no-code field definitions  
* Reads:  
  * `customFieldDefinitions`  
* Writes:  
  * `customFieldDefinitions`  
  * `activityLogs`  
* Idempotency Rule:  
  * field keys must remain unique per entity type

---

## **A.11 Audit, Export, and Maintenance Functions**

### **A.11.1 `audit.emitAuditEvent`**

* Type: Internal helper function used by all protected actions  
* Trigger: Any protected action  
* Purpose: Write canonical activity/audit event with standardized metadata  
* Reads:  
  * input event payload only  
* Writes:  
  * `activityLogs`  
* Idempotency Rule:  
  * event writes must use deterministic dedupe keys for retried protected actions

### **A.11.2 `exports.generateDisputeExportBundle`**

* Type: Callable internal admin function  
* Trigger: User requests dispute bundle  
* Purpose: Assemble signed record package, acceptance evidence, documents, and timeline for export  
* Reads:  
  * runtime records  
  * version snapshots  
  * `documents`  
  * `acceptanceEvents`  
  * `activityLogs`  
  * `notifications`  
* Writes:  
  * export file in Storage  
  * `documents`  
  * `activityLogs`  
* Idempotency Rule:  
  * same request and version set should produce one canonical export unless explicit regeneration is requested

### **A.11.3 `maintenance.integritySweep`**

* Type: Scheduled job  
* Trigger: Recurring low-frequency job  
* Purpose: Detect summary-pointer drift, orphaned current flags, expired links not marked expired, and missing documents  
* Reads:  
  * multiple core collections  
* Writes:  
  * issue records or repair events if allowed  
  * `activityLogs`  
* Idempotency Rule:  
  * repeated sweeps must only log or repair unresolved issues

---

## **A.12 Required Background Queues**

The implementation must define queue categories for:

* document rendering  
* notification delivery  
* reminder dispatch  
* dispute export generation  
* access-link expiration  
* integrity repair or maintenance  
* WB overdue reminder processing

## **A.13 Function Inventory Acceptance Criteria**

This appendix is satisfied when the implementation contains named server-side actions or jobs covering:

* auth provisioning  
* vendor access link issuance and expiration  
* quote creation, versioning, send, and expiry  
* agreement creation, versioning, send, and signing  
* immutable PDF generation  
* notifications and reminders  
* WB handoff creation and completion  
* config publishing  
* dispute export generation  
* audit event emission

---

# **Appendix B — Unified Event Catalog**

## **B.1 Purpose**

This appendix defines the canonical event model for the platform.

These event keys must be used consistently across:

* `activityLogs.actionKey`  
* `notifications.eventType`  
* task routing  
* internal analytics rollups  
* future webhook payloads if enabled later

## **B.2 Event Design Rules**

* event keys must use `dot.notation`  
* event keys must be stable once released  
* business logic must not depend on display labels  
* notifications may subscribe to event keys, but notifications are not the source of business truth  
* event payloads must include `correlationId`, `entityType`, `entityId`, and `occurredAt`  
* events tied to a specific snapshot must also include `entityVersionId`

## **B.3 Standard Event Envelope**

Every canonical event should carry:

* `eventKey`  
* `occurredAt`  
* `correlationId`  
* `actorType`  
* `actorId`  
* `actorDisplayName`  
* `entityType`  
* `entityId`  
* `entityVersionId`  
* `vendorId`  
* `brandId`  
* `metadata`  
* `reason` when applicable

## **B.4 Identity and Access Events**

### **Authentication**

* `auth.login_success`  
* `auth.login_failed`  
* `auth.logout`  
* `auth.user_provisioned`  
* `auth.claims_refreshed`

### **Access Links**

* `access.link_issued`  
* `access.link_reissued`  
* `access.link_used`  
* `access.link_revoked`  
* `access.link_expired`  
* `access.link_superseded`

### **Access Assignments**

* `access.assignment_created`  
* `access.assignment_updated`  
* `access.assignment_removed`  
* `access.allowlist_email_added`  
* `access.allowlist_email_removed`  
* `access.allowlist_domain_added`  
* `access.allowlist_domain_removed`  
* `access.fresh_verification_passed`  
* `access.fresh_verification_failed`

## **B.5 Vendor, Brand, Contact, and Site Events**

### **Vendor**

* `vendor.created`  
* `vendor.updated`  
* `vendor.archived`  
* `vendor.reactivated`

### **Brand**

* `brand.created`  
* `brand.updated`  
* `brand.archived`  
* `brand.status_changed`  
* `brand.summary_rebuilt`

### **Contacts**

* `brand.contact_assigned`  
* `brand.contact_unassigned`  
* `contact.created`  
* `contact.updated`  
* `contact.archived`

### **Site Approvals**

* `site_approval.selected`  
* `site_approval.updated`  
* `site_approval.approved`  
* `site_approval.restricted`  
* `site_approval.denied`  
* `site_approval.revoked`

## **B.6 Quote Events**

* `quote.created`  
* `quote.updated`  
* `quote.version_created`  
* `quote.ready_to_send`  
* `quote.sent`  
* `quote.viewed`  
* `quote.changes_requested`  
* `quote.rejected`  
* `quote.accepted`  
* `quote.expired`  
* `quote.withdrawn`  
* `quote.superseded`  
* `quote.refreshed_from_published_config`

## **B.7 Agreement and Signature Events**

* `agreement.created`  
* `agreement.updated`  
* `agreement.version_created`  
* `agreement.sent`  
* `agreement.viewed`  
* `agreement.signer_assigned`  
* `agreement.signer_reassigned`  
* `agreement.awaiting_signature`  
* `agreement.changes_requested`  
* `agreement.rejected`  
* `agreement.signed`  
* `agreement.voided`  
* `agreement.superseded`

### **Signer and Acceptance**

* `signer.invited`  
* `signer.viewed`  
* `signer.signed`  
* `signer.declined`  
* `acceptance.viewed`  
* `acceptance.accepted`  
* `acceptance.rejected`  
* `acceptance.change_requested`

## **B.8 Config and Publish Events**

### **Pricing and Operational Profiles**

* `pricing_profile.created`  
* `pricing_profile.updated`  
* `pricing_profile.published`  
* `pricing_profile.retired`  
* `operational_profile.created`  
* `operational_profile.updated`  
* `operational_profile.published`  
* `operational_profile.retired`

### **Legal and Templates**

* `terms.created`  
* `terms.updated`  
* `terms.published`  
* `terms.retired`  
* `quote_template.created`  
* `quote_template.updated`  
* `quote_template.published`  
* `quote_template.retired`  
* `agreement_template.created`  
* `agreement_template.updated`  
* `agreement_template.published`  
* `agreement_template.retired`  
* `package_layout.created`  
* `package_layout.updated`  
* `package_layout.published`  
* `package_layout.retired`  
* `required_field_rule.updated`  
* `custom_field_definition.updated`

## **B.9 Document Events**

* `document.uploaded`  
* `document.generated`  
* `document.preview_generated`  
* `document.final_pdf_created`  
* `document.downloaded_internal`  
* `document.downloaded_external`  
* `document.export_bundle_created`

## **B.10 Notification Events**

### **Queue and Delivery**

* `notification.queued`  
* `notification.sent`  
* `notification.failed`  
* `notification.read`

### **Reminder-Specific**

* `reminder.package_not_opened_sent`  
* `reminder.package_not_completed_sent`  
* `reminder.signature_pending_sent`  
* `reminder.wb_overdue_sent`  
* `reminder.suppressed`  
* `reminder.paused`

## **B.11 WB Handoff Events**

* `wb.handoff_created`  
* `wb.ready_marked`  
* `wb.assigned`  
* `wb.checklist_item_completed`  
* `wb.checklist_item_blocked`  
* `wb.blocked`  
* `wb.in_progress`  
* `wb.completed`  
* `wb.canceled`

## **B.12 Admin, Override, and Export Events**

* `settings.updated`  
* `override.used`  
* `audit.export_generated`  
* `dispute_export.generated`  
* `report.export_generated`

## **B.13 System and Maintenance Events**

* `system.integrity_sweep_completed`  
* `system.expired_links_processed`  
* `system.stale_quotes_expired`  
* `system.notification_retry_processed`  
* `system.job_failed`  
* `system.job_retried`

## **B.14 Event Subscription Rules**

The following event families are eligible to trigger notifications:

* `quote.*`  
* `agreement.*`  
* `acceptance.*`  
* `wb.*`  
* `notification.failed`  
* `override.used` for internal alerts only  
* `terms.published` for internal alerts only

## **B.15 Event Catalog Acceptance Criteria**

This appendix is satisfied when:

* the implementation uses stable event keys from this catalog  
* all protected actions emit canonical events  
* notifications subscribe to canonical event keys  
* event keys are used consistently across audit, reminders, and future integrations

---

# **Appendix C — Write-Control and Security Matrix**

## **C.1 Purpose**

This appendix defines which records may be read or written directly by clients, which require guarded client writes, and which must be written only by trusted backend code.

This appendix governs:

* Firestore read/write enforcement  
* Cloud Storage path rules  
* App Check usage  
* server-side immutability controls  
* separation of direct draft editing from protected state transitions

## **C.2 Global Security Rules**

* deny by default  
* internal access must be verified by auth identity plus role state  
* vendor access must be scoped by `accessAssignments` or active `accessLinks`  
* signed/sent version history must never be directly writable by clients  
* server SDK writes bypass Firestore rules and must be controlled by IAM and backend validation  
* App Check must be enforced for web SDK access where supported  
* final signed documents must never be publicly readable

## **C.3 Collection Write Matrix — Identity and Access**

### **`users`**

* Client Read:  
  * internal admins: read all  
  * user: read own profile subset  
  * vendor: no read unless linked user self-profile is exposed  
* Direct Client Write:  
  * own low-risk preferences only  
* Guarded Client Write:  
  * none  
* Function-Only Writes:  
  * create, role assignment, disable, owner flag, allowlist source, coarse auth mapping  
* Immutable/Protected:  
  * identity history, owner flags, audit-critical fields

### **`roles`, `permissions`**

* Client Read:  
  * internal admins only  
* Direct Client Write:  
  * none  
* Function-Only Writes:  
  * create/update/deactivate  
* Immutable/Protected:  
  * launch permissions should be admin-managed only

### **`domainAllowlist`, `emailAllowlist`**

* Client Read:  
  * internal admins only  
* Direct Client Write:  
  * none  
* Function-Only Writes:  
  * create/update/remove  
* Immutable/Protected:  
  * all changes audit-critical

### **`accessAssignments`**

* Client Read:  
  * internal admins  
  * vendor user may read only their own assignment summary if exposed  
* Direct Client Write:  
  * none  
* Function-Only Writes:  
  * create/update/remove assignments  
* Immutable/Protected:  
  * scope and role preset changes are audit-critical

### **`accessLinks`**

* Client Read:  
  * no direct collection browsing by vendors  
  * internal admins may read  
* Direct Client Write:  
  * none  
* Function-Only Writes:  
  * issue, revoke, expire, supersede  
* Immutable/Protected:  
  * raw token must never be stored; hashed token only

---

## **C.4 Collection Write Matrix — Core Business Master Data**

### **`vendors`**

* Client Read:  
  * internal admins: full  
  * vendor: none directly unless limited self-profile view is exposed through brand package  
* Direct Client Write:  
  * none by default  
* Guarded Client Write:  
  * optional vendor-limited profile fields if enabled  
* Function-Only Writes:  
  * create, archive, restore, ownership changes  
* Protected After Sign:  
  * historical signed snapshots do not change when vendor record changes

### **`brands`**

* Client Read:  
  * internal admins: full  
  * vendor: assigned brand summary only  
* Direct Client Write:  
  * none by default  
* Guarded Client Write:  
  * none  
* Function-Only Writes:  
  * create, archive, status transition, current pointers, approved-site rollups  
* Protected:  
  * `currentQuote*`, `currentAgreement*`, `currentWb*` pointers are server-only

### **`contacts`**

* Client Read:  
  * internal admins: full  
  * vendor: limited contact subset if visible  
* Guarded Client Write:  
  * optional vendor-editable contact fields if enabled  
* Function-Only Writes:  
  * archive, linked user assignment, sensitive role changes  
* Protected:  
  * signer identity used in signed records remains historical even if contact changes later

### **`brandContactAssignments`**

* Client Read:  
  * internal admins  
  * vendor: visible role summaries only if exposed  
* Direct Client Write:  
  * none  
* Function-Only Writes:  
  * assign/unassign roles  
* Protected:  
  * signer role changes after send must go through server logic

### **`sites`**

* Client Read:  
  * internal admins  
  * vendors: only via package snapshot, not direct site settings collection  
* Direct Client Write:  
  * none  
* Function-Only Writes:  
  * create/update/deactivate  
* Protected:  
  * site definitions are admin-only

### **`siteApprovals`**

* Client Read:  
  * internal admins full  
  * vendors assigned to brand: current package-visible subset only  
* Direct Client Write:  
  * none  
* Function-Only Writes:  
  * create/update/revoke  
* Protected:  
  * post-send or post-sign changes must create revision/amendment flow

---

## **C.5 Collection Write Matrix — Versioned Config and Publishable Settings**

### **`services`, `fees`**

* Client Read:  
  * internal admins  
  * vendor: never direct  
* Direct Client Write:  
  * none  
* Function-Only Writes:  
  * create/update/publish-like activation changes if workflow requires  
* Protected:  
  * changes do not retroactively affect snapshots

### **`pricingProfiles`, `operationalProfiles`, `quoteTemplates`, `agreementTemplates`, `packageLayouts`, `termsVersions`, `notificationTemplates`, `wbChecklistTemplates`**

* Client Read:  
  * internal admins only  
* Direct Client Write:  
  * none  
* Guarded Client Write:  
  * none  
* Function-Only Writes:  
  * create version draft, publish, retire  
* Protected:  
  * published versions are immutable once referenced by sent/signed records

### **`requiredFieldRules`, `customFieldDefinitions`, `systemSettings`, `dashboardConfigs`, `featureFlags`, `numberingRules`, `integrationConfigs`**

* Client Read:  
  * internal admins  
  * limited self settings for `savedViews` and personal dashboard config only  
* Direct Client Write:  
  * `savedViews` and personal UI preferences only  
* Function-Only Writes:  
  * all shared/global settings changes  
* Protected:  
  * workflow, numbering, retention, and integration settings are admin-only and audit-critical

---

## **C.6 Collection Write Matrix — Transactional Runtime Records**

### **`quotes`**

* Client Read:  
  * internal admins: full  
  * vendor: only assigned/current vendor-visible records  
* Guarded Client Write:  
  * low-risk draft fields may be edited by internal admins through guarded SDK writes if desired  
* Function-Only Writes:  
  * create, send, expire, withdraw, status changes, current version pointer changes  
* Protected:  
  * `status`, `currentVersionId`, `acceptedAt`, `sentAt`, and current summary totals are server-controlled

### **`quoteVersions`**

* Client Read:  
  * internal admins: full  
  * vendor: current vendor-visible version only by policy  
* Direct Client Write:  
  * none  
* Function-Only Writes:  
  * create snapshot only  
* Immutable:  
  * all sent and accepted versions

### **`agreements`**

* Client Read:  
  * internal admins: full  
  * vendors: assigned package only  
* Guarded Client Write:  
  * none  
* Function-Only Writes:  
  * create, send, signer updates after send, status changes, sign finalization, void/supersede  
* Protected:  
  * `status`, `currentVersionId`, `signedAt`, `finalDocumentId`, WB linkages are server-only

### **`agreementVersions`**

* Client Read:  
  * internal admins: full  
  * vendors: current visible version only by policy  
* Direct Client Write:  
  * none  
* Function-Only Writes:  
  * create snapshot only  
* Immutable:  
  * all sent and signed versions

### **`signerAssignments`**

* Client Read:  
  * internal admins  
  * signer may read own assignment state if exposed  
* Direct Client Write:  
  * none  
* Function-Only Writes:  
  * create/update status, mark signed/declined  
* Immutable:  
  * signed evidence fields after completion

### **`acceptanceEvents`**

* Client Read:  
  * internal admins only  
  * vendor never browses raw evidence collection  
* Direct Client Write:  
  * none  
* Function-Only Writes:  
  * create on view, reject, request changes, accept, sign  
* Immutable:  
  * yes

### **`changeRequests`**

* Client Read:  
  * internal admins full  
  * vendor may read own submitted requests if exposed  
* Guarded Client Write:  
  * vendor may submit through authenticated action endpoint  
* Function-Only Writes:  
  * create canonical record, update status/resolution  
* Protected:  
  * resolution fields are internal-only

### **`documents`**

* Client Read:  
  * internal admins: by permission  
  * vendors: only documents explicitly scoped to them  
* Direct Client Write:  
  * direct file upload may be allowed to controlled Storage paths, but metadata registration should be server-validated  
* Function-Only Writes:  
  * metadata creation for generated docs, final PDF creation, export creation  
* Immutable:  
  * final signed PDFs and evidence bundles

### **`wbHandoffs`**

* Client Read:  
  * internal admins only  
* Direct Client Write:  
  * none  
* Guarded Client Write:  
  * low-risk checklist note edits may be allowed internally if still server-validated  
* Function-Only Writes:  
  * create, ready, blocked, complete, summary recompute  
* Protected:  
  * status transitions and completion fields

### **`notifications`**

* Client Read:  
  * internal admins  
  * users may read own in-app notification summaries  
* Direct Client Write:  
  * user may mark own in-app notification read state if supported  
* Function-Only Writes:  
  * queue, send, retry, fail  
* Protected:  
  * event payload and delivery history

### **`activityLogs`**

* Client Read:  
  * internal admins by permission  
  * no vendor access to raw log collection  
* Direct Client Write:  
  * none  
* Function-Only Writes:  
  * create only  
* Immutable:  
  * yes

### **`tasks`**

* Client Read:  
  * internal admins by assignment or permission  
* Guarded Client Write:  
  * assignee may update low-risk progress notes if policy allows  
* Function-Only Writes:  
  * create, assign, close via workflow logic if system-generated  
* Protected:  
  * source workflow linkage and system task state

---

## **C.7 Storage Path Matrix**

### **`/internal/uploads/...`**

* Purpose: internal-only uploaded files  
* Read: internal only  
* Write: internal only  
* Notes: App Check \+ content-type validation required

### **`/vendor-visible/{vendorId}/{brandId}/...`**

* Purpose: vendor-visible attachments and draft package assets  
* Read: scoped vendor or signer only  
* Write: vendor uploads allowed only if assignment allows document upload  
* Notes: metadata record must be validated server-side

### **`/final/{vendorId}/{brandId}/{agreementVersionId}/...`**

* Purpose: final signed immutable PDFs and execution bundles  
* Read: internal plus scoped vendor download access  
* Write: server-only  
* Notes: immutable, no overwrite

### **`/exports/disputes/...`**

* Purpose: dispute and audit export bundles  
* Read: internal only  
* Write: server-only  
* Notes: never vendor-visible

---

## **C.8 Function-Only Write Rule Summary**

The following actions must always be function-only:

* role changes  
* allowlist changes  
* access assignment changes  
* site approval changes after send  
* quote send/expire/withdraw/supersede  
* agreement send/sign/void/supersede  
* signer reassignment after send  
* acceptance evidence creation  
* final PDF creation  
* WB handoff state changes  
* publish actions  
* numbering  
* dispute export generation  
* audit event creation

## **C.9 Write-Control Acceptance Criteria**

This appendix is satisfied when:

* every collection has a clear client-write policy  
* all legal/commercial status changes are server-only  
* final signed artifacts are immutable  
* vendor access is scoped and enforced  
* Storage paths reflect internal, vendor-visible, final, and export boundaries

---

# **Appendix D — Index and Query Appendix**

## **D.1 Purpose**

This appendix defines the required query patterns, index strategy, and launch search behavior for Firestore.

All production queries must be known in advance, encoded in source control, and backed by Firestore indexes where required.

## **D.2 Query Design Rules**

* no unbounded collection scans in production screens  
* every major list page must paginate  
* every dashboard card must map to an indexed query  
* all queries must use denormalized summary fields where practical  
* all Firestore composite indexes must be stored in source control and deployed with CI  
* launch search must prefer exact and structured lookup over ambiguous full-text search

## **D.3 Launch Search Strategy**

### **Exact and Structured Search**

Launch search must support:

* quote number exact lookup  
* agreement number exact lookup  
* vendor name lookup  
* brand name lookup  
* contact email lookup  
* site code lookup  
* signer email lookup  
* WB status lookup

### **Search Field Strategy**

Add and maintain the following normalized search fields on launch-critical collections:

* `normalizedName`  
* `normalizedEmail`  
* `recordNumberNormalized`  
* `searchKeywords[]`

Collections that should support normalized search metadata:

* `vendors`  
* `brands`  
* `contacts`  
* `quotes`  
* `agreements`  
* `wbHandoffs`

### **Full-Text Boundary**

True cross-document full-text search is not required for launch. If required later, it should be added as a separate search service and must not replace Firestore as the source of truth.

## **D.4 Required Query Catalog and Index Definitions**

### **D.4.1 Dashboard — My Brand Queue**

* Collection: `brands`  
* Filters:  
  * `ownerUserId == currentUserId`  
  * `status in [draft, collecting_info, ready_for_quote, quote_in_progress, vendor_review, ready_for_wb, wb_in_progress]`  
* Sort:  
  * `updatedAt desc`  
* Required Index:  
  * `ownerUserId ASC`  
  * `status ASC`  
  * `updatedAt DESC`

### **D.4.2 Dashboard — Brands by Site and Status**

* Collection: `brands`  
* Filters:  
  * `approvedSiteCodes array-contains siteCode`  
  * `status == selectedStatus`  
* Sort:  
  * `updatedAt desc`  
* Required Index:  
  * `approvedSiteCodes ARRAY_CONTAINS`  
  * `status ASC`  
  * `updatedAt DESC`

### **D.4.3 Brand List — Status and Owner**

* Collection: `brands`  
* Filters:  
  * `status ==`  
  * optional `ownerUserId ==`  
* Sort:  
  * `brandName asc` or `updatedAt desc`  
* Required Indexes:  
  * `status ASC`, `updatedAt DESC`  
  * `ownerUserId ASC`, `status ASC`, `updatedAt DESC`

### **D.4.4 Contacts by Vendor**

* Collection: `contacts`  
* Filters:  
  * `vendorId ==`  
  * `isArchived == false`  
* Sort:  
  * `lastName asc`  
* Required Index:  
  * `vendorId ASC`  
  * `isArchived ASC`  
  * `lastName ASC`

### **D.4.5 Site Approvals by Brand**

* Collection: `siteApprovals`  
* Filters:  
  * `brandId ==`  
* Sort:  
  * `siteName asc`  
* Required Index:  
  * `brandId ASC`  
  * `siteName ASC`

### **D.4.6 Quotes by Brand History**

* Collection: `quotes`  
* Filters:  
  * `brandId ==`  
* Sort:  
  * `createdAt desc`  
* Required Index:  
  * `brandId ASC`  
  * `createdAt DESC`

### **D.4.7 Quotes Awaiting Vendor Response**

* Collection: `quotes`  
* Filters:  
  * `status in [sent, viewed, changes_requested]`  
* Sort:  
  * `validUntilDate asc`  
* Required Index:  
  * `status ASC`  
  * `validUntilDate ASC`

### **D.4.8 Quotes by Owner and Status**

* Collection: `quotes`  
* Filters:  
  * `ownerUserId ==`  
  * `status ==`  
* Sort:  
  * `updatedAt desc`  
* Required Index:  
  * `ownerUserId ASC`  
  * `status ASC`  
  * `updatedAt DESC`

### **D.4.9 Agreements by Brand History**

* Collection: `agreements`  
* Filters:  
  * `brandId ==`  
* Sort:  
  * `createdAt desc`  
* Required Index:  
  * `brandId ASC`  
  * `createdAt DESC`

### **D.4.10 Agreements Awaiting Signature**

* Collection: `agreements`  
* Filters:  
  * `status in [sent, viewed, awaiting_signature, changes_requested]`  
* Sort:  
  * `sentAt asc`  
* Required Index:  
  * `status ASC`  
  * `sentAt ASC`

### **D.4.11 Agreements Signed by Date**

* Collection: `agreements`  
* Filters:  
  * `status == signed`  
  * optional `siteCodes array-contains siteCode`  
* Sort:  
  * `signedAt desc`  
* Required Indexes:  
  * `status ASC`, `signedAt DESC`  
  * `siteCodes ARRAY_CONTAINS`, `status ASC`, `signedAt DESC`

### **D.4.12 Agreements by Terms Version**

* Collection: `agreements`  
* Filters:  
  * `termsVersionNumber ==`  
  * `status == signed`  
* Sort:  
  * `signedAt desc`  
* Required Index:  
  * `termsVersionNumber ASC`  
  * `status ASC`  
  * `signedAt DESC`

### **D.4.13 Signer Assignments by Agreement Version**

* Collection: `signerAssignments`  
* Filters:  
  * `agreementVersionId ==`  
* Sort:  
  * `signOrder asc`  
* Required Index:  
  * `agreementVersionId ASC`  
  * `signOrder ASC`

### **D.4.14 Change Requests Open by Brand**

* Collection: `changeRequests`  
* Filters:  
  * `brandId ==`  
  * `status == open`  
* Sort:  
  * `submittedAt desc`  
* Required Index:  
  * `brandId ASC`  
  * `status ASC`  
  * `submittedAt DESC`

### **D.4.15 Documents by Entity**

* Collection: `documents`  
* Filters:  
  * `entityType ==`  
  * `entityId ==`  
* Sort:  
  * `createdAt desc`  
* Required Index:  
  * `entityType ASC`  
  * `entityId ASC`  
  * `createdAt DESC`

### **D.4.16 Activity Timeline by Entity**

* Collection: `activityLogs`  
* Filters:  
  * `entityType ==`  
  * `entityId ==`  
* Sort:  
  * `occurredAt desc`  
* Required Index:  
  * `entityType ASC`  
  * `entityId ASC`  
  * `occurredAt DESC`

### **D.4.17 Notifications Due for Delivery**

* Collection: `notifications`  
* Filters:  
  * `status == queued`  
  * `scheduledFor <= now`  
* Sort:  
  * `scheduledFor asc`  
* Required Index:  
  * `status ASC`  
  * `scheduledFor ASC`

### **D.4.18 Notifications by Recipient**

* Collection: `notifications`  
* Filters:  
  * `recipientUserId ==`  
  * optional `status ==`  
* Sort:  
  * `createdAt desc`  
* Required Index:  
  * `recipientUserId ASC`  
  * `status ASC`  
  * `createdAt DESC`

### **D.4.19 Access Links Expiring Soon**

* Collection: `accessLinks`  
* Filters:  
  * `status == active`  
* Sort:  
  * `expiresAt asc`  
* Required Index:  
  * `status ASC`  
  * `expiresAt ASC`

### **D.4.20 Access Links by Entity Version**

* Collection: `accessLinks`  
* Filters:  
  * `entityVersionId ==`  
  * `status in [active, expired, revoked, superseded]`  
* Sort:  
  * `issuedAt desc`  
* Required Index:  
  * `entityVersionId ASC`  
  * `status ASC`  
  * `issuedAt DESC`

### **D.4.21 WB Handoffs by Status and Assignee**

* Collection: `wbHandoffs`  
* Filters:  
  * `status ==`  
  * optional `assignedUserId ==`  
* Sort:  
  * `updatedAt desc`  
* Required Index:  
  * `status ASC`  
  * `assignedUserId ASC`  
  * `updatedAt DESC`

### **D.4.22 Saved Views by Owner and Module**

* Collection: `savedViews`  
* Filters:  
  * `ownerUserId ==`  
  * `moduleKey ==`  
* Sort:  
  * `updatedAt desc`  
* Required Index:  
  * `ownerUserId ASC`  
  * `moduleKey ASC`  
  * `updatedAt DESC`

## **D.5 Pagination Rules**

All list screens must paginate using cursor-based pagination, not offset pagination.

Collections requiring cursor pagination at launch:

* `brands`  
* `quotes`  
* `agreements`  
* `documents`  
* `activityLogs`  
* `notifications`  
* `wbHandoffs`

## **D.6 Search Metadata Maintenance**

The following derived fields must be maintained by server-side logic or trusted client validation:

* `normalizedName`  
* `normalizedEmail`  
* `recordNumberNormalized`  
* `searchKeywords[]`

Recommended `searchKeywords[]` content:

* lowercase vendor name tokens  
* lowercase brand name tokens  
* quote/agreement number  
* contact email  
* site codes

## **D.7 Index Governance Rules**

* all composite indexes must be declared in source control  
* no production-only manual index drift  
* CI must verify index definition files are valid  
* new screens must not ship without matching query/index review  
* if a query requires a new index, the index must be added before release

## **D.8 Index and Query Acceptance Criteria**

This appendix is satisfied when:

* every dashboard/list query has a declared index strategy  
* launch search is backed by normalized fields  
* all major collections paginate  
* index definitions are version-controlled and deployed through CI

---

# **Appendix E — Schema Reconciliation Addendum**

## **E.1 Purpose and Precedence Rule**

This appendix reconciles lighter schema definitions in earlier sections with the stronger legal, workflow, and audit requirements defined later in the V3 master document.

If there is any conflict between earlier Section 5 collection definitions and this appendix, **this appendix controls**.

## **E.2 Canonical Decision on Authentication Event Log and Access Change Log**

For launch, **no separate `authEvents` or `accessChangeLogs` collection is required**.

Instead:

* `activityLogs` is the canonical audit store  
* “Authentication Event Log” is an internal filtered view of `activityLogs` where `eventCategory = auth`  
* “Access Change Log” is an internal filtered view of `activityLogs` where `eventCategory = access`

To support this, the `activityLogs` schema must be expanded as defined below.

---

## **E.3 Expanded `activityLogs` Schema**

The Section 5 `activityLogs` schema must be expanded to include:

```
entityType
entityId
entityVersionId
vendorId
brandId
actionKey
eventCategory          // auth, access, business, settings, notification, export, system
actorType              // user, contact, system
actorId
actorDisplayName
beforeSummary{}
afterSummary{}
reason
correlationId
sourceFunctionKey
relatedEntityRefs[]    // array of {entityType, entityId, entityVersionId}
metadata{}
occurredAt
createdAt
```

### **Rules**

* `actionKey` must use the canonical event keys from Appendix B  
* `eventCategory` is mandatory for all protected actions  
* `correlationId` is mandatory for all server-controlled actions  
* `sourceFunctionKey` should map to the inventory in Appendix A  
* `beforeSummary` and `afterSummary` are required for audit-critical configuration or workflow state changes

---

## **E.4 Expanded `acceptanceEvents` Schema**

The Section 5 `acceptanceEvents` schema must be expanded to fully match Section 6 legal evidence requirements.

Use the following launch schema:

```
entityType               // quote, agreement, package
entityId
entityVersionId
quoteId
quoteVersionId
agreementId
agreementVersionId
vendorId
vendorName
brandId
brandName
contactId
contactDisplayName
email
actionType               // viewed, request_changes, reject, accept, sign
verificationMethod
signerAssignmentId
accessLinkId
termsKey
termsVersionNumber
agreementTemplateKey
agreementTemplateVersion
packageLayoutKey
packageLayoutVersion
approvedSiteSnapshot[]
commercialScheduleSnapshotRef
operationalSnapshotRef
acceptanceTextSnapshot
acceptedContentHash
ipAddress
userAgent
requestId
occurredAt
finalDocumentId
evidenceDocumentId
correlationId
metadata{}
createdAt
```

### **Rules**

* `acceptedContentHash` is mandatory for final acceptance/signature events  
* `acceptanceTextSnapshot` is mandatory for final acceptance/signature events  
* `finalDocumentId` is mandatory once final PDF creation completes  
* `approvedSiteSnapshot[]` must reflect the exact sites shown at sign time  
* a single final sign/accept action must not create multiple final acceptance events for the same version and signer

---

## **E.5 Expanded `accessLinks` Schema**

The Section 5 `accessLinks` schema must be expanded to better support revision invalidation, signing evidence, and support troubleshooting.

Add the following fields:

```
purpose                   // quote_review, agreement_review, package_review, signing
scopeType                 // document, brand
sentVersionHash
supersededByVersionId
revokedReason
correlationId
```

### **Rules**

* `sentVersionHash` should match the version hash the link was issued for  
* when a version is superseded, active links for the old version must be marked `superseded`  
* raw tokens must never be stored in Firestore

---

## **E.6 Expanded `wbHandoffs` Schema**

The Section 5 `wbHandoffs` schema must be expanded to carry stronger handoff context and reduce ambiguity at the handoff stage.

Use the following launch schema:

```
handoffNumber
vendorId
vendorName
brandId
brandName
quoteId
quoteVersionId
agreementId
agreementVersionId
status
assignedUserId
assignedDisplayName
checklistTemplateKey
checklistTemplateVersion
checklistItems[]
approvedSiteSnapshot[]
primaryContactSnapshot{}
signerSnapshot{}
operationalSnapshotRef
relatedDocumentIds[]
readyAt
startedAt
completedAt
lastStatusChangedAt
lastStatusChangedByUserId
blockedReason
blockedDetails{}
notesInternal
customFields{}
createdAt
createdByUserId
updatedAt
updatedByUserId
archivedAt
isArchived
```

### **Checklist Item Object**

Use the following checklist item schema:

```
key
label
required
status                  // not_started, complete, blocked, skipped
completedAt
completedByUserId
note
```

### **Rules**

* `approvedSiteSnapshot[]` is mandatory once status reaches `ready`  
* `agreementVersionId` is mandatory for active handoffs created from signed packages  
* `blockedDetails{}` should store actionable internal context  
* only one active handoff may exist per brand

---

## **E.7 Search Metadata Addendum**

To support the search strategy in Appendix D, the following fields must be added where applicable.

### **Add to `vendors`**

```
normalizedName
searchKeywords[]
```

### **Add to `brands`**

```
normalizedName
searchKeywords[]
```

### **Add to `contacts`**

```
normalizedEmail
normalizedName
searchKeywords[]
```

### **Add to `quotes`**

```
recordNumberNormalized
searchKeywords[]
```

### **Add to `agreements`**

```
recordNumberNormalized
searchKeywords[]
```

### **Add to `wbHandoffs`**

```
recordNumberNormalized
searchKeywords[]
```

### **Rules**

* `searchKeywords[]` must be maintained server-side or through trusted validation  
* search fields are query helpers only and do not replace canonical business fields

---

## **E.8 Current Pointer Consistency Addendum**

The current-pointer strategy must be explicit.

### **Canonical Current Pointers**

The `brands` collection is the canonical source for:

* `currentQuoteId`  
* `currentAgreementId`  
* `currentWbHandoffId`  
* `currentQuoteStatus`  
* `currentAgreementStatus`  
* `currentWbStatus`

### **Supporting Flags**

The following flags must remain aligned:

* `quotes.isCurrentForBrand`  
* `agreements.isCurrentForBrand`  
* `quoteVersions.isCurrentVersion`  
* `agreementVersions.isCurrentVersion`

### **Rules**

* only server-side transactional logic may update current pointers and current flags  
* a repair job may reconcile drift, but normal operation must not rely on repair jobs

---

## **E.9 Versioned Config Common Fields Addendum**

All versioned config collections should support these common fields for consistency:

```
status
versionNumber
isCurrentPublished
sourceVersionId
changeSummary
contentHash
seededFromLegacy
reviewRequired
publishedAt
publishedByUserId
createdAt
createdByUserId
updatedAt
updatedByUserId
```

### **Applies To**

* `pricingProfiles`  
* `operationalProfiles`  
* `quoteTemplates`  
* `agreementTemplates`  
* `packageLayouts`  
* `termsVersions`  
* `notificationTemplates`  
* `wbChecklistTemplates`

### **Rules**

* `contentHash` is strongly recommended for all publishable versions  
* `seededFromLegacy` and `reviewRequired` must remain available for legacy-seeded defaults

---

## **E.10 Permission Bundle Reconciliation Rule**

The “Permission Bundle” concept referenced in earlier sections is implemented at launch through:

* `roles.permissionKeys[]`

A separate `permissionBundles` collection is **not required for launch**.

If finer-grained reusable bundles are introduced later, they may be added without changing the launch data model.

---

## **E.11 Schema Reconciliation Acceptance Criteria**

This appendix is satisfied when:

* `activityLogs` supports filtered auth and access log views  
* `acceptanceEvents` contains the full legal evidence fields required for signature and dispute support  
* `wbHandoffs` stores enough context to support internal completion without ambiguity  
* search metadata fields are present on launch-critical collections  
* current pointers and current flags are explicitly controlled and consistent  
* versioned config collections share a common publish/version field model

---

# **Appendix Placement and Control Rule**

These appendices are part of the V3 master specification and should be treated as authoritative implementation detail that supplements Sections 1–7.

