// Application State Management
class AppState {
  constructor() {
    this.currentUser = null;
    this.users = this.initializeUsers();
    this.summaryHistory = [];
    this.isHistoryVisible = false;
  }

  initializeUsers() {
    // Pre-defined demo users
    return [
      { id: 1, name: 'Demo User', email: 'demo@example.com', password: 'demo123' },
      { id: 2, name: 'Test User', email: 'test@example.com', password: 'test123' }
    ];
  }

  login(email, password) {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      this.currentUser = { ...user };
      delete this.currentUser.password; // Don't store password in current user
      return true;
    }
    return false;
  }

  signup(name, email, password) {
    // Check if email already exists
    if (this.users.some(u => u.email === email)) {
      return { success: false, error: 'Email already registered' };
    }

    // Create new user
    const newUser = {
      id: this.users.length + 1,
      name: name,
      email: email,
      password: password
    };

    this.users.push(newUser);
    this.currentUser = { id: newUser.id, name: newUser.name, email: newUser.email };
    return { success: true };
  }

  logout() {
    this.currentUser = null;
    this.summaryHistory = [];
    this.isHistoryVisible = false;
  }

  addToHistory(inputText, summary) {
    const historyItem = {
      id: Date.now(),
      timestamp: new Date().toLocaleString(),
      inputText: inputText,
      summary: summary,
      inputWordCount: textSummarizer.countWords(inputText),
      summaryWordCount: textSummarizer.countWords(summary)
    };

    this.summaryHistory.unshift(historyItem);

    // Keep only the last 50 items
    if (this.summaryHistory.length > 50) {
      this.summaryHistory.pop();
    }
  }

  removeFromHistory(id) {
    this.summaryHistory = this.summaryHistory.filter(item => item.id !== id);
  }

  toggleHistory() {
    this.isHistoryVisible = !this.isHistoryVisible;
  }
}

// Initialize app state
const appState = new AppState();

// Page Navigation
class PageManager {
  static showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
      page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
  }

  static showLogin() {
    this.showPage('loginPage');
  }

  static showSignup() {
    this.showPage('signupPage');
  }

  static showApp() {
    if (!appState.currentUser) {
      this.showLogin();
      return;
    }
    this.showPage('appPage');
    document.getElementById('userName').textContent = appState.currentUser.name;
    updateHistoryDisplay();
  }
}

// Toast Notifications
function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  const icon = type === 'success' 
    ? '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"></path></svg>'
    : '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>';
  
  toast.innerHTML = `
    ${icon}
    <span class="toast-message">${message}</span>
  `;
  
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'slideIn 0.3s ease-out reverse';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Show/Hide Loading Overlay
function showLoading() {
  document.getElementById('loadingOverlay').classList.remove('hidden');
}

function hideLoading() {
  document.getElementById('loadingOverlay').classList.add('hidden');
}

// Error Display
function showError(elementId, message) {
  const errorElement = document.getElementById(elementId);
  errorElement.textContent = message;
  errorElement.classList.add('active');
}

function hideError(elementId) {
  const errorElement = document.getElementById(elementId);
  errorElement.classList.remove('active');
}

// Authentication Handlers
document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();
  hideError('loginError');
  
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  
  if (appState.login(email, password)) {
    showToast('Successfully logged in!', 'success');
    PageManager.showApp();
    // Clear form
    e.target.reset();
  } else {
    showError('loginError', 'Invalid email or password');
  }
});

document.getElementById('signupForm').addEventListener('submit', (e) => {
  e.preventDefault();
  hideError('signupError');
  
  const name = document.getElementById('signupName').value;
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;
  const confirmPassword = document.getElementById('signupConfirmPassword').value;
  
  // Validation
  if (password !== confirmPassword) {
    showError('signupError', 'Passwords do not match');
    return;
  }
  
  if (password.length < 6) {
    showError('signupError', 'Password must be at least 6 characters long');
    return;
  }
  
  const result = appState.signup(name, email, password);
  
  if (result.success) {
    showToast('Account created successfully!', 'success');
    PageManager.showApp();
    // Clear form
    e.target.reset();
  } else {
    showError('signupError', result.error);
  }
});

// Navigation between login and signup
document.getElementById('goToSignup').addEventListener('click', (e) => {
  e.preventDefault();
  hideError('loginError');
  PageManager.showSignup();
});

document.getElementById('goToLogin').addEventListener('click', (e) => {
  e.preventDefault();
  hideError('signupError');
  PageManager.showLogin();
});

// Logout
document.getElementById('logoutBtn').addEventListener('click', () => {
  appState.logout();
  clearInputOutput();
  showToast('Logged out successfully', 'success');
  PageManager.showLogin();
});

// Text Input Handlers
const inputText = document.getElementById('inputText');
const charCount = document.getElementById('charCount');
const wordCount = document.getElementById('wordCount');

