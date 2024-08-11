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
        question: "What does the 'print' function do in Python?",
        options: ["Displays a message on the screen", "Calculates mathematical expressions", "Defines a new variable", "Reads input from the user"],
        correct: "Displays a message on the screen",
    },
    {
        id: "1",
        question: "What is the correct way to start a Python 'for' loop?",
        options: ["for i in range(10):", "for i = 0; i < 10; i++:", "for (i = 0; i < 10; i++):", "for i from 0 to 9:"],
        correct: "for i in range(10):",
    },
    {
        id: "2",
        question: "Which of the following is used to define a function in Python?",
        options: ["def", "function", "define", "func"],
        correct: "def",
    },
    {
        id: "3",
        question: "What does the 'len()' function do in Python?",
        options: ["Returns the length of a string", "Calculates logarithm", "Finds the square root", "Converts to lowercase"],
        correct: "Returns the length of a string",
    },
    {
        id: "4",
        question: "What is the result of '2 + 3 * 4' in Python?",
        options: ["20", "14", "18", "None of the above"],
        correct: "14",
    },
    {
        id: "5",
        question: "Which symbol is used for comments in Python?",
        options: ["//", "#", "/* */", "REM"],
        correct: "#",
    },
    {
        id: "6",
        question: "What is the output of 'print('Hello' + 'World')' in Python?",
        options: ["Hello World", "Hello + World", "HelloWorld", "Error"],
        correct: "HelloWorld",
    },
    {
        id: "7",
        question: "Which data type is used to store a sequence of characters in Python?",
        options: ["int", "float", "str", "bool"],
        correct: "str",
    },
    {
        id: "8",
        question: "What is the correct way to check if a key exists in a dictionary in Python?",
        options: ["if key in dict:", "if dict[key] exists:", "if key.exists(dict):", "if dict.contains(key):"],
        correct: "if key in dict:",
    },
    {
        id: "9",
        question: "What does the 'range()' function return in Python?",
        options: ["A list of numbers", "A string", "A tuple", "An iterator"],
        correct: "An iterator",
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
