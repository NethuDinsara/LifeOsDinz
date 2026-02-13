/* ===================================
   LIFEOS LITE - MAIN APPLICATION
   Personal Milestone Tracker Dashboard
   =================================== */

// ===================================
// DATA STRUCTURE & INITIALIZATION
// ===================================

// Default data structure
const defaultData = {
    phases: [
        {
            id: 'foundation',
            name: 'Foundation',
            startDate: 'Feb 2026',
            endDate: 'Sep 2026',
            focus: 'Thesis',
            status: 'in-progress'
        },
        {
            id: 'thesis-dominance',
            name: 'Thesis Dominance',
            startDate: 'Sep 2026',
            endDate: 'Apr 2027',
            focus: 'Thesis',
            status: 'not-started'
        },
        {
            id: 'career-acceleration',
            name: 'Career Acceleration',
            startDate: 'May 2027',
            endDate: 'Ongoing',
            focus: 'Work / Cloud',
            status: 'not-started'
        }
    ],
    pillars: [
        {
            id: 'cloud-foundations',
            name: 'Cloud Foundations',
            milestones: [
                { id: 'cf1', label: 'Complete AWS Solutions Architect certification', completed: false },
                { id: 'cf2', label: 'Build 3 production-grade cloud projects', completed: false },
                { id: 'cf3', label: 'Master Infrastructure as Code (Terraform/CloudFormation)', completed: false },
                { id: 'cf4', label: 'Implement CI/CD pipelines', completed: false },
                { id: 'cf5', label: 'Deploy multi-region architecture', completed: false }
            ]
        },
        {
            id: 'governance-security',
            name: 'Governance & Security',
            milestones: [
                { id: 'gs1', label: 'Implement cloud security best practices', completed: false },
                { id: 'gs2', label: 'Set up compliance frameworks (SOC2, ISO)', completed: false },
                { id: 'gs3', label: 'Design identity and access management system', completed: false },
                { id: 'gs4', label: 'Create disaster recovery plans', completed: false },
                { id: 'gs5', label: 'Establish cost optimization strategies', completed: false },
                { id: 'gs6', label: 'Build security monitoring and alerting', completed: false }
            ]
        },
        {
            id: 'ml-systems',
            name: 'ML Systems',
            milestones: [
                { id: 'ml1', label: 'Complete thesis research and implementation', completed: false },
                { id: 'ml2', label: 'Build end-to-end ML pipeline', completed: false },
                { id: 'ml3', label: 'Deploy ML models in production', completed: false },
                { id: 'ml4', label: 'Implement MLOps practices', completed: false },
                { id: 'ml5', label: 'Publish research paper or technical blog', completed: false },
                { id: 'ml6', label: 'Create ML model monitoring system', completed: false }
            ]
        },
        {
            id: 'architecture-thinking',
            name: 'Architecture Thinking',
            milestones: [
                { id: 'at1', label: 'Design scalable system architectures', completed: false },
                { id: 'at2', label: 'Master microservices patterns', completed: false },
                { id: 'at3', label: 'Implement event-driven architectures', completed: false },
                { id: 'at4', label: 'Create architecture decision records (ADRs)', completed: false },
                { id: 'at5', label: 'Lead architecture review sessions', completed: false },
                { id: 'at6', label: 'Document system design patterns', completed: false },
                { id: 'at7', label: 'Build proof-of-concept architectures', completed: false }
            ]
        }
    ],
    weeks: [],
    settings: {
        theme: 'blue'
    }
};

// Application state
let appData = { ...defaultData };

// ===================================
// STORAGE MANAGEMENT
// ===================================

/**
 * Save data to localStorage
 */
function saveData() {
    try {
        localStorage.setItem('lifeosData', JSON.stringify(appData));
    } catch (error) {
        console.error('Error saving data:', error);
    }
}

/**
 * Load data from localStorage
 */
function loadData() {
    try {
        const savedData = localStorage.getItem('lifeosData');
        if (savedData) {
            appData = JSON.parse(savedData);
            // Ensure all required properties exist
            if (!appData.settings) appData.settings = defaultData.settings;
        }
    } catch (error) {
        console.error('Error loading data:', error);
        appData = { ...defaultData };
    }
}

