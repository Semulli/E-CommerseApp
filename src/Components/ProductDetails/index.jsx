import React, { useState, useEffect } from "react";
import "./details.module.css";
import { getSingleData } from "../../Api/getProduct";
import Layout from "../Layout";
import { useParams, useNavigate } from "react-router-dom";
import { useLoading } from "../../Hooks/useLoading";
import { Spinner, Button } from "react-bootstrap";

const ProductDetails = () => {
  const [data, setData] = useState(null);
  const { loading, stopLoading } = useLoading();
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleData = async () => {
    try {
      const response = await getSingleData(id);
      setData(response);
      stopLoading();
    } catch (error) {
      setError(error);
      stopLoading();
    }
  };

  useEffect(() => {
    handleData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Layout>
      <div className="detailPage">
        <div className="detail">
          {data ? (
            <>
              <div className="imgDiv">
                <img
                  className="cardImg2"
                  src={data.images[0]}
                  height={300}
                  width={300}
                  alt={data.title}
                />
              </div>
              <div className="cardBody">
                <h5 className="card-title">{data.title}</h5>
                <p className="card-text">{data.description}</p>
                <p className="card-text">${data.price}</p>
                <p className="card-text">{data.brand}</p>
              </div>
              <Button variant="secondary" onClick={() => navigate(-1)}>
                Go Back
              </Button>
            </>
          ) : (
            <Spinner animation="grow" variant="danger" />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
