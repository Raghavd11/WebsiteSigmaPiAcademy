
document.addEventListener('DOMContentLoaded', function () {
  const allLinks = document.querySelectorAll('.dropdown-content a, #mobileMenu a');
  const homePageLink = document.querySelector('a[href="index.html"]');

  // Function to clear all active states
  function clearActiveStates() {
    allLinks.forEach(item => {
      item.classList.remove('active');
      item.closest('.dropdown')?.classList.remove('active');
    });
  }

  // Function to set active state
  function setActiveState(link) {
    link.classList.add('active');
    link.closest('.dropdown')?.classList.add('active');
    sessionStorage.setItem('activeDropdownLink', link.getAttribute('href'));
    clearActiveStates();
  }

  // Function to activate based on stored path (used for sub-pages like explore now)
  function restoreActiveStateFromSession() {
  const storedPath = sessionStorage.getItem('activeDropdownLink');
  if (storedPath) {
    const matchedLinks = document.querySelectorAll(`a[href="${storedPath}"]`);
    matchedLinks.forEach(link => {
      link.classList.add('active');
      link.closest('.dropdown')?.classList.add('active');
    });
  }
}

function checkPageState() {
  const currentURL = window.location.href;
  const fileName = window.location.pathname.split('/').pop();

  if (fileName === '' || fileName === 'index.html') {
    clearActiveStates();
    sessionStorage.removeItem('activeDropdownLink');
    return;
  }

  // Match exact page first
  let matchedLinks = Array.from(allLinks).filter(link => {
    const linkFile = new URL(link.href).pathname.split('/').pop();
    return linkFile === fileName;
  });

  // If no exact match found, try to match parent (e.g., coma.html for coma-explore.html)
  if (matchedLinks.length === 0 && fileName.includes('-')) {
    const baseFileName = fileName.split('-')[0] + '.html'; // coma-explore.html → coma.html
    matchedLinks = Array.from(allLinks).filter(link => {
      const linkFile = new URL(link.href).pathname.split('/').pop();
      return linkFile === baseFileName;
    });
  }
  if (matchedLinks.length > 0) {
    matchedLinks.forEach(link => {
      link.classList.add('active');
      link.closest('.dropdown')?.classList.add('active');
    });
    sessionStorage.setItem('activeDropdownLink', matchedLinks[0].getAttribute('href'));
  } else {
    const storedPath = sessionStorage.getItem('activeDropdownLink');
    if (storedPath) {
      const matchingStoredLinks = document.querySelectorAll(`a[href="${storedPath}"]`);
      matchingStoredLinks.forEach(link => {
        link.classList.add('active');
        link.closest('.dropdown')?.classList.add('active');
      });
    }
  }
}

  // Set up click handlers
  allLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      clearActiveStates();
      setActiveState(this);
    });
  });

  // Home page link handler
  if (homePageLink) {
    homePageLink.addEventListener('click', function () {
      sessionStorage.removeItem('activeDropdownLink');
    });
  }

  checkPageState();
});


// Toggle contact dropdown
function toggleContact() {
  const container = document.querySelector('.contact-container');
  container.classList.toggle('active');
}

function copyToClipboard(text, buttonElement) {
  navigator.clipboard.writeText(text)
    .then(() => {
      const icon = buttonElement.querySelector('i');
      const originalColor = icon.style.color;
      
      icon.style.color = 'blue'; // Change icon color to blue

      setTimeout(() => {
        icon.style.color = originalColor; // Revert after 3 seconds
      }, 3000);
    })
    .catch(err => {
      console.error('Failed to copy: ', err);
    });
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
  const contactContainer = document.querySelector('.contact-container');
  if (!contactContainer.contains(event.target)) {
    contactContainer.classList.remove('active');
  }
});

// Open Modal Function
function openModal() {
    document.getElementById("registerForm").style.display = "flex";
}

// Close Modal Function
function closeModal() {
    document.getElementById("registerForm").style.display = "none";
}
// Close Modal When Clicking Outside the Content
window.onclick = function(event) {
  var modal = document.getElementById("registerForm");
  if (event.target === modal) {
    modal.style.display = "none";
  }
}
// Toggle mobile menu on hamburger click
document.querySelector('.hamburger').addEventListener('click', function () {
  document.getElementById('mobileMenu').classList.toggle('show');
});

// Expand/collapse submenu items
document.querySelectorAll('.mobile-menu-title').forEach(title => {
  title.addEventListener('click', function () {
    const parent = this.closest('.mobile-menu-item');

    // Collapse others
    document.querySelectorAll('.mobile-menu-item').forEach(item => {
      if (item !== parent) {
        item.classList.remove('expanded');
      }
    });

    // Toggle current
    parent.classList.toggle('expanded');
  });
});

document.addEventListener('click', function(event) {
    const mobileMenu = document.getElementById('mobileMenu');
    const hamburger = document.querySelector('.hamburger');

    const isClickInsideMenu = mobileMenu.contains(event.target);
    const isClickOnHamburger = hamburger.contains(event.target);

    // If menu is open, and the click is outside both the menu and the hamburger, close it
    if (mobileMenu.classList.contains('show') && !isClickInsideMenu && !isClickOnHamburger) {
      mobileMenu.classList.remove('show');
    }
  });