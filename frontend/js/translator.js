const API_URL = 'http://localhost:8000';

async function translate() {
    const text = document.querySelector('.input-area textarea').value;
    const targetLang = document.getElementById('targetLang').value;
    const resultElement = document.getElementById('translationResult');

    try {
        const response = await fetch(`${API_URL}/ai/translate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text, target_language: targetLang })
        });

        const data = await response.json();
        resultElement.textContent = data.translated;
    } catch (error) {
        resultElement.textContent = 'Translation failed. Please try again.';
    }
}

document.getElementById('translateBtn').addEventListener('click', translate);