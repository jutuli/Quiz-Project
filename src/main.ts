import "./style.css";
import { mediumQuestions, QuizItem } from "./quizQuestions.ts";

// Get Parent Element
const quizContainer = document.querySelector("#content");
// Throw Error if there is an issue with the quizContainer
if (!quizContainer) {
  throw new Error("The quizContainer element does not exist.");
}
// Style Parent Element
if (quizContainer) quizContainer.className = "flex flex-col items-center gap-6";

// Initialize Correct Answer Counting Variable
let correctAnswerCount = 0;

// Initialize Variable for Total Amount of Questions answered
let answeredQuestionsCount = 0;

mediumQuestions.forEach((quizItem: QuizItem) => {
  if (
    !quizItem.answer ||
    !quizItem.choices ||
    !quizItem.question ||
    !quizItem.url
  ) {
    console.error("Quiz Item is faulty and cannot be displayed.");
    return;
  }
  // Create Elements for each Question
  const quizQuestionContainer = document.createElement("section");
  const quizQuestionImage = document.createElement("img");
  const quizQuestion = document.createElement("p");
  const quizAnswerContainer = document.createElement("div");
  // Style quizQuestionContainer & Quiz Answer Container
  quizQuestionContainer.className = "flex flex-col items-center gap-2";
  quizAnswerContainer.className = "flex gap-2 w-full";
  // Fill each Element with Data, Style it & Append Question Container
  quizQuestionImage.src = quizItem.url;
  quizQuestionImage.alt = "Quiz Question Image";
  quizQuestionContainer.appendChild(quizQuestionImage);
  quizQuestionImage.className = "mb-2";
  quizQuestion.textContent = quizItem.question;
  quizQuestion.className = "font-semibold text-xl";
  quizQuestionContainer.appendChild(quizQuestion);
  // Create Array of Answer Buttons to be able to work with all Buttons at once
  const answerButtons = quizItem.choices.map((choice) => {
    // Create & Style Button for each Answer Choice
    const quizAnswerButton = document.createElement("button");
    quizAnswerButton.textContent = `${choice}`;
    quizAnswerButton.className =
      "m-2 cursor-pointer rounded-lg bg-gray-500 py-2 text-lg font-semibold text-white hover:bg-gray-600 w-full";
    quizAnswerContainer.appendChild(quizAnswerButton);
    // Event Listener to Change Button Styling based on correct/wrong answer
    quizAnswerButton.addEventListener("click", () => {
      // increase answered question count
      answeredQuestionsCount++;
      // disable all Buttons & change their BG-Color
      answerButtons.forEach((button) => {
        button.disabled = true;
        button.classList.remove(
          "bg-gray-500",
          "hover:bg-gray-600",
          "cursor-pointer",
        );
        button.classList.add("bg-gray-300");
      });
      // The quiz Answer Button gets a different styling than the rest of the buttons
      quizAnswerButton.classList.remove("bg-gray-300");
      // Add BG-Color of clicked Button based on correct/wrong answer
      if (quizAnswerButton.textContent === quizItem.answer) {
        quizAnswerButton.classList.add("bg-green-700");
        // Add point for correct answer
        correctAnswerCount++;
      } else {
        quizAnswerButton.classList.add("bg-red-700");
      }
      // Check if all questions have been answered
      if (answeredQuestionsCount === mediumQuestions.length) {
        displayResult();
      }
    });
    return quizAnswerButton;
  });
  quizQuestionContainer.appendChild(quizAnswerContainer);
  // Append entire quizContainer with the filled questionContainer
  quizContainer.appendChild(quizQuestionContainer);
});

// Display Result of Quiz
function displayResult() {
  // Create Result Container & Paragraph to display result
  const quizResultContainer = document.createElement("div");
  const quizResult = document.createElement("p");
  // Fill quizResult with data
  quizResult.textContent = `You got ${correctAnswerCount} out of ${answeredQuestionsCount} questions correct.`;
  // Style quizResult
  quizResult.className = "my-5 text-center text-2xl font-semibold ";
  // Display quizResult in DOM
  quizResultContainer.appendChild(quizResult);
  quizContainer?.appendChild(quizResultContainer);
}
