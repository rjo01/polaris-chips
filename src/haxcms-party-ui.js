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
      position: absolute;
      top: 0;
      right: 0;

    }
    .save {
      font-family: 'Press Start 2P', sans-serif;
      background-color: var(--ddd-theme-default-athertonViolet);
    }

    
    .change-character {
      padding: 10px;
    }
    .container {
      background-image: url('https://cdn1.vectorstock.com/i/1000x1000/73/95/pixel-game-background-vector-15317395.jpg');
      background-size: cover;
      border: 4px solid #af4c7a;
      border-radius: 10px;
      margin: 30px auto; /* Center the container horizontally with auto margins */
      padding: 20px;
      min-height: 300px; 
      width: 90%; 
      max-width: 800px; /* Set maximum width */
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
}
    .default-container {
      display: inline-block;

    }
    .user-container {
  display: flex;
  flex-wrap: wrap; /* Allow characters to wrap to the next line */
  justify-content: flex-start; /* Align characters to the left */
}

.character-container {
  margin: 10px; /* Add margin to create space between characters */
  position: relative; /* Set position to relative */
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
      font-family: "Press Start 2P";
      font-weight: bold;
    }
    .title {
      font-size: 50px;
      font-weight: bold;
      text-align: center;
      font-family: 'Press Start 2P', cursive;
      color: #470404; /* Set the text color to white */
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* Add a text shadow */
      margin-bottom: 20px; /* Add some space below the title */

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

    const usernameReq = /^[a-z0-9]{2,8}$/;
    if (!usernameReq.test(this.characterName)) {
      console.warn('The username does not meet requirements');
      alert(`The username does not meet requirements`);  
      return;
    }

    const isNameExists = this.items.some(item => item.name === this.characterName);
    if (isNameExists) {
      alert('This name already exists! Please try again.');
      return;
  }


    
    this.items.push(character);
    this.requestUpdate();
    console.log(this.items);
  }

  deleteItem(index) {  
    this.items.splice(index, 1);
    this.requestUpdate();
    console.log(this.items);
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
    const namesArray = this.items.map(item => item.name);
    const namesString = namesArray.join(', ');
   
    console.log('The party has been saved! Users:', namesArray);
    alert(`The party has been saved! Users: ${namesString}!`);
    console.log('The party has been saved! Users:', namesArray);
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
     
     <div class = title>Start your party!!</div>
     <div class = "button-container">
      <input type="text" @input="${this.nameChange}" placeholder="Enter username ...">
      <button class="add" @click="${this.addItem}">Add User</button>
      <button class="save" @click="${this.saveItem}">Save Members to Party!</button>
     </div>
     <div class="user-container">
        ${this.items.map((character, index) => html`
        <div class="character-container">
            <rpg-character class="character" hat="${character.hat}" seed="${character.seed}" ></rpg-character>
            <div class="character-name">${character.name}</div>
            <button class="delete" @click="${() => this.deleteItem(index)}">X</button>
          </div>
  `)}
</div>
     </confetti-container>
  </div>
  
    `;
  }
}

customElements.define(PartyUI.tag, PartyUI);
