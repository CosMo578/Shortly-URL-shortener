# Frontend Mentor - Shortly URL shortening API Challenge solution

This is a solution to the [Shortly URL shortening API Challenge challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/url-shortening-api-landing-page-2ce3ob-G). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- Shorten any valid URL
- See a list of their shortened links, even after refreshing the browser
- Copy the shortened link to their clipboard in a single click
- Receive an error message when the `form` is submitted if:
  - The `input` field is empty

### Screenshot

![](/Screenshot.png)

### Links

- Solution URL: [GitHub](https://github.com/cosmo578/shortly-url-shortener)
- Live Site URL: [Vercel](https://shortly-url-shortener-raph.vercel.app)

## My process

### Built with

- HTML5
- [Sass](https://sass.com/) - CSS Preprocessor
- JavaScript
- [API](https://rapidapi.com/BigLobster/api/url-shortener-service) - URL Shortener Service
- Desktop-first workflow
- [Google Fonts](https://fonts.google.com/) - Fonts and icons

### What I learned

- I learned how to use a JS library (ClipboardJS) for copying text to the user clipboard

```js
function initializeClipboard() {
  let clipboardButtons = document.querySelectorAll('.copyBtn');

  clipboardButtons.forEach((copyBtn) => {
    let clipboard = new ClipboardJS(copyBtn);

    clipboard.on('success', function (e) {
      console.info('Action:', e.action);
      console.info('Text:', e.text);
      console.info('Trigger:', e.trigger);
    });

    clipboard.on('error', function (e) {
      console.info('Action:', e.action);
      console.info('Text:', e.text);
      console.info('Trigger:', e.trigger);
    });
  });
}
initializeClipboard();
```

- I improved my knowledge of API

```js
  const url = 'https://url-shortener-service.p.rapidapi.com/shorten';
  const options = {
    method: 'POST',
    headers: {
      'content-type': '...',
      'X-RapidAPI-Key': '...',
      'X-RapidAPI-Host': '...',
    },
    body: new URLSearchParams({
      url: `${inputFieldValue}`,
    }),
  };

  try {
    const response = await fetch(url, options);
    if (response.status !== 200) {
      alert(`Error: ${data.message}`);
      return;
    }
  }
```

- I made font sizes scale autiomatically using the clamp function in sass

```css
html {
  font-size: clamp(14px, minmax(2vw, 3.5vw), 18px);
}
```

### Continued development

I would like to focus on improving my responsive design skills by using a css framework like Tailwind Css for other projects in the future. I would also like to work on other API projects from frontend mentor using a JavaScript library like React.

### Useful resources

- [ClipboardJS](https://clipboardjs.com/) - This is the JavaScript library that helped me in copying text to the user's clipboard.
- [URL Shortener Service](https://rapidapi.com/BigLobster/api/url-shortener-service) - This is an API service I found on Rapid API that helped me to shorten long url.

## Author

- Website - [Developer Raphael](https://dev-ralph-portfolio.vercel.app)
- Frontend Mentor - [@CosMo578](https://www.frontendmentor.io/profile/CosMo578)
- Twitter - [Developer Raphael](https://www.twitter.com/@dev_ralph_)
