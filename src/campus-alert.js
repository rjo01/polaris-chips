import { LitElement, html, css } from 'lit';
import "@lrnwebcomponents/meme-maker/meme-maker.js";
import { CampusAlert } from './campus-alert';


export class CampusAlert extends LitElement {

  static get tag() {
    return 'campus-alert';
  }

  static get properties() {
    return {
        
    };
  }

  constructor() {
    super();
    
  }
  

  static get styles() {
    return css`

    
    `;
  }

  
  render() {
    return html`
    <div class ="alert-content-wrapper"> 
        <div class ="date">
            <p>"2-22-2024"</p>
        </div>
    </div>`;
    }

  
}

globalThis.customElements.define(CampusAlert.tag, CounterApp);

