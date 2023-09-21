// import React, { useEffect, useState } from "react";
// import moment from "moment/moment";
// // import { useNavigate } from 'react-router-dom';
// import NavBar from "../../components/NavBar";
// // import SellerOrderDetailsCard from '../../components/SellerOrderDetailsCard';
// import {
//   requestSalesData,
//   requestSalesProducts,
//   requestProducts,
// } from "../../services/requests";

// function Details() {
//   const [customerOrder, setCustomerOrder] = useState([]);
//   const [saleId, setsaleId] = useState();
//   const [salesProducts, setsalesProducts] = useState([]);
//   const [allProducts, setallProducts] = useState([]);

//   useEffect(() => {
//     setsaleId(JSON.parse(localStorage.getItem("saleId")));

//     const fetchAllProducts = async () => {
//       const AllProducts = await requestProducts();
//       setallProducts(AllProducts);
//     };
//     fetchAllProducts();

//     const fetchSalesProducts = async () => {
//       const { data } = await requestSalesProducts();
//       setsalesProducts(data);
//     };
//     fetchSalesProducts();

//     const fetchCustomerOrders = async () => {
//       const { data } = await requestSalesData();
//       setCustomerOrder(data);
//     };
//     fetchCustomerOrders();
//   }, []);
//   const sale = customerOrder.filter((sal) => sal.id === saleId)[0];
//   const handleDateOfSale = (date) => {
//     const result = moment(date).format("DD/MM/YYYY");
//     return result;
//   };
//   const replaceValue = (string) => string.replace(".", ",");

//   const dataStats =
//     "customer_order_details__element-order-details-label-delivery-status";
//   const dataDate =
//     "customer_order_details__element-order-details-label-order-date";
//   const dataDelivery = "customer_order_details__button-delivery-check";
//   // const dataSend = 'seller_order_details__button-dispatch-check';
//   const dataSeller =
//     "customer_order_details__element-order-details-label-seller-name";
//   const dataNumber = "customer_order_details__element-order-table-item-number";
//   const dataName = "customer_order_details__element-order-table-name";
//   const dataQuantity = "customer_order_details__element-order-table-quantity";
//   const dataUnity = "customer_order_details__element-order-table-unit-price";
//   const dataSub = "customer_order_details__element-order-table-sub-total";

//   return (
//     <>
//       <NavBar />
//       {customerOrder.length === 0 ? (
//         <p>Loading ...</p>
//       ) : (
//         <div>
//           {" "}
//           <div>
//             <br />
//             <span data-testid="customer_order_details__element-order-details-label-order-id">
//               PEDIDO {/* {console.log(sale.id)} */}
//               {console.log(sale)}
//               {sale.id}
//               {/* {' '} */}
//             </span>
//             <span data-testid={dataSeller}> Fulana Pereira</span>
//             <span data-testid={dataDate}>
//               {" "}
//               {handleDateOfSale(sale.sale_date)}
//             </span>
//             <span data-testid={dataStats}> {sale.status}</span>
//           </div>
//           <br />
//           <button type="button" disabled data-testid={dataDelivery}>
//             MARCAR COMO ENTREGE{" "}
//           </button>
//           {/* <button
//               type="button"
//               disabled
//               data-testid={ dataSend }
//             >
//               SAIU PARA ENTREGA
//               {' '}
//             </button> */}
//           <table>
//             <thead>
//               <td>Item</td>
//               <td>Descrição</td>
//               <td>Quantidade</td>
//               <td>Valor Unitário</td>
//               <td>Sub-total</td>
//             </thead>
//             {console.log(salesProducts.filter((sal) => sal.saleId === saleId))}
//             {salesProducts
//               .filter((sal) => sal.saleId === saleId)
//               .map((product, index) => (
//                 <tbody key={product.productId}>
//                   <td data-testid={`${dataNumber}-${index}`}>{index + 1}</td>
//                   <td data-testid={`${dataName}-${index}`}>
//                     {allProducts[product.productId - 1].name}
//                   </td>
//                   <td data-testid={`${dataQuantity}-${index}`}>
//                     {product.quantity}
//                   </td>
//                   <td data-testid={`${dataUnity}-${index}`}>
//                     {replaceValue(allProducts[product.productId - 1].price)}
//                   </td>
//                   <td data-testid={`${dataSub}-${index}`}>
//                     {replaceValue(
//                       (
//                         allProducts[product.productId - 1].price *
//                         product.quantity
//                       ).toFixed(2)
//                     )}
//                   </td>
//                 </tbody>
//               ))}
//           </table>
//           <div data-testid="customer_order_details__element-order-total-price">
//             <br /> {replaceValue(sale.total_price)}
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default Details;

