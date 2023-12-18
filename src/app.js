const storedLinks = [];
let toggler = document.querySelector('#menu');
let clearButton = document.querySelector('.clear');
let parentElement = document.querySelector('.links');
let hasFunction1Run = false;

const updateData = () => {
  document.addEventListener('DOMContentLoaded', () => {
    let fetchedLinks = getLocalData();
    renderData(fetchedLinks);

    if (fetchedLinks.length === 0) {
      clearButton.style.display = 'none';
    } else {
      clearButton.style.display = 'block';
    }
  });
};

function getLocalData() {
  const storedData = localStorage.getItem('Links');
  return JSON.parse(storedData);
}

function renderData(links) {
  if (links === null) {
    return;
  } else {
    links.forEach((link) => {
      const newLink = document.createElement('li');
      newLink.innerHTML = `${link}`;

      const linksParent = document.querySelector('.links');
      linksParent.appendChild(newLink);
    });
  }
}
updateData();

function validateUrl(url) {
  const regex =
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-zA-Z0-9]+([\-\.]{1}[a-zA-Z0-9]+)*\.[a-zA-Z]{2,5}(:[0-9]{1,5})?(\/[^\s]+)?$/;
  return regex.test(url);
}

function showMenu() {
  let nav = document.querySelector('nav');
  if (nav.style.display != 'block') {
    nav.style.display = 'block';
    toggler.name = `close-circle-outline`;
  } else {
    nav.style.display = 'none';
    toggler.name = `menu-outline`;
  }
}
toggler.addEventListener('click', showMenu);

function clearEle() {
  storedLinks.length = 0;
  localStorage.clear();
  parentElement.replaceChildren();
  clearButton.style.display = 'none';
}
clearButton.addEventListener('click', clearEle);

function initializeClipboard() {
  let clipboard = new ClipboardJS('.copyBtn');

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
}

async function callApi(e) {
  e.preventDefault();

  let inputField = document.querySelector('#input');
  let inputFieldValue = inputField.value;
  const linksParent = document.querySelector('.links');

  if (!validateUrl(inputFieldValue)) {
    alert('Invalid URL. Please enter a valid web address.');
    return;
  }

  const url = 'https://url-shortener-service.p.rapidapi.com/shorten';
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': 'a31dc67ed1msh206168b27b97c72p11dfc9jsn7e01a16cf46b',
      'X-RapidAPI-Host': 'url-shortener-service.p.rapidapi.com',
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

    const result = await response.json();

    let dataText = `${inputFieldValue}<span id="short-url">${result.result_url}<button data-clipboard-text=${result.result_url} class="copyBtn copy">Copy</button></span>`;

    const newLink = document.createElement('li');
    newLink.innerHTML = dataText;

    linksParent.appendChild(newLink);

    initializeClipboard();

    storedLinks.push(dataText);
    localStorage.setItem('Links', JSON.stringify(storedLinks));
    inputField.value = '';
  } catch (error) {
    alert(error.message);
  }
  hasFunction1Run = true;

  clearButton.style.display = 'block';
}

// document.addEventListener('DOMContentLoaded', () => {
//
// });

// if (hasFunction1Run) {
//   let copyVal = document.querySelector('button.copyBtn');
//   function copyText() {
//     if (copyVal.className.includes('copy')) {
//       copyVal.classList.remove('copy');
//       copyVal.classList.add('copied');
//       copyVal.innerHTML = 'Copied';
//     }
//   }
//   if (copyVal) {
//     copyVal.addEventListener('click', copyText);
//   }
// }
