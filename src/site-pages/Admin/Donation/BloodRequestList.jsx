import React, { useEffect, useState } from "react";
import { PHP_API_URL } from "../../../site-components/Helper/Constant";
import { toast } from "react-toastify";
import {
  capitalizeFirstLetter,
  goBack,
  formatDate,
} from "../../../site-components/Helper/HelperFunction";
import axios from "axios";
import Select from "react-select";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/Column";
import secureLocalStorage from "react-secure-storage";
import { FormField } from "../../../site-components/admin/assets/FormField";
import { bloodGroups } from "../../../site-components/Helper/BloodGroupConstant";
import { DonationStatusConstant } from "../../../site-components/Helper/DonationStatusConstant";
import { Link } from "react-router-dom";
import { OverlayTrigger } from "react-bootstrap";
import Tooltip from "react-bootstrap/Tooltip";

function BloodRequestList() {
  const [showFilter, setShowFilter] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [donationRequestList, setDonationRequestList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [pinCodeList, setPinCodeList] = useState([]);
  const [cityList, setCityList] = useState([]);

  const formatDateForMonth = (date) => {
    return new Intl.DateTimeFormat("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(date);
  };

  const getFirstDayOfMonth = () => {
    const now = new Date();
    return formatDateForMonth(new Date(now.getFullYear(), now.getMonth(), 1));
  };

  const getLastDayOfMonth = () => {
    const now = new Date();
    return formatDateForMonth(
      new Date(now.getFullYear(), now.getMonth() + 1, 0)
    );
  };

  const initialData = {
    status: "",
    bloodGroup: "",
    fromDate: getFirstDayOfMonth(),
    toDate: getLastDayOfMonth(),
    pincode: "",
    state: "",
    city: "",
  };

  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    fetchDonationRequestList({
      fromDate: initialData?.fromDate,
      toDate: initialData?.toDate,
    });
  }, []);

  const fetchDonationRequestList = async (filter) => {
    setIsFetching(true);
    try {
      const bformData = new FormData();
      bformData.append("data", "load_donation_request");
      bformData.append("loguserid", secureLocalStorage.getItem("loguserid"));

      Object.keys(filter).forEach((key) => {
        bformData.append(`${key}`, filter[key]);
      });

      const response = await axios.post(`${PHP_API_URL}/admin.php`, bformData);

      if (response?.data?.status === 200) {
        setDonationRequestList(response.data.data || []);

        if (pinCodeList.length === 0) {
          setPinCodeList([
            ...new Set(response?.data?.data?.map((item) => item.pincode)),
          ]);
        }

        if (stateList.length === 0) {
          setStateList([
            ...new Set(response?.data?.data?.map((item) => item.state)),
          ]);
        }

        if (cityList.length === 0) {
          setCityList([
            ...new Set(response?.data?.data?.map((item) => item.city)),
          ]);
        }
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } catch (error) {
      setDonationRequestList([]);
      const status = error.response?.data?.status;
      if (status === 400 || status === 500 || status === 401) {
        toast.error(error.response.data.msg || "A server error occurred.");
      } else {
        toast.error(
          "An error occurred. Please check your connection or try again."
        );
      }
    } finally {
      setIsFetching(false);
    }
  };

  const applyFilter = (e) => {
    e.preventDefault();
    fetchDonationRequestList(formData);
  };

  const resetFilter = () => {
    setFormData(initialData);
    fetchDonationRequestList({
      fromDate: initialData?.fromDate,
      toDate: initialData?.toDate,
    });
  };

  return (
    <>
      <div className="page-container">
        <div className="main-content">
          <div className="container-fluid">
            <div className="page-header mb-0">
              <div className="header-sub-title">
                <nav className="breadcrumb breadcrumb-dash">
                  <a href="./" className="breadcrumb-item">
                    <i className="fas fa-home m-r-5" /> Donation
                  </a>
                  <span className="breadcrumb-item active">
                    Blood Request List
                  </span>
                </nav>
              </div>
            </div>
            <div className="card bg-transparent mb-2">
              <div className="card-header d-flex justify-content-between align-items-center px-0">
                <h5 className="card-title h6_new"> Blood Request List</h5>
                <div className="ml-auto">
                  <button className="btn goback " onClick={() => goBack()}>
                    <i className="fas fa-arrow-left" /> Go Back
                  </button>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center position-relative py-0 px-3">
                <h6 className="h6_new card-title">Filter Record</h6>
                <button
                  className="btn btn-info"
                  onClick={() => setShowFilter(!showFilter)}
                >
                  {showFilter ? (
                    <i className="fas fa-times" />
                  ) : (
                    <i className="fas fa-filter" />
                  )}
                </button>
              </div>
              <div className={`card-body px-3 ${showFilter ? "" : "d-none"}`}>
                <form onSubmit={applyFilter}>
                  <div className="row">
                    <FormField
                      label="From Date"
                      name="fromDate"
                      id="fromDate"
                      type="date"
                      value={formData.fromDate}
                      column="col-md-3 col-lg-3"
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          fromDate: e.target.value,
                        }))
                      }
                    />
                    <FormField
                      label="To Date"
                      name="toDate"
                      id="toDate"
                      type="date"
                      value={formData.toDate}
                      column="col-md-3 col-lg-3"
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          toDate: e.target.value,
                        }))
                      }
                    />
                    <div className="col-md-3 col-lg-3 col-12 form-group">
                      <label className="font-weight-semibold">
                        Blood Group
                      </label>

                      <Select
                        options={bloodGroups}
                        isSearchable
                        value={
                          bloodGroups.find(
                            (blood) => blood.value === formData.bloodGroup
                          ) || { value: "", label: "Select Blood Group" }
                        }
                        onChange={(selected) =>
                          setFormData({
                            ...formData,
                            bloodGroup: selected.value,
                          })
                        }
                      />
                    </div>
                    <div className="col-md-3 col-lg-3 col-12 form-group">
                      <label className="font-weight-semibold">
                        Donation Status
                      </label>

                      <Select
                        options={DonationStatusConstant}
                        onChange={(selectedOption) =>
                          setFormData((prev) => ({
                            ...prev,
                            status: selectedOption.value,
                          }))
                        }
                        value={
                          formData.status !== ""
                            ? {
                                value: formData.status,
                                label: DonationStatusConstant.find(
                                  (option) => option.value === formData.status
                                )?.label,
                              }
                            : { value: "", label: "Select Status" }
                        }
                      />
                    </div>

                    <div className="col-md-3 col-lg-3 col-12 form-group">
                      <label className="font-weight-semibold">Pin Code</label>

                      <Select
                        options={pinCodeList.map((pincode) => ({
                          value: pincode,
                          label: pincode,
                        }))}
                        onChange={(e) => {
                          setFormData((prev) => ({
                            ...prev,
                            pincode: e.value,
                          }));
                        }}
                        value={
                          formData.pincode
                            ? {
                                value: formData.pincode,
                                label: formData.pincode,
                              }
                            : { value: "", label: "Select Pincode" }
                        }
                      />
                    </div>
                    <div className="col-md-3 col-lg-3 col-12 form-group">
                      <label className="font-weight-semibold">State</label>

                      <Select
                        options={stateList.map((state) => ({
                          value: state,
                          label: state,
                        }))}
                        onChange={(e) => {
                          setFormData((prev) => ({
                            ...prev,
                            state: e.value,
                          }));
                        }}
                        value={
                          formData.state
                            ? {
                                value: formData.state,
                                label: formData.state,
                              }
                            : { value: "", label: "Select State" }
                        }
                      />
                    </div>
                    <div className="col-md-3 col-lg-3 col-12 form-group">
                      <label className="font-weight-semibold"> City</label>

                      <Select
                        options={cityList.map((city) => ({
                          value: city,
                          label: city,
                        }))}
                        onChange={(e) => {
                          setFormData((prev) => ({
                            ...prev,
                            city: e.value,
                          }));
                        }}
                        value={
                          formData.city
                            ? {
                                value: formData.city,
                                label: formData.city,
                              }
                            : { value: "", label: "Select City" }
                        }
                      />
                    </div>

                    <div className="col-12 d-flex  mt-2">
                      <button
                        disabled={isFetching}
                        className="btn btn-dark mr-2"
                        type="submit"
                      >
                        Search{" "}
                        {isFetching && (
                          <>
                            &nbsp; <div className="loader-circle"></div>
                          </>
                        )}
                      </button>
                      <button
                        className="btn btn-secondary "
                        onClick={resetFilter}
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                {/* Search Box */}

                <div className={`table-responsive ${isFetching ? "form" : ""}`}>
                  {donationRequestList?.length > 0 ? (
                    <DataTable
                      value={donationRequestList}
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
                        header="User"
                        field="req_name"
                        sortable
                        body={(row) => (
                          <div className="p-2">
                            <div className="d-flex ">
                              <div className="mr-2">
                                <i className="fa-regular fa-user"></i>
                              </div>
                              <div className="">{row.req_name}</div>
                            </div>
                            <div className="d-flex ">
                              <div className="mr-2">
                                <i className="fa-regular fa-address-card"></i>
                              </div>
                              <div className="">{row.uniqueId}</div>
                            </div>

                            <div className="d-flex ">
                              <div className="mr-2">
                                <i className="fa-solid fa-mobile-screen"></i>
                              </div>
                              <div className="">{row.phone}</div>
                            </div>
                          </div>
                        )}
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

                      <Column
                        body={(row) => capitalizeFirstLetter(row.bloodGroup)}
                        header="Blood Group"
                        field="bloodGroup"
                        sortable
                      />
                      <Column header="Unit" field="unit" sortable />
                      <Column
                        body={(row) => capitalizeFirstLetter(row.attendeePhone)}
                        header="Attendee Phone"
                        field="attendeePhone"
                        sortable
                      />
                      <Column
                        body={(row) => capitalizeFirstLetter(row.state)}
                        header="State"
                        field="state"
                        sortable
                      />
                      <Column
                        body={(row) => capitalizeFirstLetter(row.city)}
                        header="City"
                        field="city"
                        sortable
                      />

                      <Column
                        body={(row) => capitalizeFirstLetter(row.pincode)}
                        header="PinCode"
                        field="pincode"
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
                                Accepted
                              </span>
                            )}
                            {row?.status === 2 && (
                              <span className="f-16 badge badge-info mb-0">
                                Received
                              </span>
                            )}
                            {row?.status === 3 && (
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
                            <Link to="#" className="text-warning">
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
}
export default BloodRequestList;
