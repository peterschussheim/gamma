import { keyframes } from '@emotion/core'

const animation = keyframes`
  0%   { opacity: 0; }
  100% { opacity: 1; }
`

export default delay =>
  `
    animation: ${animation} 0.3s;
    animation-delay: ${delay}s;
    animation-fill-mode: forwards;
    opacity: 0;
  `
