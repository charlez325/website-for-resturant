const filterButtons = document.querySelectorAll('.filter-button');
const menuItems = document.querySelectorAll('.menu-item');
const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const reservationForm = document.querySelector('#reservation-form');
const reservationDate = reservationForm.elements.date;
const formStatus = document.querySelector('#form-status');

const today = new Date();
const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
  .toISOString()
  .slice(0, 10);
reservationDate.min = localToday;

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const category = button.dataset.filter;
    filterButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle('is-active', isActive);
      item.setAttribute('aria-pressed', String(isActive));
    });
    menuItems.forEach((item) => {
      item.hidden = category !== 'all' && item.dataset.category !== category;
    });
  });
});

menuToggle.addEventListener('click', () => {
  const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isExpanded));
  menuToggle.setAttribute('aria-label', isExpanded ? 'Open navigation' : 'Close navigation');
  siteNav.classList.toggle('is-open', !isExpanded);
});

siteNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
    siteNav.classList.remove('is-open');
  });
});

reservationForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const guestCount = reservationForm.elements.guests.value;
  const date = new Date(`${reservationDate.value}T12:00:00`);
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(date);
  formStatus.textContent = `Thanks, ${reservationForm.elements.name.value.trim()}! Your request for ${guestCount} ${guestCount === '1' ? 'guest' : 'guests'} on ${formattedDate} is ready. This demo does not send bookings yet; please call (718) 555-0184 to confirm.`;
});
