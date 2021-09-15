import "./components/button";
import "./components/text";
import "./components/hands";
import "./components/timer";
import "./components/star-result";
import { initRouter } from "./router";
import { state } from "./state";

(function () {
  state.init();
  const root = document.querySelector(".root");
  initRouter(root);
})();
