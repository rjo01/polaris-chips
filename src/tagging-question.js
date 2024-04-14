import { html, css } from 'lit';
import { DDD } from '@lrnwebcomponents/d-d-d';


export class taggingQuestion extends DDD {

  static get tag() {
    return 'tagging-question'
  }

  static properties = {
    
  }

  static styles = css`
  
    :host {
     display: block;
    }
    body {
  background: darksalmon;
}

.fill {
  background-color:blue;
  position: relative;
  height: 150px;
  width: 150px;
  top: 5px;
  left: 5px;
  cursor: pointer;
}
.fill:hover {
  outline: 2px solid blue;
}

.hold {
  border: solid 5px #ccc;
}

.empty {
  display: inline-block;
  height: 160px;
  width: 160px;
  margin: 10px;
  border: solid 3px salmon;
  background: white;
}

.hovered {
  background: #f4f4f4;
  border-style: dashed;
}

    
    
  `;

  constructor() {
    super();
    
  }
  dragDrop() {
const fills = document.querySelectorAll('.fill');
const empties = document.querySelectorAll('.empty');
var dragging = {};

// Loop through empty boxes and add listeners
for (const empty of empties) {
  empty.addEventListener('dragover', dragOver);
  empty.addEventListener('dragenter', dragEnter);
  empty.addEventListener('dragleave', dragLeave);
  empty.addEventListener('drop', dragDrop);
}
// Loop through fills and add listeners
for (const fill of fills) {
  fill.addEventListener('dragstart', dragStart);
  fill.addEventListener('dragend', dragEnd);
}

// Drag Functions

function dragStart() {
  dragging = this;
  this.className += ' hold';
  setTimeout(() => (this.className = 'invisible'), 0);
}

function dragEnd() {
  this.className = 'fill';
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
  this.className += ' hovered';
}

function dragLeave() {
  this.className = 'empty';
}

function dragDrop() {
  this.className = 'empty';
  this.append(dragging);
}

} 

  render() {
    return html`
    
    <div class="empty">
    
    <div class="fill" draggable="true"> </div>
  </div>

  <div class="empty">
    <div class="fill" draggable="true"> </div>
  </div>

  <div class="empty">
  </div>

  <div class="empty">
  </div>

  <div class="empty">
  </div>
    `;
  }
}

customElements.define(taggingQuestion.tag, taggingQuestion);
