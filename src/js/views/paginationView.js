import View from './View.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupButton('next');
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupButton('prev');
    }

    // Other page
    if (curPage < numPages) {
      return (
        this._generateMarkupButton('prev') + this._generateMarkupButton('next')
      );
    }

    // Page 1, and there are NO other pages
    if (curPage === 1 && numPages === 1) {
      return ``;
    }
  }

  _generateMarkupButton(direction) {
    let goTo, arrow;

    if (direction === 'prev') {
      goTo = this._data.page - 1;
      arrow = 'left';
    }

    if (direction === 'next') {
      goTo = this._data.page + 1;
      arrow = 'right';
    }

    return `
        <button data-goto="${goTo}" class="btn--inline pagination__btn--${direction}">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-${arrow}"></use>
            </svg>
            <span>Page ${goTo}</span>
        </button>
      `;
  }
}

export default new PaginationView();
