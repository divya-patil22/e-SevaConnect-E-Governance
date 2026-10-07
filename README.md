# e-SevaConnect: National Citizen E-Governance & Digital Services Portal

> **Internship Track:** Junior Web Developer - E-Governance & Digital Services  
> **Module / Milestone:** Week 1 Task - Strategic Planning & Requirements Definition  
> **Author / Intern:** Junior Web Developer Intern  
> **Compliance Standard:** Guidelines for Indian Government Websites (GIGW 3.0), WCAG 2.1 Level AA, Digital Personal Data Protection (DPDP) Act 2023

---

## 🏛️ Project Overview

**e-SevaConnect** is a unified, accessible, and citizen-centric e-governance web application engineered to bridge the gap between public administrative bodies and diverse citizen cohorts. The portal provides transparent access to public welfare schemes, digital certificates (Income, Domicile, Caste Validity, Birth/Death records), time-bound service delivery under Citizen Charters, and a centralized public grievance redressal mechanism.

---

## 🚀 Key Features Built in Task 1

1. **Accessibility & Inclusivity Suite (WCAG 2.1 AA Compliant):**
   - High-contrast toggle (Dark high-contrast theme with high legibility ratios).
   - Dynamic 3-level font resizer (`A`, `A+`, `A++`) for elderly and visually impaired users.
   - Screen-reader friendly semantic HTML5 landmarks and skip-to-content links.
   - National tricolor identity strip adhering to official GIGW 3.0 standards.

2. **Public Services Catalog & Debounced Search Engine:**
   - Multi-category filtering across Revenue, Social Welfare, Food & Civil Supplies, Municipal Administration, and Agriculture.
   - Live debounced search by keyword or department.
   - Transparent metadata per service: Processing SLA (e.g. 7 Working Days), required documentation checklists, and statutory fees.

3. **Multi-Step Online Application Wizard:**
   - 4-step progressive wizard: (1) Citizen Demographics, (2) Service-Specific Particulars, (3) Document Upload Simulation, (4) Statutory Review & Declaration.
   - Client-side validation: Aadhaar (12-digit UID), Mobile (10-digit format), PIN code, and mandatory fields.
   - Generates deterministic, unique tracking numbers (`ESC-2026-XXXX`).
   - Browser `localStorage` state persistence simulating enterprise backend storage.

4. **Real-Time Application Tracking & Timeline Engine:**
   - Visual progress timeline showing live stages: `Application Submitted` $\rightarrow$ `Desk Scrutiny` $\rightarrow$ `Field Enquiry` $\rightarrow$ `Executive Approval` $\rightarrow$ `Certificate Issued`.
   - Officer scrutiny remarks, assigned executive magistrate name, and timestamp logging.
   - Quick one-click test records included (`ESC-2026-8812`, `ESC-2026-3401`, `ESC-2026-5190`).

5. **Digitally Signed E-Certificate Generator:**
   - Legal layout compliant with Sections 4 & 5 of the Information Technology (IT) Act, 2000.
   - High-resolution emblem header, applicant details, masked Aadhaar UID, and executive magistrate digital signature stamp.
   - Simulated 2D cryptographic QR verification badge.
   - Print-ready and "Save as PDF" styling.

6. **Citizen Grievance Redressal Portal (CPGRAMS Aligned):**
   - Lodge complaints for service delays, arbitrary rejections, or system errors.
   - Generates immutable Grievance Ticket IDs (`GRV-2026-XXXX`) with 7-day statutory resolution guarantee.

7. **Citizen Self-Service Dashboard:**
   - Centralized summary cards (Total Applications, In Progress, Issued, Active Grievances).
   - Dynamic table of all user submissions with instant "Track" and "Download Certificate" actions.

---

## 📂 Project Architecture & Directory Structure

```
e-SevaConnect-E-Governance/
├── index.html                   # Citizen Portal Homepage, Hero Tracker & Quick Services
├── services.html                # Public Services Catalog with Live Search & Filter
├── apply.html                   # 4-Step Interactive Online Application Wizard
├── track.html                   # Real-Time Application Tracking Engine & Timeline
├── grievance.html               # Citizen Grievance Redressal & Helpdesk Submission
├── dashboard.html               # Citizen Records, Summary Metrics & Document Vault
├── certificate-view.html        # Digitally Verified E-Certificate Template with QR Code
├── css/
│   └── style.css                # Master CSS Design System (Gov Themes, High-Contrast, Responsive)
├── js/
│   └── app.js                   # Application State Engine, LocalStorage, Search, Form Wizard
├── submissions/
│   └── Week_1_Project_Planning_and_Requirements_Analysis.md # Comprehensive 30-35hr Planning Document
└── README.md                    # Project Architecture & Quickstart Guide
```

---

## 💻 How to Run the Project Locally

The project is built using zero-dependency, standard-compliant semantic web technologies (HTML5, modern CSS3, vanilla ES6+ JavaScript), guaranteeing instant, offline-capable execution on any machine or browser.

### Option 1: Direct Browser Launch
Simply navigate into the folder:
`c:\Users\lenovo\Downloads\e-SevaConnect-E-Governance`  
Double-click on **`index.html`** to open it in Google Chrome, Microsoft Edge, Mozilla Firefox, or any modern web browser.

### Option 2: Local Static Server (VS Code / Live Server)
If using Visual Studio Code, right click on `index.html` and select **"Open with Live Server"**.

---

## 📑 Week 1 Internship Deliverable File

The complete, exhaustive, 30-35 hour planning document required for the **Week 1 Task: Strategic Planning and Requirements Definition** submission is located at:

👉 [submissions/Week_1_Project_Planning_and_Requirements_Analysis.md](submissions/Week_1_Project_Planning_and_Requirements_Analysis.md)

### What it covers:
- **Executive Summary & Industry Research:** NeGD, UMANG, DigiLocker, ServicePlus benchmarks.
- **Problem Statement & Scope Boundaries:** In-scope vs. Out-of-scope functional limits.
- **Detailed User Personas:** Rural Farmer, Urban Professional, Senior Citizen Beneficiary.
- **Software Requirements Specification (SRS):** 12 Functional Requirements (FR) and 10 Non-Functional Requirements (NFR).
- **Multi-Tier System Architecture:** Client presentation tier, application logic tier, and storage tier diagrams.
- **Service Workflows & Sequence Diagrams:** End-to-end sequence flow and grievance escalation flowchart.
- **Security & Compliance:** OWASP Top 10 mitigation, DPDP Act 2023 compliance, and risk assessment matrix.
- **Work Breakdown Structure (WBS) & Milestones:** 4-week Gantt breakdown.

---

## 📜 License & Academic Integrity
Prepared exclusively for the **Junior Web Developer - E-Governance & Digital Services** Internship Certification evaluation.