inputText.addEventListener('input', () => {
  const text = inputText.value;
  const chars = text.length;
  const words = text.trim().split(/\s+/).filter(w => w.length > 0).length;
  
  charCount.textContent = `${chars} characters`;
  wordCount.textContent = `${words} words`;
});

// Summarize Button
document.getElementById('summarizeBtn').addEventListener('click', async () => {
  const text = inputText.value.trim();
  
  if (!text) {
    showToast('Please enter some text to summarize', 'error');
    return;
  }
  
  showLoading();
  
  // Simulate processing time for better UX
  setTimeout(() => {
    try {
      const summary = textSummarizer.summarize(text);
      displaySummary(summary);
      
      // Add to history
      appState.addToHistory(text, summary);
      updateHistoryDisplay();
      
      showToast('Summary generated successfully!', 'success');
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      hideLoading();
    }
  }, 1000);
});

// Display Summary
function displaySummary(summary) {
  const summaryOutput = document.getElementById('summaryOutput');
  const summaryWordCount = document.getElementById('summaryWordCount');
  
  const words = textSummarizer.countWords(summary);
  
  summaryOutput.innerHTML = `<p>${summary}</p>`;
  summaryWordCount.textContent = `${words} words`;
  
  // Enable action buttons
  document.getElementById('copySummaryBtn').disabled = false;
  document.getElementById('clearOutputBtn').disabled = false;
}

// Clear Buttons
document.getElementById('clearInputBtn').addEventListener('click', () => {
  inputText.value = '';
  charCount.textContent = '0 characters';
  wordCount.textContent = '0 words';
});

document.getElementById('clearOutputBtn').addEventListener('click', () => {
  clearOutput();
});

function clearOutput() {
  const summaryOutput = document.getElementById('summaryOutput');
  summaryOutput.innerHTML = `
    <div class="placeholder-message">
      <svg class="placeholder-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
      </svg>
      <p>Your summary will appear here</p>
    </div>
  `;
  document.getElementById('summaryWordCount').textContent = '0 words';
  document.getElementById('copySummaryBtn').disabled = true;
  document.getElementById('clearOutputBtn').disabled = true;
}

function clearInputOutput() {
  inputText.value = '';
  charCount.textContent = '0 characters';
  wordCount.textContent = '0 words';
  clearOutput();
}

// Copy Summary
document.getElementById('copySummaryBtn').addEventListener('click', () => {
  const summaryOutput = document.getElementById('summaryOutput');
  const text = summaryOutput.textContent.trim();
  
  navigator.clipboard.writeText(text).then(() => {
    showToast('Summary copied to clipboard!', 'success');
  }).catch(() => {
    showToast('Failed to copy summary', 'error');
  });
});

// History Toggle
document.getElementById('toggleHistoryBtn').addEventListener('click', () => {
  appState.toggleHistory();
  const container = document.getElementById('historyContainer');
  const button = document.getElementById('toggleHistoryBtn');
  
  if (appState.isHistoryVisible) {
    container.classList.remove('hidden');
    button.textContent = 'Hide History';
  } else {
    container.classList.add('hidden');
    button.textContent = 'Show History';
  }
});

// Update History Display
function updateHistoryDisplay() {
  const historyList = document.getElementById('historyList');
  
  if (appState.summaryHistory.length === 0) {
    historyList.innerHTML = `
      <div class="empty-history">
        <p>No summarization history yet. Start by summarizing your first text!</p>
      </div>
    `;
    return;
  }
  
  historyList.innerHTML = appState.summaryHistory.map(item => `
    <div class="history-item" data-id="${item.id}">
      <div class="history-item-header">
        <span class="history-timestamp">${item.timestamp}</span>
        <div class="history-actions">
          <button class="btn btn--outline btn--sm" onclick="reuseHistoryItem(${item.id})" title="Reuse this text">Reuse</button>
          <button class="btn btn--outline btn--sm" onclick="deleteHistoryItem(${item.id})" title="Delete this item">Delete</button>
        </div>
      </div>
      <div class="history-content">
        <div>
          <div class="history-label">Original Text (${item.inputWordCount} words)</div>
          <div class="history-text history-preview">${escapeHtml(item.inputText)}</div>
        </div>
        <div>
          <div class="history-label">Summary (${item.summaryWordCount} words)</div>
          <div class="history-text">${escapeHtml(item.summary)}</div>
        </div>
      </div>
    </div>
  `).join('');
}

// Reuse History Item
function reuseHistoryItem(id) {
  const item = appState.summaryHistory.find(h => h.id === id);
  if (item) {
    inputText.value = item.inputText;
    inputText.dispatchEvent(new Event('input'));
    displaySummary(item.summary);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('History item loaded', 'success');
  }
}

// Delete History Item
function deleteHistoryItem(id) {
  appState.removeFromHistory(id);
  updateHistoryDisplay();
  showToast('History item deleted', 'success');
}

// HTML Escape Function
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Initialize App
window.addEventListener('DOMContentLoaded', () => {
  // Start at login page
  PageManager.showLogin();
});