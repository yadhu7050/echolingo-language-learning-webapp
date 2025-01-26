const API_URL = 'http://localhost:8000';

class LessonsManager {
    constructor() {
        this.currentLevel = 'beginner';
        this.currentLanguage = localStorage.getItem('selectedLanguage') || 'hindi';
        this.lessonsGrid = document.querySelector('.lessons-grid');
        this.levelTabs = document.querySelectorAll('.level-tabs .tab');
        
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Level tab switching
        this.levelTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                this.currentLevel = tab.dataset.level;
                this.updateActiveLevelTab();
                this.fetchAndDisplayLessons();
            });
        });
    }

    updateActiveLevelTab() {
        this.levelTabs.forEach(tab => {
            tab.classList.toggle('active', tab.dataset.level === this.currentLevel);
        });
    }

    async fetchAndDisplayLessons() {
        try {
            const token = JSON.parse(localStorage.getItem('user'))?.token;
            if (!token) {
                throw new Error('Please login to view lessons');
            }

            const response = await fetch(
                `${API_URL}/lessons/${this.currentLanguage}/${this.currentLevel}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            if (!response.ok) {
                throw new Error('Failed to fetch lessons');
            }

            const lessons = await response.json();
            this.displayLessons(lessons);
        } catch (error) {
            this.showError(error.message);
        }
    }

    displayLessons(lessons) {
        this.lessonsGrid.innerHTML = '';
        
        lessons.forEach(lesson => {
            const lessonCard = this.createLessonCard(lesson);
            this.lessonsGrid.appendChild(lessonCard);
        });
    }

    createLessonCard(lesson) {
        const card = document.createElement('div');
        card.className = 'lesson-card';
        card.innerHTML = `
            <div class="lesson-status ${lesson.completed ? 'completed' : ''}">
                <span class="status-indicator"></span>
            </div>
            <h3>${lesson.title}</h3>
            <p>${lesson.description}</p>
            <div class="lesson-meta">
                <span class="difficulty">${this.currentLevel}</span>
                <span class="duration">${lesson.duration} mins</span>
            </div>
            <button class="btn-primary start-lesson" data-lesson-id="${lesson.id}">
                ${lesson.completed ? 'Review Lesson' : 'Start Lesson'}
            </button>
        `;

        card.querySelector('.start-lesson').addEventListener('click', () => {
            this.startLesson(lesson.id);
        });

        return card;
    }

    async startLesson(lessonId) {
        try {
            const token = JSON.parse(localStorage.getItem('user'))?.token;
            if (!token) {
                throw new Error('Please login to start the lesson');
            }

            const response = await fetch(`${API_URL}/lessons/start/${lessonId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to start lesson');
            }

            const lessonData = await response.json();
            this.showLessonContent(lessonData);
        } catch (error) {
            this.showError(error.message);
        }
    }

    showLessonContent(lessonData) {
        // Create and show lesson modal
        const modal = document.createElement('div');
        modal.className = 'lesson-modal modal';
        modal.innerHTML = `
            <div class="modal-content lesson-content">
                <span class="close">&times;</span>
                <h2>${lessonData.title}</h2>
                <div class="lesson-progress">
                    <div class="progress-bar" style="width: 0%"></div>
                </div>
                <div class="lesson-exercise">
                    ${this.formatExerciseContent(lessonData.content)}
                </div>
                <div class="lesson-navigation">
                    <button class="btn-secondary" id="prevExercise">Previous</button>
                    <button class="btn-primary" id="nextExercise">Next</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        this.initializeLessonControls(modal, lessonData);
    }

    formatExerciseContent(content) {
        // Format lesson content based on type (multiple choice, translation, etc.)
        // This is a simplified example
        return `
            <div class="exercise">
                <h3>${content.question}</h3>
                ${content.options ? this.createOptionsHTML(content.options) : ''}
                <input type="text" class="answer-input" placeholder="Type your answer...">
                <button class="btn-primary check-answer">Check Answer</button>
            </div>
        `;
    }

    createOptionsHTML(options) {
        return options.map(option => `
            <div class="option">
                <input type="radio" name="answer" value="${option}">
                <label>${option}</label>
            </div>
        `).join('');
    }

    showError(message) {
        // Show error message to user
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        this.lessonsGrid.prepend(errorDiv);
        setTimeout(() => errorDiv.remove(), 3000);
    }
}

// Initialize lessons manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const lessonsManager = new LessonsManager();
    lessonsManager.fetchAndDisplayLessons();
});