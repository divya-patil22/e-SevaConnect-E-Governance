/**
 * e-SevaConnect - Core Application & State Engine
 * Junior Web Developer - E-Governance & Digital Services
 * Vanilla JavaScript ES6+
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. DATA CONSTANTS & LOCAL STORAGE INITIALIZATION
  // =========================================================================
  const STORAGE_KEYS = {
    APPLICATIONS: 'esc_applications_v1',
    GRIEVANCES: 'esc_grievances_v1',
    SETTINGS: 'esc_settings_v1',
    USER: 'esc_user_v1'
  };

  const DEFAULT_APPLICATIONS = [
    {
      id: 'ESC-2026-8812',
      serviceId: 'income-cert',
      serviceName: 'Income Certificate',
      department: 'Revenue & Land Records',
      applicantName: 'Ramesh K. Patil',
      mobile: '9876543210',
      aadhaar: 'XXXX-XXXX-9012',
      appliedDate: '01 Oct 2026',
      status: 'Issued',
      statusStep: 5,
      officerRemarks: 'All land revenue and tehsildar records verified. Digitally signed certificate issued.',
      officerName: 'S. Sharma, Tehsildar (Executive Magistrate)',
      estimatedDate: '07 Oct 2026'
    },
    {
      id: 'ESC-2026-3401',
      serviceId: 'domicile-cert',
      serviceName: 'Domicile & Residence Certificate',
      department: 'Revenue & Land Records',
      applicantName: 'Ananya Sen',
      mobile: '9822019923',
      aadhaar: 'XXXX-XXXX-4532',
      appliedDate: '04 Oct 2026',
      status: 'Under Verification',
      statusStep: 3,
      officerRemarks: 'Electricity utility records submitted are under scrutiny by verification officer.',
      officerName: 'P. Nair, Revenue Inspector',
      estimatedDate: '11 Oct 2026'
    },
    {
      id: 'ESC-2026-5190',
      serviceId: 'caste-validity',
      serviceName: 'Caste Certificate & Validity',
      department: 'Social Welfare & Justice',
      applicantName: 'Sunil Jadhav',
      mobile: '9423157890',
      aadhaar: 'XXXX-XXXX-1188',
      appliedDate: '06 Oct 2026',
      status: 'Submitted',
      statusStep: 1,
      officerRemarks: 'Application received online. Awaiting document scrutiny queue assignment.',
      officerName: 'Central Intake Desk',
      estimatedDate: '16 Oct 2026'
    }
  ];

  const DEFAULT_GRIEVANCES = [
    {
      ticketId: 'GRV-2026-1044',
      department: 'Food & Civil Supplies',
      category: 'Delayed Ration Card Update',
      subject: 'Correction of family member name pending over 15 days',
      status: 'In Progress',
      filedDate: '02 Oct 2026',
      priority: 'High',
      slaDays: 7,
      resolutionOfficer: 'District Supply Officer'
    }
  ];

  // Initialize LocalStorage with default seeds if empty
  function initStorage() {
    if (!localStorage.getItem(STORAGE_KEYS.APPLICATIONS)) {
      localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(DEFAULT_APPLICATIONS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.GRIEVANCES)) {
      localStorage.setItem(STORAGE_KEYS.GRIEVANCES, JSON.stringify(DEFAULT_GRIEVANCES));
    }
  }

  function getApplications() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.APPLICATIONS)) || DEFAULT_APPLICATIONS;
    } catch (e) {
      return DEFAULT_APPLICATIONS;
    }
  }

  function saveApplications(apps) {
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(apps));
  }

  function getGrievances() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.GRIEVANCES)) || DEFAULT_GRIEVANCES;
    } catch (e) {
      return DEFAULT_GRIEVANCES;
    }
  }

  function saveGrievances(grvs) {
    localStorage.setItem(STORAGE_KEYS.GRIEVANCES, JSON.stringify(grvs));
  }

  // =========================================================================
  // 2. ACCESSIBILITY & CONTRAST SUITE
  // =========================================================================
  function initAccessibility() {
    const contrastBtn = document.getElementById('btn-toggle-contrast');
    const fontNormalBtn = document.getElementById('btn-font-normal');
    const fontLargeBtn = document.getElementById('btn-font-large');
    const fontXLargeBtn = document.getElementById('btn-font-xlarge');

    // Retrieve saved preference
    const savedContrast = localStorage.getItem('esc_contrast');
    const savedFontSize = localStorage.getItem('esc_fontsize');

    if (savedContrast === 'high') {
      document.body.classList.add('high-contrast');
      if (contrastBtn) contrastBtn.classList.add('active');
    }

    if (savedFontSize === 'large') {
      document.body.classList.add('font-large');
      if (fontLargeBtn) fontLargeBtn.classList.add('active');
    } else if (savedFontSize === 'xlarge') {
      document.body.classList.add('font-xlarge');
      if (fontXLargeBtn) fontXLargeBtn.classList.add('active');
    } else {
      if (fontNormalBtn) fontNormalBtn.classList.add('active');
    }

    // Toggle High Contrast
    if (contrastBtn) {
      contrastBtn.addEventListener('click', function () {
        document.body.classList.toggle('high-contrast');
        const isHigh = document.body.classList.contains('high-contrast');
        contrastBtn.classList.toggle('active', isHigh);
        localStorage.setItem('esc_contrast', isHigh ? 'high' : 'normal');
        showToast(isHigh ? 'High Contrast Mode Enabled' : 'Standard Contrast Restored', 'info');
      });
    }

    // Font Resizing
    function clearFontClasses() {
      document.body.classList.remove('font-large', 'font-xlarge');
      [fontNormalBtn, fontLargeBtn, fontXLargeBtn].forEach(b => b && b.classList.remove('active'));
    }

    if (fontNormalBtn) {
      fontNormalBtn.addEventListener('click', function () {
        clearFontClasses();
        fontNormalBtn.classList.add('active');
        localStorage.setItem('esc_fontsize', 'normal');
      });
    }

    if (fontLargeBtn) {
      fontLargeBtn.addEventListener('click', function () {
        clearFontClasses();
        document.body.classList.add('font-large');
        fontLargeBtn.classList.add('active');
        localStorage.setItem('esc_fontsize', 'large');
      });
    }

    if (fontXLargeBtn) {
      fontXLargeBtn.addEventListener('click', function () {
        clearFontClasses();
        document.body.classList.add('font-xlarge');
        fontXLargeBtn.classList.add('active');
        localStorage.setItem('esc_fontsize', 'xlarge');
      });
    }
  }

  // Mobile Navigation Hamburger
  function initMobileNav() {
    const toggleBtn = document.getElementById('mobile-nav-toggle');
    const navMenu = document.getElementById('nav-links');
    if (toggleBtn && navMenu) {
      toggleBtn.addEventListener('click', function () {
        navMenu.classList.toggle('show');
        const isExpanded = navMenu.classList.contains('show');
        toggleBtn.setAttribute('aria-expanded', isExpanded);
      });
    }
  }

  // Toast Notification System
  function showToast(message, type = 'info') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    let icon = 'ℹ️';
    if (type === 'success') icon = '✅';
    if (type === 'error') icon = '⚠️';

    toast.innerHTML = `<span>${icon}</span> <div>${message}</div>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  // =========================================================================
  // 3. HOME PAGE HERO QUICK TRACKER
  // =========================================================================
  function initHeroTracker() {
    const quickTrackForm = document.getElementById('quick-track-form');
    if (quickTrackForm) {
      quickTrackForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const input = document.getElementById('quick-track-id');
        const id = input.value.trim().toUpperCase();
        if (!id) {
          showToast('Please enter an Application Tracking ID', 'error');
          return;
        }
        window.location.href = `track.html?id=${encodeURIComponent(id)}`;
      });
    }
  }

  // =========================================================================
  // 4. SERVICE CATALOG FILTER & SEARCH ENGINE
  // =========================================================================
  function initServiceCatalog() {
    const searchInput = document.getElementById('catalog-search-input');
    const categorySelect = document.getElementById('catalog-dept-filter');
    const cards = document.querySelectorAll('.catalog-card');
    const countDisplay = document.getElementById('catalog-results-count');

    if (!cards.length) return;

    function filterServices() {
      const query = (searchInput ? searchInput.value : '').toLowerCase().trim();
      const selectedCategory = (categorySelect ? categorySelect.value : 'all').toLowerCase();
      let visibleCount = 0;

      cards.forEach(card => {
        const title = card.getAttribute('data-title') || '';
        const dept = card.getAttribute('data-dept') || '';
        const keywords = card.getAttribute('data-keywords') || '';
        const textContent = `${title} ${dept} ${keywords}`.toLowerCase();

        const matchesQuery = !query || textContent.includes(query);
        const matchesCategory = selectedCategory === 'all' || dept.toLowerCase().includes(selectedCategory);

        if (matchesQuery && matchesCategory) {
          card.style.display = 'flex';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      if (countDisplay) {
        countDisplay.textContent = `Showing ${visibleCount} public services`;
      }
    }

    if (searchInput) {
      let debounceTimeout;
      searchInput.addEventListener('input', function () {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(filterServices, 200);
      });
    }

    if (categorySelect) {
      categorySelect.addEventListener('change', filterServices);
    }
  }

  // =========================================================================
  // 5. MULTI-STEP APPLICATION WIZARD
  // =========================================================================
  function initApplicationWizard() {
    const wizardForm = document.getElementById('service-apply-form');
    if (!wizardForm) return;

    const steps = document.querySelectorAll('.wizard-step-content');
    const stepTabs = document.querySelectorAll('.wizard-step-tab');
    const nextBtns = document.querySelectorAll('.btn-wizard-next');
    const prevBtns = document.querySelectorAll('.btn-wizard-prev');
    let currentStep = 1;

    // Check if service was preselected via URL query string
    const urlParams = new URLSearchParams(window.location.search);
    const preselectedService = urlParams.get('service');
    const serviceSelect = document.getElementById('apply-service-select');
    if (preselectedService && serviceSelect) {
      serviceSelect.value = preselectedService;
    }

    function showStep(stepIndex) {
      steps.forEach((s, idx) => {
        s.classList.toggle('active', idx + 1 === stepIndex);
      });

      stepTabs.forEach((tab, idx) => {
        tab.classList.toggle('active', idx + 1 === stepIndex);
        if (idx + 1 < stepIndex) {
          tab.classList.add('completed');
        } else {
          tab.classList.remove('completed');
        }
      });

      currentStep = stepIndex;
      window.scrollTo({ top: wizardForm.offsetTop - 80, behavior: 'smooth' });

      // If moving to step 4 (Review), populate review table
      if (stepIndex === 4) {
        populateReviewSummary();
      }
    }

    function validateCurrentStep(step) {
      if (step === 1) {
        const service = document.getElementById('apply-service-select').value;
        const name = document.getElementById('app-fullname').value.trim();
        const mobile = document.getElementById('app-mobile').value.trim();
        const aadhaar = document.getElementById('app-aadhaar').value.trim();
        const district = document.getElementById('app-district').value;

        if (!service) {
          showToast('Please select a Government Service to proceed.', 'error');
          return false;
        }
        if (!name || name.length < 3) {
          showToast('Please enter your full legal name.', 'error');
          return false;
        }
        if (!/^[6-9]\d{9}$/.test(mobile)) {
          showToast('Please enter a valid 10-digit Indian Mobile Number.', 'error');
          return false;
        }
        if (!/^\d{12}$/.test(aadhaar.replace(/\s+/g, ''))) {
          showToast('Please enter a valid 12-digit Aadhaar Card number.', 'error');
          return false;
        }
        if (!district) {
          showToast('Please select your residential District.', 'error');
          return false;
        }
        return true;
      }

      if (step === 2) {
        const reason = document.getElementById('app-purpose').value.trim();
        if (!reason || reason.length < 5) {
          showToast('Please provide a specific purpose/reason for this application.', 'error');
          return false;
        }
        return true;
      }

      if (step === 3) {
        const docCheck = document.getElementById('app-doc-id');
        if (!docCheck || !docCheck.files || docCheck.files.length === 0) {
          // Allow simulated submission with warning or check
          showToast('Note: Simulating document validation. Identity proof marked OK.', 'info');
        }
        return true;
      }

      return true;
    }

    function populateReviewSummary() {
      const serviceName = document.getElementById('apply-service-select').selectedOptions[0].text;
      const fullName = document.getElementById('app-fullname').value;
      const mobile = document.getElementById('app-mobile').value;
      const district = document.getElementById('app-district').value;
      const rawAadhaar = document.getElementById('app-aadhaar').value.replace(/\s+/g, '');
      const maskedAadhaar = 'XXXX-XXXX-' + rawAadhaar.slice(-4);

      document.getElementById('rev-service').textContent = serviceName;
      document.getElementById('rev-name').textContent = fullName;
      document.getElementById('rev-mobile').textContent = mobile;
      document.getElementById('rev-aadhaar').textContent = maskedAadhaar;
      document.getElementById('rev-district').textContent = district;
      document.getElementById('rev-fee').textContent = '₹20 (Government Processing Fee)';
    }

    nextBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        if (validateCurrentStep(currentStep)) {
          showStep(currentStep + 1);
        }
      });
    });

    prevBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        if (currentStep > 1) {
          showStep(currentStep - 1);
        }
      });
    });

    // Form Submission
    wizardForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const declaration = document.getElementById('app-declaration');
      if (!declaration.checked) {
        showToast('Please accept the legal declaration before submitting.', 'error');
        return;
      }

      // Generate Unique Application ID
      const randomHex = Math.floor(1000 + Math.random() * 9000);
      const newTrackingId = `ESC-2026-${randomHex}`;

      const serviceSelectElem = document.getElementById('apply-service-select');
      const selectedOption = serviceSelectElem.selectedOptions[0];
      const serviceName = selectedOption.text;
      const dept = selectedOption.getAttribute('data-dept') || 'Revenue & Land Records';
      const fullName = document.getElementById('app-fullname').value.trim();
      const mobile = document.getElementById('app-mobile').value.trim();
      const rawAadhaar = document.getElementById('app-aadhaar').value.replace(/\s+/g, '');

      const newRecord = {
        id: newTrackingId,
        serviceId: serviceSelectElem.value,
        serviceName: serviceName,
        department: dept,
        applicantName: fullName,
        mobile: mobile,
        aadhaar: 'XXXX-XXXX-' + rawAadhaar.slice(-4),
        appliedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        status: 'Submitted',
        statusStep: 1,
        officerRemarks: 'Application submitted successfully online. In queue for initial scrutiny.',
        officerName: 'Central Intake Desk',
        estimatedDate: '7 Working Days'
      };

      const existingApps = getApplications();
      existingApps.unshift(newRecord);
      saveApplications(existingApps);

      // Render Confirmation Modal
      const modal = document.getElementById('success-modal');
      if (modal) {
        document.getElementById('modal-app-id').textContent = newTrackingId;
        document.getElementById('modal-applicant').textContent = fullName;
        document.getElementById('modal-service').textContent = serviceName;
        modal.style.display = 'flex';
      } else {
        showToast(`Application Submitted Successfully! ID: ${newTrackingId}`, 'success');
        setTimeout(() => {
          window.location.href = `track.html?id=${newTrackingId}`;
        }, 1500);
      }
    });
  }

  // =========================================================================
  // 6. TRACKING & TIMELINE ENGINE
  // =========================================================================
  function initTrackingEngine() {
    const trackForm = document.getElementById('lookup-track-form');
    const resultBox = document.getElementById('track-result-container');
    const notFoundBox = document.getElementById('track-notfound-container');

    if (!trackForm) return;

    function renderStatus(appId) {
      const apps = getApplications();
      const match = apps.find(a => a.id.toUpperCase() === appId.toUpperCase());

      if (!match) {
        if (resultBox) resultBox.style.display = 'none';
        if (notFoundBox) notFoundBox.style.display = 'block';
        showToast(`No record found for Application ID: ${appId}`, 'error');
        return;
      }

      if (notFoundBox) notFoundBox.style.display = 'none';
      if (resultBox) resultBox.style.display = 'block';

      // Fill header details
      document.getElementById('res-app-id').textContent = match.id;
      document.getElementById('res-service-name').textContent = match.serviceName;
      document.getElementById('res-dept').textContent = match.department;
      document.getElementById('res-applicant').textContent = match.applicantName;
      document.getElementById('res-applied-date').textContent = match.appliedDate;
      document.getElementById('res-status-badge').textContent = match.status;
      document.getElementById('res-officer').textContent = match.officerName;
      document.getElementById('res-remarks').textContent = match.officerRemarks;

      // Update Timeline Nodes
      const step = match.statusStep || 1;
      const nodes = document.querySelectorAll('.timeline-node');
      const progressFill = document.getElementById('timeline-progress-fill');

      nodes.forEach((node, idx) => {
        const nodeStep = idx + 1;
        node.classList.remove('done', 'current');
        if (nodeStep < step) {
          node.classList.add('done');
        } else if (nodeStep === step) {
          node.classList.add('current');
        }
      });

      if (progressFill) {
        const pct = Math.min(100, Math.max(0, ((step - 1) / 4) * 100));
        progressFill.style.width = `${pct}%`;
      }

      // Certificate Download Action Button
      const certBtn = document.getElementById('btn-download-cert');
      if (certBtn) {
        if (match.status === 'Issued' || step >= 4) {
          certBtn.style.display = 'inline-flex';
          certBtn.href = `certificate-view.html?id=${match.id}`;
        } else {
          certBtn.style.display = 'none';
        }
      }
    }

    trackForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const val = document.getElementById('track-input-id').value.trim().toUpperCase();
      if (!val) {
        showToast('Please enter an Application ID', 'error');
        return;
      }
      renderStatus(val);
    });

    // Check URL parameters for direct lookup
    const urlParams = new URLSearchParams(window.location.search);
    const queryId = urlParams.get('id');
    if (queryId) {
      document.getElementById('track-input-id').value = queryId;
      renderStatus(queryId);
    }
  }

  // =========================================================================
  // 7. GRIEVANCE REDRESSAL SUBMISSION ENGINE
  // =========================================================================
  function initGrievanceEngine() {
    const grievanceForm = document.getElementById('grievance-form');
    if (!grievanceForm) return;

    grievanceForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const dept = document.getElementById('grv-dept').value;
      const category = document.getElementById('grv-category').value;
      const subject = document.getElementById('grv-subject').value.trim();
      const description = document.getElementById('grv-desc').value.trim();
      const priority = document.getElementById('grv-priority').value;

      if (!dept || !category || !subject || !description) {
        showToast('Please fill all mandatory grievance fields.', 'error');
        return;
      }

      const randomId = Math.floor(1000 + Math.random() * 9000);
      const ticketId = `GRV-2026-${randomId}`;

      const newGrievance = {
        ticketId: ticketId,
        department: dept,
        category: category,
        subject: subject,
        status: 'Registered',
        filedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        priority: priority,
        slaDays: 7,
        resolutionOfficer: 'Assigned to Public Grievance Officer'
      };

      const existingGrvs = getGrievances();
      existingGrvs.unshift(newGrievance);
      saveGrievances(existingGrvs);

      const modal = document.getElementById('grv-success-modal');
      if (modal) {
        document.getElementById('modal-ticket-id').textContent = ticketId;
        modal.style.display = 'flex';
      } else {
        showToast(`Grievance Registered. Ticket ID: ${ticketId}`, 'success');
        grievanceForm.reset();
      }
    });
  }

  // =========================================================================
  // 8. CITIZEN DASHBOARD RENDERER
  // =========================================================================
  function initDashboard() {
    const tableBody = document.getElementById('dashboard-apps-tbody');
    if (!tableBody) return;

    const apps = getApplications();
    const grvs = getGrievances();

    // Summary counts
    const totalCountEl = document.getElementById('dash-count-total');
    const pendingCountEl = document.getElementById('dash-count-pending');
    const approvedCountEl = document.getElementById('dash-count-approved');
    const grvCountEl = document.getElementById('dash-count-grievance');

    if (totalCountEl) totalCountEl.textContent = apps.length;
    if (pendingCountEl) {
      const pending = apps.filter(a => a.status !== 'Issued' && a.status !== 'Rejected').length;
      pendingCountEl.textContent = pending;
    }
    if (approvedCountEl) {
      const approved = apps.filter(a => a.status === 'Issued').length;
      approvedCountEl.textContent = approved;
    }
    if (grvCountEl) grvCountEl.textContent = grvs.length;

    // Populate Table
    tableBody.innerHTML = '';
    apps.forEach(app => {
      const tr = document.createElement('tr');
      let badgeClass = 'badge-pending';
      if (app.status === 'Issued') badgeClass = 'badge-success';
      if (app.status === 'Under Verification') badgeClass = 'badge-progress';

      tr.innerHTML = `
        <td><strong class="color-navy">${app.id}</strong></td>
        <td>${app.serviceName}</td>
        <td>${app.department}</td>
        <td>${app.appliedDate}</td>
        <td><span class="status-pill ${badgeClass}">${app.status}</span></td>
        <td>
          <a href="track.html?id=${app.id}" class="btn-sm btn-outline">Track</a>
          ${app.status === 'Issued' ? `<a href="certificate-view.html?id=${app.id}" class="btn-sm btn-primary">Certificate</a>` : ''}
        </td>
      `;
      tableBody.appendChild(tr);
    });
  }

  // =========================================================================
  // 9. CERTIFICATE DETAILS POPULATION
  // =========================================================================
  function initCertificateView() {
    const certFrame = document.getElementById('cert-frame');
    if (!certFrame) return;

    const urlParams = new URLSearchParams(window.location.search);
    const certId = urlParams.get('id') || 'ESC-2026-8812';

    const apps = getApplications();
    const record = apps.find(a => a.id.toUpperCase() === certId.toUpperCase()) || apps[0];

    document.getElementById('cert-id-display').textContent = record.id;
    document.getElementById('cert-service-display').textContent = record.serviceName.toUpperCase();
    document.getElementById('cert-applicant-display').textContent = record.applicantName;
    document.getElementById('cert-aadhaar-display').textContent = record.aadhaar;
    document.getElementById('cert-dept-display').textContent = record.department;
    document.getElementById('cert-date-display').textContent = record.appliedDate;
    document.getElementById('cert-officer-display').textContent = record.officerName || 'District Magistrate';
  }

  // =========================================================================
  // 10. DOMCONTENTLOADED DISPATCHER
  // =========================================================================
  document.addEventListener('DOMContentLoaded', function () {
    initStorage();
    initAccessibility();
    initMobileNav();
    initHeroTracker();
    initServiceCatalog();
    initApplicationWizard();
    initTrackingEngine();
    initGrievanceEngine();
    initDashboard();
    initCertificateView();
  });

  // Global helper export
  window.eSeva = {
    showToast: showToast,
    getApplications: getApplications
  };
})();
