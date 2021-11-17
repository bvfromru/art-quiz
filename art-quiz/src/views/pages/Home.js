let Home = {
  render: async () => {
    let view = `
        <main>
            <nav>
            <ul class = "main-btn-container">
              <li class = "main-btn"><a href=#/byauthor>По художникам</a></li>
              <li class = "main-btn"><a href=#/bypictures>По картинам</a></li>
              <li class = "main-btn"><a href=#>Настройки</a></li>
            </ul>
              </nav>    
            </main>
   
        `;
    return view;
  },
  after_render: async () => {},
};

export default Home;
