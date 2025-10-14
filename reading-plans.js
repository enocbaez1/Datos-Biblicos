// === READING PLANS SYSTEM ===

let allReadingPlans = [];
let currentPlanData = null;

// Load all reading plans from JSON
async function loadReadingPlans() {
  try {
    const response = await fetch('./data/reading-plans.json');
    const data = await response.json();
    allReadingPlans = data.plans;
    renderPlansGrid();
    return true;
  } catch (error) {
    console.error('Error loading reading plans:', error);
    return false;
  }
}

// Render plans grid in the showcase section
function renderPlansGrid() {
  const plansGrid = document.getElementById('plansGrid');
  if (!plansGrid || allReadingPlans.length === 0) return;

  plansGrid.innerHTML = '';

  allReadingPlans.forEach(plan => {
    const planCard = document.createElement('div');
    planCard.className = 'plan-card';
    planCard.innerHTML = `
      <span class="plan-category-badge">${plan.category}</span>
      <div class="plan-card-header">
        <span class="plan-icon">${plan.icon}</span>
        <div class="plan-title">
          <h4>${plan.title}</h4>
          <div class="plan-meta">
            <span>⏱️ ${plan.duration}</span>
          </div>
        </div>
      </div>
      <p class="plan-description">${plan.description}</p>
      <div class="plan-action">
        <button class="plan-start-btn" data-plan-id="${plan.id}">Comenzar</button>
        <span class="plan-status"></span>
      </div>
    `;

    // Add click event to start button
    const startBtn = planCard.querySelector('.plan-start-btn');
    startBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openPlanModal(plan.id);
    });

    // Add click event to entire card
    planCard.addEventListener('click', () => {
      openPlanModal(plan.id);
    });

    plansGrid.appendChild(planCard);
  });
}

// Open plan modal with specific plan
function openPlanModal(planId) {
  const plan = allReadingPlans.find(p => p.id === planId);
  if (!plan) return;

  currentPlanData = plan;

  // Update modal header
  const modalTitle = document.getElementById('planModalTitle');
  const modalMeta = document.getElementById('planModalMeta');
  const iconLarge = document.getElementById('planIconLarge');

  if (modalTitle) modalTitle.textContent = plan.title;
  if (modalMeta) modalMeta.textContent = `${plan.duration} • ${plan.category}`;
  if (iconLarge) iconLarge.textContent = plan.icon;

  // Render plan content
  renderPlanContent(plan);

  // Show modal
  const modal = document.getElementById('readingPlanModal');
  if (modal) {
    modal.style.display = 'block';
  }
}

// Render plan content based on structure
function renderPlanContent(plan) {
  const contentContainer = document.getElementById('readingPlanContent');
  const progressContainer = document.getElementById('planProgressInfo');

  if (!contentContainer) return;

  contentContainer.innerHTML = '';

  // Check if plan has daily structure
  if (plan.days && Array.isArray(plan.days)) {
    // Render daily plan
    plan.days.forEach(day => {
      const dayCard = createDayCard(day, plan.id);
      contentContainer.appendChild(dayCard);
    });

    // Update progress
    if (progressContainer) {
      const completed = plan.days.filter(d => d.completed).length;
      const total = plan.days.length;
      const percentage = Math.round((completed / total) * 100);

      progressContainer.innerHTML = `
        <div class="progress-bar-container">
          <div class="progress-bar-fill" style="width: ${percentage}%"></div>
        </div>
        <span class="progress-text">${completed}/${total} días (${percentage}%)</span>
      `;
    }
  } else {
    // Render overview plan
    renderPlanOverview(plan, contentContainer);

    // Hide progress for overview plans
    if (progressContainer) {
      progressContainer.innerHTML = '';
    }
  }
}

// Create day card for daily plans
function createDayCard(day, planId) {
  const dayCard = document.createElement('div');
  dayCard.className = `plan-day-card ${day.completed ? 'completed' : ''}`;

  let dayContent = `
    <div class="plan-day-header">
      <span class="plan-day-number">Día ${day.day}</span>
    </div>
    <h4 class="plan-day-title">${day.title}</h4>
  `;

  if (day.reading) {
    dayContent += `<div class="plan-day-reading">📖 ${day.reading}</div>`;
  }

  if (day.summary) {
    dayContent += `<p class="plan-day-summary">${day.summary}</p>`;
  }

  if (day.keyVerse) {
    dayContent += `<div class="plan-day-verse">${day.keyVerse}</div>`;
  }

  if (day.reflection) {
    dayContent += `<div class="plan-day-reflection">💭 ${day.reflection}</div>`;
  }

  dayContent += `
    <div class="plan-day-action">
      <button class="mark-complete-btn ${day.completed ? 'completed' : ''}"
              data-plan-id="${planId}"
              data-day="${day.day}">
        ${day.completed ? '✓ Completado' : 'Marcar como completado'}
      </button>
    </div>
  `;

  dayCard.innerHTML = dayContent;

  // Add event listener to mark complete button
  const completeBtn = dayCard.querySelector('.mark-complete-btn');
  if (completeBtn && !day.completed) {
    completeBtn.addEventListener('click', () => {
      markDayComplete(planId, day.day);
    });
  }

  return dayCard;
}

