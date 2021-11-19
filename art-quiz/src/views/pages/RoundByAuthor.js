import Utils        from './../../services/Utils.js'
import { chunkedQuestionsbyAuthor } from '../../app.js'

let RoundByAuthor = {
    render : async () => {
      let request = Utils.parseRequestURL();
        return /*html*/`
            <div class = "spoiler" id ="div" >Правильный ответ: </div>
              <h1>Кто автор этой картины?</h1>
              <div class = "image-container">
                
              <div class = "show-result">
                  <div class = "show-result-picture"></div>
                  <div class = "show-result-data">
                    <p class = "show-result-author"></p>
                    <p class = "show-result-name"></p>
                    <p class = "show-result-year"></p>
                  </div>
                  <button type = "submit" class = "btn-next btn">Продолжить</button>
                  </div>
                  
                  <div class = "finish-card">
                  <div class = "finish-card-smile"></div>
                  <div class = "finish-card-data">
                    <p class = "finish-card-count"></p>
                    <p class = "finish-card-status"></p>
                  </div>
                    <div class = "finish-card-buttons">
                      <a class = "finish-card-btn btn start-again">Сыграть еще раз</a>
                      <a class = "finish-card-btn btn"  href = "#/byauthor">К выбору раунда</a>
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
              </div>
              
              <ul class = "answers-container" id = "answers-container">
              <div class = "shield hidden"></div>
                <li><a href = "/" class = "answer answer-1 btn"></a></li>
                <li><a href = "/" class = "answer answer-2 btn"></a></li>
                <li><a href = "/" class = "answer answer-3 btn"></a></li>
                <li><a href = "/" class = "answer answer-4 btn"></a></li>
              </ul>
        `
    }
    , after_render: async () => {
      let questionNumber = 0;
      let shuffledAuthorsArr = [];
      let answers = [];
      let request = Utils.parseRequestURL()
      let currentQuestionData = chunkedQuestionsbyAuthor[request.id][questionNumber];
      const imageContainer = document.querySelector('.image-container');
      const div = document.getElementById('div');
      const answer1 = document.querySelector('.answer-1');
      const answer2 = document.querySelector('.answer-2');
      const answer3 = document.querySelector('.answer-3');
      const answer4 = document.querySelector('.answer-4');
      const answersContainer = document.getElementById('answers-container');
      const showResult = document.querySelector('.show-result');
      const finishCard = document.querySelector('.finish-card');
      const startAgainBtn = document.querySelector('.start-again');
      const shield = document.querySelector('.shield');
      window.addEventListener("keydown", keyBind);
      startAgainBtn.addEventListener("click", startAgain);
      shield.addEventListener('click', shieldStopPropaganation);

      function shieldStopPropaganation(e) {
        e.stopPropagation()
      }


    
      document.querySelector(`.progressbar-element-${questionNumber + 1}`).classList.add('current');
      updateContent();

      answersContainer.addEventListener('click', acceptAnswer);


      // Buttons clicks
      // const buttons = document.querySelectorAll('.btn');
      // buttons.forEach(element => {
      // element.addEventListener('click', () => Utils.playAudio(sounds.click));    
      // });
  




      function keyBind(event) {
          if (event.keyCode === 13) {
            event.preventDefault();            
            if (showResult.classList.contains('show')) {
              nextRound();
            }
        }
      }

      function startAgain() {
        shield.classList.add('hidden');
        for (let i = 0; i < questionNumber + 1; i++) {
          document.querySelector(`.progressbar-element-${i + 1}`).classList.remove('wrong');
          document.querySelector(`.progressbar-element-${i + 1}`).classList.remove('correct');
          document.querySelector(`.progressbar-element-${i + 1}`).classList.remove('current');
        }
        questionNumber = 0;
        shuffledAuthorsArr = [];
        answers = [];
        currentQuestionData = chunkedQuestionsbyAuthor[request.id][questionNumber];

        finishCard.classList.remove('show');
        updateContent();
      }


      function showResultCard(state) {
        const showResultPicture = document.querySelector('.show-result-picture');
        const showResultAuthor = document.querySelector('.show-result-author');
        const showResultName = document.querySelector('.show-result-name');
        const showResultYear = document.querySelector('.show-result-year');
        shield.classList.remove('hidden');
        //const btnNext = document.querySelector('.btn-next');
        showResultAuthor.innerText = currentQuestionData.author;
        showResultName.innerText = `"${currentQuestionData.name}"`;
        showResultYear.innerText = `(${currentQuestionData.year})`;
        if (state) {
          showResultPicture.style.backgroundPosition = "0 0"
        } else {
          showResultPicture.style.backgroundPosition = "100% 0"
        }
        showResult.addEventListener('click', nextRound);
        showResult.classList.add('show');
      }

      function acceptAnswer(e) {
        e.preventDefault();
        if (e.target.innerText === currentQuestionData.author) {
          correctAnswer(e) 
        } else {
          wrongAnswer(e);          
        }
       }

       function wrongAnswer(e) {
        answers.push(false);
        document.querySelector(`.progressbar-element-${questionNumber + 1}`).classList.add('wrong');
        e.target.classList.add('wrong');
        showResultCard(false);
        Utils.playAudio(Utils.sounds.wrong);
       }

       function correctAnswer(e) {
        answers.push(true);
        document.querySelector(`.progressbar-element-${questionNumber + 1}`).classList.add('correct');
        e.target.classList.add('correct');
        showResultCard(true);
        Utils.playAudio(Utils.sounds.correct);
       }

       function nextRound() {
        shield.classList.add('hidden');
        showResult.classList.remove('show');
         const answerBtns = document.querySelectorAll('.answer');
         answerBtns.forEach(element => {
           element.classList.remove('correct');
           element.classList.remove('wrong');
         });
        if (questionNumber < (chunkedQuestionsbyAuthor[request.id].length - 1)) {
          questionNumber++;
          updateContent();
        } else {
          finishRound();
        }             
       }

       function updateContent() {
        currentQuestionData = chunkedQuestionsbyAuthor[request.id][questionNumber];
        shuffledAuthorsArr = Utils.getRandomAuthors(currentQuestionData.author);
        imageContainer.style.backgroundImage  = `url("../../data/${currentQuestionData.imageNum}.jpg")`;
        div.innerText = `Правильный ответ: ${currentQuestionData.author}`;
        answer1.innerText = shuffledAuthorsArr[0];
        answer2.innerText = shuffledAuthorsArr[1];
        answer3.innerText = shuffledAuthorsArr[2];
        answer4.innerText = shuffledAuthorsArr[3];
        document.querySelector(`.progressbar-element-${questionNumber + 1}`).classList.add('current');
      }   

      function finishRound() {
        shield.classList.remove('hidden');
        showResult.classList.remove('show');
        const finishCardCount = document.querySelector('.finish-card-count');
        const finishCardStatus = document.querySelector('.finish-card-status');
        const finishCardSmile = document.querySelector('.finish-card-smile');
        
        //alert('Конец раунда!');
        //console.log(answers);
        let quizAnswersByAuthor = JSON.parse(localStorage.getItem('quizAnswersByAuthor'));
        //console.log(quizAnswersByAuthor);
        //console.log(quizAnswersByAuthor[request.id]);
        quizAnswersByAuthor[request.id] = answers;
        localStorage.setItem('quizAnswersByAuthor', JSON.stringify(quizAnswersByAuthor));
        let rightAnswersNumber = Utils.calculateAnswers(answers);
        let status = "";
        let background = "rgba(207, 249, 255, 0.9)";
        let position = '0px 0px';
        switch (rightAnswersNumber) {
          case 0: 
            status = "Полный провал!";
            background = "rgba(255, 207, 232, 0.9)"
            position = '558px 160px';
            break;
          case 1: 
            status = "Случайно повезло?";
            background = "rgba(255, 207, 246, 0.9)"
            position = '160px 0px';
            break;
          case 2: 
            status = "На двоечку!";
            background = "rgba(240, 207, 255, 0.9)"
            position = '360px 0px';
            break;
          case 3: 
            status = "Удовлетворительно!";
            background = "rgba(220, 207, 255, 0.9)"
            position = '568px 360px';
            break;
          case 4: 
            status = "Даже не стараешься!";
            background = "rgba(209, 207, 255, 0.9)"
            position = '765px 360px';
            break;
          case 5: 
            status = "Ты можешь лучше!";
            background = "rgba(207, 216, 255, 0.9)"
            position = '558px 0px';
            break;
          case 6: 
            status = "Неплохо!";
            background = "rgba(207, 225, 255, 0.9)"
            position = '0px 360px';
            break;
          case 7: 
            status = "Хорошо!";
            background = "rgba(207, 235, 255, 0.9)"
            position = '770px 0px';
            break;
          case 8: 
            status = "Отлично!";
            background = "rgba(207, 249, 255, 0.9)"
            position = '358px 160px';
            break;
          case 9: 
            status = "Впечатляет!";
            background = "rgba(207, 255, 249, 0.9)"
            position = '758px 160px';
            break;
          case 10: 
            status = "Идеально!";
            background = "rgba(207, 255, 225, 0.9)"
            break;
          default:
            status = "Что-то пошло не так";
        }
        
        finishCard.style.backgroundColor = background;
        finishCardSmile.style.backgroundPosition = position;
        finishCardCount.innerText = `${rightAnswersNumber} из ${(chunkedQuestionsbyAuthor[request.id].length - 1)}`
        finishCardStatus.innerText = status;
        finishCard.classList.add('show');
        Utils.playAudio(Utils.sounds.finishRound);
      }

    }
}

export default RoundByAuthor;