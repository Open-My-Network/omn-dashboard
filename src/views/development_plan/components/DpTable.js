import React from "react";

const DPTable = ({ data, pagination }) => {
  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Est. Year</th>
            <th>Plan Mode</th>
          </tr>
        </thead>
        <tbody>
          {data.map((plan) => (
            <tr key={plan.id}>
              <td>{plan.id}</td>
              <td>{plan.sdp_title}</td>
              <td>{plan.est_year}</td>
              <td>{plan.plan_mode}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          {Array.from({ length: pagination.totalPages }, (_, index) => (
            <li className={`page-item ${pagination.currentPage === index + 1 ? "active" : ""}`} key={index}>
              <a className="page-link" href={`?page=${index + 1}&limit=${pagination.limit}`}>
                {index + 1}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default DPTable;
