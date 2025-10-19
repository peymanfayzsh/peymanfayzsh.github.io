'use strict';

/* -----------------------------
 * tiny helper
 * --------------------------- */
const elementToggleFunc = (elem) => elem.classList.toggle('active');

/* -----------------------------
 * sidebar (exists on all pages)
 * --------------------------- */
const sidebar    = document.querySelector('[data-sidebar]');
const sidebarBtn = document.querySelector('[data-sidebar-btn]');
if (sidebar && sidebarBtn) {
  sidebarBtn.addEventListener('click', () => elementToggleFunc(sidebar));
}

/* -----------------------------
 * testimonials modal (you removed the section, so guard it)
 * --------------------------- */
const testimonialsItem = document.querySelectorAll('[data-testimonials-item]');
const modalContainer   = document.querySelector('[data-modal-container]');
const modalCloseBtn    = document.querySelector('[data-modal-close-btn]');
const overlay          = document.querySelector('[data-overlay]');
const modalImg         = document.querySelector('[data-modal-img]');
const modalTitle       = document.querySelector('[data-modal-title]');
const modalText        = document.querySelector('[data-modal-text]');

const hasTestimonialsModal =
  testimonialsItem.length && modalContainer && modalCloseBtn && overlay && modalImg && modalTitle && modalText;

if (hasTestimonialsModal) {
  const testimonialsModalFunc = () => {
    modalContainer.classList.toggle('active');
    overlay.classList.toggle('active');
  };

  testimonialsItem.forEach((item) => {
    item.addEventListener('click', function () {
      modalImg.src   = this.querySelector('[data-testimonials-avatar]').src;
      modalImg.alt   = this.querySelector('[data-testimonials-avatar]').alt;
      modalTitle.innerHTML = this.querySelector('[data-testimonials-title]').innerHTML;
      modalText.innerHTML  = this.querySelector('[data-testimonials-text]').innerHTML;
      testimonialsModalFunc();
    });
  });

  modalCloseBtn.addEventListener('click', testimonialsModalFunc);
  overlay.addEventListener('click', testimonialsModalFunc);
}

/* -----------------------------
 * custom select / filter (exists in Publication)
 * --------------------------- */
const select       = document.querySelector('[data-select]');
const selectItems  = document.querySelectorAll('[data-select-item]');
const selectValue  = document.querySelector('[data-selecct-value]');
const filterBtn    = document.querySelectorAll('[data-filter-btn]');
const filterItems  = document.querySelectorAll('[data-filter-item]');

const filterFunc = (selectedValue) => {
  filterItems.forEach((item) => {
    if (selectedValue === 'all' || selectedValue === item.dataset.category) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
};

if (select && selectValue && (selectItems.length || filterBtn.length)) {
  select.addEventListener('click', function () { elementToggleFunc(this); });

  selectItems.forEach((item) => {
    item.addEventListener('click', function () {
      const val = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      elementToggleFunc(select);
      filterFunc(val);
    });
  });

  // large-screen filter buttons
  let lastClickedBtn = filterBtn[0] || null;
  filterBtn.forEach((btn) => {
    btn.addEventListener('click', function () {
      const val = this.innerText.toLowerCase();
      if (selectValue) selectValue.innerText = this.innerText;
      filterFunc(val);
      if (lastClickedBtn) lastClickedBtn.classList.remove('active');
      this.classList.add('active');
      lastClickedBtn = this;
    });
  });
}

/* -----------------------------
 * contact form (exists)
 * --------------------------- */
const form       = document.querySelector('[data-form]');
const formInputs = document.querySelectorAll('[data-form-input]');
const formBtn    = document.querySelector('[data-form-btn]');

if (form && formBtn && formInputs.length) {
  formInputs.forEach((inp) => {
    inp.addEventListener('input', () => {
      if (form.checkValidity()) formBtn.removeAttribute('disabled');
      else formBtn.setAttribute('disabled', '');
    });
  });
}

/* -----------------------------
 * page navigation (always exists)
 * --------------------------- */
const navigationLinks = document.querySelectorAll('[data-nav-link]');
const pages           = document.querySelectorAll('[data-page]');

if (navigationLinks.length && pages.length) {
  navigationLinks.forEach((link, index) => {
    link.addEventListener('click', () => {
      navigationLinks.forEach((l) => l.classList.remove('active'));
      pages.forEach((p) => p.classList.remove('active'));
      link.classList.add('active');
      pages[index].classList.add('active');
      window.scrollTo(0, 0);
    });
  });
}
