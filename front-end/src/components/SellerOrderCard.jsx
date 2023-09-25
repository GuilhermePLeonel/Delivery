import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import moment from "moment/moment";

function SellerOrderCard({ saleId, order, status, saleDate, totalPrice }) {
  const navigate = useNavigate();
  useEffect(() => {
    // console.log(saleDate);
    // console.log('CARD RODANDO');
  }, []);

  let statusOrder = "";

  if (status === "Preparando") {
    statusOrder = "order-status-preparando";
  }

  if (status === "Entregue") {
    statusOrder = "order-status-entregue";
  }
  const replaceValue = (string) => string.replace(".", ",");

  const handleDateOfSale = (date) => {
    const result = moment(date).format("DD/MM/YYYY");
    return result;
  };

  const onClick = () => {
    localStorage.setItem("saleId", JSON.stringify(saleId));
    navigate(`/seller/orders/${saleId}`);
  };

  return (
    <div className="flex flex-col sm:flex-row border-t border-gray-200 p-2">
      <div className={`w-1/4 p-2`}>
        <div className="font-semibold text-lg text-gray-800">
          {`Pedido ${order}`}
        </div>
      </div>
      <div className="w-1/4 p-2">
        <div className="text-gray-600 text-sm">Status</div>
        <div data-testid={`customer_orders__element-order-date-${saleId}`}>
          {status}
        </div>
      </div>
      <div className="w-1/4 p-2">
        <div className="text-gray-600 text-sm">Data do Pedido</div>
        <div data-testid={`customer_orders__element-order-date-${saleId}`}>
          {handleDateOfSale(saleDate)}
        </div>
      </div>
      <div className="w-1/4 p-2">
        <div className="text-gray-600 text-sm">Total</div>
        R$
        <span data-testid={`customer_orders__element-card-price-${saleId}`}>
          {replaceValue(totalPrice)}
        </span>
      </div>
      <div className="w-1/4 p-2 flex justify-center items-center">
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

SellerOrderCard.propTypes = {
  saleId: PropTypes.number,
  order: PropTypes.string,
  status: PropTypes.string,
  saleDate: PropTypes.string,
  totalPrice: PropTypes.string,
}.isRequired;

export default SellerOrderCard;
