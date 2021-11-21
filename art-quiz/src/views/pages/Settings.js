import Utils        from './../../services/Utils.js'

let Settings = {
  render: async () => {
    let view = `
      <form>
        <h1>Настройки приложения</h1>
        <fieldset>
          <p>Регулировка громкости</p>
          <div class="volume-container settings-container">
            <div class = "volume-btn settings-on-off-btn"></div>
            <input type="range" class = "volume-input" id = "volume" name = "volume"  min="0" max="1" value="0.5" step="0.01">
          </div>
          <p>Таймер для ответа на вопрос</p>
          <div class="timer-container settings-container">
            <div class = "timer-btn settings-on-off-btn"></div>
            <div class="amount-section amount-basic">
              <button class="btn change-timer-btn amount-minus" type="button" onclick="this.nextElementSibling.stepDown()">–</button>
                <input class="timer-input " type="number" min="0" max="30" step="5" value="0" readonly="">
              <button class="btn change-timer-btn amount-plus" type="button" onclick="this.previousElementSibling.stepUp()">+</button>
            </div>
          </div>
          <div  class = "settings-btn-container" >
 
            <div>
              <input class = "btn settings-btn settings-submit" type="submit" value="Сохранить">
            </div>
          </div>
          <p class = "hint">Управление викториной с клавиатуры:<br>клавиши с 1 по 4 и Enter</p>
        </fieldset>
      </form>


      

      
        `;
    return view;
  },
  after_render: async () => {
    const navbarReturn = document.querySelector('.navbar-item-return');
    navbarReturn.classList.add('invisible');

    const settingsSubmit = document.querySelector('.settings-submit');
    const volumeInput = document.querySelector('.volume-input');
    const timerInput = document.querySelector('.timer-input');
    const timerInputBtnMinus = document.querySelector('.amount-minus');
    const timerInputBtnPlus = document.querySelector('.amount-plus');
    const timerBtn = document.querySelector('.timer-btn');
    const volumeBtn = document.querySelector('.volume-btn');

    getInputValues();
    let tempValueTimer = 30;
    let tempValueVolume = 0.5;
    settingsSubmit.addEventListener('click', saveValues);
    timerBtn.addEventListener('click', toggleTimer);
    volumeBtn.addEventListener('click', toggleVolume);
    timerInputBtnMinus.addEventListener('click', changeTimerIcon);
    timerInputBtnPlus.addEventListener('click', changeTimerIcon);
    volumeInput.addEventListener('change', changeVolumeIcon);
    volumeInput.addEventListener('change', playCorrectSound);
    changeTimerIcon();
    changeVolumeIcon();
    
 

    function getInputValues() {
      volumeInput.value = localStorage.getItem("quiz-volume");
      timerInput.value = localStorage.getItem("quiz-timer");
    }

    function saveValues(e) {
      e.preventDefault();
      localStorage.setItem("quiz-volume", volumeInput.value);
      localStorage.setItem("quiz-timer", timerInput.value);   
      window.location.href = "#"; 
    }

    function toggleTimer() {
      timerBtn.classList.toggle('timer-off');
      if (timerInput.value > 0) {
        timerInput.value = 0;
      } else {
        timerInput.value = tempValueTimer;
      }
    }

    function toggleVolume() {
      volumeBtn.classList.toggle('volume-off');
      if (volumeInput.value > 0) {
        volumeInput.value = 0;
      } else {
        volumeInput.value = tempValueVolume;
      }
    }

    function changeTimerIcon() {
      if (timerInput.value == 0) {
        if (!timerBtn.classList.contains('timer-off')) {
          timerBtn.classList.add('timer-off');
        }
      } else {
        timerBtn.classList.remove('timer-off');
      }
    }

    function changeVolumeIcon() {
      if (volumeInput.value == 0) {
        if (!volumeBtn.classList.contains('volume-off')) {
          volumeBtn.classList.add('volume-off');
        }
      } else {
        volumeBtn.classList.remove('volume-off');
      }      
    }
    
    function playCorrectSound() {
      Utils.audios.correct.volume = volumeInput.value;
      Utils.playAudio(Utils.audios.correct);
    }

  },
};

export default Settings;
