import React from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import "./table.module.css"
function ProductTable({ data, onDeleteProduct, onQuantityChange }) {
  return (
    <div className="table-container">
      <Table responsive="lg" className="bg-dark text-center" >
        <thead>
          <tr>
            <th>Image</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Sum</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((el) => {
            return (
              <tr key={el.id}>
                <td>
                  <img src={el.images[0]} alt={el.title} height={50} />
                </td>
                <td>{el.title}</td>
                <td>${el.price}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => onQuantityChange(el.id, -1)}
                    disabled={el.quantity <= 0}
                  >
                    -
                  </Button>
                  <span>{el.quantity}</span>
                  <Button
                    variant="success"
                    onClick={() => onQuantityChange(el.id, 1)}
                  >
                    +
                  </Button>
                </td>
                <td>${el.sum.toFixed(2)}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => onDeleteProduct(el.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default ProductTable;
