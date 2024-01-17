import { createGlobalStyle } from "styled-components"

const GlobalStyles = createGlobalStyle`
:root{
  --color-bright-blue: hsl(220, 98%, 61%);
  --color-very-light-gray: hsl(0, 0%, 98%);
  --color-very-light-grayish-blue: hsl(236, 33%, 92%);
  --color-light-grayish-blue: hsl(233, 11%, 84%);
  --color-dark-grayish-blue: hsl(236, 9%, 61%);
  --color-very-dark-grayish-blue: hsl(235, 19%, 35%);

  --color-very-dark-blue: hsl(235, 21%, 11%);
  --color-very-dark-desaturated-blue: hsl(235, 24%, 19%);
  --color-light-grayish-blue: hsl(234, 39%, 85%);
  --color-light-grayish-blue-hover: hsl(236, 33%, 92%);
  --color-dark-grayish-blue: hsl(234, 11%, 52%);
  --color-very-dark-grayish-blue: hsl(233, 14%, 35%);
  --color-very-dark-grayish-blue: hsl(237, 14%, 26%); 

  --sm-radius: 5px
}

*,
*::before,
*::after{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html{
  font-size: 62.5%;
}

body{
  font-family: 'Josefin Sans', sans-serif;
  font-size: 1.8rem;
  line-height: 1.5;
}

img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}

button:has(svg) {
  line-height: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}

`

export default GlobalStyles
