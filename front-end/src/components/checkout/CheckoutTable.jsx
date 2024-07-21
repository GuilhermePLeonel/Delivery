import PropTypes from "prop-types";

function CheckoutTable({ buttonOn, cart, setCart }) {
  const handleRemove = (removeIndex) => {
    const filterCart = cart.filter((_, index) => index !== removeIndex);
    localStorage.setItem("carrinho", JSON.stringify(filterCart));
    setCart(filterCart);
  };
  const replaceValue = (string) => string.replace(".", ",");

  const total = cart.reduce((acc, curr) => acc + Number(curr.subTotal), 0);

  return (
    <section class="">
      {cart.length === 0 ? (
        <div class="mb-5">
          <h1 class="font-bold text-red-500">O CARRINHO ESTA VAZIO</h1>
          <p class="font-semibold">
            Volte a tela de produtos e adicione alguns para continuar ^^
          </p>
        </div>
      ) : (
        <div className="relative overflow-x-auto">
          <table className="w-full mt-4 mb-10 border-collapse overflow-hidden rounded-lg">
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
                {buttonOn && (
                  <th className="py-2 px-4 bg-yellow-500 text-white text-left">
                    Remover Item
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {cart.map((order, index) => (
                <tr key={index} className="bg-gray-100">
                  <td
                    data-testid={`customer_checkout__element-order-table-item-number-${index}`}
                    className="py-2 px-4 text-left"
                  >
                    {index + 1}
                  </td>
                  <td
                    data-testid={`customer_checkout__element-order-table-name-${index}`}
                    className="py-2 px-4 text-left"
                  >
                    {order.name}
                  </td>
                  <td
                    data-testid={`customer_checkout__element-order-table-quantity-${index}`}
                    className="py-2 px-4 text-left"
                  >
                    {order.quantity}
                  </td>
                  <td
                    data-testid={`customer_checkout__element-order-table-unit-price-${index}`}
                    className="py-2 px-4 text-left"
                  >
                    {replaceValue(order.unitPrice)}
                  </td>
                  <td
                    data-testid={`customer_checkout__element-order-table-sub-total-${index}`}
                    className="py-2 px-4 text-left"
                  >
                    {replaceValue(order.subTotal.toFixed(2))}
                  </td>
                  {buttonOn && (
                    <td className="py-2 px-4 text-left">
                      <button
                        data-testid={`customer_checkout__element-order-table-remove-${index}`}
                        type="button"
                        onClick={() => handleRemove(index)}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:ring focus:border-blue-300"
                      >
                        Remover
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={buttonOn ? 6 : 5}>
                  <p
                    className="mt-4 font-semibold text-lg text-yellow-500 text-left"
                    data-testid="customer_checkout__element-order-total-price"
                  >
                    {`Total: R$${replaceValue(total.toFixed(2))}`}
                  </p>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </section>
  );
}

CheckoutTable.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired,
  buttonOn: PropTypes.bool.isRequired,
  setCart: PropTypes.func.isRequired,
};

export default CheckoutTable;