/**
 * Reset all data to defaults
 */
function resetData() {
    if (confirm('Are you sure you want to reset all data? This cannot be undone.')) {
        localStorage.removeItem('lifeosData');
        appData = JSON.parse(JSON.stringify(defaultData));
        saveData();
        location.reload();
    }
}

// ===================================
// NAVIGATION
// ===================================

/**
 * Initialize navigation functionality
 */
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const modules = document.querySelectorAll('.module');
    
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetModule = item.dataset.module;
            
            // Update active nav item
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            
            // Update active module
            modules.forEach(module => module.classList.remove('active'));
            document.getElementById(targetModule).classList.add('active');
        });
    });
}

// ===================================
// DASHBOARD MODULE
// ===================================

/**
 * Render dashboard overview
 */
function renderDashboard() {
    // Get current phase
    const currentPhase = appData.phases.find(p => p.status === 'in-progress') || appData.phases[0];
    
    // Update current phase card
    document.getElementById('dash-current-phase').textContent = currentPhase.name;
    document.getElementById('dash-phase-dates').textContent = `${currentPhase.startDate} - ${currentPhase.endDate}`;
    document.getElementById('dash-focus').textContent = currentPhase.focus;
    
    // Calculate pillar progress
    const totalMilestones = appData.pillars.reduce((sum, pillar) => sum + pillar.milestones.length, 0);
    const completedMilestones = appData.pillars.reduce((sum, pillar) => {
        return sum + pillar.milestones.filter(m => m.completed).length;
    }, 0);
    const pillarProgress = totalMilestones > 0 ? Math.round((completedMilestones / totalMilestones) * 100) : 0;
    
    document.getElementById('dash-pillar-progress').textContent = `${pillarProgress}%`;
    document.getElementById('dash-pillar-bar').style.width = `${pillarProgress}%`;
    
    // Calculate weekly completion
    const currentWeek = appData.weeks.length > 0 ? appData.weeks[appData.weeks.length - 1] : null;
    let weeklyCompletion = 0;
    if (currentWeek && currentWeek.tasks.length > 0) {
        const completedTasks = currentWeek.tasks.filter(t => t.completed).length;
        weeklyCompletion = Math.round((completedTasks / currentWeek.tasks.length) * 100);
    }
    document.getElementById('dash-weekly-completion').textContent = `${weeklyCompletion}%`;
    
    // Render pillar summary
    renderPillarSummary();
}

/**
 * Render pillar summary on dashboard
 */
function renderPillarSummary() {
    const container = document.getElementById('dash-pillar-summary');
    container.innerHTML = '';
    
    appData.pillars.forEach(pillar => {
        const totalMilestones = pillar.milestones.length;
        const completedMilestones = pillar.milestones.filter(m => m.completed).length;
        const progress = totalMilestones > 0 ? Math.round((completedMilestones / totalMilestones) * 100) : 0;
        
        const item = document.createElement('div');
        item.className = 'pillar-summary-item';
        item.innerHTML = `
            <div class="pillar-summary-name">${pillar.name}</div>
            <div class="pillar-summary-bar">
                <div class="pillar-summary-fill" style="width: ${progress}%"></div>
            </div>
            <div class="pillar-summary-percent">${progress}%</div>
        `;
        container.appendChild(item);
    });
}

// ===================================
// PHASES MODULE
// ===================================

// Current phase being edited (null for new phase)
let currentPhaseIndex = null;

/**
 * Render phases
 */
