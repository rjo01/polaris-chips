// import { html, css } from 'lit';
// import { DDD } from '@lrnwebcomponents/d-d-d';
// // const fs = require('fs');



// export class taggingQuestion extends DDD {

//   static get tag() {
//     return 'tagging-question'
//   }
//   cons

//   static get properties() {
//     return {
//       question: { type: String },
//       answers: { type: Array }
//     };
//   }

//   constructor() {
//     super();
//     this.question= "";
//     this.answers = [];
//     this.fetchData();
//   }

//   static styles = css`
  
//     :host {
//      display: block;
//     }

// .fill {
//   background-color:blue;
//   position: relative;
//   height: 20px;
//   width: 50px;
//   top: 5px;
//   left: 5px;
//   cursor: pointer;
// }
// .fill:hover {
//   outline: 2px solid blue;
// }

// .hold {
//   border: solid 5px #ccc;
// }

// .empty {
//   display: inline-flex;
//   height:35px;
//   width: 43px;
//   margin: 5px;
//   border-radius: 10px;
//   border: 4px solid white;
// }

// .hovered {
//   background: #f4f4f4;
//   border-style: dashed;
// }
// .container {
//     background-image: url('https://www.dbackdrop.com/cdn/shop/products/D636.jpg?v=1602656440');
//     background-size: cover;
//     border: 15px solid tan;
//     border-radius: 10px;
//     margin: 30px auto; 
//     padding: 20px;
//     min-height: 300px; 
//     width: 90%; 
//     max-width: 800px; 
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
// }
// .title {
//     color: white;
//     font-family: 'Callie Chalk Font', sans-serif;
//     text-decoration: underline;
                                                
// }
// .answer-bank{
//     color: lightcoral;
//     font-family: 'Callie Chalk Font', sans-serif;
                                                
// }
// .choice{
//     display: inline-flex;
//     color: white;
//     font-family: 'Callie Chalk Font', sans-serif;
//     border-radius: 10px;
//     border: 4px solid white;                                            
// }
// .choice-container {
//     border-radius: 10px;
//     border: 4px dashed yellow;
//     margin-bottom:10px;

// }
// .response-text{
//     font-family: 'Callie Chalk Font', sans-serif;
//     color: lightblue;
// }
// .drop-container {
//       border: 2px dashed black; /* Style for the drop container */
//       padding: 10px;
//       margin-top: 20px;
//     }
    
//   `;

//   dragDrop() {
// const fills = document.querySelectorAll('.fill');
// const empties = document.querySelectorAll('.empty');
// var dragging = {};

// // Loop through empty boxes and add listeners
// for (const empty of empties) {
//   empty.addEventListener('dragover', dragOver);
//   empty.addEventListener('dragenter', dragEnter);
//   empty.addEventListener('dragleave', dragLeave);
//   empty.addEventListener('drop', dragDrop);
// }
// // Loop through fills and add listeners
// for (const fill of fills) {
//   fill.addEventListener('dragstart', dragStart);
//   fill.addEventListener('dragend', dragEnd);
// }

// // Drag Functions

// function dragStart() {
//   dragging = this;
//   this.className += ' hold';
//   setTimeout(() => (this.className = 'invisible'), 0);
// }

// // function dragEnd() {
// //   this.className = 'drop-container';
// // }

// // function dragOver(e) {
// //   e.preventDefault();
// // }

// // function dragEnter(e) {
// //   e.preventDefault();
// //   this.className += ' drop-container';
// // }

// // function dragLeave() {
// //   this.className = 'drop-container';
// // }

// // function dragDrop() {
// //   this.className = 'drop-container';
// //   this.append(dragging);
// // }
// function dragStart(e) {
//     e.dataTransfer.setData('text/plain', e.target.id);
//   }

//   function dragOver(e) {
//     e.preventDefault();
//   }

//   function dragEnter(e) {
//     e.preventDefault();
//     e.target.classList.add('hovered');
//   }

//   function dragLeave(e) {
//     e.target.classList.remove('hovered');
//   }

//   function dragDrop(e) {
//     e.preventDefault();
//     const draggedItemId = e.dataTransfer.getData('text/plain');
//     const draggedItem = document.getElementById(draggedItemId);
//     e.target.appendChild(draggedItem);
//     e.target.classList.remove('hovered');
//   }

// }



// connectedCallback() {
//     super.connectedCallback();
//     this.fetchData();
//   }

//   async fetchData() {
//     try {
//       const response = await fetch('questions.json'); // Replace 'question.json' with the path to your JSON file
//       const data = await response.json();
//       this.question = data.question;
//       this.answers = data.answers.map(answer => answer.answer);
//       this.requestUpdate(); // This triggers a re-render after data is fetched
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   }

