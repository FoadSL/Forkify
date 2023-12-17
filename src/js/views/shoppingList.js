import View from './View';
import icons from 'url:../../img/icons.svg';

class shoppingListList extends View {
  _parentElement = document.querySelector('.shopping__list');

  _generateMarkup() {
    console.log(this._data);
    const markup = this._data.reduce((acc, cur) => {
      acc += `
        <li class="shopping__item">
            <div class="shopping__count">
                <input type="number" value="${cur.quantity}" step="any" />
                <p>${cur.unit || ''}</p>
            </div>

            <p class="shopping__description">${cur.description}</p>
            <button class="shopping__delete">
                <svg>
                <use href="${icons}#icon-minus-circle"></use>
                </svg>
            </button>
        </li>
      `;
      return acc;
    }, '');

    return markup;
  }
}

export default new shoppingListList();
