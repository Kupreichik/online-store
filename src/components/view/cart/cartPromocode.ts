import { CartPromocodeState } from '../../../types/interfaces';

class cartPromocode {
  renderAdd(data: CartPromocodeState[]) {
    let html = '';
    let innerHtml = '';

    data.forEach((el) => {
      innerHtml += `
      <div class="promo-codes__applie">
          <p>${el.name}: -${el.disc}%</p>
          <button id="${el.id}" class="promo-codes__btn-remove promo-codes__btn">Remove</button>
      </div>
    `;
    });

    html = `
      ${data.length > 0 ? '<h3 class="promo-codes__title">Applied codes</h3>' : ''}
      ${innerHtml}
    `;
    return html;
  }

  renderPrev(data: CartPromocodeState) {
    return `
          <p>${data.name}: -${data.disc}%</p>
          <button class="promo-codes__btn-add promo-codes__btn">Add</button>
        `;
  }
}

export default cartPromocode;
