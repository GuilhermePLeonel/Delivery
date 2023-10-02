import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { requestSalesID, requestUserData } from "../../services/requests";

function CheckoutForm({ cart }) {
  const [idSeller, setIdSeller] = useState("");
  const [addressCustomer, setCustomerAddress] = useState("");
  const [numberAddress, setNumbersAddress] = useState("");
  const [sellers, setSellers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const sellerUpd = async () => {
      const result = await requestUserData();
      const sellerFilter = result.data.filter((user) => user.role === "seller");
      setSellers(sellerFilter);
    };
    sellerUpd();
  }, []);

  const handleClick = async () => {
    const { token, email } = await JSON.parse(localStorage.getItem("user"));
    const saleInfos = await JSON.parse(localStorage.getItem("carrinho"));
    const users = await requestUserData();
    const find = users.data.find((user) => email === user.email);
    const body = {
      userId: find.id,
      idSeller,
      totalPrice: cart
        .reduce((acc, curr) => acc + Number(curr.subTotal), 0)
        .toFixed(2),
      dateTime: moment().utcOffset("+0").format("YYYY-MM-DD hh:mm:ss a"),
      addressCustomer,
      numberAddress,
      sellerId: 2,
      saleInfos,
      orders: cart.map(({ productId, quantity }) => ({ productId, quantity })),
    };
    const { data } = await requestSalesID(token, body);
    localStorage.setItem("carrinho", JSON.stringify([]));
    localStorage.setItem("saleId", JSON.stringify(data.id));
    navigate({
      pathname: `/customer/orders/${data.id}`,
      state: data,
    });
  };
  return (
    <form className="">
      <h3 className="text-xl font-semibold mb-4">
        Preencha as informações abaixo:
      </h3>
      <div className="mb-4">
        <label htmlFor="seller" className="block text-gray-600">
          Vendedora Responsável:
        </label>
        <select
          data-testid="customer_checkout__select-seller"
          name="seller"
          id="seller"
          value={idSeller}
          onChange={({ target: { value } }) => setIdSeller(value)}
          className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="default">Selecionar</option>
          {sellers.length > 0 &&
            sellers.map(({ name, id }) => (
              <option key={`sellers-${id}`} value={id}>
                {name}
              </option>
            ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="customer_address" className="block text-gray-600">
          Endereço:
        </label>
        <input
          type="text"
          data-testid="customer_checkout__input-address"
          value={addressCustomer}
          onChange={({ target: { value } }) => {
            setCustomerAddress(value);
          }}
          className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="address_number" className="block text-gray-600">
          Número:
        </label>
        <input
          type="text"
          data-testid="customer_checkout__input-address-number"
          value={numberAddress}
          onChange={({ target: { value } }) => setNumbersAddress(value)}
          className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      <button
        data-testid="customer_checkout__button-submit-order"
        type="button"
        disabled={
          !(
            cart.length &&
            addressCustomer.length &&
            numberAddress.length &&
            idSeller
          )
        }
        onClick={handleClick}
        className="bg-yellow-500 disabled:bg-yellow-300 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:ring focus:border-blue-300"
      >
        FINALIZAR PEDIDO
      </button>
    </form>
  );
}

CheckoutForm.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired,
};

export default CheckoutForm;
