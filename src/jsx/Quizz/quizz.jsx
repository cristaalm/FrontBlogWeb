import React from "react";
import "../../css/quizz.css";

function Quizz() {
  return (
    <div className="body">
      <div className="fondo">
        <img className="imgfondo" src="/img/quizzav.gif" alt="background" />
      </div>

      <div className="tablerojuego">
        <div className="questionbox">
          <div className="text">Aquí va la pregunta xd</div>
        </div>
        <div className="answerbox">
          <div className="answer1">Opcion1</div>
          <div className="answer2">Opcion2</div>
          <div className="answer3">Opcion3</div>
          <div className="answer4">Opcion4</div>
        </div>
      </div>
    </div>
  );
}

export default Quizz;
