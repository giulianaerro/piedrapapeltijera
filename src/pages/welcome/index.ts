export function initWelcome(params) {
  const div = document.createElement("div");

  div.innerHTML = `
  <div class="welcome__container">
  <div class="welcome__container-title">
      <my-text variant="title">Piedra, Papel, ó Tijera</my-text>
  </div>
  <div class="welcome__container-button">
      <my-button variant="blue" class="button">Empezar</my-button>
  </div>
  <div class="welcome__container-hands">
      <my-hands material="piedra"></my-hands>
      <my-hands material="papel"></my-hands>
      <my-hands material="tijera"></my-hands>
  </div>
</div>
  `;

  const button = div.querySelector(".button");
  button.addEventListener("click", () => {
    params.goTo("/initiation");
  });
  return div;
}
