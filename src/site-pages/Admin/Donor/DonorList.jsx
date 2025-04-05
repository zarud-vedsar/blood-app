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
import { Column } from 'primereact/column'; // ✅ lowercase
import secureLocalStorage from "react-secure-storage";
import { bloodGroups } from "../../../site-components/Helper/BloodGroupConstant";
import { Link } from "react-router-dom";
import { OverlayTrigger } from "react-bootstrap";
import Tooltip from "react-bootstrap/Tooltip";
import { InputText } from "primereact/inputtext";

function DonorList() {
  const [showFilter, setShowFilter] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [donationRequestList, setDonationRequestList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [pinCodeList, setPinCodeList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const initialData = {
    bloodGroup: "",
    pincode: "",
    state: "",
    city: "",
  };

  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    fetchDonationRequestList({});
  }, []);

  const fetchDonationRequestList = async (filter) => {
    setIsFetching(true);
    try {
      const bformData = new FormData();
      bformData.append("data", "load_donor_list");
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
    fetchDonationRequestList({});
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
                  <span className="breadcrumb-item active">Donor List</span>
                </nav>
              </div>
            </div>
            <div className="card bg-transparent mb-2">
              <div className="card-header d-flex justify-content-between align-items-center px-0">
                <h5 className="card-title h6_new"> Donor List</h5>
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
                            : { value: "", label: "Select Pin Code" }
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
                <div className="row">
                  <div className="col-md-8 col-lg-8 col-12 col-sm-8 p-input-icon-left mb-3 d-flex justify-content-start align-items-center">
                    <div className="search-icon">
                      <i class="fa-solid fa-magnifying-glass"></i>{" "}
                    </div>
                    <InputText
                      type="search"
                      value={globalFilter}
                      onChange={(e) => setGlobalFilter(e.target.value)}
                      placeholder="Search"
                      className="form-control dtsearch-input"
                    />
                  </div>
                </div>

                <div className={`table-responsive ${isFetching ? "form" : ""}`}>
                  {donationRequestList?.length > 0 ? (
                    <DataTable
                      value={donationRequestList}
                      removableSort
                      paginator
                      rows={50}
                      globalFilter={globalFilter}
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
                        field="name"
                        sortable
                        body={(row) => (
                          <div className="p-2">
                            <div className="d-flex ">
                              <div className="mr-2">
                                <i
                                  className="fa-solid fa-user "
                                  style={{ color: "#3f87f5" }}
                                ></i>
                              </div>
                              <div className="">{row.name}</div>
                            </div>
                            <div className="d-flex ">
                              <div className="mr-2">
                                <i
                                  className="fa-solid fa-address-card "
                                  style={{ color: "#3f87f5" }}
                                ></i>
                              </div>
                              <div className="">{row.uniqueId}</div>
                            </div>

                            <div className="d-flex ">
                              <div className="mr-2">
                                <i
                                  className="fa-solid fa-phone "
                                  style={{ color: "#3f87f5" }}
                                ></i>
                              </div>
                              <div className="">{row.phone}</div>
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

                      <Column
                        body={(row) => capitalizeFirstLetter(row.gender)}
                        header="Gender"
                        field="gender"
                        sortable
                      />
                      <Column
                        body={(row) => formatDate(row.dob)}
                        header="DOB"
                        field="dob"
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
                        header="Pin Code"
                        field="pincode"
                        sortable
                      />
                      <Column
                        body={(row) => row.address}
                        header="Address"
                        field="address"
                        sortable
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
                            <Link
                              to={`/admin/donor-detail/${rowData.id}`}
                              className="text-warning"
                            >
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
export default DonorList;
