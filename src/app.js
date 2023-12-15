// async function callApi(e) {
//   // Prevent the default form submission behavior
//   e.preventDefault();

//   // Get the input element by its id
//   let inputField = document.querySelector('#input');
//   // let inputFieldValue = inputField.value;

//   let inputFieldValue = inputField.value.trim();
//   // if (inputFieldValue === null) return;

//   fetch(`https://api.shrtco.de/v2/shorten?url=${inputFieldValue}`)
//     .then((response) => response.json())
//     .then((response) => {
//         // let shortlyCode = response.result.code;
//         console.log(response);
//     });
// }

let toggler = document.querySelector('#menu');
let nav = document.querySelector('nav');
function showMenu() {
  if (nav.style.display != 'block') {
    nav.style.display = 'block';
  } else {
    nav.style.display = 'none';
  }
}
toggler.addEventListener('click', showMenu);
