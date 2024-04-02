import { html, css } from 'lit';
import { DDD } from '@lrnwebcomponents/d-d-d';
import "@lrnwebcomponents/rpg-character/rpg-character.js";

export class PartyUI extends DDD {

  static get tag() {
    return 'party-ui'
  }

  static properties = {
    items: { type: Array },
    characterName: { type: String } 
  }

  static styles = css`
    :host {
     display: block
    }
    .add {
      font-family: "Press Start 2P", sans-serif;
      background-color: var(--ddd-theme-default-futureLime);
      padding: 10px;
    }
    .delete {
      font-family: "Press Start 2P", sans-serif;
      background-color: var(--ddd-theme-default-discoveryCoral);
      padding: 10px;
    }
    .save {
      font-family: "Press Start 2P", sans-serif;
      background-color: var(--ddd-theme-default-athertonViolet);
    }
    .change-character {
      padding: 10px;
    }
    .container {
      background-color: var(--ddd-theme-default-link80);
      margin: 30px;
    }
    .character-container {
      display: flex;
      justify-content: center;
    }
    .button-container{
      display: flex;
      justify-content: center;
    }
    .character {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .character-name {
      font-family: "Press Start 2P", sans-serif;
      
    }
  `;

  constructor() {
    super();
    this.items = [];
    this.characterName = ""; 
  }

  addItem() {
    const randomNumber = Math.floor(Math.random() * 10000000)+ 1;
    const character = {
      hat: "random", 
      seed: this.generateSeed(this.characterName),
      name: this.characterName
    };
  
    this.items.push(character);
    this.requestUpdate();
  }

  deleteItem() {
    if (this.items.length > 0) {
      this.items.pop();
      this.requestUpdate();
    }
  }
  makeItRain() {
    import("@lrnwebcomponents/multiple-choice/lib/confetti-container.js").then(
      (module) => {
        setTimeout(() => {
          this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
        }, 0);
      }
    );
  }
  saveItem() {
    this.makeItRain();
  }

  generateSeed(name) {
    return name; 
  }

  nameChange(e) {
    this.characterName = e.target.value; 
  }

  render() {
    return html`
    <div class = "container">
    <confetti-container id="confetti">
     <div class = "character-container">
     <rpg-character hat="random" seed="random"></rpg-character>
        ${this.items.map((character) => html`
          <rpg-character class = "character" hat="${character.hat}" seed="${character.seed}" ></rpg-character>
          <div class="character-name">${character.name}</div>
          <!-- <div>${this.characterName}</div> -->
          <!-- <button class="delete" @click="${() => this.deleteItem(index)}">X</button> -->
        `)}
      </div>
     <div class = "button-container">
      <input type="text" @input="${this.nameChange}" placeholder="Enter name">
      <button class="add" @click="${this.addItem}">Add User</button>
      <button class="delete" @click="${this.deleteItem}">Delete User</button>
      <button class="save" @click="${this.saveItem}">Save Members to Party!</button>
     </div>
     </confetti-container>
  </div>
  
    `;
  }
}

customElements.define(PartyUI.tag, PartyUI);
