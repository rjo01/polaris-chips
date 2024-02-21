import { LitElement, html, css } from 'lit';
import "@lrnwebcomponents/meme-maker/meme-maker.js";


export class CounterApp extends LitElement {

  static get tag() {
    return 'counter-app';
  }

  static get properties() {
    return {
        counter: { type: Number },
        min: {type: Number},
        max: {type: Number},
    };
  }

  constructor() {
    super();
    this.counter = 0;
    this.min = 0;
    this.max = 10;
  }
  

  static get styles() {
    return css`

    .counter{
        font-size: 20px;
    }
    .counter-update{
        color: blue;
    }

    .increase {
       background-color: green;
       color: white
    }
    .decrease {
       background-color: red;
       color: white;
       margin: 12px;
    }
    .increase:focus,
    .increase:hover {
         background-color: orange;
  }
    .decrease:focus,
    .decrease:hover {
         background-color: orange;
  }
    `;
  }

  add (){
    if(this.counter < this.max){
        this.counter++;
    }

  }
  
  subtract () {
    if(this.counter > this.min){
        this.counter--;
    }
  }



  updateCounter () {
    const textElement = document.getElementById("counter");
    if(this.counter == 18 || this.counter == 21){
    textElement.style.color = "red"; 
    }
  }



 
  render() {
    return html`
    <div class="counter-container">
        <h1>Counter-App</h1>
            <div class="counter-app">
                <div class="counter">${this.counter}</div>
                <button class="increase" on @click="${this.add}">+</button>
                <button class="decrease" @click="${this.subtract}">-</button>
            </div> 
    </div>`;
    }

  
}

globalThis.customElements.define(CounterApp.tag, CounterApp);

