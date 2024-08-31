import React, { useEffect, useState } from "react";
import DPTable from "../components/DpTable";

const DevPlan = () => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    fetchDevelopmentPlanData();
  }, []);

  const fetchDevelopmentPlanData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/development-plan?page=1&limit=10");
      const result = await response.json();
      setData(result.data);
      setPagination(result.pagination);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row mb-4">
        <div className="col-sm-6 col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Total Requests</h5>
              <p className="card-text text-primary">30</p>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Pending Requests</h5>
              <p className="card-text text-warning">20</p>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Total Count</h5>
              <p className="card-text text-success">500</p>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Deleted Items</h5>
              <p className="card-text text-danger">200</p>
            </div>
          </div>
        </div>
      </div>
      <DPTable data={data} pagination={pagination} />
    </div>
  );
};

export default DevPlan;
