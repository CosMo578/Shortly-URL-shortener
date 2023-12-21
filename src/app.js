let toggler = document.querySelector('#menu');
let clearButton = document.querySelector('.clear');
let parentElement = document.querySelector('.links');
let eleArr = [];

function validateUrl(url) {
  const regex =
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-zA-Z0-9]+([\-\.]{1}[a-zA-Z0-9]+)*\.[a-zA-Z]{2,5}(:[0-9]{1,5})?(\/[^\s]+)?$/;
  return regex.test(url);
}

async function callApi(e) {
  e.preventDefault();

  let inputField = document.querySelector('#input');
  let inputFieldValue = inputField.value;

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

    let eleId = Math.round(Math.random() * 100000);

    let dataText = `${inputFieldValue}<span id="short-url">${result.result_url}<button data-clipboard-text=${result.result_url} class="copyBtn copy">Copy</button></span>`;

    const newLink = document.createElement('li');
    newLink.id = eleId;
    newLink.innerHTML = dataText;
    parentElement.appendChild(newLink);

    eleArr.push({ dataText: dataText, eleId: eleId });
    localStorage.setItem('Links', JSON.stringify(eleArr));

    inputField.value = '';
  } catch (error) {
    alert(error.message);
  }
  showClearBtn();
  console.log(eleArr);
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

function showClearBtn() {
  if (parentElement.children.length > 0) {
    let copyBtn = document.querySelector('.copyBtn');

    function initializeClipboard() {
      let clipboardButtons = document.querySelectorAll('.copyBtn');

      clipboardButtons.forEach((copyBtn) => {
        let clipboard = new ClipboardJS(copyBtn);

        clipboard.on('success', function (e) {
          console.info('Action:', e.action);
          console.info('Text:', e.text);
          console.info('Trigger:', e.trigger);

          function copyText() {
            if (copyBtn.className.includes('copy')) {
              copyBtn.classList.remove('copy');
              copyBtn.classList.add('copied');
              copyBtn.innerHTML = 'Copied';
            }
          }
          copyText();
        });

        clipboard.on('error', function (e) {
          console.info('Action:', e.action);
          console.info('Text:', e.text);
          console.info('Trigger:', e.trigger);
        });
      });
    }

    initializeClipboard();
    clearButton.style.display = 'block';
  } else {
    clearButton.style.display = 'none';
  }
}
showClearBtn();

function clearList() {
  localStorage.removeItem('Links');
  parentElement.replaceChildren();
  eleArr.length = 0;
  clearButton.style.display = 'none';
}
clearButton.addEventListener('click', clearList);

function getLocalData() {
  const storedData = localStorage.getItem('Links');
  return JSON.parse(storedData);
}

function renderData(links) {
  links.forEach((link) => {
    const newLink = document.createElement('li');
    newLink.id = link.eleId;
    newLink.innerHTML = link.dataText;
    parentElement.appendChild(newLink);
  });
  showClearBtn();
}

function updateData() {
  if (localStorage.getItem('Links') !== null) {
    let fetchedLinks = JSON.parse(localStorage.getItem('Links'));
    renderData(fetchedLinks);
  }
  showClearBtn();
}

document.addEventListener('DOMContentLoaded', () => {
  updateData();
  console.log(eleArr);
});
