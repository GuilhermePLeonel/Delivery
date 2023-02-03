import React, { useEffect, useState } from 'react';
import moment from 'moment/moment';
// import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar';
// import SellerOrderDetailsCard from '../../components/SellerOrderDetailsCard';
import {
  requestSalesData,
  requestSalesProducts,
  requestProducts,
} from '../../services/requests';

function SellerOrdersDetails() {
  const [customerOrder, setCustomerOrder] = useState([]);
  const [saleId, setsaleId] = useState();
  const [salesProducts, setsalesProducts] = useState([]);
  const [allProducts, setallProducts] = useState([]);

  useEffect(() => {
    setsaleId(JSON.parse(localStorage.getItem('saleId')));

    const fetchAllProducts = async () => {
      const AllProducts = await requestProducts();
      setallProducts(AllProducts);
    };
    fetchAllProducts();

    const fetchSalesProducts = async () => {
      const { data } = await requestSalesProducts();
      setsalesProducts(data);
    };
    fetchSalesProducts();

    const fetchCustomerOrders = async () => {
      const { data } = await requestSalesData();
      setCustomerOrder(data);
    };
    fetchCustomerOrders();
  }, []);
  const sale = customerOrder.filter((sal) => sal.id === saleId)[0];
  const handleDateOfSale = (date) => {
    const result = moment(date).format('DD/MM/YYYY');
    return result;
  };
  const replaceValue = (string) => string.replace('.', ',');

  const dataStatus = 'seller_order_details__element-order-details-label-delivery-status';
  const dataDate = 'seller_order_details__element-order-details-label-order-date';
  const dataPreparing = 'seller_order_details__button-preparing-check';
  const dataSend = 'seller_order_details__button-dispatch-check';
  const dataNumber = 'seller_order_details__element-order-table-item-number';
  const dataName = 'seller_order_details__element-order-table-name';
  const dataQuantity = 'seller_order_details__element-order-table-quantity';
  const dataUnity = 'seller_order_details__element-order-table-unit-price';
  const dataSub = 'seller_order_details__element-order-table-sub-total';

  return (
    <>
      <NavBar />
      {customerOrder.length === 0 ? <p>Loading ...</p>
        : (

          <div>
            {' '}
            <div>
              <br />
              <span
                data-testid="seller_order_details__element-order-details-label-order-id"
              >
                PEDIDO
                {' '}
                {sale.id}
                {' '}
              </span>
              <span
                data-testid={ dataDate }
              >
                {' '}
                {handleDateOfSale(sale.sale_date)}
              </span>
              <span
                data-testid={ dataStatus }
              >
                {' '}
                {sale.status}
              </span>
            </div>
            <br />
            <button
              type="button"
              disabled={ false }
              data-testid={ dataPreparing }
            >
              PREPARAR PEDIDO
              {' '}
            </button>
            <button
              type="button"
              disabled
              data-testid={ dataSend }
            >
              SAIU PARA ENTREGA
              {' '}
            </button>

            <table>
              <thead>
                <td>Item</td>
                <td>Descrição</td>
                <td>Quantidade</td>
                <td>Valor Unitário</td>
                <td>Sub-total</td>

              </thead>
              {salesProducts.filter(
                (sal) => sal.saleId === saleId,
              ).map((product, index) => (
                <tbody
                  key={ product.productId }
                >
                  <td
                    data-testid={ `${dataNumber}-${index}` }
                  >
                    {index + 1}

                  </td>
                  <td
                    data-testid={ `${dataName}-${index}` }
                  >
                    {allProducts[product.productId - 1].name}

                  </td>
                  <td
                    data-testid={ `${dataQuantity}-${index}` }
                  >
                    {product.quantity}

                  </td>
                  <td
                    data-testid={ `${dataUnity}-${index}` }
                  >
                    {allProducts[product.productId - 1].price}

                  </td>
                  <td
                    data-testid={ `${dataSub}-${index}` }
                  >
                    {allProducts[product.productId - 1].price * product.quantity}

                  </td>
                </tbody>
              ))}
            </table>
            <div
              data-testid="seller_order_details__element-order-total-price"
            >
              <br />
              {' '}
              {replaceValue(sale.total_price)}
            </div>

          </div>
        )}
    </>
  );
}

export default SellerOrdersDetails;
