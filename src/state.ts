type Play = "piedra" | "papel" | "tijera";

const state = {
  data: {
    currentGame: {
      ComputerPlay: "",
      MyPlay: "",
    },
    history: [],
  },

  init() {
    const localState = localStorage.getItem("save-state");
    if (localState) {
      state.setState(JSON.parse(localState));
    }
  },
  getData() {
    return this.data;
  },
  setScore() {
    const currentState = this.getData().history;
    const score = {
      winScore: 0,
      loseScore: 0,
    };
    for (const item of currentState) {
      if (state.whoWins(item.myPlay, item.computerPlay) == "ganaste") {
        score.winScore++;
      } else if (state.whoWins(item.myPlay, item.computerPlay) == "perdiste") {
        score.loseScore++;
      }
    }
    return score;
  },

  whoWins(myPlay: Play, computerPlay: Play) {
    const ganaPiedra = myPlay == "piedra" && computerPlay == "tijera";
    const ganaPapel = myPlay == "papel" && computerPlay == "piedra";
    const ganaTijera = myPlay == "tijera" && computerPlay == "papel";

    const ganaste = [ganaPiedra, ganaPapel, ganaTijera].includes(true);

    if (ganaste == true) {
      return "ganaste";
    } else if (myPlay == computerPlay) {
      return "empataste";
    } else {
      return "perdiste";
    }
  },

  setPlayerPlay(playerPlay: Play) {
    const lastState = this.getData();
    lastState.currentGame.myPlay = playerPlay;
  },
  setComputerPlay() {
    const currentState = this.getData();
    const computerMove = ["tijera", "papel", "piedra"];
    const randomMove = Math.floor(Math.random() * 3);
    currentState.currentGame.computerPlay = computerMove[randomMove];
    this.setState(currentState);
  },

  setState(newState) {
    this.data = newState;
    localStorage.setItem("save-state", JSON.stringify(newState));
  },

  suscribe(callback: (any) => any) {
    this.listeners.push(callback);
  },
};

export { state };
