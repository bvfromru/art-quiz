//import Utils        from './../../services/Utils.js'
import { chunkedQuestionsbyAuthor } from "../../app.js";
import Utils from "../../services/Utils.js";

let CategoriesByAuthor = {
  render: async () => {
    let view = /*html*/ `
          <section class="section">
              <h1>Викторина по художникам</h1>
              <ul class = "categories-container">
              ${chunkedQuestionsbyAuthor
                .map(
                  (obj, index) =>
                    `<li class = categories-container-li>
                      <div class = "categories categories-${index + 1}">
                        <a href = "#/byauthor/${index}"></a>
                      </div>
                      <div class = "number">${index + 1}</div>
                      <a href = "#/resultsbyauthor/${index}" class= "results results-${index + 1}"></a>
                      <div class = "categories-results  categories-results-${index + 1}"></div>
                    </li>`
                )
                .join("\n ")}
              </ul>
          </section>
      `;
    return view;
  },

  after_render: async () => {
    //let request = Utils.parseRequestURL();
    //const cardContainer = document.querySelectorAll('.categories');
    const navbarReturn = document.querySelector('.navbar-item-return');
    navbarReturn.classList.add('invisible');
    let quizAnswersByAuthor = JSON.parse(
      localStorage.getItem("quizAnswersByAuthor")
    );
    const categoriesResultsSpans = document.querySelectorAll(
      ".categories-results"
    );
    getResults();

    function getResults() {
      chunkedQuestionsbyAuthor.map((obj, index) => {
        let numberSolved = Utils.calculateAnswers(quizAnswersByAuthor[index]);
        let numberCommon = chunkedQuestionsbyAuthor[0].length;
        document.querySelector(`.categories-${index + 1}`).style.backgroundImage  = `url("../../data/${chunkedQuestionsbyAuthor[index][0].imageNum}.webp")`;
        if (!numberSolved) {
          document.querySelector(`.categories-${index + 1}`).classList.add("half-grayscale");
          document.querySelector(`.results-${index + 1}`).classList.add("hidden");
          document.querySelector(`.categories-results-${index + 1}`).classList.add("hidden");
        }
        categoriesResultsSpans[index].innerText = numberSolved + "/" + numberCommon;
      });
    }

  },
};

export default CategoriesByAuthor;
