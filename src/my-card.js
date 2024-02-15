import { LitElement, html, css } from 'lit';
import "@lrnwebcomponents/meme-maker/meme-maker.js";


export class MyCard extends LitElement {

  static get tag() {
    return 'my-card';
  }

  constructor() {
    super();
    this.fancy = false;
    this.title = "My card";
    this.image = "My image";
    this.bodyText = "My text";
    this.borderColor = "My border-color";
    this.buttonColor = "My button-color";
    this.top = "My top";
    this.bottom = "My bottom";
  }

  static get styles() {
    return css`
      :host([fancy]) {
        display: inline-block;
        background-color: pink;
        max-width: 400px; 
        border: 2px solid burlywood;
        box-shadow: 10px 5px 5px red;
}
      :root, html, body {
          font-size: 16px; 
          --basic-color: #ff9700;
  /* think of this as a
  base font size that all 'em' 
  values will be multiplied by */
      }
  .card {  
    
    width: 200px;
    border: 2px solid var(--border-color, #E6AD00);;
    border-radius: 8px;
    margin: 16px;
    padding: 12px;
    background-color: beige;
  }
#cardlist {
  display: inline-block;
  
}
.change-color{
  background-color: orange
}

.card-title {
  font-family: "Snell Roundhand", cursive;
  color: black;
  text-align: center;
}

.card-text {
  font-family: "Snell Roundhand", cursive;
  font-size: 20px;
  text-align: center;
}
.card-image {
  height: 200px;
  width: 100%;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

  .card-btn {
  background-color: red;
  color: white;
  font-size: 20px;
  border-radius: 10%;
  padding: 16px 16px 16px 16px;
  margin: 4px 4px 4px 32px;
  }
  
  .btn:focus,
  .btn:hover {
  background-color: orange;
  }
 @media only screen and (min-device-width : 800px) {
  .btn{
    display: none;
    }
  
  @media only screen and (max-device-width : 500px) {
  .btn{
    display: none;
    }
  } 
}
  details div {
    border: 2px solid black;
    padding: 8px;
    height: 70px;
    overflow: auto;
  }

    `;
  }
  // put this anywhere on the MyCard class; just above render() is probably good
  openChanged(e) {
    console.log(e.newState);
    if (e.newState === "open") {
      this.fancy = true;
    }
    else {
      this.fancy = false;
    }
  }

  render() {
    return html` 
    <div class="cardlist">
    <section class="card" style="--border-color: ${this.borderColor};">
      <<meme-maker alt="Cat stalking a small toy" image-url="${this.image}" top-text="I bring you" bottom-text="the death">
        </meme-maker>">
      <div class="card-content">
        <h2 class="card-title">${this.cardtitle}</h2>
        <a href="${this.link}"><button style="--button-color: ${this.buttonColor};">Details</button></a>
      </div>
      <details ?open="${this.fancy}" @toggle="${this.openChanged}">
        <summary>Description</summary>
        <div>
          <slot>${this.description}</slot>
            </div>
        </details>
    </section>
  </div>`;
  }

  static get properties() {
    return {
      fancy: { type: Boolean, reflect: true },
      cardtitle: { type: String },
      image: { type: String },
      description: { type: String },
      link: { type: String },
      borderColor: { type: String },
      bottom: {type: String},
      top: {type: String},
    };
  }
}

globalThis.customElements.define(MyCard.tag, MyCard);