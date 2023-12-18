import View from './View';
import icons from 'url:../../img/icons.svg';

class shoppingListList extends View {
  _parentElement = document.querySelector('.shopping');

  addHandlerDeleteItem(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btnDelete = e.target.closest('.shopping__delete-btn');
      if (!btnDelete) return;
      console.log(btnDelete);
      const shoppingItemNum =
        btnDelete.closest('.shopping__item').dataset.ingredientNumber;
      console.log(shoppingItemNum);
      handler(+shoppingItemNum);

      const parentItem = btnDelete.closest('.shopping__item');
      console.log(parentItem);
      // parentItem.remove();
    });
  }

  _generateMarkup() {
    console.log(this._data);
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
