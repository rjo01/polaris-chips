import { LitElement, html, css } from 'lit';
import "@lrnwebcomponents/meme-maker/meme-maker.js";

export class CampusAlert extends LitElement {

  static get tag() {
    return 'campus-alert';
  }

  static get properties() {
    return {
       alertType: { type: Boolean},
    };
  }

  constructor() {
    super();
    this.alertType = true;
    
  }
  

  static get styles() {
    return css`
  
  .alert-wrapper {
    background-color: #ff471a;
    border-color: yellow;
  }
  .date-wrapper{
    background-color:#ff704d;
    font-size:20px;
    font-weight:bold;
  }
  .message-wrapper{
    text-align: center;
  }
  .alert-image{
    height:50px;
  }
  .close-alert{
    background-color: transparent;
    position:absolute;
    top:0;
    right:0;
  }
    
    `;
  }
openChanged(e) {
    console.log(e.newState);
    if (e.newState === "open") {
      this.fancy = true;
    }
    else {
      this.fancy = false;
    }
  }  
closeAlert() {
  if (this.alertType == true)
  {
    alert.styles.display = 'none';
  }
}

  render() {
    return html`
    <div class ="alert-wrapper"> 
        <div class ="date-wrapper">
            <p class = "date" >2-22-2024 7:00 AM</p>
            <!-- <p class = "time"></p> -->
        </div>
        <button class = "close-alert" ?open="${this.alertType}" @toggle="${this.openChanged}">
        <summary>CLOSE</summary>
          <div>
            <slot>${this.description}</slot>
            </div>
        </button>
        <img class = "alert-image" src= "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.hiclipart.com%2Ffree-transparent-background-png-clipart-ddryp&psig=AOvVaw2ck-XpvgG_ZUrsIkX975T-&ust=1709087226677000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCNCCgpq8yoQDFQAAAAAdAAAAABAP">
    <div class = "message-wrapper">
          <p class = "alert-message">This is a very important message with a super important alert!</p>
      </div>
    </div>`;
    }

  
}

globalThis.customElements.define(CampusAlert.tag, CampusAlert);

