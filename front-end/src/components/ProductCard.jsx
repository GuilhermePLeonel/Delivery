import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

export default function ProductCard({ id, name, price, urlImage, setCart }) {
  const [qtdValue, setQtyValue] = useState(0);

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem("carrinho")) || [];
    const findProduct = storage.find((product) => product.productId === id);
    if (findProduct) {
      setQtyValue(findProduct.quantity);
    }
  }, [id]);

  const replaceValue = (string) => string.replace(".", ",");

  const updateCart = (opt) => {
    const storage = JSON.parse(localStorage.getItem("carrinho")) || [];
    const productIndex = storage.findIndex(
      (product) => product.productId === id
    );
    if (productIndex < 0) {
      storage.push({
        productId: id,
        name,
        quantity: 1,
        unitPrice: price,
        subTotal: Number(price),
      });
    }
    const qtdUpdate = opt === "+" ? qtdValue + 1 : qtdValue - 1;
    const storageUpd = storage
      .map((product, index) => {
        if (index === productIndex) {
          return {
            ...product,
            quantity: qtdUpdate,
            subTotal: Number(price) * qtdUpdate,
          };
        }
        return product;
      })
      .filter((product) => product.quantity > 0);
    localStorage.setItem("carrinho", JSON.stringify(storageUpd));
    setCart(storageUpd);
  };

  const updCartInput = (number) => {
    const storage = JSON.parse(localStorage.getItem("carrinho")) || [];
    const idProduct = storage.findIndex((product) => product.productId === id);
    if (idProduct < 0) {
      storage.push({
        productId: id,
        name,
        quantity: number,
        unitPrice: price,
        subTotal: Number(price),
      });
    }
    const storageUpd = storage
      .map((product, index) => {
        if (index === idProduct) {
          return {
            ...product,
            quantity: number,
            subTotal: Number(price) * number,
          };
        }
        return product;
      })
      .filter((product) => product.quantity > 0);
    localStorage.setItem("carrinho", JSON.stringify(storageUpd));
    setCart(storageUpd);
  };

  const sumValue = () => {
    const sum = qtdValue + 1;
    setQtyValue(sum);
    updateCart("+");
  };

  const deductValue = () => {
    const deduct = qtdValue - 1;
    setQtyValue(deduct);
    updateCart("-");
  };

  const handleInputChange = ({ target }) => {
    updCartInput(Number(target.value));
    setQtyValue(Number(target.value));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <img
        data-testid={`customer_products__img-card-bg-image-${id}`}
        src={urlImage}
        width="90px"
        alt={name}
        className="w-24 h-24 object-cover object-center mx-auto"
      />
      <h3
        className="text-xl font-semibold text-center mt-4"
        data-testid={`customer_products__element-card-title-${id}`}
      >
        {name}
      </h3>
      <p
        className="text-gray-600 text-center mt-2"
        data-testid={`customer_products__element-card-price-${id}`}
      >
        R${" "}
        <span
          className="text-black"
          data-testid={`customer_products__element-card-price-${id}`}
        >
          {replaceValue(price)}
        </span>
      </p>
      <div className="flex items-center justify-center mt-4">
        <button
          type="button"
          onClick={() => sumValue()}
          data-testid={`customer_products__button-card-add-item-${id}`}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-4 rounded-l"
        >
          +
        </button>
        <input
          type="number"
          data-testid={`customer_products__input-card-quantity-${id}`}
          value={qtdValue}
          onChange={handleInputChange}
          className="w-16 text-center appearance-none bg-gray-100"
        />
        <button
          type="button"
          disabled={qtdValue === 0}
          onClick={() => deductValue()}
          data-testid={`customer_products__button-card-rm-item-${id}`}
          className={`${
            qtdValue === 0
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-yellow-500 hover:bg-yellow-600"
          } text-white px-4 font-bold rounded-r`}
        >
          -
        </button>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  urlImage: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  setCart: PropTypes.func.isRequired,
};
