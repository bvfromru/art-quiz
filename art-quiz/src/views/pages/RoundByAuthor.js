import Utils        from './../../services/Utils.js'
import { chunkedQuestionsbyAuthor } from '../../app.js'

let RoundByAuthor = {
    render : async () => {
        return /*html*/`
            <section class="section">
              <h1>Кто является автором этой картины?</h1>
              <img id = 'img'></img>

              <div id ="roundnumber" >Раунд: </div>
              <div id ="div" >Правильный ответ: </div>
              <ul id = "answers-container">
                <li id = "answer1"></li>
                <li id = "answer2"></li>
                <li id = "answer3"></li>
                <li id = "answer4"></li>
              </ul>
              <a href=#/byauthor>Категории по автору</a>

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
      const roundNumberDiv = document.getElementById('roundnumber');
      const answer1 = document.getElementById('answer1');
      const answer2 = document.getElementById('answer2');
      const answer3 = document.getElementById('answer3');
      const answer4 = document.getElementById('answer4');
      const answersContainer = document.getElementById('answers-container');

    

      updateContent();

      answersContainer.addEventListener('click', acceptAnswer);

      function acceptAnswer(e) {
        if (e.target.innerText === currentQuestionData.author) {
          answers.push(true);
          alert('Правильный ответ!');
        } else {
          answers.push(false);
          alert('Ответ неверный!');
        }
        if (roundNumber < (chunkedQuestionsbyAuthor[request.id].length - 1)) {
          roundNumber++;
          updateContent();
        } else {
          finishRound();
        }             
       }

       function calculateAnswers(arr) {
        return arr.filter((value) => {return value}).length;
       }

       function updateContent() {
        currentQuestionData = chunkedQuestionsbyAuthor[request.id][roundNumber];
        shuffledAuthorsArr = Utils.getRandomAuthors(currentQuestionData.author);
        img.src = `../../data/${currentQuestionData.imageNum}.jpg`
        div.innerText = `Правильный ответ: ${currentQuestionData.author}`;
        roundNumberDiv.innerText = `Раунд: ${roundNumber + 1}`;
        answer1.innerText = shuffledAuthorsArr[0];
        answer2.innerText = shuffledAuthorsArr[1];
        answer3.innerText = shuffledAuthorsArr[2];
        answer4.innerText = shuffledAuthorsArr[3];
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