import React, { useEffect, useState } from "react";
import { useAdminContext } from "../../../site-components/Admin/ContextApi/AdminContext";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";
import { PHP_API_URL } from "../../../site-components/Helper/Constant";
import { toast } from "react-toastify"; // Ensure toast is imported
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { capitalizeFirstLetter, formatDate } from "../../../site-components/Helper/HelperFunction";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { OverlayTrigger } from "react-bootstrap";
import Tooltip from "react-bootstrap/Tooltip";

const DonorDetailView = () => {
  const { adminDetail } = useAdminContext();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const { id } = useParams();
  const fetchDashboardData = async () => {
    setLoading(true);
    const logUserId = secureLocalStorage.getItem("loguserid");

    try {
      const bformData = new FormData();
      bformData.append("data", "load_donation_donerwise");
      bformData.append("loguserid", logUserId);
      bformData.append("donorId", id);

      const response = await axios.post(`${PHP_API_URL}/admin.php`, bformData);

      if (response?.data?.status === 200) {
        setData(response?.data?.data);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } catch (error) {
      setData({});
      const status = error.response?.status;

      if ([400, 401, 500].includes(status)) {
        toast.error(error.response?.data?.msg || "A server error occurred.");
      } else {
        toast.error(
          "An error occurred. Please check your connection or try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (adminDetail) fetchDashboardData();
  }, [adminDetail]);
  return (
    <>
      <div className="page-container">
        <div className="main-content">
          <div className="container-fluid">
            <div className="">
              <nav className="breadcrumb breadcrumb-dash">
                <a href="/" className="breadcrumb-item">
                  Dashboard
                </a>

                <a className="breadcrumb-item ">Donation Detail</a>
                <span className="breadcrumb-item active">View</span>
              </nav>
            </div>

            <div className="card bg-transparent mb-2">
              <div className="card-header d-flex justify-content-between align-items-center px-0">
                <h5 className="card-title h6_new">Donation Detail</h5>
                <div className="ml-auto">
                  <button
                    className="mb-2 mb-md-0 btn"
                    onClick={() => window.history.back()}
                  >
                    <i className="fas">
                      <FaArrowLeft />
                    </i>{" "}
                    Go Back
                  </button>
                </div>
              </div>
            </div>

            <div className="row ant-card-body ">
              <div className="col-md-12 align-items-center ng-star-inserted">
                {loading ? (
                  <div className="text-center">Loading...</div>
                ) : data?.doner ? (
                  <div className="card px-3">
                    <div className="card-body py-3">
                      <div className="row ">
                        <h6 className="title">Donor Detail</h6>
                      </div>
                      <div className="row ">
                        <div className="col-md-4">
                          <ul className=" m-t-10">
                            <li className="row">
                              <p className="col-sm-6 px-0 font-13 col-6 font-weight-semibold text-dark m-b-5">
                                <i
                                  className="fa-solid fa-user m-r-10 "
                                  style={{ color: "#3f87f5" }}
                                ></i>
                                <span>Name</span>
                              </p>
                              <div className="">:</div>

                              <p className="col font-12 font-weight-semibold">
                                {data?.doner?.name || "N/A"}
                                
                              </p>
                            </li>
                            <li className="row">
                              <p className="col-sm-6 px-0 font-13 col-6 font-weight-semibold text-dark m-b-5">
                                <i
                                  className="fa-solid fa-id-card m-r-10 "
                                  style={{ color: "#3f87f5" }}
                                ></i>
                                <span>User Id</span>
                              </p>
                              <div className="">:</div>
                              <p className="col font-12 font-weight-semibold">
                                {data?.doner?.uniqueId || "N/A"}
                              </p>
                            </li>
                            <li className="row">
                              <p className="col-sm-6 px-0 font-13 col-6 font-weight-semibold text-dark m-b-5">
                                <i
                                  className="fa-solid fa-droplet m-r-10 "
                                  style={{ color: "#3f87f5" }}
                                ></i>
                                <span>Blood Group</span>
                              </p>
                              <div className="">:</div>
                              <p className="col font-12 font-weight-semibold">
                                {data?.doner?.bloodGroup || "N/A"}
                              </p>
                            </li>
                            <li className="row">
                              <p className="col-sm-6 px-0 font-13 col-6 font-weight-semibold text-dark m-b-5">
                                <i
                                  className="fa-solid fa-phone m-r-10 "
                                  style={{ color: "#3f87f5" }}
                                ></i>
                                <span> Phone Number</span>
                              </p>
                              <div className="">:</div>
                              <p className="col font-12 font-weight-semibold">
                                {data?.doner?.phone || "N/A"}
                              </p>
                            </li>
                            
                          </ul>
                        </div>
                        <div className="col-md-4">
                          <ul className="list-unstyled m-t-10">
                            <li className="row">
                              <p className="col-sm-6 px-0 font-13 col-6 font-weight-semibold text-dark m-b-5">
                                <i
                                  className="fa fa-envelope m-r-10 "
                                  style={{ color: "#3f87f5" }}
                                ></i>
                                <span>Email</span>
                              </p>
                              <div className="">:</div>
                              <p className="col font-12 font-weight-semibold ">
                                {data?.doner?.email || "N/A"} 
                              </p>
                            </li>
                            <li className="row">
                              <p className="col-sm-6 px-0 font-13 col-6 font-weight-semibold text-dark m-b-5">
                                <i
                                  className="fa-solid fa-calendar m-r-10 "
                                  style={{ color: "#3f87f5" }}
                                ></i>
                                <span>Date of birth</span>
                              </p>
                              <div className="">:</div>
                              <p className="col font-12 font-weight-semibold ">
                                {formatDate(data?.doner?.dob) ||
                                  "N/A"}
                              </p>
                            </li>
                            <li className="row">
                              <p className="col-sm-6 px-0 font-13 col-6 font-weight-semibold text-dark m-b-5">
                                <i
                                  className="fa-solid fa-venus-mars m-r-10 "
                                  style={{ color: "#3f87f5" }}
                                ></i>
                                <span>Gender</span>
                              </p>
                              <div className="">:</div>
                              <p className="col font-12 font-weight-semibold">
                                {capitalizeFirstLetter(data?.doner?.gender )||
                                  "N/A"}
                              </p>
                            </li>
                           
                            <li className="row">
                              <p className="col-sm-6 px-0 font-13 col-6 font-weight-semibold text-dark m-b-5">
                                <i
                                  className="fa-solid fa-map-pin m-r-10 "
                                  style={{ color: "#3f87f5" }}
                                ></i>
                                <span>Pin Code</span>
                              </p>
                              <div className="">:</div>
                              <p className="col font-12 font-weight-semibold">
                                {data?.doner?.pincode || "N/A"}
                              </p>
                            </li>
                          </ul>
                        </div>
                        <div className="col-md-4">
                          <ul className="list-unstyled m-t-10">
                            <li className="row">
                              <p className="col-sm-6 px-0 font-13 col-6 font-weight-semibold text-dark m-b-5">
                                <i
                                  className="fa fa-map m-r-10 "
                                  style={{ color: "#3f87f5" }}
                                ></i>
                                <span>State</span>
                              </p>
                              <div className="">:</div>
                              <p className="col font-12 font-weight-semibold">
                                {data?.doner?.state || "N/A"}
                              </p>
                            </li>
                            <li className="row">
                              <p className="col-sm-6 px-0 font-13 col-6 font-weight-semibold text-dark m-b-5">
                                <i
                                  className="fa-solid fa-city m-r-10 "
                                  style={{ color: "#3f87f5" }}
                                ></i>
                                <span>City</span>
                              </p>
                              <div className="">:</div>
                              <p className="col font-12 font-weight-semibold">
                                {data?.doner?.city || "N/A"}
                              </p>
                            </li>
                            
                            <li className="row">
                              <p className="col-sm-6 px-0 font-13 col-6 font-weight-semibold text-dark m-b-5">
                                <i
                                  className="fa-solid fa-house m-r-10 "
                                  style={{ color: "#3f87f5" }}
                                ></i>
                                <span>Address </span>
                              </p>
                              <div className="">:</div>
                              <p className="col font-12 font-weight-semibold">
                                {data?.doner?.address || "N/A"}
                              </p>
                            </li>
                          </ul>
                        </div>
                       
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    Donor details not available.
                  </div>
                )}
              </div>
            </div>
                
                 <div className="card">
                              <div className="card-body">
                                {/* Search Box */}
                
                                <div className={`table-responsive ${loading ? "form" : ""}`}>
                                  {data?.donation_request?.length > 0 ? (
                                    <DataTable
                                      value={data?.donation_request}
                                      removableSort
                                      paginator
                                      rows={50}
                                      rowsPerPageOptions={[50, 100, 200]}
                                      emptyMessage="No records found"
                                      className="p-datatable-custom"
                                      tableStyle={{ minWidth: "50rem" }}
                                      sortMode="multiple"
                                    >
                                      <Column
                                        body={(row, { rowIndex }) => rowIndex + 1}
                                        header="#"
                                        sortable
                                      />
                
                                      
                                      <Column
                                        header="Patient Name"
                                        field="patientName"
                                        sortable
                                        body={(row) => (
                                          <div className="d-flex">
                                            <div>{row.patientName}</div>
                                            <div>
                                              {row.criticalStatus === 1 && (
                                                <span className="badge badge-danger ml-2">
                                                  Critical
                                                </span>
                                              )}
                                            </div>
                                          </div>
                                        )}
                                      />
                
                                     
                                      <Column header="Unit" field="unit" sortable />
                                      <Column
                                        body={(row) => capitalizeFirstLetter(row.attendeePhone)}
                                        header="Attendee Phone"
                                        field="attendeePhone"
                                        sortable
                                      />
                                     
                                      <Column
                                        body={(row) => formatDate(row.request_date)}
                                        header="Requested Date"
                                        field="request_date"
                                        sortable
                                      />
                                      <Column
                                        body={(row) => formatDate(row.requiredDate)}
                                        header="Required Date"
                                        field="requiredDate"
                                        sortable
                                      />
                                      <Column
                                        body={(row) => formatDate(row.acceptance_date)}
                                        header="Accepted Date"
                                        field="acceptance_date"
                                        sortable
                                      />
                                      <Column
                                        body={(row) => row.approval_date?formatDate(row.approval_date ):""}
                                        header="Approval Date"
                                        field="approval_date"
                                        sortable
                                      />
                                      <Column
                                        body={(row) => row.rejection_date?formatDate(row.rejection_date ):""}
                                        header="Rejection Date"
                                        field="rejection_date"
                                        sortable
                                      />
                
                                      <Column
                                        header="Status"
                                        field="status"
                                        body={(row) => (
                                          <div className="d-flex">
                                            {row?.status === 0 && (
                                              <span className="f-16 badge badge-warning mb-0">
                                                Pending
                                              </span>
                                            )}
                                            {row?.status === 1 && (
                                              <span className="f-16 badge badge-success mb-0">
                                                Received
                                              </span>
                                            )}
                                            {row?.status === 2 && (
                                              <span className="f-16 badge badge-danger mb-0">
                                                Rejected
                                              </span>
                                            )}
                                            
                                          </div>
                                        )}
                                      />
                
                                      <Column
                                        header="View"
                                        body={(rowData) => (
                                          <OverlayTrigger
                                            placement="bottom"
                                            overlay={
                                              <Tooltip id={`tooltip-${rowData.id}`}>
                                                View
                                              </Tooltip>
                                            }
                                          >
                                            <Link to={`/admin/blood-request/${rowData.donationid}`} className="text-warning">
                                              <i className="fa-solid fa-eye"></i>
                                            </Link>
                                          </OverlayTrigger>
                                        )}
                                      />
                                    </DataTable>
                                  ) : (
                                    <>
                                      <div className="col-md-12 alert alert-danger">
                                        Data not available
                                      </div>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default DonorDetailView;
