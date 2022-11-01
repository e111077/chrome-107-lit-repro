import {html, LitElement, css} from 'lit';

class ParentElement extends LitElement {
  static properties = {
    open: {type: Boolean, reflect: true}
  }

  static styles = css`
    :host(:not([open])) {
      display: none;
    }

    :host([open]) {
      display: block;
    }
  `;

  constructor() {
    super();
    this.open = false;
    console.log('parent constructed');
    setTimeout(() => {
      this.open = true;
    }, 1000);
  }

  update(changed) {
    if (changed.has('open') && this.open) {
      this.shadowRoot.querySelector('child-element').setValue();
    }
    super.update(changed);
  }

  render() {
    return html`
      ${this.renderChildren()}
    `;
  }

  // must be in a separate method to repro error
  renderChildren() {
    return html`
      <child-element></child-element>
    `
  }
}

class ChildElement extends LitElement {
  static properties = {
    value: {state: true}
  }

  constructor() {
    super();
    console.log('child constructed');
    this.value = '';
  }

  setValue() {
    this.value = 'If you see this that means everything is fine';
  }

  render() {
    return html`
      <div>The following value should not be empty: ${this.value}</div>
    `;
  }
}

customElements.define('parent-element', ParentElement);
customElements.define('child-element', ChildElement);