import React, { useEffect, useState } from "react";
import moment from "moment/moment";
import NavBar from "../../components/NavBar";
import {
  requestSalesData,
  requestSalesProducts,
  requestProducts,
} from "../../services/requests";

function Details() {
  const [customerOrder, setCustomerOrder] = useState([]);
  const [saleId, setsaleId] = useState();
  const [salesProducts, setsalesProducts] = useState([]);
  const [allProducts, setallProducts] = useState([]);

  useEffect(() => {
    setsaleId(JSON.parse(localStorage.getItem("saleId")));

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
    const result = moment(date).format("DD/MM/YYYY");
    return result;
  };

  const replaceValue = (string) => string.replace(".", ",");

  const dataStats =
    "customer_order_details__element-order-details-label-delivery-status";
  const dataDate =
    "customer_order_details__element-order-details-label-order-date";
  const dataDelivery = "customer_order_details__button-delivery-check";
  const dataSeller =
    "customer_order_details__element-order-details-label-seller-name";
  const dataNumber = "customer_order_details__element-order-table-item-number";
  const dataName = "customer_order_details__element-order-table-name";
  const dataQuantity = "customer_order_details__element-order-table-quantity";
  const dataUnity = "customer_order_details__element-order-table-unit-price";
  const dataSub = "customer_order_details__element-order-table-sub-total";

  return (
    <>
      <NavBar />
      {customerOrder.length === 0 ? (
        <p>Loading ...</p>
      ) : (
        <div className="p-4 sm:mx-4  mt-40 sm:mt-32 md:mt-28">
          <div className="mb-4 ">
            <span
              data-testid="customer_order_details__element-order-details-label-order-id"
              className="text-xl font-semibold"
            >
              PEDIDO {sale.id}
            </span>
            <span data-testid={dataSeller} className="ml-4">
              Fulana Pereira
            </span>
            <span data-testid={dataDate} className="ml-4">
              {handleDateOfSale(sale.sale_date)}
            </span>
            <span data-testid={dataStats} className="ml-4">
              {sale.status}
            </span>
          </div>
          <button
            type="button"
            disabled
            data-testid={dataDelivery}
            className="bg-yellow-500 text-white font-bold py-2 px-4 rounded-full cursor-not-allowed"
          >
            MARCAR COMO ENTREGUE
          </button>
          <table className="w-full mt-4 border-collapse rounded-lg overflow-hidden">
            <thead>
              <tr>
                <th className="py-2 px-4 bg-yellow-500 text-white text-left">
                  Item
                </th>
                <th className="py-2 px-4 bg-yellow-500 text-white text-left">
                  Descrição
                </th>
                <th className="py-2 px-4 bg-yellow-500 text-white text-left">
                  Quantidade
                </th>
                <th className="py-2 px-4 bg-yellow-500 text-white text-left">
                  Valor Unitário
                </th>
                <th className="py-2 px-4 bg-yellow-500 text-white text-left">
                  Sub-total
                </th>
              </tr>
            </thead>
            <tbody>
              {salesProducts
                .filter((sal) => sal.saleId === saleId)
                .map((product, index) => (
                  <tr key={product.productId}>
                    <td
                      data-testid={`${dataNumber}-${index}`}
                      className="py-2 px-4 bg-gray-200 text-left"
                    >
                      {index + 1}
                    </td>
                    <td
                      data-testid={`${dataName}-${index}`}
                      className="py-2 px-4 bg-gray-200 text-left"
                    >
                      {allProducts[product.productId - 1].name}
                    </td>
                    <td
                      data-testid={`${dataQuantity}-${index}`}
                      className="py-2 px-4 bg-gray-200 text-left"
                    >
                      {product.quantity}
                    </td>
                    <td
                      data-testid={`${dataUnity}-${index}`}
                      className="py-2 px-4 bg-gray-200 text-left"
                    >
                      {replaceValue(allProducts[product.productId - 1].price)}
                    </td>
                    <td
                      data-testid={`${dataSub}-${index}`}
                      className="py-2 px-4 bg-gray-200 text-left"
                    >
                      {replaceValue(
                        (
                          allProducts[product.productId - 1].price *
                          product.quantity
                        ).toFixed(2)
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          <div
            data-testid="customer_order_details__element-order-total-price"
            className="mt-4 font-semibold text-lg text-yellow-500"
          >
            Total: R$ {replaceValue(sale.total_price)}
          </div>
        </div>
      )}
    </>
  );
}

export default Details;
