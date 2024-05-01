import { html, css } from 'lit';
import { DDD } from '@lrnwebcomponents/d-d-d';

export class TaggingQuestion extends DDD {
  static get tag() {
    return 'tagging-question';
  }

  static get properties() {
    return {
      question: { type: String },
      answers: { type: Array },
      selectedTags: { type: Array },
      submitted: { type: Boolean },
      allTags: { type: Array },
      tagOptions: { type: Array },
      tagCorrect: { type: Array },
      tagFeedback: { type: Array }
    };
  }

  constructor() {
    super();
    this.question = "";
    this.description = "";
    this.imageURL = "";
    // this.answers = [];
    this.selectedTags = [];
    this.submitted = false;
    this.allTags = [];
    this.tagOptions = [];
    this.tagCorrect = [];
    this.tagFeedback = [];
    this.fetchData();
  }

  static styles = css`
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
      position: relative;
    }
   
  `;

  connectedCallback() {
    super.connectedCallback();
    this.loadTagsData();
  }
  dragStart(e) {
    this.draggedItem = e.target;
  }

  dragEnd() {
    this.draggedItem = null;
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
    e.preventDefault();
    e.target.classList.remove('hovered');
    if (this.draggedItem) {
      e.target.appendChild(this.draggedItem.cloneNode(true));
      
    }
  }
  loadTagsData() {
    fetch("./questions.json")
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch tags data");
        }
        return response.json();
      })
      .then(tagsData => {
        // const tagSet = tagsData[this.answers.key];
        const tagSet = tagsData;
    if (tagSet) {
        const originalTagOptions = tagSet.answers || [];
          this.allTags = originalTagOptions.slice(); 
          this.tagOptions = originalTagOptions.slice();
          this.tagCorrect = [];
          this.tagFeedback = [];
  
          tagSet.tagAnswers.forEach((tagAnswer, index) => {
            const tagKey = Object.keys(tagAnswer)[0];
            const { correct, feedback } = tagAnswer[tagKey];
            this.tagCorrect.push(correct);
            this.tagFeedback.push(feedback);
          });
  
          this.tagOptions = this.shuffleArray(this.tagOptions);
        } else {
          throw new Error(`tagSet '${this.answerSet}' not found`);
        }
      })
    //   .catch(error => {
    //     console.error("Error loading tags data: ", error);
    //   }
    // );
  }
  
  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  getFeedbackForTag(tag) {
    const index = this.allTags.indexOf(tag);
    if (index !== -1) {
      const feedback = this.tagFeedback[index];
      return html`${feedback}`;
    }
    return html``;
  }
  
  isTagCorrect(tag) {
    const index = this.allTags.indexOf(tag);
    if (index !== -1) {
      return this.tagCorrect[index];
    }
    return false;
  }
  
  handleDrag(e) {
    const tagOption = e.target.textContent.trim();
    e.dataTransfer.setData("text/plain", tagOption);
  }
  
  allowDrop(e) {
    e.preventDefault();
  }
  
  handleDrop(e) {
    e.preventDefault();
    const tagOption = e.dataTransfer.getData("text/plain");
    const isInOptionContainer = this.tagOptions.includes(tagOption);
    const isInUserChoiceContainer = this.selectedTags.includes(tagOption);
    const sourceContainer = e.target.classList.contains("option-container") ? "option" : "user-choice";
    const destinationContainer = e.target.classList.contains("user-choice-container") ? "option" : "user-choice";
  
    if (sourceContainer === destinationContainer) {
        return;
    }
  
    if (isInOptionContainer && !isInUserChoiceContainer) {
        this.handleTagMove(tagOption, "option");
    } else if (!isInOptionContainer && isInUserChoiceContainer) {
        this.handleTagMove(tagOption, "user-choice");
    }
  }
  
  handleTagMove(tagOption, source) {
    if (source === "user-choice") {
      this.removeTag(tagOption);
    } else {
      this.addTag(tagOption);
    }
  }
  
  handleKeyDown(event, tagOption) {
    if (event.key === 'Enter') {
      this.handleTagClick(tagOption);
    }
  }
  
  handleTagClick(tagOption) {
    if (this.selectedTags.includes(tagOption)) {
      this.handleTagMove(tagOption, "user-choice");
    } else if (this.tagOptions.includes(tagOption)) {
      this.handleTagMove(tagOption, "option");
    }
  }
  
  addTag(tagOption) {
    if (!this.submitted && !this.selectedTags.includes(tagOption)) {
      this.selectedTags = [...this.selectedTags, tagOption];
      this.tagOptions = this.tagOptions.filter(selectedTags => selectedTags !== tagOption);
    }
  }
  
  removeTag(tagOption) {
    if (!this.submitted) {
      this.selectedTags = this.selectedTags.filter(selectedTags => selectedTags !== tagOption);
      this.tagOptions.push(tagOption);
    }
  }
  
  submitAnswers() {
    this.submitted = true;
    this.checkAnswers();
  }
  
  checkAnswers() {
    this.selectedTags.forEach(tag => {
      const index = this.allTags.indexOf(tag);
      if (index !== -1) {
        const correct = this.tagCorrect[index];
        const feedback = this.tagFeedback[index];
        console.log(`Tag: ${tag}, Correct: ${correct}, Feedback: ${feedback}`);
      }
    });
  }
  
  reset() {
    this.submitted = false;
    this.tagOptions = [...this.tagOptions, ...this.selectedTags];
    this.selectedTags = [];
    this.shuffleArray(this.tagOptions); 
  }
  

  async fetchData() {
    try {
      const response = await fetch('./questions.json');
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
      <div class="image-div">
          <img class="image" src=${this.imageURL}>
        </div>
        <div>
          <button class="description-btn" @click=${this.toggleDescription}>Click to view Description</button>
        </div>
        ${this.showDescription ? html`
          <div class="description-title">${this.description}</div>
        ` : ''}
        <div id="question">${this.question}</div>
        <div id="droppedTags" @click=${this.droppedClicked} @dragover=${this.handleDragOver} @drop=${this.handleDrop}>
            <div id="dropTagHint">Drop your answer choices here</div>
        </div>
        <div id="feedbackSection">
          ${Array.from(this.shadowRoot.querySelectorAll('#droppedTags .chip')).map(tag => {
            const isCorrect = tag.dataset.correct === 'true';
            return html`
              <li>
                <span class="chip ${isCorrect ? 'correct' : 'incorrect'}">${tag.textContent}</span>
                ${isCorrect ? html`<span class="green">${tag.dataset.feedback}</span>` : html`<span class="red">Incorrect: ${tag.dataset.feedback}</span>`}
              </li>
            `;
          })}
        </div>
        <div id="bankedTags" @click=${this.bankedClicked} @dragover=${this.handleDragOverReverse} @drop=${this.handleDropReverse}>
        </div>
        <div id="controls">
            <button id="resetBtn" class="controlBtn" @click=${this.resetTags}>
                Reset / Try Again
            </button>
            <button id="checkBtn" class="controlBtn" @click=${this.checkTags}>
                Check
            </button>
        </div>
    `;
  }
}

customElements.define(TaggingQuestion.tag, TaggingQuestion);
