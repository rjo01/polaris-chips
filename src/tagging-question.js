import { html, css } from 'lit';
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";

export class TaggingQuestion extends DDD {
  static get tag() {
    return 'tagging-questions';
  }
  constructor() {
    super();
    this.question = "";
    this.description = "";
    this.imageURL = "";
    this.currentTag;
    this.checked = false;
    this.answerSet = "default";
    this.showDescription = false;
    this.source = new URL('../test/tagging.json', import.meta.url).href;
  }

  static get properties() {
    return {
      question: { type: String },
      imageURL: { type: String },
      description: { type: String},
      answerSet: { type: String },
      showDescription: { type: Boolean }
    };
  }

  static get styles() {
    return css`
      
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
    .image {
        max-width: 35%;
        border: solid 4px var(--ddd-theme-default-athertonViolet);
        border-radius: 25px;
        height: auto;
        
        }

    .image-container { 
        justify-content: center;
        display: flex;
        
      }

     
    #question {
        color: var(--ddd-theme-default-skyLight);
        font-family: 'Callie Chalk Font', sans-serif;
        text-decoration: underline;
        text-align: center;
        padding: var(--ddd-spacing-1);    
        margin-bottom: var(--ddd-spacing-5);
        
      }

      #dropText {
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--ddd-theme-default-skyLight);
        font-family: 'Callie Chalk Font', sans-serif;
        font-size: 15px;
        
      }


      #tagging-question {
        background: var(--ddd-theme-default-shrineLight);
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        min-height: var(--ddd-spacing-4);
        min-width: var(--ddd-spacing-8);
        margin: var(--ddd-spacing-4) 0;
        
      }

      #tagging-question img {
        max-width: 100%;
        max-height: 500px;
        padding-top: 5px;
        object-fit: contain;
        
      }
      
      #description {
        width: 75%;
        margin-left: 10%;
        padding-top: 5px;
        display: none;
        flex-direction: column;
      }

      
      #dropArea {
        box-sizing: border-box;
        width: 75%;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: 24px ;
        border: solid 4px var(--ddd-theme-default-athertonViolet);
        border-radius: 25px;
       
        display: inline-block;
        
      }

      

     
      .choice {
        display: inline-block;
        color: var(--ddd-theme-default-creekTeal);
        background: var(--ddd-theme-default-white);
        margin:2px;
        box-sizing: border-box;
        padding: 10px;
        font-family: 'Callie Chalk Font', sans-serif;
        font-size: 15px;
        border: solid 2px var(var(--ddd-theme-default-creekTeal));
        border-radius: 25px;

        
      }
      .choice:hover {
        color: var(--ddd-theme-default-info);
        background: var(--ddd-theme-default-alertAllClear);
        
      }

      .correct {
        background: transparent;
        border: solid 1px var(--ddd-theme-default-futureLime);
        color: var(--ddd-theme-default-futureLime);
       
      }
     
      
      #answerBank {
        display: inline-block;
        justify-content: center;
        align-items: center;
        text-align: center;
        box-sizing: border-box;
        padding: 10px;
        width: 100%;
        
        
      }

      
      confetti-container {
        display: flex;
        flex-direction: column;
      }

     

      .correct-color {
        font-size: 15px;
        font-family: 'Callie Chalk Font', sans-serif;
        color: var(--ddd-theme-default-futureLime);
        
      }

      .incorrect {
        background: transparent;
        border: solid 1px var(--ddd-theme-default-discoveryCoral);
        color: var(--ddd-theme-default-discoveryCoral);
    
      }

      .incorrect-color {
        font-size: 15px;
        font-family: 'Callie Chalk Font', sans-serif;
        color: var(--ddd-theme-default-discoveryCoral);
    
      }
      
     
    .check-b {
        color: var(--ddd-theme-default-white);
        background-color: var(--ddd-theme-default-opportunityGreen);
        padding: 10px ;
        margin: 5px;
        border: 2px solid var(--ddd-theme-default-white);
        border-radius: 25px;
        font-family: 'Callie Chalk Font', sans-serif;
        font-size: 15px;
        
       
    }

    .check-b:hover {
        background-color: var(--ddd-theme-default-forestGreen);
    }

    .reset-b {
        color: var(--ddd-theme-default-white);
        background-color: var(--ddd-theme-default-discoveryCoral);
        padding: 10px ;
        margin: 5px;
        border: 2px solid var(--ddd-theme-default-white);
        border-radius: 25px;
        font-family: 'Callie Chalk Font', sans-serif;
        font-size: 15px;
            
    }
    .reset-b:hover {
        background-color: var(--ddd-theme-default-alertImmediate);
        
    }

    `;
  }

