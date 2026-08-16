class QuizFlow extends HTMLElement {
  constructor() {
    super();
    this.steps = Array.from(this.querySelectorAll('[data-quiz-step]'));
    this.resultStep = this.querySelector('[data-quiz-result]');
    this.currentLabel = this.querySelector('[data-quiz-current]');
    this.details = this.closest('details');

    this.addEventListener('click', this.onClick.bind(this));

    if (this.details) {
      this.details.addEventListener('toggle', this.onToggle.bind(this));
    }
  }

  onClick(event) {
    const option = event.target.closest('[data-quiz-option]');
    if (!option) return;

    const step = option.closest('[data-quiz-step]');
    if (!step) return;

    this.goToIndex(this.steps.indexOf(step) + 1);
  }

  goToIndex(index, refocus = true) {
    this.steps.forEach((step, i) => {
      step.hidden = i !== index;
    });

    if (index < this.steps.length) {
      if (this.resultStep) this.resultStep.hidden = true;
      if (this.currentLabel) this.currentLabel.textContent = index + 1;
    } else if (this.resultStep) {
      this.resultStep.hidden = false;
    }

    if (refocus) this.refocus();
  }

  refocus() {
    const modalContainer = this.closest('[tabindex="-1"]');
    if (!modalContainer || typeof trapFocus !== 'function') return;

    const nextFocusable = this.querySelector(
      '[data-quiz-step]:not([hidden]) [data-quiz-option], [data-quiz-result]:not([hidden]) a, [data-quiz-result]:not([hidden]) button'
    );

    trapFocus(modalContainer, nextFocusable || modalContainer);
  }

  onToggle() {
    if (this.details && !this.details.open) {
      this.goToIndex(0, false);
    }
  }
}

customElements.define('quiz-flow', QuizFlow);
