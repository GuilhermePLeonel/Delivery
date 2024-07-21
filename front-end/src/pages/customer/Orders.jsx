import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import OrderCard from "../../components/OrderCard";
import { requestSalesData } from "../../services/requests";

function Orders() {
  const [customerOrder, setCustomerOrder] = useState([]);

  useEffect(() => {
    const fetchCustomerOrders = async () => {
      const { data } = await requestSalesData();
      setCustomerOrder(data);
    };

    fetchCustomerOrders();
  }, []);

  return (
    <>
      <NavBar />
      <div class="mb-10 mt-40 sm:mt-40 md:mt-28">
        {customerOrder.length > 0 ? (
          customerOrder.map(({ id, userId, status }, index) => (
            <div>
              <OrderCard
                key={id}
                saleId={id}
                userId={userId}
                order={`${index + 1}`}
                status={status}
                saleDate={customerOrder[index].sale_date}
                totalPrice={customerOrder[index].total_price}
              />
            </div>
          ))
        ) : (
          <h1 class="p-10 text-center font-semibold text-gray-700">
            VOCÊ NÃO TEM PEDIDOS AINDA
            <p class="p-5 text-red-600">
              Adcione produtos ao carrinho e finalize a compra para visualizar
              seus pedidos! ^^
            </p>
          </h1>
        )}
      </div>
    </>
  );
}

export default Orders;
