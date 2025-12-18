import React from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu";
import { useAuth } from "../../context/auth";

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Dashboard - Ecommerce Jackets"}>
      <div className="container-flui m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3 className="card-title mb-4">Admin Information</h3>
              <div className="card-body">
                <p className="card-text">
                  <strong>Admin Name:</strong> {auth?.user?.name}
                </p>
                <p className="card-text">
                  <strong>Admin Email:</strong> {auth?.user?.email}
                </p>
                <p className="card-text">
                  <strong>Admin Contact:</strong> {auth?.user?.phone}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
