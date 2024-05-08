import React, { useState, useEffect, useContext } from "react";
import { Context } from "../Elements/Wrapper.jsx";
import quizDataEspañol from "./quizzEspañol.json";
import quizDataIngles from "./quizzInglés.json";
import { Link, useNavigate } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl"; // Importa FormattedMessage y useIntl

const Quizz = () => {
  const context = useContext(Context);
  const intl = useIntl(); // Obtiene el objeto intl para usar formatMessage
  // const questions = quizData.preguntas; // Get the questions from the JSON file
  const [selectedLanguage, setSelectedLanguage] = useState(context.locale); // Estado para almacenar el valor seleccionado en el campo select

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedLanguage(selectedValue); // Actualiza el estado con el valor seleccionado
    context.selectLanguage(selectedValue); // Llama al método selectLanguage del contexto
  };
  // Antes de tu componente Quizz
  const savedSelection = localStorage.getItem("selectedOption");
  const initialSelectedOption = savedSelection
    ? parseInt(savedSelection)
    : null;
  const questions =
    selectedLanguage === "en"
      ? quizDataIngles.preguntas
      : quizDataEspañol.preguntas;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  // const [selectedOption, setSelectedOption] = useState(null);
  const [timer, setTimer] = useState(12); // Temporizador de 5 segundos
  const [timerColor, setTimerColor] = useState("green"); // Color inicial del temporizador
  const [selectedOption, setSelectedOption] = useState(() => {
    const savedSelection = localStorage.getItem("selectedOption");
    return savedSelection ? parseInt(savedSelection) : null;
  });

  const handleOptionSelect = (optionId) => {
    setSelectedOption(optionId);
  };
  useEffect(() => {
    localStorage.setItem("selectedOption", selectedOption || "");
  }, [selectedOption]);

  const handleNextQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedOption === currentQuestion.respuesta_correcta) {
      setScore(score + 1);
    }
    setSelectedOption(null);
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimer(12); // Reiniciar el temporizador
      setTimerColor("green"); // Reiniciar el color del temporizador
    } else {
      setShowResult(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setTimer(12); // Reiniciar el temporizador
      setTimerColor("green"); // Reiniciar el color del temporizador
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setTimer(12);
    setTimerColor("green");
  };

  useEffect(() => {
    if (!showResult) {
      const timerInterval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 0) {
            handleNextQuestion();
            return 12; // Reiniciar el temporizador
          }
          if (prevTimer <= 4) {
            setTimerColor("#B71C1C"); // Cambiar el color a rojo gradualmente
          } else if (prevTimer <= 8) {
            setTimerColor("yellow"); // Cambiar a amarillo/naranja
          } else {
            setTimerColor("green"); // Mantener verde
          }
          return prevTimer - 1;
        });
      }, 1000); // Cambié a 1000 ms para que sea más suave el cambio de color

      return () => clearInterval(timerInterval);
    }
  }, [currentQuestionIndex, showResult]);

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center">
      <div className="backhomebt">
        <Link className="rut" to="/welcome">
          <span className="hoomm">HOME</span>
          <div className="wavesbt"></div>
        </Link>
      </div>
      <video
        className="absolute inset-0 object-cover w-full h-full"
        src="/video/aguaBG.mp4"
        type="video/mp4"
        autoPlay
        loop
        muted
      />
      {/* <div className="relative max-w-lg w-full z-12 shadow-lg rounded-lg p-4" style={{backgroundColor:"#6ebea5"}}> */}
      <div className="relative max-w-lg bg-white w-full z-12 shadow-lg rounded-lg p-4">
        {!showResult && (
          <div
            className="absolute top-0 left-0 right-0 bg-white p-2 text-center"
            style={{
              color: timerColor != "yellow" ? "whitesmoke" : "black",
              background: timerColor,
              transition: "background 1s linear",
            }}
          >
            {timer}
          </div>
        )}
        {showResult ? (
          <div className="!text-center">
            <h2 className="text-2xl font-semibold mb-4">
              <FormattedMessage
                id="quiz.end"
                defaultMessage="Quiz completed!"
              />
            </h2>
            <div
              className="text-lg mb-4"
              style={{ textAlign: "center !important" }}
            >
              <FormattedMessage id="quiz.score" defaultMessage="Your score" />:{" "}
              {score}
            </div>
            <button
              className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
              onClick={resetQuiz}
            >
              <FormattedMessage
                id="quiz.tryAgain"
                defaultMessage="Try Again!"
              />
            </button>
          </div>
        ) : (
          <div className="text-center">
            <div className="mt-8">
              <FormattedMessage id="quiz.question" defaultMessage="Question" />:{" "}
              {currentQuestionIndex + 1}/{questions.length}
            </div>
            <h2 className="text-2xl font-semibold mb-4">
              {questions[currentQuestionIndex].pregunta}
            </h2>
            {/* <ul> */}
            <div className="grid grid-cols-1 gap-4">
              {questions[currentQuestionIndex].opciones.map((option) => (
                <div
                  key={option.id}
                  className={`bg-teal-50 hover:bg-neutral-100 rounded-lg p-4 shadow-md cursor-pointer ${
                    selectedOption === option.id
                      ? "border-4 border-teal-500"
                      : ""
                  }`}
                  onClick={() => handleOptionSelect(option.id)}
                >
                  <p>{option.texto}</p>
                </div>
              ))}
            </div>
            {/* </ul> */}
            <div className="flex justify-between mt-4">
              <button
                className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
                onClick={handlePreviousQuestion}
              >
                <FormattedMessage
                  id="quiz.previous"
                  defaultMessage="Previous"
                />
              </button>
              <button
                className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleNextQuestion}
              >
                <FormattedMessage id="quiz.next" defaultMessage="Next" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quizz;
