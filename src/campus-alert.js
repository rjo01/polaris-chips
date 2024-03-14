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
    background-color:#888888;
  }
  .date-wrapper{
    background-color: #efecef;
    font-size:20px;
    font-weight:bold;
    padding:1px;
    height:50px;
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
  .message{
    color:grey;
    font-size: 20px;
  }
    
    `;
  }

  toggleAlert() { 
    this.opened =!this.opened; 
    localStorage.setItem("campus-alert-opened-state", this.opened);
  } 

openedAlert(color){
  return html`  
 <div class ="alert-wrapper" ?sticky="${this.sticky}"> 
        <div class ="date-wrapper">
            <div class = "date" >${this.date}</div>
        </div>
        <!-- <button class = "close-alert" ?open="${this.opened}" @toggle="${this.openChanged}">CLOSE</button> -->
    <div class = "message-wrapper">
          <div class="campus-alert" style="background-color:${color}">
          <div class="message"><svg xmlns="http://www.w3.org/2000/svg" style="height: 50px; width: 50px; align-items: center;" viewBox="0 0 24 24"><title>alert-symbol</title><path d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z" /></svg>
          ${this.alertMessage}
          </div>
      </div>
    </div>
    <button @click="${this.toggleAlert}">CLOSE</button>
</div>  
  `;}
  
closedAlert(){
  return html`
<div class = "closed" ?sticky="${this.sticky}">
  <div class ="closed-toggle-button" @click="${this.toggleAlert}">
  <svg xmlns="http://www.w3.org/2000/svg" style="height: 50px; width: 50px;" viewBox="0 0 24 24"><title>alert-circle-outline</title><path d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z" /></svg>
            New Alert!
  <svg xmlns="http://www.w3.org/2000/svg" style="height: 50px; width: 50px;" viewBox="0 0 24 24"><title>chevron-down</title><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>
  </div>
</div> 
`;}

  render() { 
    let color = "grey";
    if (this.alertType === "notice") color = "blue";
    if (this.alertType === "warning") color = "yellow";
    if (this.alertType === "alert") color = "red";

    if (this.alertType === "notice") (this.alertMessage) = "This is not that important";
    if (this.alertType === "warning") (this.alertMessage) = "This is kind of important";
    if (this.alertType === "alert") (this.alertMessage) = "THIS IS VERY IMPORTANT";
    return (this.alertType) ? this.openedAlert(color) : this.closedAlert();
  
    }

  }
globalThis.customElements.define(CampusAlert.tag, CampusAlert);

