import { state } from "../../state";

export function initMove(params) {
  const countdown: number = 3;
  const div = document.createElement("div");
  div.classList.add("move_container");
  div.innerHTML = `
        <div class="move__countdown-container">
            <countdown-timer>${countdown}</countdown-timer>
        </div>
        <div class="move__player-hands">
            <my-hands class="move__player-play" material="piedra"></my-hands>
            <my-hands class="move__player-play" material="papel"></my-hands>
            <my-hands class="move__player-play" material="tijera"></my-hands>
        </div>
        `;

  function pushHistoryAndResults(playerPlay) {
    state.setPlayerPlay(playerPlay);
    state.setComputerPlay();
    const currentState = state.getData();
    const computerPlay = currentState.currentGame.computerPlay;
    const myPlay = currentState.currentGame.myPlay;

    currentState.history.push({
      myPlay: currentState.currentGame.myPlay,
      computerPlay: currentState.currentGame.computerPlay,
    });
    state.setState(currentState);

    div.innerHTML = `
        <div class="move__hands-selected game__animation-down">
            <my-hands material="${computerPlay}" computer="true"></hands>
        </div>
        <div class="move__hands-selected game__animation-up">
            <my-hands material="${myPlay}"></my-hands>
        </div>
        `;

    const whoWins = state.whoWins(myPlay, computerPlay);
    const intervalUntilResult = setInterval(() => {
      if (whoWins == "ganaste") {
        params.goTo("/result/win");
      } else if (whoWins == "perdiste") {
        params.goTo("/result/lose");
      } else {
        params.goTo("/result/equal");
      }
      window.clearInterval(intervalUntilResult);
    }, 2000);
  }

  const style = document.createElement("style");
  style.innerHTML = `
        .player-play.selected {
            animation: move-up 300ms forwards;
        }
        @keyframes move-up {
            0% {
                opacity: 0.5;
                transform: translateY(0);
            }
            100% {
                opacity: 1;
                transform: translateY(-40px);
            }
        }
        
        .player-play{
          cursor: pointer;
            position: relative;
            top: 15px;
            opacity: 0.5;
        }
    `;

  div.querySelector(".move__player-hands").appendChild(style);

  const playerPlaysArray = div.querySelector(".move__player-hands").children;
  for (let p of playerPlaysArray) {
    p.classList.add("player-play");
    p.addEventListener("click", (e) => {
      const thisPlayEl: any = e.target;
      if (thisPlayEl.classList.contains("selected")) {
        thisPlayEl.classList.remove("selected");
      } else {
        for (let i of playerPlaysArray) {
          if (i.classList.contains("selected")) {
            i.classList.remove("selected");
          }
        }
        thisPlayEl.classList.add("selected");
      }
    });
  }

  let intervalCounter = countdown + 1;
  let playerPlayEl: any = div.querySelector(".selected") || "none";

  const countDownInterval = setInterval(() => {
    intervalCounter--;

    playerPlayEl = div.querySelector(".selected") || "none";
    if (intervalCounter == 0 && playerPlayEl == "none") {
      params.goTo("./initiation");
    } else if (intervalCounter == 0) {
      pushHistoryAndResults(playerPlayEl.material);
      window.clearInterval(countDownInterval);
    }
  }, 1000);

  return div;
}
