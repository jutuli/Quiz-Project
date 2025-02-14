import "./style.css";
import { mediumQuestions, Choices, QuizItem } from "./quizQuestions.ts";

// Get Parent Element
const quizContainer = document.querySelector("#content");
// Style Parent Element
if (quizContainer) quizContainer.className = "flex flex-col items-center gap-6";

mediumQuestions.forEach((quizItem: QuizItem) => {
  if (!quizContainer) return;
  // Create Elements for each Question
  const quizQuestionContainer = document.createElement("section");
  const quizQuestionImage = document.createElement("img");
  const quizQuestion = document.createElement("p");
  const quizAnswerContainer = document.createElement("div");
  // Style quizQuestionContainer & Quiz Answer Container
  quizQuestionContainer.className = "flex flex-col items-center gap-2";
  quizAnswerContainer.className = "flex gap-2 w-full";
  // Fill each Element with Data, Style it & Append Question Container
  quizQuestionImage.src = `${quizItem.url}`;
  quizQuestionContainer.appendChild(quizQuestionImage);
  quizQuestionImage.className = "mb-2";
  quizQuestion.textContent = `${quizItem.question}`;
  quizQuestion.className = "font-semibold text-lg";
  quizQuestionContainer.appendChild(quizQuestion);
  // Create Array of Answer Buttons to be able to work with all Buttons at once
  const answerButtons = quizItem.choices.map((choice) => {
    // Create & Style Button for each Answer Choice
    const quizAnswerButton = document.createElement("button");
    quizAnswerButton.textContent = `${choice}`;
    quizAnswerButton.className =
      "m-2 cursor-pointer rounded-lg bg-gray-500 py-2 font-semibold text-white hover:bg-gray-600 w-full";
    quizAnswerContainer.appendChild(quizAnswerButton);
    // Event Listener to Change Button Styling based on correct/wrong answer
    quizAnswerButton.addEventListener("click", () => {
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
      } else {
        quizAnswerButton.classList.add("bg-red-700");
      }
    });
    return quizAnswerButton;
  });
  quizQuestionContainer.appendChild(quizAnswerContainer);
  // Append entire quizContainer with the filled questionContainer
  quizContainer.appendChild(quizQuestionContainer);
});
