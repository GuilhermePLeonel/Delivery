import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:${process.env.REACT_APP_API_PORT || "3001"}`,
});

export const requestData = async (endpoint) => {
  const { data } = await api.get(endpoint);
  return data;
};

export const requestLogin = async (email, password) => {
  const { data } = await axios.post("http://localhost:3001/login", {
    email,
    password,
  });
  return data;
};

export const requestCreate = async (body) => {
  let data;
  try {
    data = await axios.post("http://localhost:3001/register", body);
    return data;
  } catch (error) {
    return { data, message: "usuario cadastrado", status: 409 };
  }
};

export const requestProducts = async () => {
  const { data } = await axios.get("http://localhost:3001/customer/products");
  return data;
};

export const requestSalesID = async (token, body) => {
  let data;
  try {
    data = await axios.post(
      "http://localhost:3001/sales",
      {
        userId: body.userId,
        totalPrice: body.totalPrice,
        deliveryAddress: body.addressCustomer,
        deliveryNumber: body.numberAddress,
        dateTime: body.dateTime,
        sellerId: body.sellerId,
        saleInfos: body.saleInfos,
      },
      { headers: { Authorization: token } }
    );
    return data;
  } catch (error) {
    return { data, message: "venda falhou", status: 409 };
  }
};
export const requestUserData = async () => {
  let data;
  try {
    data = await axios.get("http://localhost:3001/register");
    return data;
  } catch (error) {
    return { message: "requisição falhou", status: 409 };
  }
};

export const requestSalesData = async () => {
  let data;
  try {
    data = await axios.get("http://localhost:3001/sales");
    return data;
  } catch (error) {
    return { data, message: "requisição falhou", status: 409 };
  }
};

export const requestSalesProducts = async () => {
  let data;
  try {
    data = await axios.get("http://localhost:3001/sales/products");
    return data;
  } catch (error) {
    return { data, message: "requisição falhou", status: 409 };
  }
};

export const requestRole = async (role) => {
  let data;
  try {
    data = await axios.put("http://localhost:3001/role", role);
    return data;
  } catch (error) {
    return { data, message: "requisição falhou", status: 409 };
  }
};

export const requestStatusUpdate = async (saleId, status) => {
  let data;
  try {
    data = await axios.put(`http://localhost:3001/sales/status/${saleId}`, {
      status: status,
    });
    return data;
  } catch (error) {
    return { data, message: "requisição falhou", status: 409 };
  }
};

export default api;
