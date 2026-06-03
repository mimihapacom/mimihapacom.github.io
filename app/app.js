<script>
// PWA Installation Prompt
let deferredPrompt;
const installPrompt = document.createElement('div');

// Create and style the install prompt like Threads
installPrompt.innerHTML = `
  <div class='install-prompt'>
    <div class='install-content'>
      <div class='app-info'>
        <div class='app-icon-container'>
          <img alt='mimihapa' class='app-icon' src='app/icon.png'/>
        </div>
        <div class='app-details'>
          <div class='app-name'>MimiHapa MEDICINE</div>
          <div class='app-website'>mimihapaa.com</div>
        </div>
      </div>
      <div class='install-actions'>
        <button class='close-btn'>\u00D7</button>
        <button class='install-btn'>Install App</button>
      </div>
    </div>
  </div>
`;

// Add styles for the install prompt
const style = document.createElement('style');
style.textContent = `
  .install-prompt {
    position: fixed;
    top: -100px;
    left: 10px;
    right: 10px;
    background: white;
    color: black;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
    z-index: 10000;
    transition: top 0.4s ease-out;
    border: 1px solid #e0e0e0;
    max-width: 400px;
    margin: 0 auto;
  }
  
  .install-prompt.show {
    top: 20px;
  }
  
  .install-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    gap: 12px;
  }
  
  .app-info {
    display: flex;
    align-items: center;
    gap: 12px;
    flex: 1;
  }
  
  .app-icon {
    width: 44px;
    height: 44px;
    border-radius: 10px;
  }
  
  .app-details {
    display: flex;
    flex-direction: column;
  }
  
  .app-name {
    font-weight: 600;
    font-size: 16px;
    margin-bottom: 2px;
  }
  
  .app-website {
    font-size: 14px;
    color: #666;
  }
  
  .install-actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .close-btn {
    background: transparent;
    border: none;
    color: #666;
    font-size: 20px;
    cursor: pointer;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }
  
  .close-btn:hover {
    background: #f5f5f5;
  }
  
  .install-btn {
    background: #104bed;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    font-size: 14px;
    min-width: 80px;
  }
  
  .install-btn:hover {
    background: #333;
  }
`;

// Add elements to DOM
document.head.appendChild(style);
document.body.appendChild(installPrompt);

const promptElement = installPrompt.querySelector('.install-prompt');
const closeBtn = installPrompt.querySelector('.close-btn');
const installBtn = installPrompt.querySelector('.install-btn');

// Show install prompt
function showInstallPrompt() {
  setTimeout(() => {
    promptElement.classList.add('show');
  }, 2000); // Show after 2 seconds
}

// Hide install prompt
function hideInstallPrompt() {
  promptElement.classList.remove('show');
}

// Event listeners
closeBtn.addEventListener('click', hideInstallPrompt);

installBtn.addEventListener('click', async () => {
  hideInstallPrompt();
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
    deferredPrompt = null;
  }
});

// Listen for beforeinstallprompt event
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  showInstallPrompt();
});

// Listen for app installed event
window.addEventListener('appinstalled', () => {
  console.log('MimiHapa MEDICINE was installed successfully!');
  deferredPrompt = null;
});

// Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('app/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}
</script>