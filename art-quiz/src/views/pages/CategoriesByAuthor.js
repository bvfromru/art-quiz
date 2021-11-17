//import Utils        from './../../services/Utils.js'
import { chunkedQuestionsbyAuthor } from "../../app.js";
import Utils from "../../services/Utils.js";

let CategoriesByAuthor = {
  render: async () => {
    let view = /*html*/ `
          <section class="section">
              <h1> Викторина по автору </h1>
              <ul class = "categories-container">
              ${chunkedQuestionsbyAuthor
                .map(
                  (obj, index) =>
                    `<li class = "categories categories-${index + 1}">
                      <a href = "#/byauthor/${index}">
                        <div class = "number">${index + 1}</div>
                      </a>
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
    let quizAnswersByAuthor = JSON.parse(
      localStorage.getItem("quizAnswersByAuthor")
    );
    const categoriesResultsSpans = document.querySelectorAll(
      ".categories-results"
    );
    getResults();

    function getResults() {
      console.log(quizAnswersByAuthor);
      chunkedQuestionsbyAuthor.map((obj, index) => {
        let numberSolved = Utils.calculateAnswers(quizAnswersByAuthor[index]);
        let numberCommon = chunkedQuestionsbyAuthor[0].length;
        if (!numberSolved) {
          document.querySelector(`.categories-${index + 1}`).classList.add("grayscale");
          document.querySelector(`.results-${index + 1}`).classList.add("hidden");
          document.querySelector(`.categories-results-${index + 1}`).classList.add("hidden");
        }
        categoriesResultsSpans[index].innerText = numberSolved + "/" + numberCommon;
      });
    }

  },
};

export default CategoriesByAuthor;
