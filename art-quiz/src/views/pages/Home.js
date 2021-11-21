//import { audioClick } from '../../services/Audio.js'

let Home = {
  render: async () => {
    let view = `
        <main>
            <nav>
            <ul class = "main-btn-container">
              <li class = "main-btn btn click"><a class = "btn-icon btn-byartist" href = "#/byauthor">Викторина по художникам</a></li>
              <li class = "main-btn btn click"><a class = "btn-icon btn-bypicture" href = "#/bypicture">Викторина по произведениям</a></li>
              <li class = "main-btn btn click"><a class = "btn-icon btn-settings" href = "#/settings">Настройки</a></li>
            </ul>
              </nav>    
            </main>
   
        `;
    return view;
  },
  after_render: async () => {

    const navbarHome = document.querySelector('.navbar-item-home');
    const navbarReturn = document.querySelector('.navbar-item-return');
    navbarHome.classList.add('invisible');
    navbarReturn.classList.add('invisible');


  },
};

export default Home;
