import React, { useState, useEffect } from "react";
import Layout from "./../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { baseURL} from "../../constants/url";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect( () => {
    getOrders();
  }, []);

  return (
    <Layout title={"Your Orders"}>
      <div className="container-fluid flex row">
          <div>
            <UserMenu />
          </div>
          <div>
            <h5 className="text-center mt-4">All Orders</h5>
            {orders?.map((order, i) => {
              return (
                <div className="border shadow">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col"> date</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{order?.status}</td>
                        <td>{moment(order?.createAt).fromNow()}</td>
                        <td>{order?.totalItems}</td>
                        
                    {order?.products?.map((p, i) => (
                      <>
                         <td><span>$</span>{p?.custom_price}</td>
                         <td>
                      <div className="row mb-2 p-3 card flex-row" key={p._id}>
                      
                          <img
                            src={p?.custom_image}
                            className="card-img-top"
                            width ={"100%"}
                            height = { "150px"}
                          />
                     
                      </div>
                      </td>
                      </>
                    ))}
                    
                   </tr>
                    </tbody>
                  </table>
                </div>
              );
            })}
          </div>
        </div>
      
    </Layout>
  );
};

export default Orders;
