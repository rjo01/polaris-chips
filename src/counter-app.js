import { LitElement, html, css } from 'lit';
import "@lrnwebcomponents/meme-maker/meme-maker.js";


export class CounterApp extends LitElement {

  static get tag() {
    return 'counter-app';
  }

  static get properties() {
    return {
        counter: { type: Number},
        min: {type: Number},
        max: {type: Number},
    };
  }

  constructor() {
    super();
    this.counter = 0;
    this.min = 10;
    this.max = 25;
  }
  

  static get styles() {
    return css`

    .counter{
        font-size: 20px;
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
  
  updateColor() {
    if (this.counter == this.min || this.counter == this.max) {
    this.style.color = 'red';
    }
    else {
    this.style.color = 'black';
    }
    if (this.counter == 18 || this.counter == 21) {
    this.style.color = 'green';
    }
    else {
    this.style.color = 'black';
    }
  } 



makeItRain() {
  // this is called a dynamic import. It means it won't import the code for confetti until this method is called
  // the .then() syntax after is because dynamic imports return a Promise object. Meaning the then() code
  // will only run AFTER the code is imported and available to us
  import("@lrnwebcomponents/multiple-choice/lib/confetti-container.js").then(
    (module) => {
      // This is a minor timing 'hack'. We know the code library above will import prior to this running
      // The "set timeout 0" means "wait 1 microtask and run it on the next cycle.
      // this "hack" ensures the element has had time to process in the DOM so that when we set popped
      // it's listening for changes so it can react
      setTimeout(() => {
        // forcibly set the poppped attribute on something with id confetti
        // while I've said in general NOT to do this, the confetti container element will reset this
        // after the animation runs so it's a simple way to generate the effect over and over again
        this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
      }, 0);
    }
  );
}
updated(changedProperties) {
  if (changedProperties.has('counter')) {
    // do your testing of the value and make it rain by calling makeItRain
    if(this.counter == 21) {
    this.makeItRain();
      }
    // if(this.counter == 18) {
    //   this.updateColor2();
    // }

   this.updateColor();
  }
}
 
  render() {
    return html`
    <div class="counter-container">
        <h1>Counter-App</h1>
        <confetti-container id="confetti">
            <div class="counter-app">
                <div class="counter">${this.counter}</div>
                <button class="increase" ?disabled="${this.max === this.counter}" on @click="${this.add}">+</button>
                <button class="decrease" ?disabled="${this.min === this.counter}" on @click="${this.subtract}">-</button>
            </div> 
    </confetti-container>
    </div>`;
    }

  
}

globalThis.customElements.define(CounterApp.tag, CounterApp);

