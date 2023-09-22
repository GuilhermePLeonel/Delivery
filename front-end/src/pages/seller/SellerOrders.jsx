import React, { useEffect, useState } from "react";
// import { useNavigate } from 'react-router-dom';
import SellerNavBar from "../../components/SellerNavBar";
import SellerOrderCard from "../../components/SellerOrderCard";
import { requestSalesData } from "../../services/requests";

function SellerOrders() {
  const [customerOrder, setCustomerOrder] = useState([]);
  // const navigate = useNavigate();
  // const [idUser, setIdUser] = useState();
  // const [userToken, setUserToken] = useState();

  useEffect(
    () => {
      // if (!localStorage.getItem('user')) {
      //   return navigate('/login');
      // }
      // const getUserInfo = () => {
      //   if (!localStorage.getItem('user')) {
      //     return navigate('/login');
      //   }
      //   const { id, token } = JSON.parse(localStorage.getItem('user'));
      //   setIdUser(id);
      //   setUserToken(token);
      //   return token;
      // };
      const fetchCustomerOrders = async () => {
        const { data } = await requestSalesData();
        // console.log(data);
        // console.log(data);
        // const orderByUserId = data.filter((order) => order.userId === value);
        // console.log(data.total_price);
        setCustomerOrder(data);
      };
      // const token = getUserInfo();
      fetchCustomerOrders();
      // setLoading(false);
    },
    [
      // idUser, navigate, userToken
    ]
  );

  return (
    <>
      <SellerNavBar />
      <div class="sm:mx-4  mt-40 sm:mt-40 md:mt-28">
        {/* {console.log(customerOrder)} */}
        <h1 class="mb-10 p-2 font-semibold text-gray-700">PEDIDOS</h1>
        {customerOrder.map(({ id, userId, status }, index) => (
          <SellerOrderCard
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

export default SellerOrders;
