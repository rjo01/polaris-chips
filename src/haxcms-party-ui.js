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

    my-item  {
      display: block;
      background-color: orange;
      padding: 16px;
    }
    .add {
      background-color: lightgreen;
      padding: 10px;
    }
    .delete {
      background-color: lightcoral;
      padding: 10px;
    }
    .change-character {
      padding: 10px;
    }
    .container {
      background-color: lightblue;
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
      margin-top: 8px;
    }
  `;

  constructor() {
    super();
    this.items = [];
    this.characterName = ""; 
  }

  addItem() {
    const randomNumber = globalThis.crypto.getRandomValues(new Uint32Array(1))[0];
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

  generateSeed(name) {
    return name; 
  }

  nameChange(e) {
    this.characterName = e.target.value; 
  }

  render() {
    return html`
    <div class = "container">
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
     </div>
  </div>
    `;
  }
}

customElements.define(PartyUI.tag, PartyUI);
