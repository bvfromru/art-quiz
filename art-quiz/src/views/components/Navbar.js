let Navbar = {
  render: async () => {
    let view = `
        <nav class = "main-nav">
          <a class="navbar-item" href="/#/">Главное меню</a>
          <div class = "logo">
            <img src="../../assets/img/logo.png">
          </div>
        </nav>
        `;
    return view;
  },
  after_render: async () => {},
};

export default Navbar;
