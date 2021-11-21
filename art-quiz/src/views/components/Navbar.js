let Navbar = {
  render: async () => {
    let view = `
        <nav class = "main-nav">
          <a class = "navbar-item navbar-item-home btn click navbar-btn-home" href="#/home">Главное меню</a>
          <div class = "logo">
            <img src="./assets/img/logo.png">
          </div>
          <a class = "navbar-item navbar-item-return btn click navbar-btn-categories" href = "#/byauthor">Выбор раунда</a>
        </nav>
        `;
    return view;
  },
  after_render: async () => {},
};

export default Navbar;
