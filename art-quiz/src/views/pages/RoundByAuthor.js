import Utils        from './../../services/Utils.js'
import { chunkedQuestionsbyAuthor } from '../../app.js'

let RoundByAuthor = {
    render : async () => {
      let request = Utils.parseRequestURL();
        return /*html*/`
            <section class="section">
            <div id ="div" >Правильный ответ: </div>
              <a href=#/byauthor>Викторина по автору</a>
              <h1>Кто является автором этой картины?</h1>
              <div class = "image-container">
                <img id = 'img'></img>
                <div class = "show-result">
                  <h2 class = "show-result-state"></h2>
                  <p class = "show-result-author"></p>
                  <p class = "show-result-name"></p>
                  <p class = "show-result-year"></p>
                  <button class = "btn-next">OK</button>
                </div>
              </div>
              
              <div class= "progressbar-container">
                <ul>
                ${chunkedQuestionsbyAuthor[request.id].map(
                    (obj, index) =>
                      `<li class = "progressbar-element progressbar-element-${index + 1}">
                      </li>`
                  )
                  .join("\n ")}
                </ul>
              </div>
              <ul class = "answers-container" id = "answers-container">
                <li><a href = "/" class = "answer answer-1"></a></li>
                <li><a href = "/" class = "answer answer-2"></a></li>
                <li><a href = "/" class = "answer answer-3"></a></li>
                <li><a href = "/" class = "answer answer-4"></a></li>
              </ul>

            </section>
        `
    }
    , after_render: async () => {
      let roundNumber = 0;
      let shuffledAuthorsArr = [];
      let answers = []
      let request = Utils.parseRequestURL()
      let currentQuestionData = chunkedQuestionsbyAuthor[request.id][roundNumber];
      const img = document.getElementById('img');
      const div = document.getElementById('div');
      const answer1 = document.querySelector('.answer-1');
      const answer2 = document.querySelector('.answer-2');
      const answer3 = document.querySelector('.answer-3');
      const answer4 = document.querySelector('.answer-4');
      const answersContainer = document.getElementById('answers-container');

    
      document.querySelector(`.progressbar-element-${roundNumber + 1}`).classList.add('current');
      updateContent();

      answersContainer.addEventListener('click', acceptAnswer);

      function showResultCard(state) {
        const showResultState = document.querySelector('.show-result-state');
        const showResultAuthor = document.querySelector('.show-result-author');
        const showResultName = document.querySelector('.show-result-name');
        const showResultYear = document.querySelector('.show-result-year');
        const btnNext = document.querySelector('.btn-next');
        showResultAuthor.innerText = currentQuestionData.author;
        showResultName.innerText = `"${currentQuestionData.name}"`;
        showResultYear.innerText = `(${currentQuestionData.year})`;
        if (state) {
          showResultState.innerText = "Правильный ответ!"
        } else {
          showResultState.innerText = "Неправильный ответ!"
        }
        btnNext.addEventListener('click', nextRound);
      }

      function acceptAnswer(e) {
        e.preventDefault();
        if (e.target.innerText === currentQuestionData.author) {
          answers.push(true);
          document.querySelector(`.progressbar-element-${roundNumber + 1}`).classList.add('correct');
          e.target.classList.add('correct');
          showResultCard(true);
          //alert('Правильный ответ!');
        } else {
          answers.push(false);
          document.querySelector(`.progressbar-element-${roundNumber + 1}`).classList.add('wrong');
          e.target.classList.add('wrong');
          showResultCard(false);
          //alert('Ответ неверный!');
        }
       
       }

       function nextRound() {
         const answerBtns = document.querySelectorAll('.answer');
         answerBtns.forEach(element => {
           element.classList.remove('correct');
           element.classList.remove('wrong');
         });
        if (roundNumber < (chunkedQuestionsbyAuthor[request.id].length - 1)) {
          roundNumber++;
          updateContent();
        } else {
          finishRound();
        }             
       }

       function updateContent() {
        currentQuestionData = chunkedQuestionsbyAuthor[request.id][roundNumber];
        shuffledAuthorsArr = Utils.getRandomAuthors(currentQuestionData.author);
        img.src = `../../data/${currentQuestionData.imageNum}.jpg`
        div.innerText = `Правильный ответ: ${currentQuestionData.author}`;
        answer1.innerText = shuffledAuthorsArr[0];
        answer2.innerText = shuffledAuthorsArr[1];
        answer3.innerText = shuffledAuthorsArr[2];
        answer4.innerText = shuffledAuthorsArr[3];
        document.querySelector(`.progressbar-element-${roundNumber + 1}`).classList.add('current');
      }   

      function finishRound() {
        alert('Конец раунда!');
        //console.log(calculateAnswers(answers));
        //console.log(answers);
        let quizAnswersByAuthor = JSON.parse(localStorage.getItem('quizAnswersByAuthor'));
        //console.log(quizAnswersByAuthor);
        //console.log(quizAnswersByAuthor[request.id]);
        quizAnswersByAuthor[request.id] = answers;
        localStorage.setItem('quizAnswersByAuthor', JSON.stringify(quizAnswersByAuthor));
      }

    }
}

export default RoundByAuthor;