import { LitElement, html, css } from 'lit';

/**
 * Now it's your turn. Here's what we need to try and do
 * 1. 
 */

export class MyCard extends LitElement {

  static get tag() {
    return 'my-card';
  }

  constructor() {
    super();
    this.title = "My card";
    this.image = "My image";
    this.bodyText = "My text";
    this.borderColor = "My border-color";
    this.buttonColor = "My button-color";
  }

  static get styles() {
    return css`
      :host {
        display: inline-flex;
      }
      :root, html, body {
          font-size: 16px; 
          --basic-color: #ff9700;
  /* think of this as a
  base font size that all 'em' 
  values will be multiplied by */
      }
  .card {  
    max-width:400px;
    border: 2px solid var(--border-color, #E6AD00);;
    border-radius: 8px;
    margin: 16px;
    padding: 12px;
    background-color: beige;
  }
#cardlist {
  display: flex;
}
body div div.card.change-color{
  background-color: var(--basic-color);
}

.card-title {
  font-family: "Times New Roman", serif;
  color: black;
  text-align: center;
}

.card-text {
  font-family: "Times New Roman", serif;
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

    `;
  }

  render() {
    return html` <div id="cardlist" class="card-list">
    <section class="card" style="--border-color: ${this.borderColor};">
      <img src="${this.image}" alt="${this.title}" class="card-image">
      <div class="card-content">
        <h2 class="card-title">${this.cardtitle}</h2>
        <p class="card-text">${this.bodyText}</p>
        <a href="${this.link}"><button style="--button-color: ${this.buttonColor};">Details</button></a>
      </div>
    </section>
  </div>`;
  }

  static get properties() {
    return {
      cardtitle: { type: String },
      image: { type: String },
      bodyText: { type: String },
      link: { type: String },
      borderColor: { type: String },
    };
  }
}

globalThis.customElements.define(MyCard.tag, MyCard);