// ─────────────────────────────────────────────
// UnfilteredHR — Main JS
// ─────────────────────────────────────────────

// Category pill selection (single select within a group)
function selectPill(el) {
  const group = el.closest('.pill-group');
  group.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
  el.classList.add('active');
}

// Filter tab switching
function switchTab(el) {
  const group = el.closest('.filter-tabs');
  group.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
}

// Domain nav selection (community page)
function selectDomain(el) {
  document.querySelectorAll('.domain-nav-item').forEach(d => d.classList.remove('active'));
  el.classList.add('active');
}

// Anon toggle
function toggleAnon(wrapper) {
  const sw = wrapper.querySelector('.toggle-switch');
  const label = wrapper.querySelector('#anon-label');
  sw.classList.toggle('on');
  if (sw.classList.contains('on')) {
    label.textContent = 'Post anonymously';
  } else {
    label.textContent = 'Post as yourself';
  }
}

// Newsletter form intercept (prevent real submit for now)
document.querySelectorAll('.newsletter-bar__form').forEach(form => {
  const btn = form.querySelector('.btn--nl');
  const input = form.querySelector('input');
  if (btn && input) {
    btn.addEventListener('click', () => {
      if (input.value.includes('@')) {
        btn.textContent = '✓ You\'re in!';
        input.value = '';
        btn.style.opacity = '0.7';
        btn.style.pointerEvents = 'none';
      }
    });
  }
});

// Subtle scroll fade-in for elements below fold
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.domain-card, .playbook-card, .story-row, .thread-row').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(12px)';
  el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
  observer.observe(el);
});
