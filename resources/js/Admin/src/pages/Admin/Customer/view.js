import React, { useEffect, useState } from "react";
import ContentWrapper from "../../../components/shared/Layout/index";
import { useFetch } from "../../../hooks/request";
import { Spin, Image } from "antd";
import { useLocation, useParams } from "react-router";
import { useNavigate } from "react-router-dom";

const ViewContractor = () => {
  let { state } = useLocation();
  const [items, setItems] = useState([]);
  let { slug } = useParams();
  
  // Fetch user data
  const { loading, data } = useFetch("get_users", "mount", slug);
  
  // Fetch manager data based on parent ID and user group ID
  const { data: userProfile } = useFetch(
    "get_users",
    "mount",
    "?parent_id=" + state.id + "&user_group_id=4&limit=5000"
  );

  // Process profile data
  let profiles = [];
  if (!window._.isEmpty(userProfile)) {
    userProfile.forEach((value) =>
      profiles.push({
        id: value.id,
        name: value.name,
        email: value.email,
        mobile_number: value.mobile_no,
      })
    );
  }

  // Services data handling (assuming services exist in the user data)
  const [services, setServices] = useState([]);
  useEffect(() => {
    if (data?.services) {
      setServices(data.services);
    }
  }, [data]);

  // Check if the modal for more information needs to be shown (Optional)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setmodalData] = useState(false);

  const showModal = (obj) => {
    setmodalData(obj);
    setIsModalOpen(true);
  };
  const handleOk = () => setIsModalOpen(false);
  const handleCancel = () => setIsModalOpen(false);

  // Conditional rendering based on loading state and available data
  let content;
  if (!window._.isEmpty(data)) {
    content = (
      <ContentWrapper title="View User">
        <section className="main-content">
          {!window._.isEmpty(data) && (
            <div className="row">
              <div className="col-md-4">
                <div className="widget white-bg">
                  <div className="padding-20 text-center">
                    <Image
                      width={140}
                      className="rounded-circle mar-btm margin-b-10 circle-border"
                      src={data.image_url}
                    />
                    <p className="lead font-500 margin-b-0">{data.name}</p>
                    <hr />
                    <ul className="list-unstyled margin-b-0 text-center row">
                      <li className="col-4">
                        <span className="font-600">{data.email}</span>
                        <p className="text-muted text-sm margin-b-0">Email</p>
                      </li>
                      <li className="col-4">
                        <span className="font-600">{data.mobile_no}</span>
                        <p className="text-muted text-sm margin-b-0">Phone</p>
                      </li>
                      <li className="col-4">
                        <span className="font-600">Active</span>
                        <p className="text-muted text-sm margin-b-0">Status</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-8">
                <div className="card">
                  <div className="card-header card-default">Centers</div>
                  <div className="card-body">
                    <table id="datatable" className="table table-striped dt-responsive nowrap">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                        </tr>
                      </thead>

                      <tbody>
                        {profiles.map((item) => (
                          <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.mobile_number}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Show services in columns */}
          <div className="row">
            <div className="col-md-12">
            <div className="card-header card-default" style={{marginTop: '20px'}}>Assign Services</div>
              <div className="widget white-bg" style={{marginTop: '0px'}}>
                <div className="services-list">
                  {services.length > 0 ? (
                    <div className="services-container">
                      {services.map((service) => (
                        <div key={service.id} className="service-item">
                          {service.service_name} {/* Adjust this to match the service object structure */}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>No services available</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </ContentWrapper>
    );
  } else {
    content = (
      <div className="min-vw-100 min-vh-100 d-flex align-items-center justify-content-center">
        <Spin size="large" />
      </div>
    );
  }

  return content;
};

export default React.memo(ViewContractor);
