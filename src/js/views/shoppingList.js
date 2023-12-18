import View from './View';
import icons from 'url:../../img/icons.svg';

class shoppingListList extends View {
  _parentElement = document.querySelector('.shopping');
  _message = `Find a nice recipe, <br />
    and add its ingredients to your shopping list.`;
  _errorMessage = `Your shopping list is empty now !`;

  addHandlerDeleteItem(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btnDelete = e.target.closest('.shopping__delete-btn');
      if (!btnDelete) return;
      const shoppingItemNum =
        btnDelete.closest('.shopping__item').dataset.ingredientNumber;

      handler(+shoppingItemNum);
    });
  }

  _generateMarkup() {
    let markup = ``;

    for (const [i, ing] of this._data.entries()) {
      markup += `   
        <li class="shopping__item" data-ingredient-number="${i}">
            <div class="shopping__count">
                <input type="number" value="${ing.quantity || ''}" step="any" />
                <p>${ing.unit || ''}</p>
            </div>

            <p class="shopping__description">${ing.description}</p>
            <button class="shopping__delete-btn">
                <svg>
                <use href="${icons}#icon-circle-with-cross"></use>
                </svg>
            </button>
        </li>
      `;
    }

    let markup2 = `
        <ul class="shopping__list">
            ${markup}
        </ul>

    `;
    return markup2;
  }
}

export default new shoppingListList();
