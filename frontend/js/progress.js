const API_URL = 'http://localhost:8000';

class ProgressTracker {
    constructor() {
        this.progressStats = {
            lessonsCompleted: document.getElementById('lessonsCompleted'),
            averageScore: document.getElementById('averageScore')
        };
        this.progressChart = document.querySelector('.progress-chart');
        
        this.initializeProgress();
    }

    async initializeProgress() {
        await this.fetchAndUpdateProgress();
        this.initializeChart();
        // Update progress every 5 minutes
        setInterval(() => this.fetchAndUpdateProgress(), 300000);
    }

    async fetchAndUpdateProgress() {
        try {
            const token = JSON.parse(localStorage.getItem('user'))?.token;
            if (!token) {
                throw new Error('Please login to view progress');
            }

            const response = await fetch(`${API_URL}/progress`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch progress');
            }

            const progressData = await response.json();
            this.updateProgressUI(progressData);
        } catch (error) {
            this.showError(error.message);
        }
    }

    updateProgressUI(progressData) {
        // Update stats
        this.progressStats.lessonsCompleted.textContent = progressData.completed_lessons;
        this.progressStats.averageScore.textContent = `${progressData.average_score}%`;

        // Update progress cards
        this.updateLanguageProgress(progressData.language_progress);
        
        // Update chart data
        this.updateChartData(progressData.weekly_progress);
    }

    updateLanguageProgress(languageProgress) {
        const progressContainer = document.createElement('div');
        progressContainer.className = 'language-progress';

        Object.entries(languageProgress).forEach(([language, progress]) => {
            const progressCard = document.createElement('div');
            progressCard.className = 'progress-card';
            progressCard.innerHTML = `
                <h4>${language}</h4>
                <div class="progress-bar-container">
                    <div class="progress-bar" style="width: ${progress}%"></div>
                </div>
                <span class="progress-percentage">${progress}%</span>
            `;
            progressContainer.appendChild(progressCard);
        });

        // Replace existing language progress
        const existingProgress = document.querySelector('.language-progress');
        if (existingProgress) {
            existingProgress.replaceWith(progressContainer);
        } else {
            document.querySelector('.progress-stats').after(progressContainer);
        }
    }

    initializeChart() {
        // Using Chart.js for visualization
        // Make sure to include Chart.js in your HTML file:
        // <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        
        const ctx = document.createElement('canvas');
        this.progressChart.appendChild(ctx);

        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Weekly Progress',
                    data: [],
                    borderColor: '#4A90E2',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }

    updateChartData(weeklyProgress) {
        const labels = weeklyProgress.map(entry => entry.date);
        const data = weeklyProgress.map(entry => entry.progress);

        this.chart.data.labels = labels;
        this.chart.data.datasets[0].data = data;
        this.chart.update();
    }

    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        document.querySelector('.progress-stats').prepend(errorDiv);
        setTimeout(() => errorDiv.remove(), 3000);
    }

    // Additional method to track lesson completion
    async trackLessonCompletion(lessonId, score) {
        try {
            const token = JSON.parse(localStorage.getItem('user'))?.token;
            if (!token) {
                throw new Error('Please login to track progress');
            }

            const response = await fetch(`${API_URL}/progress/update`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    lesson_id: lessonId,
                    score: score
                })
            });

            if (!response.ok) {
                throw new Error('Failed to update progress');
            }

            // Refresh progress data
            await this.fetchAndUpdateProgress();
        } catch (error) {
            this.showError(error.message);
        }
    }
}

// Initialize progress tracker when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const progressTracker = new ProgressTracker();
});