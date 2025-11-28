// ==========================================
// PORTFOLIO REVIEWER - MAIN JAVASCRIPT
// ==========================================

// SCORING ALGORITHM
function calculateScore(data) {
  let score = 0;

  // 1. Projects Quality (20 points max)
  if (data.projects >= 7) score += 20;
  else if (data.projects >= 5) score += 17;
  else if (data.projects >= 3) score += 14;
  else if (data.projects >= 1) score += 10;
  else score += 0;

  // 2. Tech Stack Variety (20 points max)
  const techCount = data.techStackArray.length;
  if (techCount >= 7) score += 20;
  else if (techCount >= 5) score += 17;
  else if (techCount === 4) score += 14;
  else if (techCount >= 2) score += 10;
  else if (techCount === 1) score += 5;
  else score += 0;

  // 3. Responsive Design (15 points max)
  if (data.responsive === "yes") score += 15;

  // 4. Live Demos (15 points max)
  if (data.liveDemos === "yes") score += 15;

  // 5. Documentation (15 points max)
  if (data.docs === "good") score += 15;
  else if (data.docs === "partial") score += 8;
  else score += 0;

  // 6. Design & Polish (15 points max)
  score += parseInt(data.designRating) * 3; // 1-5 → 3-15

  return Math.min(score, 100); // Cap at 100
}

// GENERATE SUGGESTIONS
function generateSuggestions(data) {
  const suggestions = [];

  // Projects suggestions
  if (data.projects < 3) {
    suggestions.push("Add 2-3 more completed projects to strengthen your portfolio.");
  }
  if (data.projects < 5) {
    suggestions.push("Aim for at least 5-7 quality projects for competitive advantage.");
  }

  // Tech stack suggestions
  if (data.techCount < 3) {
    suggestions.push("Expand your tech stack - demonstrate skills in at least 3-4 different technologies.");
  }
  if (data.techCount < 5) {
    suggestions.push("Learn and showcase more technologies (frontend, backend, databases, etc.).");
  }

  // Responsive suggestions
  if (data.responsive === "no") {
    suggestions.push("Make your portfolio mobile-responsive using CSS media queries or Flexbox.");
  }

  // Live demos suggestions
  if (data.liveDemos === "no") {
    suggestions.push("Add live demo links to your projects - deploy them on Vercel, Netlify, or GitHub Pages.");
  }

  // Documentation suggestions
  if (data.docs !== "good") {
    suggestions.push("Write comprehensive README files with setup instructions and project descriptions.");
  }
  if (data.docs === "none") {
    suggestions.push("Add comments to your code explaining complex logic.");
  }

  // Design suggestions
  if (data.designRating <= 2) {
    suggestions.push("Improve UI/UX design - use better colors, typography, and spacing.");
  }
  if (data.designRating <= 3) {
    suggestions.push("Polish your design with animations and smooth transitions.");
  }

  return suggestions.length > 0 ? suggestions : ["Great portfolio! Continue improving and learning new technologies."];
}

// CALCULATE BREAKDOWN
function calculateBreakdown(data) {
  const breakdown = {};

  // Projects
  if (data.projects >= 7) breakdown.projects = 20;
  else if (data.projects >= 5) breakdown.projects = 17;
  else if (data.projects >= 3) breakdown.projects = 14;
  else if (data.projects >= 1) breakdown.projects = 10;
  else breakdown.projects = 0;

  // Tech Stack
  if (data.techCount >= 7) breakdown.stack = 20;
  else if (data.techCount >= 5) breakdown.stack = 17;
  else if (data.techCount === 4) breakdown.stack = 14;
  else if (data.techCount >= 2) breakdown.stack = 10;
  else if (data.techCount === 1) breakdown.stack = 5;
  else breakdown.stack = 0;

  // Responsive
  breakdown.responsive = data.responsive === "yes" ? 15 : 0;

  // Demos
  breakdown.demos = data.liveDemos === "yes" ? 15 : 0;

  // Docs
  if (data.docs === "good") breakdown.docs = 15;
  else if (data.docs === "partial") breakdown.docs = 8;
  else breakdown.docs = 0;

  // Design
  breakdown.design = parseInt(data.designRating) * 3;

  return breakdown;
}

// LOGIN HANDLER (for login.html)
document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('loginForm')) {
    const VALID_ID = "aditya@aktu";
    const VALID_PASS = "12345";

    document.getElementById('loginForm').addEventListener('submit', function(e) {
      e.preventDefault();

      const inputId = document.getElementById('userid').value.trim();
      const inputPass = document.getElementById('userpass').value;
      const errorMsg = document.getElementById('errorMsg');

      if (inputId === VALID_ID && inputPass === VALID_PASS) {
        // Success
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', inputId);
        localStorage.setItem('loginTime', new Date().toLocaleString());
        errorMsg.textContent = '';
        window.location.href = 'home.html';
      } else {
        // Error
        errorMsg.textContent = '❌ Invalid ID or Password. Try: aditya@aktu / 12345';
        errorMsg.style.color = '#DC2626';
      }
    });
  }
});

// Export functions for use in other files
window.calculateScore = calculateScore;
window.generateSuggestions = generateSuggestions;
window.calculateBreakdown = calculateBreakdown;
