import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment/moment';

function SellerOrderCard({
  saleId,
  order,
  status,
  saleDate,
  totalPrice,
}) {
  const navigate = useNavigate();
  useEffect(() => {
    // console.log(saleDate);
    // console.log('CARD RODANDO');
  }, []);

  let statusOrder = '';

  if (status === 'Preparando') {
    statusOrder = 'order-status-preparando';
  }

  if (status === 'Entregue') {
    statusOrder = 'order-status-entregue';
  }
  const replaceValue = (string) => string.replace('.', ',');

  const handleDateOfSale = (date) => {
    const result = moment(date).format('DD/MM/YYYY');
    return result;
  };

  const onclick = () => {
    localStorage.setItem('saleId', JSON.stringify(
      saleId,
    ));
    navigate(`/seller/orders/${saleId}`);
  };

  return (
    <button
      type="button"
      onClick={ onclick }
      // type="button"
      // hidden
      // aria-hidden="true"
      data-testid={ `seller_orders__element-order-id-${saleId}` }
      // Aria-hidden e Hidden - https://medium.com/htmlmoderno/voc%C3%AA-conhece-o-atributo-html-hidden-saiba-quando-utiliz%C3%A1-lo-614d1f531786#:~:text=Muitos%20n%C3%A3o%20utilizam%20ou%20desconhecem,browser%2C%20enquanto%20isso%2C%20elementos%20com
    >
      {`Pedido ${order}`}
      <div
        className={ `order-status ${statusOrder}` }
        data-testid={ `seller_orders__element-delivery-status-${saleId}` }
      >
        {status}
      </div>
      <ul>
        <li
          data-testid={ `seller_orders__element-order-date-${saleId}` }
        >
          {
            // console.log(saleDate)
            handleDateOfSale(saleDate)
          }
        </li>
        <li>
          R$
          {' '}
          {' '}
          <span
            data-testid={ `seller_orders__element-card-price-${saleId}` }
          >
            {replaceValue(totalPrice)}
          </span>
        </li>
      </ul>
    </button>
  );
}

SellerOrderCard.propTypes = {
  saleId: PropTypes.number,
  order: PropTypes.string,
  status: PropTypes.string,
  saleDate: PropTypes.string,
  totalPrice: PropTypes.string,
}.isRequired;

export default SellerOrderCard;
