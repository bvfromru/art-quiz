"use strict";

//import images from './images.js'
import Home from "./views/pages/Home.js";
import Error404 from "./views/pages/Error404.js";
import PostShow from "./views/pages/PostShow.js";
import RoundByAuthor from "./views/pages/RoundByAuthor.js";
import ResultsByAuthor from "./views/pages/ResultsByAuthor.js";
import Register from "./views/pages/Register.js";

import Navbar from "./views/components/Navbar.js";
import Bottombar from "./views/components/Bottombar.js";

import Utils from "./services/Utils.js";
import CategoriesByAuthor from "./views/pages/CategoriesByAuthor.js";

// List of supported routes. Any url other than these routes will throw a 404 error
const routes = {
  "/": Home,
  "/p/:id": PostShow,
  "/byauthor/:id": RoundByAuthor,
  "/resultsbyauthor/:id": ResultsByAuthor,
  "/register": Register,
  "/byauthor": CategoriesByAuthor,
};

// Initialize pictures data
let getPicturesData = async () => {
  try {
    const response = await fetch("../../data/data.json");
    const json = await response.json();
    // console.log(json)
    return json;
  } catch (err) {
    console.log("Error getting json data", err);
  }
};

const images = await getPicturesData();

// BV images initialization

function chunkArray(myArray, chunk_size) {
  let tempArray = [];
  for (let i = 0; i < myArray.length; i += chunk_size) {
    let myChunk = myArray.slice(i, i + chunk_size);
    tempArray.push(myChunk);
  }
  return tempArray;
}

const questionsByAuthor = [];
const questionsByPicture = [];
const initialQuizAnswersByAuthor = [];
const chunkSize = 10;

images.forEach((item, index) => {
  if (index % 2 === 0) {
    questionsByAuthor.push({
      ...item,
    });
  }
});

export const chunkedQuestionsbyAuthor = chunkArray(questionsByAuthor, chunkSize);

// Initialize localstorage answers by author
for (let i = 0; i < chunkedQuestionsbyAuthor.length; i++) {
  let tempArray = [];
  for (let j = 0; j < chunkedQuestionsbyAuthor[0].length; j++) {
    tempArray.push(0);
  }
  initialQuizAnswersByAuthor.push(tempArray);
}

if (!localStorage.getItem("quizAnswersByAuthor")) {
  localStorage.setItem(
    "quizAnswersByAuthor",
    JSON.stringify(initialQuizAnswersByAuthor)
  );
}

//console.log(chunkedQuestionsbyAuthor[0][0].author);

// The router code. Takes a URL, checks against the list of supported routes and then renders the corresponding content page.
const router = async () => {
  // Lazy load view element:
  const header = null || document.getElementById("header_container");
  const content = null || document.getElementById("page_container");
  const footer = null || document.getElementById("footer_container");

  // Render the Header and footer of the page
  header.innerHTML = await Navbar.render();
  await Navbar.after_render();
  footer.innerHTML = await Bottombar.render();
  await Bottombar.after_render();

  // Get the parsed URl from the addressbar
  let request = Utils.parseRequestURL();

  // Parse the URL and if it has an id part, change it with the string ":id"
  let parsedURL =
    (request.resource ? "/" + request.resource : "/") +
    (request.id ? "/:id" : "") +
    (request.verb ? "/" + request.verb : "");

  // Get the page from our hash of supported routes.
  // If the parsed URL is not in our list of supported routes, select the 404 page instead
  let page = routes[parsedURL] ? routes[parsedURL] : Error404;
  content.innerHTML = await page.render();
  await page.after_render();
};

// Listen on hash change:
window.addEventListener("hashchange", router);

// Listen on page load:
window.addEventListener("load", router);
