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
      <div class=" sm:mx-4  mt-40 sm:mt-40 md:mt-28">
        <h1 class="mb-10 p-2 font-semibold text-gray-700">MEUS PEDIDOS</h1>
        {customerOrder.map(({ id, userId, status }, index) => (
          <OrderCard
            key={id}
            saleId={id}
            userId={userId}
            order={`${index + 1}`}
            status={status}
            saleDate={customerOrder[index].sale_date}
            totalPrice={customerOrder[index].total_price}
          />
        ))}
      </div>
    </>
  );
}

export default Orders;
