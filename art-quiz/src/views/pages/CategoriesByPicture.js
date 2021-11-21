import { chunkedQuestionsbyPicture } from "../../index.js";
import Utils from "../../services/Utils.js";

let CategoriesByPicture = {
  render: async () => {
    let view = /*html*/ `
          <section class="section">
              <h1>Викторина по произведениям</h1>
              <ul class = "categories-container">
              ${chunkedQuestionsbyPicture
                .map(
                  (obj, index) =>
                    `<li class = categories-container-li>
                      <div class = "categories categories-${index + 1}">
                        <a href = "#/bypicture/${index}"></a>
                      </div>
                      <div class = "number">${index + 1}</div>
                      <a href = "#/resultsbypicture/${index}" class= "results results-${index + 1}"></a>
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
    console.log(chunkedQuestionsbyPicture);

    const navbarReturn = document.querySelector('.navbar-item-return');
    navbarReturn.classList.add('invisible');
    let quizAnswersByPicture = JSON.parse(
      localStorage.getItem("quizAnswersByPicture")
    );
    const categoriesResultsSpans = document.querySelectorAll(
      ".categories-results"
    );
    getResults();

    function getResults() {
      chunkedQuestionsbyPicture.map((obj, index) => {
        let numberSolved = Utils.calculateAnswers(quizAnswersByPicture[index]);
        let numberCommon = chunkedQuestionsbyPicture[0].length;
        document.querySelector(`.categories-${index + 1}`).style.backgroundImage  = `url("./data/${chunkedQuestionsbyPicture[index][0].imageNum}.webp")`;
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

export default CategoriesByPicture;
