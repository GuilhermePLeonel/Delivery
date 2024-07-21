import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import moment from "moment/moment";

function OrderCard({ saleId, order, status, saleDate, totalPrice }) {
  const navigate = useNavigate();
  useEffect(() => {}, []);

  const replaceValue = (string) => string.replace(".", ",");

  const handleDateOfSale = (date) => {
    const result = moment(date).format("DD/MM/YYYY");
    return result;
  };

  const onClick = () => {
    navigate(`/customer/orders/${saleId}`);
    localStorage.setItem("saleId", saleId);
  };

  return (
    <div className="flex flex-col sm:flex-row border-t border-gray-200 p-2">
      <div className="sm:w-1/4 p-2">
        <div className="font-semibold text-lg text-gray-800">
          {`Pedido ${order}`}
        </div>
      </div>
      <div className="sm:w-1/4 p-2">
        <div className="text-gray-600 text-sm">Status</div>
        <div data-testid={`customer_orders__element-order-date-${saleId}`}>
          {status}
        </div>
      </div>
      <div className="sm:w-1/4 p-2">
        <div className="text-gray-600 text-sm">Data do Pedido</div>
        <div data-testid={`customer_orders__element-order-date-${saleId}`}>
          {handleDateOfSale(saleDate)}
        </div>
      </div>
      <div className="sm:w-1/4 p-2">
        <div className="text-gray-600 text-sm">Total</div>
        R$
        <span data-testid={`customer_orders__element-card-price-${saleId}`}>
          {replaceValue(totalPrice)}
        </span>
      </div>
      <div className="sm:w-1/4 py-2  sm:mt-5 md:mt-0 flex justify-start  items-center">
        <button
          type="button"
          onClick={onClick}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-4 py-2 rounded-full focus:outline-none focus:shadow-outline-yellow active:bg-yellow-700 transition duration-300"
          data-testid={`customer_orders__element-order-id-${saleId}`}
        >
          Detalhes
        </button>
      </div>
    </div>
  );
}

OrderCard.propTypes = {
  saleId: PropTypes.number,
  order: PropTypes.string,
  status: PropTypes.string,
  saleDate: PropTypes.string,
  totalPrice: PropTypes.string,
}.isRequired;

export default OrderCard;
