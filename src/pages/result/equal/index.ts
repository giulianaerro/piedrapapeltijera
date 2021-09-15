import { state } from "../../../state";

export function initResultEqual(params) {
  const score = state.setScore();

  const div = document.createElement("div");
  div.classList.add("result-equal__main-container");
  div.innerHTML = `
    <div class="result-equal__result-img-container">
        <result-img result="Empataste">Empataste</result-img>
    </div>

    <div class="result-equal__score-container">
        <my-text variant="score">Puntuación:</my-text>
      <div class="result-equal__score">
        <my-text variant="results">Yo: ${score.winScore}</my-text>
        <my-text variant="results">Computadora: ${score.loseScore}</my-text>
      </div>
    </div>

    <div class="result__container-button">
      <my-button variant="blue" class="button-blue">Volver a Jugar</my-button>
      <my-button variant="red" class="button-red">Volver al Inicio</my-button>
      </div>
      `;
  const playAgainButton = div.querySelector(".button-blue");
  const inicio = div.querySelector(".button-red");

  inicio.addEventListener("click", () => {
    params.goTo("/welcome");
  });
  playAgainButton.addEventListener("click", () => {
    params.goTo("/move");
  });
  return div;
}