function renderPhases() {
    const container = document.getElementById('phases-container');
    container.innerHTML = '';
    
    appData.phases.forEach((phase, index) => {
        const phaseCard = document.createElement('div');
        phaseCard.className = `phase-card ${phase.status === 'in-progress' ? 'active' : ''}`;
        
        phaseCard.innerHTML = `
            <div class="phase-header">
                <div class="phase-title">
                    <h3>${phase.name}</h3>
                    <p class="phase-dates">${phase.startDate} - ${phase.endDate}</p>
                </div>
                <span class="phase-status ${phase.status}">${formatStatus(phase.status)}</span>
            </div>
            <div class="phase-body">
                <p class="phase-focus"><strong>Dominant Focus:</strong> ${phase.focus}</p>
            </div>
            <div class="phase-actions">
                ${phase.status === 'not-started' ? `<button class="btn btn-primary" onclick="updatePhaseStatus(${index}, 'in-progress')">Start Phase</button>` : ''}
                ${phase.status === 'in-progress' ? `<button class="btn btn-success" onclick="updatePhaseStatus(${index}, 'completed')">Complete Phase</button>` : ''}
                ${phase.status === 'completed' ? `<button class="btn btn-secondary" onclick="updatePhaseStatus(${index}, 'in-progress')">Reopen Phase</button>` : ''}
                <button class="btn btn-outline" onclick="editPhase(${index})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn btn-outline" onclick="deletePhase(${index})" style="color: var(--danger-color); border-color: var(--danger-color);">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        `;
        
        container.appendChild(phaseCard);
    });
}

/**
 * Update phase status
 */
function updatePhaseStatus(index, newStatus) {
    const phase = appData.phases[index];
    if (phase) {
        // If setting to in-progress, set all others to not in-progress
        if (newStatus === 'in-progress') {
            appData.phases.forEach((p, i) => {
                if (p.status === 'in-progress' && i !== index) {
                    p.status = 'not-started';
                }
            });
        }
        
        phase.status = newStatus;
        saveData();
        renderPhases();
        renderDashboard();
    }
}

/**
 * Show add phase modal
 */
function showAddPhaseModal() {
    currentPhaseIndex = null;
    document.getElementById('phase-modal-title').textContent = 'Add Phase';
    document.getElementById('phase-name').value = '';
    document.getElementById('phase-start').value = '';
    document.getElementById('phase-end').value = '';
    document.getElementById('phase-focus').value = '';
    document.getElementById('phase-modal').classList.add('active');
}

/**
 * Edit phase
 */
function editPhase(index) {
    currentPhaseIndex = index;
    const phase = appData.phases[index];
    
    document.getElementById('phase-modal-title').textContent = 'Edit Phase';
    document.getElementById('phase-name').value = phase.name;
    document.getElementById('phase-start').value = phase.startDate;
    document.getElementById('phase-end').value = phase.endDate;
    document.getElementById('phase-focus').value = phase.focus;
    document.getElementById('phase-modal').classList.add('active');
}

/**
 * Save phase
 */
function savePhase() {
    const name = document.getElementById('phase-name').value.trim();
    const startDate = document.getElementById('phase-start').value.trim();
    const endDate = document.getElementById('phase-end').value.trim();
    const focus = document.getElementById('phase-focus').value.trim();
    
    if (!name || !startDate || !endDate || !focus) {
        alert('Please fill in all fields');
        return;
    }
    
    if (currentPhaseIndex === null) {
        // Add new phase
        appData.phases.push({
            id: `phase-${Date.now()}`,
            name,
            startDate,
            endDate,
            focus,
            status: 'not-started'
        });
    } else {
        // Update existing phase
        appData.phases[currentPhaseIndex].name = name;
        appData.phases[currentPhaseIndex].startDate = startDate;
        appData.phases[currentPhaseIndex].endDate = endDate;
        appData.phases[currentPhaseIndex].focus = focus;
    }
    
    saveData();
    renderPhases();
    renderDashboard();
    closePhaseModal();
}

/**
 * Delete phase
 */
function deletePhase(index) {
    if (confirm('Are you sure you want to delete this phase? This cannot be undone.')) {
        appData.phases.splice(index, 1);
        saveData();
        renderPhases();
        renderDashboard();
    }
}

/**
 * Close phase modal
 */
function closePhaseModal() {
    document.getElementById('phase-modal').classList.remove('active');
    currentPhaseIndex = null;
}

/**
 * Format status text
 */
