import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { getData } from "../../Api/getProduct";
import { useLoading } from "../../Hooks/useLoading";
import Spinner from "react-bootstrap/Spinner";
import ProductTable from "../ProductTable";
import { useNavigate } from "react-router-dom";
import { ROUTER } from "../../Constants/Router";

function Home() {
  const navigate = useNavigate();
  const { loading, startLoading, stopLoading } = useLoading();
  const [data, setData] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleData = async () => {
    startLoading();
    const response = await getData();
    stopLoading();
    setData(response.products);
  };

  useEffect(() => {
    handleData();
  }, []);

  const handleSelectProduct = (product) => {
    if (!selectedProducts.some((item) => item.id === product.id)) {
      setSelectedProducts((prevSelected) => [
        ...prevSelected,
        { ...product, quantity: 1, sum: product.price },
      ]);
    }
  };

  const isProductSelected = (productId) => {
    return selectedProducts.some((product) => product.id === productId);
  };

  const handleDeleteProduct = (productId) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.filter((product) => product.id !== productId)
    );
  };

  const handleQuantityChange = (productId, change) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.map((product) =>
        product.id === productId
          ? {
              ...product,
              quantity: Math.max(product.quantity + change, 0),
              sum: Math.max(product.quantity + change, 0) * product.price,
            }
          : product
      )
    );
  };

  return (
    <Layout>
      {selectedProducts.length > 0 && (
        <ProductTable
          data={selectedProducts}
          onDeleteProduct={handleDeleteProduct}
          onQuantityChange={handleQuantityChange}
        />
      )}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        {loading ? (
          <Spinner animation="grow" variant="danger" />
        ) : (
          <>
            {data &&
              data.map((el) => {
                return (
                  <Card
                    style={{ width: "300px" }}
                    className="m-4 bg-dark text-light"
                    key={el.id}
                  >
                    <Card.Img variant="top" src={el.images[0]} height={205} />
                    <Card.Body>
                      <Card.Title>{el.title}</Card.Title>
                      <Card.Text>{el.description.slice(0, 37)}....</Card.Text>
                      <Card.Text> ${el.price} </Card.Text>
                      <Button
                        variant="danger"
                        onClick={() => handleSelectProduct(el)}
                      >
                        {isProductSelected(el.id) ? "In Table" : "Add Product"}
                      </Button>
                      <Button
                        className="m-3"
                        onClick={() => {
                          navigate(`${ROUTER.Card}/${el.id} `);
                        }}
                      >
                        Go details
                      </Button>
                    </Card.Body>
                  </Card>
                );
              })}
          </>
        )}
      </div>
    </Layout>
  );
}

export default Home;
