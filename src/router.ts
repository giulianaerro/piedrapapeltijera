import { initWelcome } from "./pages/welcome";
import { initInitiation } from "./pages/initiation";
import { initMove } from "./pages/move";
import { initResultLose } from "./pages/result/lose";
import { initResultWin } from "./pages/result/win";
import { initResultEqual } from "./pages/result/equal";

const routes = [
  {
    path: /\/welcome/,
    component: initWelcome,
  },
  {
    path: /\/initiation/,
    component: initInitiation,
  },
  {
    path: /\/move/,
    component: initMove,
  },
  {
    path: /\/result\/win/,
    component: initResultWin,
  },
  {
    path: /\/result\/lose/,
    component: initResultLose,
  },
  {
    path: /\/result\/equal/,
    component: initResultEqual,
  },
];

export function initRouter(container: Element) {
  function goTo(path) {
    history.pushState({}, "", path);
    handleRoute(path);
  }

  function handleRoute(route) {
    console.log("El handleRoute recibió una nueva ruta", route);

    for (const r of routes) {
      if (r.path.test(route)) {
        const el = r.component({ goTo: goTo });

        if (container.firstChild) {
          container.firstChild.remove();
        }
        container.appendChild(el);
      }
    }
  }

  if (location.host.includes("github.io") || "/") {
    goTo("/piedrapapeltijera/welcome");
  } else {
    handleRoute(location.pathname);
  }

  window.onpopstate = function () {
    handleRoute(location.pathname);
  };
}
