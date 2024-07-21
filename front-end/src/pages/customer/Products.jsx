import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import NavBar from "../../components/NavBar";
import { requestProducts } from "../../services/requests";

function Products() {
  const replaceValue = (string) => string.replace(".", ",");
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const AllProducts = await requestProducts();
      setProducts(AllProducts);
    };
    const att = async () => {
      const storage = JSON.parse(localStorage.getItem("carrinho"));
      if (storage) {
        setCart(storage);
      }
    };
    att();
    fetchProducts();
  }, [setCart]);

  const cartQuantiy = cart.reduce((acc, curr) => acc + curr.quantity, 0);
  const totalCart = cart.reduce(
    (acc, curr) => acc + curr.quantity * curr.unitPrice,
    0
  );

  const navigate = useNavigate();
  function handleProductsClick() {
    navigate("/customer/checkout");
  }

  return (
    <div class="flex flex-col">
      <header>
        <NavBar />
      </header>
      <section class="flex-grow  sm:mx-4 mb-20 mt-40 sm:mt-32 md:mt-28">
        <img
          alt="imagem ilustrativa de promoção"
          src={require("../../images/TEMPLATE_CERTO.png")}
          class="object-scale-down h-24 mb-10 w-full sm:h-60 md:h-60 "
        />
        <button
          type="submit"
          data-testid="customer_products__button-cart"
          onClick={handleProductsClick}
          disabled={totalCart === 0}
          hidden={totalCart === 0}
          className=" bg-yellow-500
          animate-bounce
           fixed bottom-2 text-white content-center font-bold  px-4 rounded-full h-14 
              hover:scale-105 hover:bg-yellow-600 transition duration-300"
        >
          <img
            class="h-8  w-8 inline-block mr-2"
            alt="icone de carrinho"
            src="https://cdn-icons-png.flaticon.com/512/4/4295.png"
          />
          R$
          <span data-testid="customer_products__checkout-bottom-value ">
            {replaceValue(totalCart.toFixed(2))}
          </span>
          <span
            hidden={totalCart === 0}
            class={`relative inline-flex rounded-full text-white-900 h-8 w-8 bg-zinc-700 ml-5 ${
              totalCart === 0 ? "hidden" : ""
            }`}
          >
            <p class="w-full mt-1">{cartQuantiy}</p>
          </span>
        </button>
        <div class="grid grid-cols-1 mx-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              urlImage={product.url_image}
              cart={cart}
              setCart={setCart}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Products;
