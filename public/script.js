/** Theme Toggle Script */
const toggleBtn = document.getElementById('theme-toggle');

// 1. Check for saved theme preference, otherwise use system preference
const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
  document.documentElement.classList.add('dark-mode');
} else {
  document.documentElement.classList.remove('dark-mode');
}

// 2. Handle the click event
toggleBtn.addEventListener('click', () => {
  // Toggle the class
  document.documentElement.classList.toggle('dark-mode');

  // Save the preference to localStorage
  if (document.documentElement.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
});
/** Navigation Toggle Script */
let list = document.getElementById('nav-list');
let menuIcon = document.querySelector('.menu-icon');
let closeIcon = document.querySelector('.close-icon');
function toggleNavOpen() {
  list.style.display = 'block';
  menuIcon.style.display = 'none';
  closeIcon.style.display = 'block';
}
function toggleNavClose() {
  list.style.display = 'none';
  menuIcon.style.display = 'block';
  closeIcon.style.display = 'none';
}

const authForm = document.getElementById('auth-form');
const authTabs = document.querySelectorAll('.auth-tab');
const authTitle = document.getElementById('auth-title');
const authSubmit = document.getElementById('auth-submit');
const nameFields = document.querySelector('.name-fields');
const confirmPasswordField = document.querySelector('.confirm-password');
let authMode = 'login';

if (authForm) {
  authTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      authMode = tab.dataset.mode;
      authTabs.forEach(button => button.classList.toggle('active', button === tab));
      authTitle.textContent = authMode === 'login' ? 'Log In' : 'Create An Account';
      authSubmit.textContent = authMode === 'login' ? 'Log In' : 'Sign Up';
      nameFields.classList.toggle('hidden', authMode === 'login');
      confirmPasswordField.classList.toggle('hidden', authMode === 'login');
    });
  });

  authForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }

    if (authMode === 'signup') {
      const firstName = document.getElementById('first-name').value.trim();
      const lastName = document.getElementById('last-name').value.trim();
      const confirmPassword = document.getElementById('confirm-password').value.trim();

      if (!firstName || !lastName) {
        alert('Please enter your first and last name.');
        return;
      }

      if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
      }

      alert(`Account created successfully for ${firstName}!`);
    } else {
      alert(`Welcome back! You are now logged in as ${email}.`);
    }

    authForm.reset();
    if (authMode === 'signup') {
      nameFields.classList.add('hidden');
      confirmPasswordField.classList.add('hidden');
      authTabs.forEach(button => button.classList.toggle('active', button.dataset.mode === 'login'));
      authMode = 'login';
      authTitle.textContent = 'Log In';
      authSubmit.textContent = 'Log In';
    }
  });
}