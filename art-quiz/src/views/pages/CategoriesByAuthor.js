import { chunkedQuestionsbyAuthor } from '../../app.js'

let CategoriesByAuthor = {
  render : async () => {
      let view =  /*html*/`
          <section class="section">
              <h1> Викторина по автору </h1>
              <ul>
              ${ chunkedQuestionsbyAuthor.map((obj, index) => 
                `<li>
                  <a href = "#/byauthor/${index}">Категория ${index}</a><br>
                  <a href = "#/resultsbyauthor/${index}">Результаты категории ${index}</a>
                </li>`
                ).join('\n ')
              }
              </ul>
          </section>
      `
      return view
  },
  after_render: async () => {}
      
}

export default CategoriesByAuthor;