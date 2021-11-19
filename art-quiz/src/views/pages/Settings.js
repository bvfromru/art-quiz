let Settings = {
  render: async () => {
    let view = `
      <form>
        <h1>Настройки приложения</h1>
        <fieldset>
          <p>Регулировка громкости</p>
          <div class="volume-container settings-container">
            <div class = "volume-btn settings-on-off-btn"></div>
            <input type="range" class = "volume" id = "volume" name = "volume"  min="0" max="100" value="50" step="1">
          </div>
          <p>Таймер для ответа на вопрос</p>
          <div class="timer-container settings-container">
            <div class = "timer-btn settings-on-off-btn"></div>
            <input type="range" class = "timer"  id = "timer" name = "timer"  min="0" max="30" value="30" step="5">
          </div>
          <div  class = "settings-btn-container" >
            <a href="#">
              <input class = "btn settings-btn settings-cancel" type="button" value="Отмена">
            </a>
            <div>
              <input class = "btn settings-btn settings-submit"  type="submit" value="Сохранить">
            </div>
          </div>
        </fieldset>
      </form>
      
        `;
    return view;
  },
  after_render: async () => {},
};

export default Settings;
