import { Controller } from "@hotwired/stimulus"

export default class extends Controller {

  static targets = ["list", "input"]

  connect() {
    // console.log('conectou controller movies')
    // console.log(this.listTarget)
    // console.log(this.inputTarget)
    this.fetchMovies('harry potter')
  }

  insertMovies(data) {
    data.Search.forEach((result) => {
      const movieTag = `<li class="list-group-item border-0">
        <img src="${result.Poster}" alt="" width="100">
      </li>`
      this.listTarget.insertAdjacentHTML("beforeend", movieTag)
    })
  }

  fetchMovies(query) {
    fetch(`http://www.omdbapi.com/?s=${query}&apikey=8691812a`)
      .then(response => response.json())
      .then(data => this.insertMovies(data))
  }

  search(event) {
    event.preventDefault()
    this.listTarget.innerHTML = ""
    this.fetchMovies(this.inputTarget.value)
  }

}
