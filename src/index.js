// write your code here
const ramenMenu = document.querySelector("#ramen-menu");
const ramenDetail = document.querySelector("#ramen-detail");
const ratingDisplay = document.querySelector("#rating-display");
const commentDisplay = document.querySelector("#comment-display");
const newRamenForm = document.querySelector("#new-ramen");

let allRamens = [];

// Function to display all ramen images in the #ramen-menu div
function displayAllRamens() {
  allRamens.forEach((ramen) => {
    const img = document.createElement("img");
    img.src = ramen.image;
    img.alt = ramen.name;
    img.addEventListener("click", () => displayRamenDetails(ramen));
    ramenMenu.append(img);
  });
}

// Function to display the details of a single ramen in the #ramen-detail div
function displayRamenDetails(ramen) {
  const img = document.querySelector(".detail-image");
  const name = document.querySelector(".name");
  const restaurant = document.querySelector(".restaurant");
  img.src = ramen.image;
  img.alt = ramen.name;
  name.textContent = ramen.name;
  restaurant.textContent = ramen.restaurant;
  ratingDisplay.textContent = ramen.rating;
  commentDisplay.textContent = ramen.comment;
}

// Function to add a new ramen to the #ramen-menu div
function addNewRamen(ramen) {
  allRamens.push(ramen);
  const img = document.createElement("img");
  img.src = ramen.image;
  img.alt = ramen.name;
  img.addEventListener("click", () => displayRamenDetails(ramen));
  ramenMenu.append(img);
}

// Fetch all ramen data from the server and display them on the page
fetch("http://localhost:3000/ramens")
  .then((response) => response.json())
  .then((ramens) => {
    allRamens = ramens;
    displayAllRamens();
    displayRamenDetails(allRamens[0]);
  });

// Handle form submission to add a new ramen
newRamenForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = event.target.name.value;
  const restaurant = event.target.restaurant.value;
  const image = event.target.image.value;
  const rating = event.target.rating.value;
  const comment = event.target["new-comment"].value;
  const newRamen = { name, restaurant, image, rating, comment };
  addNewRamen(newRamen);
  newRamenForm.reset();
});
const editRamenForm = document.querySelector("#edit-ramen");

// Function to update the rating and comment of a ramen
function updateRamenDetails(ramen, newRating, newComment) {
  ramen.rating = newRating;
  ramen.comment = newComment;
  displayRamenDetails(ramen);
}

// Handle form submission to update the featured ramen
editRamenForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const newRating = event.target.rating.value;
  const newComment = event.target["new-comment"].value;
  const featuredRamen = allRamens[0];
  updateRamenDetails(featuredRamen, newRating, newComment);
  editRamenForm.reset();
});
