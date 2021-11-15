import Utils        from './../../services/Utils.js'
import { chunkedQuestionsbyAuthor } from '../../app.js'

let ResultsByAuthor = {
  render : async () => {
    let request = Utils.parseRequestURL();
      return /*html*/`
          <section class="section">
            <h1>Результаты игры по автору</h1>
            ${ chunkedQuestionsbyAuthor[request.id].map((obj, index) => 
              `<li>
                <img src = ../../data/${chunkedQuestionsbyAuthor[request.id][index].imageNum}.jpg>
              </li>`
              ).join('\n ')
            }

          </section>
      `
  }
  , after_render: async () => {
    let request = Utils.parseRequestURL();
    let answersArr = JSON.parse(localStorage.getItem('quizAnswersByAuthor'))[request.id];
    console.log(answersArr);
  }
}


export default ResultsByAuthor;