function formatStatus(status) {
    return status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

// ===================================
// PILLARS MODULE
// ===================================

// Current pillar being edited (null for new pillar)
let currentPillarIndex = null;

/**
 * Render pillars
 */
function renderPillars() {
    const container = document.getElementById('pillars-container');
    container.innerHTML = '';
    
    appData.pillars.forEach((pillar, pillarIndex) => {
        const totalMilestones = pillar.milestones.length;
        const completedMilestones = pillar.milestones.filter(m => m.completed).length;
        const progress = totalMilestones > 0 ? Math.round((completedMilestones / totalMilestones) * 100) : 0;
        
        const pillarCard = document.createElement('div');
        pillarCard.className = 'pillar-card';
        
        const milestonesHtml = pillar.milestones.map((milestone, milestoneIndex) => `
            <div class="milestone-item ${milestone.completed ? 'completed' : ''}" onclick="toggleMilestone(${pillarIndex}, ${milestoneIndex})">
                <div class="milestone-checkbox">
                    <i class="fas fa-check"></i>
                </div>
                <div class="milestone-label">${milestone.label}</div>
            </div>
        `).join('');
        
        pillarCard.innerHTML = `
            <div class="pillar-header">
                <h3>${pillar.name}</h3>
                <div style="display: flex; align-items: center; gap: 1rem;">
                    <span class="pillar-progress-text">${completedMilestones}/${totalMilestones}</span>
                    <button class="btn-icon" onclick="editPillar(${pillarIndex})" title="Edit Pillar">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon" onclick="deletePillar(${pillarIndex})" title="Delete Pillar" style="color: var(--danger-color);">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <div class="pillar-progress-bar">
                <div class="pillar-progress-fill" style="width: ${progress}%"></div>
            </div>
            <div class="pillar-milestones">
                ${milestonesHtml}
            </div>
        `;
        
        container.appendChild(pillarCard);
    });
}

/**
 * Toggle milestone completion
 */
function toggleMilestone(pillarIndex, milestoneIndex) {
    const pillar = appData.pillars[pillarIndex];
    if (pillar && pillar.milestones[milestoneIndex]) {
        pillar.milestones[milestoneIndex].completed = !pillar.milestones[milestoneIndex].completed;
        saveData();
        renderPillars();
        renderDashboard();
    }
}

/**
 * Show add pillar modal
 */
function showAddPillarModal() {
    currentPillarIndex = null;
    document.getElementById('pillar-modal-title').textContent = 'Add Pillar';
    document.getElementById('pillar-name').value = '';
    document.getElementById('pillar-milestones').value = '';
    document.getElementById('pillar-modal').classList.add('active');
}

/**
 * Edit pillar
 */
function editPillar(index) {
    currentPillarIndex = index;
    const pillar = appData.pillars[index];
    
    document.getElementById('pillar-modal-title').textContent = 'Edit Pillar';
    document.getElementById('pillar-name').value = pillar.name;
    
    // Convert milestones array to text (one per line)
    const milestonesText = pillar.milestones.map(m => m.label).join('\n');
    document.getElementById('pillar-milestones').value = milestonesText;
    
    document.getElementById('pillar-modal').classList.add('active');
}

/**
 * Save pillar
 */
function savePillar() {
    const name = document.getElementById('pillar-name').value.trim();
    const milestonesText = document.getElementById('pillar-milestones').value.trim();
    
    if (!name || !milestonesText) {
        alert('Please fill in all fields');
        return;
    }
    
    // Parse milestones from text
    const milestones = milestonesText.split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .map((label, index) => ({
            id: `milestone-${Date.now()}-${index}`,
            label,
            completed: false
        }));
    
    if (milestones.length === 0) {
        alert('Please add at least one milestone');
        return;
    }
    
    if (currentPillarIndex === null) {
        // Add new pillar
        appData.pillars.push({
            id: `pillar-${Date.now()}`,
            name,
            milestones
        });
    } else {
        // Update existing pillar
        // Preserve completion status for milestones with same label
        const oldMilestones = appData.pillars[currentPillarIndex].milestones;
        const updatedMilestones = milestones.map(newMilestone => {
            const oldMilestone = oldMilestones.find(m => m.label === newMilestone.label);
            if (oldMilestone) {
                newMilestone.completed = oldMilestone.completed;
            }
            return newMilestone;
        });
        
        appData.pillars[currentPillarIndex].name = name;
        appData.pillars[currentPillarIndex].milestones = updatedMilestones;
    }
    
    saveData();
    renderPillars();
    renderDashboard();
    closePillarModal();
}

/**
 * Delete pillar
 */
function deletePillar(index) {
    if (confirm('Are you sure you want to delete this pillar and all its milestones? This cannot be undone.')) {
        appData.pillars.splice(index, 1);
        saveData();
        renderPillars();
        renderDashboard();
    }
}

/**
 * Close pillar modal
 */
function closePillarModal() {
    document.getElementById('pillar-modal').classList.remove('active');
    currentPillarIndex = null;
}

// ===================================
// WEEKLY TRACKER MODULE
// ===================================

/**
 * Render weekly tracker
 */
function renderWeeklyTracker() {
    const tbody = document.getElementById('weekly-table-body');
    tbody.innerHTML = '';
    
    if (appData.weeks.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" class="text-center" style="padding: 2rem; color: var(--text-secondary);">
                    No weeks added yet. Click "Add Week" to get started.
                </td>
            </tr>
        `;
        return;
    }
    
    appData.weeks.forEach((week, index) => {
        const completedTasks = week.tasks.filter(t => t.completed).length;
        const totalTasks = week.tasks.length;
        const completion = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
        
        let completionClass = 'low';
        if (completion >= 70) completionClass = 'high';
        else if (completion >= 40) completionClass = 'medium';
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><span class="week-number">Week ${week.weekNumber}</span></td>
            <td>${week.focus}</td>
            <td>${completedTasks}/${totalTasks} tasks</td>
            <td><span class="completion-badge ${completionClass}">${completion}%</span></td>
            <td class="table-actions">
                <button class="btn-icon" onclick="viewWeekDetails(${index})" title="View Details">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn-icon" onclick="deleteWeek(${index})" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

/**
 * Show add week modal
 */
function showAddWeekModal() {
    const modal = document.getElementById('week-modal');
    document.getElementById('week-modal-title').textContent = 'Add Week';
    document.getElementById('week-number').value = '';
    document.getElementById('week-focus').value = '';
    document.getElementById('week-tasks').value = '';
    modal.classList.add('active');
}

/**
 * Close week modal
 */
function closeWeekModal() {
    document.getElementById('week-modal').classList.remove('active');
}

/**
 * Save week
 */
function saveWeek() {
    const weekNumber = parseInt(document.getElementById('week-number').value);
    const focus = document.getElementById('week-focus').value.trim();
    const tasksText = document.getElementById('week-tasks').value.trim();
    
    if (!weekNumber || !focus || !tasksText) {
        alert('Please fill in all fields');
        return;
    }
    
    const tasks = tasksText.split('\n')
        .map(task => task.trim())
        .filter(task => task.length > 0)
        .map((task, index) => ({
            id: `task-${Date.now()}-${index}`,
            label: task,
            completed: false
        }));
    
    appData.weeks.push({
        weekNumber,
        focus,
        tasks
    });
    
    saveData();
    renderWeeklyTracker();
    renderDashboard();
    closeWeekModal();
}

/**
 * Delete week
 */
function deleteWeek(index) {
    if (confirm('Are you sure you want to delete this week?')) {
        appData.weeks.splice(index, 1);
        saveData();
        renderWeeklyTracker();
        renderDashboard();
    }
}

/**
 * View week details
 */
function viewWeekDetails(index) {
    const week = appData.weeks[index];
    const modal = document.getElementById('week-detail-modal');
    document.getElementById('week-detail-title').textContent = `Week ${week.weekNumber} - ${week.focus}`;
    
    const completedTasks = week.tasks.filter(t => t.completed).length;
    const totalTasks = week.tasks.length;
    const completion = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    
    const tasksHtml = week.tasks.map((task, taskIndex) => `
        <div class="week-task-item ${task.completed ? 'completed' : ''}" onclick="toggleWeekTask(${index}, ${taskIndex})">
            <div class="week-task-checkbox">
                <i class="fas fa-check"></i>
            </div>
            <div class="week-task-label">${task.label}</div>
        </div>
    `).join('');
    
    document.getElementById('week-detail-content').innerHTML = `
        <div style="margin-bottom: 1.5rem;">
            <h4 style="margin-bottom: 0.5rem; color: var(--text-primary);">Progress</h4>
            <div class="pillar-progress-bar">
                <div class="pillar-progress-fill" style="width: ${completion}%"></div>
            </div>
            <p style="margin-top: 0.5rem; color: var(--text-secondary);">${completedTasks} of ${totalTasks} tasks completed (${completion}%)</p>
        </div>
        <div>
            <h4 style="margin-bottom: 1rem; color: var(--text-primary);">Tasks</h4>
            <div class="week-tasks-list">
                ${tasksHtml}
            </div>
        </div>
    `;
    
    modal.classList.add('active');
}

/**
 * Close week detail modal
 */
function closeWeekDetailModal() {
    document.getElementById('week-detail-modal').classList.remove('active');
}

/**
 * Toggle week task completion
 */
function toggleWeekTask(weekIndex, taskIndex) {
    const week = appData.weeks[weekIndex];
    if (week && week.tasks[taskIndex]) {
        week.tasks[taskIndex].completed = !week.tasks[taskIndex].completed;
        saveData();
        viewWeekDetails(weekIndex); // Refresh the modal
        renderWeeklyTracker(); // Refresh the table
        renderDashboard(); // Update dashboard
    }
}

// ===================================
// SETTINGS MODULE
// ===================================

/**
 * Initialize settings
 */
function initSettings() {
    // Theme color selection
    const themeRadios = document.querySelectorAll('input[name="theme-color"]');
    themeRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.checked) {
                applyTheme(e.target.value);
            }
        });
        
        // Set initial state
        if (radio.value === appData.settings.theme) {
            radio.checked = true;
        }
    });
    
    // Reset data button
    document.getElementById('reset-data-btn').addEventListener('click', resetData);
}

/**
 * Apply theme
 */
function applyTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    appData.settings.theme = theme;
    saveData();
}

// ===================================
// INITIALIZATION
// ===================================

/**
 * Initialize the application
 */
function init() {
    // Load data from localStorage
    loadData();
    
    // Apply saved theme
    if (appData.settings && appData.settings.theme) {
        applyTheme(appData.settings.theme);
    }
    
    // Initialize navigation
    initNavigation();
    
    // Initialize settings
    initSettings();
    
    // Render all modules
    renderDashboard();
    renderPhases();
    renderPillars();
    renderWeeklyTracker();
    
    // Set up event listeners
    setupEventListeners();
}

/**
 * Set up event listeners
 */
function setupEventListeners() {
    // Week modal controls
    document.getElementById('add-week-btn').addEventListener('click', showAddWeekModal);
    document.getElementById('close-week-modal').addEventListener('click', closeWeekModal);
    document.getElementById('cancel-week-btn').addEventListener('click', closeWeekModal);
    document.getElementById('save-week-btn').addEventListener('click', saveWeek);
    
    // Week detail modal controls
    document.getElementById('close-week-detail-modal').addEventListener('click', closeWeekDetailModal);
    document.getElementById('close-week-detail-btn').addEventListener('click', closeWeekDetailModal);
    
    // Phase modal controls
    document.getElementById('add-phase-btn').addEventListener('click', showAddPhaseModal);
    document.getElementById('close-phase-modal').addEventListener('click', closePhaseModal);
    document.getElementById('cancel-phase-btn').addEventListener('click', closePhaseModal);
    document.getElementById('save-phase-btn').addEventListener('click', savePhase);
    
    // Pillar modal controls
    document.getElementById('add-pillar-btn').addEventListener('click', showAddPillarModal);
    document.getElementById('close-pillar-modal').addEventListener('click', closePillarModal);
    document.getElementById('cancel-pillar-btn').addEventListener('click', closePillarModal);
    document.getElementById('save-pillar-btn').addEventListener('click', savePillar);
    
    // Close modals on outside click
    document.getElementById('week-modal').addEventListener('click', (e) => {
        if (e.target.id === 'week-modal') {
            closeWeekModal();
        }
    });
    
    document.getElementById('week-detail-modal').addEventListener('click', (e) => {
        if (e.target.id === 'week-detail-modal') {
            closeWeekDetailModal();
        }
    });
    
    document.getElementById('phase-modal').addEventListener('click', (e) => {
        if (e.target.id === 'phase-modal') {
            closePhaseModal();
        }
    });
    
    document.getElementById('pillar-modal').addEventListener('click', (e) => {
        if (e.target.id === 'pillar-modal') {
            closePillarModal();
        }
    });
}

// ===================================
// START APPLICATION
// ===================================

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}