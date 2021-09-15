const piedra = require("url:../../img/piedra.png");
const papel = require("url:../../img/papel.png");
const tijera = require("url:../../img/tijera.png");

customElements.define(
  "my-hands",
  class extends HTMLElement {
    shadow: ShadowRoot;
    material: string;
    computer: boolean = false;

    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
      this.material = this.getAttribute("material");
      this.computer = this.hasAttribute("computer");
    }
    connectedCallback() {
      this.render();
    }
    render() {
      const style = document.createElement("style");
      style.innerHTML = `
        .rotate{
          transform: rotate(180deg);        
        }
        .hands{
          width: 100%;
          height: 100%;

        `;
      const img = document.createElement("img");

      if (this.material == "piedra") {
        img.src = piedra;
      } else if (this.material == "papel") {
        img.src = papel;
      } else {
        img.src = tijera;
      }
      if (this.computer == true) {
        img.classList.add("rotate");
      }
      img.classList.add("hands");
      this.shadow.appendChild(style);
      this.shadow.appendChild(img);
    }
  }
);
