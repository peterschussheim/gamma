import { css } from '@emotion/core'

const globalStyles = css`
  * {
    box-sizing: border-box;
    font-family: ;
  }
  :root {
    --black: #414141;
    --green: #5edb93;
    --red: #D73A49;
    --grey: #6a737d
    --shadow: 0px 8px 30px -5px rgba(79, 79, 79, 0.3);
    --shadowHover: 0px 8px 5px -5px rgba(79, 79, 79, 0.3);
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial,
      sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    font-size: 14px;
    line-height: 1.5;
    color: #24292e;
    background-color: #fff;
  }

  a {
    color: #08c;
  }

  code {
    background: #eee;
    padding: 0.1rem;
    font-family: 'Menlo';
    font-size: 13px;
    color: #ff00aa;
  }

  #flex-container {
    display: flex;
    flex-direction: row;
  }

  #flex-container > .flex-item {
    flex: auto;
  }

  #flex-container > .raw-item {
    width: 5rem;
  }

  .text-input {
    padding: 0.5rem;
    font-size: 16px;
    width: 100%;
    display: block;
    border-radius: 0px;
    border: 1px solid #ccc;
  }

  .text-input:focus {
    border-color: #007eff;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
      0 0 0 3px rgba(0, 126, 255, 0.1);
    outline: none;
  }

  .error .text-input {
    border-color: red;
  }

  .label {
    font-weight: bold;
    display: block;
    margin-bottom: 0.5rem;
  }

  .error .label {
    color: red;
  }

  .input-feedback {
    color: #999;
    margin-top: 0.25rem;
  }

  .error .input-feedback {
    color: red;
  }

  .input-group {
    margin-bottom: 1rem;
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed !important;
  }

  button + button {
    margin-left: 0.5rem;
  }

  button.outline {
    background-color: #eee;
    border: 1px solid #aaa;
    color: #555;
  }
`
export default globalStyles
