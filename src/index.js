let addToys = false;
const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
const toyCollection = document.getElementById('toy-collection');
const toysUrl = "http://localhost:3000/toys";

function createToyCard(toy) {
  const card = document.createElement('div')
  card.className = 'card'
  toyCollection.appendChild(card)

  const name = document.createElement('h3')
  name.textContent = `Name: ${toy.name}`

  const toyImage = document.createElement('img')
  toyImage.className = 'toy-avatar'
  toyImage.src = toy.image

  const likes = document.createElement('p')
  likes.textContent = `Likes: ${toy.likes}`

  const likeButton = document.createElement('button')
  likeButton.className = 'like-button'
  likeButton.textContent = 'Like Button'
  likeButton.Id = toy.Id
  likeButton.addEventListener('click', () => {
    likes.textContent = `Likes: ${toy.likes++}`
  });

  card.append(name, toyImage, likes, likeButton)
}

const addToyButton = document.getElementsByClassName('add-toy-form')[0]
addToyButton.addEventListener('submit', submitForm)

function submitForm(e) {
  e.preventDefault()
  let newToy = {
    name: e.target.name.value,
    image: e.target.elements.image.value,
    likes: 0
  };

  function postToy(newToy) {
    fetch(toysUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newToy)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
      })
      .catch(error => {
        console.error(error)
      })
  }

  postToy(newToy)
  createToyCard(newToy)
}

document.addEventListener("DOMContentLoaded", () => {
  console.log('DOM content loaded')
  fetch(toysUrl)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      const toys = data

      toys.forEach(toy => {
        createToyCard(toy)
      });
    });

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToys = !addToys
    if (addToys) {
      toyFormContainer.style.display = "block"
    } else {
      toyFormContainer.style.display = "none"
    }
  })
})