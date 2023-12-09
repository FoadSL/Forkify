class searchView {
  #parenteEl = document.querySelector('.search');

  getQuery() {
    const query = this.#parenteEl.querySelector('.search__field').value;
    this.#clearInput();
    return query;
  }

  #clearInput() {
    this.#parenteEl.querySelector('.search__field').value = '';
  }

  addHandlerSearch(handler) {
    this.#parenteEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new searchView();
