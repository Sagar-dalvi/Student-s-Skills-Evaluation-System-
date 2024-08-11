//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 21; // Changed from 11 to 21 seconds
let countdown;

//Questions and Options array

const quizArray = [
    {
        id: "0",
        question: "What does CSS stand for?",
        options: ["Computer System Styling", "Cascading Style Sheets", "Content Sharing System", "Code Snippet System"],
        correct: "Cascading Style Sheets",
    },
    {
        id: "1",
        question: "Which of the following is not a valid HTML attribute?",
        options: ["href", "class", "style", "value"],
        correct: "value",
    },
    {
        id: "2",
        question: "What is the purpose of the <head> tag in HTML?",
        options: ["It defines the main content of the page.", "It contains metadata about the HTML document.", "It specifies the visible content of the page.", "It is used to link external CSS files."],
        correct: "It contains metadata about the HTML document.",
    },
    {
        id: "3",
        question: "What does the acronym 'URL' stand for?",
        options: ["Uniform Resource Locator", "Universal Reference Link", "Uniform Resource Language", "Unique Resource Locator"],
        correct: "Uniform Resource Locator",
    },
    {
        id: "4",
        question: "What does SEO stand for?",
        options: ["Search Engine Optimization", "System Efficiency Optimization", "Security Enhancement Operations", "Software Engineering Overview"],
        correct: "Search Engine Optimization",
    },
    {
        id: "5",
        question: "What does FTP stand for?",
        options: ["File Transfer Protocol", "Flexible Text Parsing", "Folder Transfer Protocol", "Fast Transmission Process"],
        correct: "File Transfer Protocol",
    },
    {
        id: "6",
        question: "What is the default file extension for an HTML file?",
        options: [".htm", ".html", ".htx", ".web"],
        correct: ".html",
    },
    {
        id: "7",
        question: "What does FTP stand for?",
        options: ["File Transfer Protocol", "Flexible Text Parsing", "Folder Transfer Protocol", "Fast Transmission Process"],
        correct: "File Transfer Protocol",
    },
    {
        id: "8",
        question: "What is the purpose of the <meta> tag in HTML?",
        options: ["To define a hyperlink", "To provide metadata about the HTML document", "To insert an image", "To create a table"],
        correct: "To provide metadata about the HTML document",
    },
    {
        id: "9",
        question: "Which of the following is not a valid HTML color name?",
        options: ["Red", "Yellow", "Turquoise", "123456"],
        correct: "123456",
    },
];


//Restart Quiz
restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener(
    "click",
    (displayNext = () => {
        //increment questionCount
        questionCount += 1;
        //if last question
        if (questionCount == quizArray.length) {
            //hide question container and display score
            displayContainer.classList.add("hide");
            scoreContainer.classList.remove("hide");
            //user score
            userScore.innerHTML =
                "Your score is " + scoreCount + " out of " + questionCount;
        } else {
            //display questionCount
            countOfQuestion.innerHTML =
                questionCount + 1 + " of " + quizArray.length + " Question";
            //display quiz
            quizDisplay(questionCount);
            count = 21; // Reset the countdown to 21 seconds for each question
            clearInterval(countdown);
            timerDisplay();
        }
    })
);

//Timer
const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    //Hide other cards
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    //display current question card
    quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
    //randomly sort questions
    quizArray.sort(() => Math.random() - 0.5);
    //generate quiz
    for (let i of quizArray) {
        //randomly sort options
        i.options.sort(() => Math.random() - 0.5);
        //quiz card creation
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        //question number
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
        //question
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        //options
        div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
        quizContainer.appendChild(div);
    }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question =
        document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    //if user clicked answer == correct option stored in object
    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");
        //For marking the correct option
        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }

    //clear interval(stop timer)
    clearInterval(countdown);
    //disable all options
    options.forEach((element) => {
        element.disabled = true;
    });
}

//initial setup
function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 21; // Reset the countdown to 21 seconds at the start
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});

//hide quiz and display start screen
window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};
