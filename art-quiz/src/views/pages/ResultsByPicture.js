import Utils        from './../../services/Utils.js'
import { chunkedQuestionsbyPicture } from '../../index.js'

let ResultsByPicture = {
  render : async () => {
    let request = Utils.parseRequestURL();
    let roundNumber = +request.id.replace(/^0+/, '') + 1
      return /*html*/`
          <section class="section">
            <h1>Результаты ${roundNumber} раунда игры по художникам</h1>
            <ul class = "results-container">
            ${ chunkedQuestionsbyPicture[request.id].map((obj, index) => 
              `<li class = "results">
                <div class = "flip-container">
                  <div class = "flipper">
                    <div class = "front">
                      <img src = ./data/${chunkedQuestionsbyPicture[request.id][index].imageNum}.webp>
                      <div class = "score"></div>
                    </div>
                    <div class = "back">
                      <div class = "author">${chunkedQuestionsbyPicture[request.id][index].author}</div>
                      <div class = "name">"${chunkedQuestionsbyPicture[request.id][index].name}"</div>
                      <div class = "year">(${chunkedQuestionsbyPicture[request.id][index].year})</div>
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
    const navbarBtn = document.querySelector('.navbar-item-return');
    navbarBtn.setAttribute("href", "#/bypicture")


    let request = Utils.parseRequestURL();
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
      let quizAnswersByPicture = JSON.parse(localStorage.getItem('quizAnswersByPicture'));
      const allCards = document.querySelectorAll('.results');
      allCards.forEach((element, id) => {
        if (!quizAnswersByPicture[request.id][id]) {
          element.classList.add('grayscale');
        }
      });
    }


  }
}


export default ResultsByPicture;