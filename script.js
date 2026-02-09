// Knowledge Challenge JavaScript by Fazal Shaikh
console.log("Knowledge Challenge by Fazal Shaikh is running");

// Quiz questions data
const questions = [
    {
        question: "What is the capital city of Japan?",
        options: ["Seoul", "Beijing", "Tokyo", "Bangkok"],
        answer: "Tokyo",
        explanation: "Tokyo is the capital and largest city of Japan."
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        answer: "Mars",
        explanation: "Mars is called the Red Planet due to iron oxide on its surface."
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["African Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
        answer: "Blue Whale",
        explanation: "The Blue Whale is the largest mammal and animal on Earth."
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
        answer: "Leonardo da Vinci",
        explanation: "Leonardo da Vinci painted the Mona Lisa in the early 16th century."
    },
    {
        question: "What is the chemical symbol for gold?",
        options: ["Go", "Gd", "Au", "Ag"],
        answer: "Au",
        explanation: "The chemical symbol for gold is Au, derived from the Latin word 'aurum'."
    },
    {
        question: "Which ocean is the largest?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        answer: "Pacific Ocean",
        explanation: "The Pacific Ocean is the largest and deepest ocean on Earth."
    },
    {
        question: "What is the main gas found in the Earth's atmosphere?",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
        answer: "Nitrogen",
        explanation: "Nitrogen makes up approximately 78% of Earth's atmosphere."
    },
    {
        question: "Which element has the atomic number 1?",
        options: ["Helium", "Hydrogen", "Oxygen", "Carbon"],
        answer: "Hydrogen",
        explanation: "Hydrogen has the atomic number 1, making it the first element on the periodic table."
    },
    {
        question: "In which year did World War II end?",
        options: ["1943", "1945", "1950", "1939"],
        answer: "1945",
        explanation: "World War II ended in 1945 with the surrender of Germany and Japan."
    },
    {
        question: "What is the tallest mountain in the world?",
        options: ["K2", "Mount Kilimanjaro", "Mount Everest", "Matterhorn"],
        answer: "Mount Everest",
        explanation: "Mount Everest stands at 29,032 feet (8,849 meters) above sea level."
    }
];

class QuizGame {
    constructor() {
        this.questions = [...questions];
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.selectedAnswer = null;
        
        this.initializeElements();
        this.bindEvents();
        this.updateQuestionCounter();
    }
    
    initializeElements() {
        // Screen elements
        this.welcomeScreen = document.getElementById('welcomeScreen');
        this.questionScreen = document.getElementById('questionScreen');
        this.resultsScreen = document.getElementById('resultsScreen');
        
        // Buttons
        this.startBtn = document.getElementById('startBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.restartBtn = document.getElementById('restartBtn');
        
        // Question elements
        this.questionText = document.getElementById('questionText');
        this.answerOptions = document.getElementById('answerOptions');
        this.resultFeedback = document.getElementById('resultFeedback');
        this.feedbackText = document.getElementById('feedbackText');
        
        // Stats elements
        this.scoreValue = document.getElementById('scoreValue');
        this.currentQuestionEl = document.getElementById('currentQuestion');
        this.totalQuestionsEl = document.getElementById('totalQuestions');
        this.progressFill = document.getElementById('progress');
        
        // Results elements
        this.finalScoreEl = document.getElementById('finalScore');
        this.performanceMessage = document.getElementById('performanceMessage');
    }
    
    bindEvents() {
        this.startBtn.addEventListener('click', () => this.startQuiz());
        this.nextBtn.addEventListener('click', () => this.nextQuestion());
        this.restartBtn.addEventListener('click', () => this.restartQuiz());
    }
    
    startQuiz() {
        this.welcomeScreen.classList.remove('active');
        this.questionScreen.classList.add('active');
        this.loadQuestion();
    }
    
    loadQuestion() {
        const question = this.questions[this.currentQuestionIndex];
        
        // Update question text
        this.questionText.textContent = question.question;
        
        // Clear previous options
        this.answerOptions.innerHTML = '';
        
        // Add new options
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.classList.add('option');
            optionElement.textContent = option;
            optionElement.dataset.index = index;
            optionElement.addEventListener('click', () => this.selectAnswer(optionElement, option));
            this.answerOptions.appendChild(optionElement);
        });
        
        // Reset selection
        this.selectedAnswer = null;
        
        // Hide feedback
        this.resultFeedback.classList.add('hidden');
        
        // Update progress
        this.updateProgress();
        this.updateQuestionCounter();
    }
    
    selectAnswer(element, answer) {
        // Remove selection from all options
        document.querySelectorAll('.option').forEach(opt => {
            opt.classList.remove('selected');
        });
        
        // Add selection to clicked option
        element.classList.add('selected');
        this.selectedAnswer = answer;
        
        // Disable other options
        document.querySelectorAll('.option').forEach(opt => {
            opt.style.pointerEvents = 'none';
        });
        
        // Check answer after a brief delay
        setTimeout(() => {
            this.checkAnswer(answer);
        }, 500);
    }
    
    checkAnswer(selectedAnswer) {
        const question = this.questions[this.currentQuestionIndex];
        const isCorrect = selectedAnswer === question.answer;
        
        if (isCorrect) {
            this.score++;
            this.feedbackText.innerHTML = `
                <h3>Correct! <i class="fas fa-check"></i></h3>
                <p>${question.explanation}</p>
            `;
            this.resultFeedback.className = 'feedback correct';
        } else {
            this.feedbackText.innerHTML = `
                <h3>Incorrect! <i class="fas fa-times"></i></h3>
                <p>The correct answer is: <strong>${question.answer}</strong></p>
                <p>${question.explanation}</p>
            `;
            this.resultFeedback.className = 'feedback incorrect';
        }
        
        // Update score display
        this.scoreValue.textContent = this.score;
        
        // Show feedback
        this.resultFeedback.classList.remove('hidden');
    }
    
    nextQuestion() {
        this.currentQuestionIndex++;
        
        if (this.currentQuestionIndex < this.questions.length) {
            this.loadQuestion();
        } else {
            this.showResults();
        }
    }
    
    showResults() {
        this.questionScreen.classList.remove('active');
        this.resultsScreen.classList.add('active');
        
        // Update final score
        this.finalScoreEl.textContent = this.score;
        
        // Set performance message
        const percentage = (this.score / this.questions.length) * 100;
        let message = '';
        let performanceClass = '';
        
        if (percentage >= 90) {
            message = "Outstanding! You're a trivia master!";
            performanceClass = 'excellent';
        } else if (percentage >= 70) {
            message = "Great job! You know your stuff!";
            performanceClass = 'good';
        } else if (percentage >= 50) {
            message = "Good effort! Keep learning!";
            performanceClass = 'average';
        } else {
            message = "Nice try! Keep studying to improve!";
            performanceClass = 'poor';
        }
        
        this.performanceMessage.textContent = message;
        this.performanceMessage.className = `performance ${performanceClass}`;
    }
    
    restartQuiz() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.selectedAnswer = null;
        
        this.resultsScreen.classList.remove('active');
        this.welcomeScreen.classList.add('active');
        
        this.scoreValue.textContent = '0';
        this.updateQuestionCounter();
    }
    
    updateProgress() {
        const progressPercent = ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
        this.progressFill.style.width = `${progressPercent}%`;
    }
    
    updateQuestionCounter() {
        this.currentQuestionEl.textContent = this.currentQuestionIndex + 1;
        this.totalQuestionsEl.textContent = this.questions.length;
    }
}

// Initialize the quiz when the page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log("Knowledge Challenge by Fazal Shaikh DOM loaded");
    const quizGame = new QuizGame();
});