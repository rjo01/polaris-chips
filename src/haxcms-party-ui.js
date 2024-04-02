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
     display: block;
    }
    .add {
      font-family: "Press Start 2P", sans-serif;
      background-color: var(--ddd-theme-default-futureLime);
      padding: 10px;
    }
    .delete {
      font-family: "Press Start 2P", sans-serif;
      background-color: var(--ddd-theme-default-discoveryCoral);
      height: 20px; 
      width: 20px; 
      display: flex;
      justify-content: center;
      align-items: center;

    }
    .save {
      font-family: 'Press Start 2P', sans-serif;
      background-color: var(--ddd-theme-default-athertonViolet);
    }
    .change-character {
      padding: 10px;
    }
    .container {
      background-color: var(--ddd-theme-default-link80);
      margin: 30px;
      overflow: scroll;
      
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
      font-family: 'Press Start 2P', sans-serif;
      
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

  deleteItem(index) {  
    this.items.splice(index, 1);
    this.requestUpdate();
    console.log(items);
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
     <div class="character-name">rjo5309</div>
        ${this.items.map((character) => html`
          <rpg-character class = "character" hat="${character.hat}" seed="${character.seed}" ></rpg-character>
          <div class="character-name">${character.name}</div>
          <button class="delete" @click="${() => this.deleteItem()}">X</button>
        `)}
      </div>
     <div class = "button-container">
      <input type="text" @input="${this.nameChange}" placeholder="Enter username">
      <button class="add" @click="${this.addItem}">Add User</button>
      <button class="save" @click="${this.saveItem}">Save Members to Party!</button>
     </div>
     </confetti-container>
  </div>
  
    `;
  }
}

customElements.define(PartyUI.tag, PartyUI);
