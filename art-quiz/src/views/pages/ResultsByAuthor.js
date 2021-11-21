import Utils        from './../../services/Utils.js'
import { chunkedQuestionsbyAuthor } from '../../app.js'

let ResultsByAuthor = {
  render : async () => {
    let request = Utils.parseRequestURL();
    let roundNumber = +request.id.replace(/^0+/, '') + 1
      return /*html*/`
          <section class="section">
            <h1>Результаты ${roundNumber} раунда игры по художникам</h1>
            <ul class = "results-container">
            ${ chunkedQuestionsbyAuthor[request.id].map((obj, index) => 
              `<li class = "results">
                <div class = "flip-container">
                  <div class = "flipper">
                    <div class = "front">
                      <img src = ../../data/${chunkedQuestionsbyAuthor[request.id][index].imageNum}.webp>
                      <div class = "score"></div>
                    </div>
                    <div class = "back">
                      <div class = "author">${chunkedQuestionsbyAuthor[request.id][index].author}</div>
                      <div class = "name">"${chunkedQuestionsbyAuthor[request.id][index].name}"</div>
                      <div class = "year">(${chunkedQuestionsbyAuthor[request.id][index].year})</div>
                    </div>
                  </div>
                </div>
                
              </li>`
              ).join('\n ')
            }
            </ul>
          </section>
      `
  }
  , after_render: async () => {
    let request = Utils.parseRequestURL();
    let answersArr = JSON.parse(localStorage.getItem('quizAnswersByAuthor'))[request.id];
    const resultsContainer = document.querySelector('.results-container');
    resultsContainer.addEventListener('click', toggleFlip);
    paintCards();

    

    function toggleFlip(e) {
      let target = e.target;
      const flipContainer = target.closest('.flip-container');
      const flipContainerAll = document.querySelectorAll('.flip-container');
      flipContainerAll.forEach(element => {

        if (element != flipContainer) {
          element.classList.remove('flip');  
        }
        
      });
      flipContainer.classList.toggle('flip');
    }

    function paintCards() {
      let quizAnswersByAuthor = JSON.parse(localStorage.getItem('quizAnswersByAuthor'));
      const allCards = document.querySelectorAll('.results');
      allCards.forEach((element, id) => {
        if (!quizAnswersByAuthor[request.id][id]) {
          element.classList.add('grayscale');
        }
      });
    }


  }
}


export default ResultsByAuthor;