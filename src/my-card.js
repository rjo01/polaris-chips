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
        display: block;
      }
      :root, html, body {
  font-size: 16px; 
  --basic-color: #ff9700;
  /* think of this as a
  base font size that all 'em' 
  values will be multiplied by */
}
  .card {  
    width:400px;
    margin:12px 12px 12px 12px;
    padding:16px 16px 16px 16px;
    background-color: yellow;
  }
#cardlist {
  display: flex;
}
body div div.card.change-color{
  background-color: var(--basic-color);
}

.card-title {
  color: black;
  text-align: center;
}

p {
  font-size: 20px;
  text-align: center;
}
.card-image {
  height: 250px;
  width: 400px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
  .btn {
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
    return html`<div>${this.title}</div>`;
  }

  static get properties() {
    return {
      title: { type: String },
    };
  }
}