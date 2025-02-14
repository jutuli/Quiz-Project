import "./style.css";
import { mediumQuestions, Choices, QuizItem } from "./quizQuestions.ts";

// Get Element
const quizContainer = document.querySelector("#content");

mediumQuestions.forEach((element: QuizItem) => {
  if (!quizContainer) return;
  // Create Elements for each Question
  const quizQuestionContainer = document.createElement("section");
  const quizQuestionImage = document.createElement("img");
  const quizQuestion = document.createElement("p");
  const quizAnswerContainer = document.createElement("div");
  // Fill each Element with Data & Append Question Container
  quizQuestionImage.src = `${element.url}`;
  quizQuestionContainer.appendChild(quizQuestionImage);
  quizQuestion.textContent = `${element.question}`;
  quizQuestionContainer.appendChild(quizQuestion);
  element.choices.forEach((choice) => {
    // Create Button for each Answer Choice
    const quizAnswerButton = document.createElement("button");
    quizAnswerButton.textContent = `${choice}`;
    quizAnswerContainer.appendChild(quizAnswerButton);
  });
  quizQuestionContainer.appendChild(quizAnswerContainer);
  // Append entire quizContainer with the filled Question Container
  quizContainer.appendChild(quizQuestionContainer);
});
