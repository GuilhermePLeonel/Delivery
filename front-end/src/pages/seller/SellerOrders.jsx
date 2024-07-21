import React, { useEffect, useState } from "react";
import SellerNavBar from "../../components/SellerNavBar";
import SellerOrderCard from "../../components/SellerOrderCard";
import { requestSalesData } from "../../services/requests";

function SellerOrders() {
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
      <SellerNavBar />
      <div class="sm:mx-4 mb-5 mt-40 sm:mt-40 md:mt-28">
        {console.log(customerOrder.length)}
        {customerOrder.length > 0 ? (
          customerOrder.map(({ id, userId, status }, index) => (
            <SellerOrderCard
              key={id}
              saleId={id}
              userId={userId}
              order={`${index + 1}`}
              status={status}
              saleDate={customerOrder[index].sale_date}
              totalPrice={customerOrder[index].total_price}
            />
          ))
        ) : (
          <h1 class="p-10 text-center font-semibold text-gray-700">
            VOCÊ NÃO TEM PEDIDOS AINDA
            <p class="p-5 text-red-600">
              Não se preocupe! Logo algum cliente irá realizar uma compra no seu
              estabelecimento, aguarde um pouco ! ^^
            </p>
          </h1>
        )}
      </div>
    </>
  );
}

export default SellerOrders;