//   render() {
//     return html`
//     <div class= "container">
//       <!-- <div class = "title">Question: What ex is the correct choice?</div>
//         <div class = "answer-bank"> Answer Bank:</div>
//         <div class = "choice-container">
//             <div class = "choice" draggable ="true">ex1</div>
//             <div class = "choice" draggable ="true">ex2</div>
//             <div class = "choice" draggable ="true">ex3</div>
//         </div> -->
//         <div class="container">
//         <div class="title">Question: ${this.question}</div>
//         <div class="answer-bank">Answer Bank:</div>
//         <div class="choice-container">
//           ${this.answers.map((answer, index) => html`<div class="choice" id="answer-${index}" draggable="true" @dragstart=${this.dragStart}>${answer}</div>`)}
//         </div>
//         <div class="drop-container" @dragover=${this.dragOver} @dragenter=${this.dragEnter} @dragleave=${this.dragLeave} @drop=${this.dragDrop}>
//           Drop answers here
//         </div>
//         <div class="answer-area">
//           <div class="response-text">The answer is...<div class="empty"></div></div>
//         </div>
//         <div class="button-container">
//           <button class="check-b">Check Answer</button>
//           <button class="reset-b">Reset</button>
//         </div>
//       </div>
//   <!-- <div class="empty">
//                 <div class="fill" draggable="true"> </div> 
//             </div>
//             <div class="empty">
//                 <div class="fill" draggable="true" > </div>
//             </div> -->
//     `;
//   }
// }


// customElements.define(taggingQuestion.tag, taggingQuestion);
import { html, css } from 'lit';
import { DDD } from '@lrnwebcomponents/d-d-d';

export class taggingQuestion extends DDD {

  static get tag() {
    return 'tagging-question'
  }

  static get properties() {
    return {
      question: { type: String },
      answers: { type: Array }
    };
  }

  constructor() {
    super();
    this.question= "";
    this.answers = [];
    this.fetchData();
  }

  static styles = css`
  
    :host {
     display: block;
    }

    .fill {
      background-color:blue;
      position: relative;
      height: 20px;
      width: 50px;
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
      display: inline-flex;
      height:35px;
      width: 43px;
      margin: 5px;
      border-radius: 10px;
      border: 4px solid white;
    }

    .hovered {
      background: #f4f4f4;
      border-style: dashed;
    }

    .container {
      background-image: url('https://www.dbackdrop.com/cdn/shop/products/D636.jpg?v=1602656440');
      background-size: cover;
      border: 15px solid tan;
      border-radius: 10px;
      margin: 30px auto; 
      padding: 20px;
      min-height: 300px; 
      width: 90%; 
      max-width: 800px; 
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .title {
      color: white;
      font-family: 'Callie Chalk Font', sans-serif;
      text-decoration: underline;
    }

    .answer-bank {
      color: lightcoral;
      font-family: 'Callie Chalk Font', sans-serif;
    }

    .choice {
      display: inline-flex;
      color: white;
      font-family: 'Callie Chalk Font', sans-serif;
      border-radius: 10px;
      border: 4px solid white;                                            
    }

    .choice-container {
      border-radius: 10px;
      border: 4px dashed yellow;
      margin-bottom:10px;
    }

    .response-text {
      font-family: 'Callie Chalk Font', sans-serif;
      color: lightblue;
    }

    .drop-container {
      border: 2px dashed black; /* Style for the drop container */
      padding: 10px;
      margin-top: 20px;
    }
    
  `;

  dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
  }

  dragOver(e) {
    e.preventDefault();
  }

  dragEnter(e) {
    e.preventDefault();
    e.target.classList.add('hovered');
  }

  dragLeave(e) {
    e.target.classList.remove('hovered');
  }

  dragDrop(e) {
    console.log("Answer dropped!");
  e.preventDefault();
  const draggedItemId = e.dataTransfer.getData('text/plain');
  const draggedItem = document.getElementById(draggedItemId);
  const emptyDiv = e.target.querySelector('.empty');
  if (draggedItem) {
    emptyDiv.appendChild(draggedItem);
    // Update the content of the response-text element with the dropped answer
    const responseText = document.getElementById('responseText');
    responseText.textContent = `The answer is: ${draggedItem.textContent}`;
  }
  e.target.classList.remove('hovered');
  
  }

  connectedCallback() {
    super.connectedCallback();
    this.fetchData();
  }

  async fetchData() {
    try {
      const response = await fetch('questions.json');
      const data = await response.json();
      this.question = data.question;
      this.answers = data.answers.map(answer => answer.answer);
      this.requestUpdate();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  render() {
    return html`
      <div class="container">
      <div class="title">Question: ${this.question}</div>
      <div class="answer-bank">Answer Bank:</div>
      <div class="choice-container">
        ${this.answers.map((answer, index) => html`<div id="answer-${index}" class="choice" draggable="true" @dragstart=${this.dragStart}>${answer}</div>`)}
      </div>
      <div class="drop-container" @dragover=${this.dragOver} @dragenter=${this.dragEnter} @dragleave=${this.dragLeave} @drop=${this.dragDrop}>
        Drop answers here
      </div>
      <div id="responseText" class="response-text">The answer is...</div>
      <div class="button-container">
        <button class="check-b">Check Answer</button>
        <button class="reset-b">Reset</button>
      </div>
    </div>
    `;
  }
}

customElements.define(taggingQuestion.tag, taggingQuestion);

