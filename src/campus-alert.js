import { LitElement, html, css } from 'lit';
import "@lrnwebcomponents/meme-maker/meme-maker.js";

export class CampusAlert extends LitElement {

  static get tag() {
    return 'campus-alert';
  }

  static get properties() {
    return {
       alertType: { type: String},
       sticky: { type: Boolean, reflect: true},
       opened: {type: Boolean, reflect: true},
       alertMessage: {type: String},
       date: {type: String},
    };
  }

  constructor() {
    super();
    this.alertType = "";
    this.opened = true;
    this.sticky = false;
    this.alertMessage = " ";
    this.date = " ";
  }
  

  static get styles() {
    return css`
    :host([sticky]){
      position: sticky;
      top: 0;
    }
  
  .alert-wrapper {
    background-color: #ff471a;
    border-color: yellow;
  }
  .date-wrapper{
    background-color:#ff704d;
    font-size:20px;
    font-weight:bold;
    padding:1px;
  }
  .message-wrapper{
    text-align: center;
    margin:0px;
    padding:5px;
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
openedAlert(color){
  return html`  
 <div class ="alert-wrapper" ?sticky="${this.sticky}"> 
        <div class ="date-wrapper">
            <p class = "date" >${this.date}</p>
        </div>
        <button class = "close-alert" ?open="${this.opened}" @toggle="${this.openChanged}">CLOSE</button>
    <div class = "message-wrapper">
          <p class = "alert-message">${this.alertMessage}</p>
      </div>
    </div>
  `;}
  
closedAlert(){

}  

  render() { 
    if (this.alertType = "notice") color = "blue";

    return (this.opened) ? this.openedAlert() : this.closedAlert();
  
    }

  }
globalThis.customElements.define(CampusAlert.tag, CampusAlert);