  connectedCallback() {
    super.connectedCallback();
    const answerSet = this.answerSet;

    fetch(this.source)
      .then((response) => response.json())
      .then((json) => {
        const answerBank = this.shadowRoot.getElementById('answerBank');
        const possibleAnswers = json[answerSet];
        const options = [];
        for (const key in possibleAnswers) {
          const option = possibleAnswers[key];
          const control = document.createElement('control');
          control.classList.add('choice');
          control.draggable = true;
          control.textContent = key;
          control.dataset.correct = option.correct;
          control.dataset.feedback = option.feedback;
          control.addEventListener('dragstart', this.dragStart.bind(this));
          options.push(control);
        }
     for (let i = options.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [options[i], options[j]] = [options[j], options[i]];
        }
        options.forEach(control => {
            answerBank.appendChild(control);
        });
    });
    const avaliableImage = this.querySelector('img');
    if(avaliableImage) {
      this.imageURL = avaliableImage.src;
    }
    const avaliable = this.querySelector('p');
    if(avaliable) {
      this.question = avaliable.innerText;
    }

  }

  dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.textContent);
    this.currentTag = event.target;
  }

  
  dragOver(event) {
    event.preventDefault();
    
    this.shadowRoot.getElementById('dropArea').classList.add('drag-over');
  }
  dragOverReverse(event) {
    event.preventDefault();
  }


  drop(event) {
    event.preventDefault();

    this.shadowRoot.getElementById('dropArea').classList.remove('drag-over');

    const dropArea = this.shadowRoot.getElementById('dropArea');
    const current = this.currentTag;

    if (current && this.checked === false) {
        current.remove();
        dropArea.appendChild(current);

        this.shadowRoot.querySelector('#dropText').style.display = 'none';
        const controlBtns = this.shadowRoot.querySelectorAll('.controlBtn');
        controlBtns.forEach(btn => {
            btn.style.visibility = 'visible';
        });
    }
  }

  dropReverse(event) {
    event.preventDefault();

    const dropArea = this.shadowRoot.getElementById('dropArea');
    const answerBank = this.shadowRoot.getElementById('answerBank');
    const button = this.currentTag;

    if (button && this.checked === false) {
        button.remove();
        answerBank.appendChild(button);
        
        
        if (dropArea.querySelectorAll('.choice').length === 0) {
            this.shadowRoot.querySelector('#dropText').style.display = 'flex';
            const controlBtns = this.shadowRoot.querySelectorAll('.controlBtn');
            controlBtns.forEach(btn => {
                btn.style.visibility = 'hidden';
            });
        }
    }
  }

  dragStartReverse(event) {
    event.dataTransfer.setData('text/plain', event.target.textContent);
    this.currentTag = event.target;
  }
  
 

  reset() {
    this.checked = false;
    this.shadowRoot.querySelector('.check-b').classList.remove('disabled');
    this.shadowRoot.querySelector('#description').style.display = 'none';
    this.shadowRoot.querySelector('#description').innerHTML = ``;
    const dropArea = this.shadowRoot.getElementById('dropArea');
    const answerBank = this.shadowRoot.getElementById('answerBank');
    const tagsToMove = Array.from(dropArea.children).filter(seb => seb.id !== 'dropText');
    tagsToMove.forEach(yes => {
        answerBank.appendChild(yes);
        yes.classList.remove("correct");
        yes.classList.remove("incorrect");
        yes.title = "";
        this.shadowRoot.querySelector('#description').innerHTML = ``;
    });

    const dropAreaChoices = this.shadowRoot.querySelectorAll('dropArea .choice');
    for (const tag of dropAreaChoices) {
        tag.classList.remove("noPointerEvents");
        tag.removeAttribute('tabindex');
    }
    const answerBankChoices = this.shadowRoot.querySelectorAll('#answerBank .choice');
      for (const tag of answerBankChoices) {
          tag.classList.remove("noPointerEvents");
          tag.removeAttribute('tabindex');
    }


    const buttons = Array.from(answerBank.children);
    for (let i = buttons.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      answerBank.insertBefore(buttons[j], buttons[i]);
    }

    this.shadowRoot.querySelector('#dropText').style.display = 'flex';
    const controlBtns = this.shadowRoot.querySelectorAll('.controlBtn');
    controlBtns.forEach(btn => {
        if (btn.id !== 'reset-b') { 
            btn.style.visibility = 'hidden';
        }
    });
}



  checkAnswers() {
    if(this.checked == false){
      this.checked = true;
  let allDroppedCorrect = true;
      let allBankedCorrect = true;
    this.shadowRoot.querySelector('#description').style.display = 'flex';
      this.shadowRoot.querySelector('#description').innerHTML = ``;
      const dropArea = this.shadowRoot.querySelectorAll('#dropArea .choice');
      for (const tag of dropArea) {
          const isCorrect = tag.dataset.correct === 'true';
          if(isCorrect){
            tag.classList.add("correct");
            this.shadowRoot.querySelector('#description').innerHTML += `<li class="correct-color">${tag.dataset.feedback}</li>`;
          }
          else {
            tag.classList.add("incorrect");
            allDroppedCorrect = false;
            tag.title = tag.dataset.feedback;

            this.shadowRoot.querySelector('#description').innerHTML += `<li class="incorrect-color">${tag.dataset.feedback}</li>`;
          }
          tag.classList.add("noPointerEvents");
          tag.setAttribute('tabindex', -1);
      }
      const answerBank = this.shadowRoot.querySelectorAll('#answerBank .choice');
      for (const tag of answerBank) {
          const isCorrect = tag.dataset.correct === 'true';
          if(isCorrect){
            allBankedCorrect = false;
            tag.title = tag.dataset.feedback;

          }
          tag.classList.add("noPointerEvents");
          tag.setAttribute('tabindex', -1);
      }
  
      if(allDroppedCorrect && allBankedCorrect) { 
        this.makeItRain();

        this.shadowRoot.querySelector('#description').innerHTML = ``;
        const answerBank = this.shadowRoot.querySelectorAll('#dropArea .choice');
        for (const tag of answerBank) {
            allBankedCorrect = false;
            tag.title = tag.dataset.feedback;

            this.shadowRoot.querySelector('#description').innerHTML += `<li class="green">${tag.dataset.feedback}</li>`;
          }
      }
    }
  }
  


  toggleDescription() {
    this.showDescription = !this.showDescription;
  }
  makeItRain() {
    import("@lrnwebcomponents/multiple-choice/lib/confetti-container.js").then(
      (module) => {
        setTimeout(() => {
          this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
        }, 0);
      }
    );
  }

  render() {
    return html`
      <confetti-container id="confetti">
        <div class = "container">
        <div class="image-container">
          <img class="image" src=${this.imageURL}>
        </div>
        
        <div id="question">${this.question}</div>
        <div id ="dropArea" @dragover=${this.dragOver} @drop=${this.drop}>
            <div id="dropText">Drop answers here</div>
        </div>
        <div id="description">
          ${Array.from(this.shadowRoot.querySelectorAll('#dropArea .choice')).map(tag => {const isCorrect = tag.dataset.correct === 'true';
            return html`
            <li>
            <span class="choice ${isCorrect ? 'correct' : 'incorrect'}">${tag.textContent}</span>
            ${isCorrect ? html`<span class="correct-color">${tag.dataset.feedback}</span>` : html`<span class="incorrect-color">Incorrect: ${tag.dataset.feedback}</span>`}</li>
        `;
          })}
        </div>
        <div id="answerBank" @dragover=${this.dragOverReverse} @drop=${this.dropReverse}></div>
        <div class="button-container">
            <button class="reset-b" @click=${this.reset}>
                Reset
            </button>
            <button class="check-b" @click=${this.checkAnswers}>
                Check Answers
            </button>
        </div>
        </div>
      </confetti-container>
    `;
  }
  
}

globalThis.customElements.define(TaggingQuestion.tag, TaggingQuestion);