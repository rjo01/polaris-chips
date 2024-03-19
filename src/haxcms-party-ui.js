import { DDD, html, css } from 'lit';
import "@lrnwebcomponents/meme-maker/meme-maker.js";
import { DDD } from '@lrnwebcomponents/d-d-d';

export class HaxCMS extends DDD {

  static get tag() {
    return 'haxcms-aprty-ui';
  }

  static get properties() {
    return {
       
    };
  }

  constructor() {
    super();
    
  }
  

  static get styles() {
    return [
    super.styles,
    css`
        :host {
          display: block;
        }
        .my-div {
          padding: var(-ddd-spacing-5);
          margin: var(--ddd-spacing-2) var(--ddd-spacing-0);
          color: var(--ddd-theme-default-keystoneYellow);
        }
      `];
  }



  render() { 
    <div class = "button-container">
        <button class = "add-rpg">Add RPG!</button>
    </div>
    }

  }
globalThis.customElements.define(HaxCMS.tag, HaxCMS);

