import { useEffect, useState } from "react";
import CheckoutForm from "../../components/checkout/CheckoutForm";
import CheckoutTable from "../../components/checkout/CheckoutTable";
import NavBar from "../../components/NavBar";

export default function Checkout() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem("carrinho"));
    setCart(storage);
  }, [setCart]);

  return (
    <>
      <NavBar />
      <div class="p-4 sm:mx-4  mt-40 sm:mt-32 md:mt-28">
        <section class="">
          <h3 className="text-xl font-semibold mb-4">
            Verifique os dados de entrega e produtos:
          </h3>
          <CheckoutTable
            buttonOn
            data-testid="customer_checkout__element-order-table"
            cart={cart}
            setCart={setCart}
          />
        </section>

        <section>
          <CheckoutForm cart={cart} />
        </section>
      </div>
    </>
  );
}