// Render overview for plans without daily structure
function renderPlanOverview(plan, container) {
  const overviewCard = document.createElement('div');
  overviewCard.className = 'plan-overview-card';

  let content = `<h4>${plan.description}</h4>`;

  if (plan.structure) {
    content += `<p><strong>Estructura:</strong> ${plan.structure}</p>`;
  }

  if (plan.note) {
    content += `<p><strong>Nota:</strong> ${plan.note}</p>`;
  }

  if (plan.overview) {
    content += `<p>${plan.overview}</p>`;
  }

  // Render specific sections based on plan type
  if (plan.milestones) {
    content += `<h4 style="margin-top: 2rem;">Hitos del Plan</h4><ul>`;
    plan.milestones.forEach(milestone => {
      content += `<li>${milestone}</li>`;
    });
    content += `</ul>`;
  }

  if (plan.themes) {
    content += `<h4 style="margin-top: 2rem;">Temas Principales</h4><ul>`;
    plan.themes.forEach(theme => {
      content += `<li>${theme}</li>`;
    });
    content += `</ul>`;
  }

  if (plan.benefits) {
    content += `<h4 style="margin-top: 2rem;">Beneficios</h4><ul>`;
    plan.benefits.forEach(benefit => {
      content += `<li>${benefit}</li>`;
    });
    content += `</ul>`;
  }

  if (plan.books) {
    content += `<h4 style="margin-top: 2rem;">Libros Incluidos</h4><ul>`;
    plan.books.forEach(book => {
      content += `<li><strong>${book.name}</strong> - ${book.chapters} capítulos en ${book.days} días</li>`;
    });
    content += `</ul>`;
  }

  if (plan.weeks) {
    content += `<h4 style="margin-top: 2rem;">Estructura Semanal</h4>`;
    plan.weeks.forEach(week => {
      content += `
        <div style="margin-bottom: 1.5rem; padding: 15px; background: rgba(102, 126, 234, 0.05); border-radius: 10px;">
          <strong>Semana ${week.week}: ${week.topic}</strong><br>
          <span style="color: #667eea;">${week.focus}</span>
        </div>
      `;
    });
  }

  overviewCard.innerHTML = content;
  container.appendChild(overviewCard);
}

// Mark day as complete
function markDayComplete(planId, dayNumber) {
  const plan = allReadingPlans.find(p => p.id === planId);
  if (!plan || !plan.days) return;

  const day = plan.days.find(d => d.day === dayNumber);
  if (day) {
    day.completed = true;

    // Save to localStorage
    saveReadingProgress();

    // Re-render the plan content
    renderPlanContent(plan);
  }
}

// Save reading progress to localStorage
function saveReadingProgress() {
  try {
    const progress = {};
    allReadingPlans.forEach(plan => {
      if (plan.days) {
        progress[plan.id] = plan.days.map(d => ({
          day: d.day,
          completed: d.completed || false
        }));
      }
    });
    localStorage.setItem('readingPlansProgress', JSON.stringify(progress));
  } catch (error) {
    console.error('Error saving reading progress:', error);
  }
}

// Load reading progress from localStorage
function loadReadingProgress() {
  try {
    const saved = localStorage.getItem('readingPlansProgress');
    if (saved) {
      const progress = JSON.parse(saved);
      allReadingPlans.forEach(plan => {
        if (plan.days && progress[plan.id]) {
          plan.days.forEach(day => {
            const savedDay = progress[plan.id].find(d => d.day === day.day);
            if (savedDay) {
              day.completed = savedDay.completed;
            }
          });
        }
      });
    }
  } catch (error) {
    console.error('Error loading reading progress:', error);
  }
}

// Initialize reading plans system
async function initReadingPlansSystem() {
  await loadReadingPlans();
  loadReadingProgress();

  // Connect the original "Plan de 7 Días" button to open the principiantes plan
  const startReadingPlanBtn = document.getElementById('startReadingPlan');
  if (startReadingPlanBtn) {
    startReadingPlanBtn.addEventListener('click', () => {
      openPlanModal('principiantes-7');
    });
  }

  // Update close button handler
  const closeBtn = document.getElementById('closeReadingPlan');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      const modal = document.getElementById('readingPlanModal');
      if (modal) modal.style.display = 'none';
    });
  }

  // Close modal when clicking outside
  const modal = document.getElementById('readingPlanModal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  initReadingPlansSystem();
});
