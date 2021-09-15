export function initInitiation(params) {
  const div = document.createElement("div");

  div.innerHTML = `
    <div class="initiation__container">
        <div class="initiation__container-text">
            <my-text variant="instrucciones">Presioná jugar y elegí: piedra, papel o tijera antes de que pasen los 3 segundos.</my-text>
        </div>
        <div class="initiation__container-button">
            <my-button variant="blue" class="button">¡Jugar!</my-button>
        </div>
        <div class="initiation__container-hands">
          <my-hands material="piedra"></my-hands>
          <my-hands material="papel"></my-hands>
          <my-hands material="tijera"></my-hands>
        </div>
    </div>
    `;

  const button = div.querySelector(".button");
  button.addEventListener("click", () => {
    params.goTo("/move");
  });
  return div;
}
