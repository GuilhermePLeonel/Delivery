import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import SellerOrderCard from '../../components/SellerOrderCard';
import { requestSalesData,
} from '../../services/requests';

function SellerOrders() {
  const [customerOrder, setCustomerOrder] = useState([]);
  // const navigate = useNavigate();
  // const [idUser, setIdUser] = useState();
  // const [userToken, setUserToken] = useState();

  useEffect(() => {
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
      console.log(data);
      // console.log(data);
      // const orderByUserId = data.filter((order) => order.userId === value);
      // console.log(data.total_price);
      setCustomerOrder(data);
    };
    // const token = getUserInfo();
    fetchCustomerOrders();
    // setLoading(false);
  }, [
    // idUser, navigate, userToken
  ]);

  return (
    <>
      <NavBar />
      <div>
        {console.log(customerOrder)}
        SELLER ORDER

        { customerOrder.map(({ id, userId, status }, index) => (
          <SellerOrderCard
            key={ id }
            saleId={ id }
            userId={ userId }
            order={ `${index + 1}` }
            status={ status }
            saleDate={ customerOrder[index].sale_date }
            totalPrice={ customerOrder[index].total_price }
          />
        ))}
      </div>
    </>
  );
}

export default SellerOrders;
