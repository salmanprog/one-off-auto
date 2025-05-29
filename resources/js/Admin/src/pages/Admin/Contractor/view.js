import React, { useEffect, useState } from "react";
import ContentWrapper from "../../../components/shared/Layout/index";
import { useFetch } from "../../../hooks/request";
import { Spin, Avatar, List, Tabs, Image, Modal } from "antd";
import { useLocation, useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

let content;
const onChange = (key) => {
  // console.log('key>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', key);
};

const ViewContractor = () => {
  let { state } = useLocation();
  const [items, setItems] = useState([]);
  const [alignValue, setAlignValue] = useState("center");
  let { slug } = useParams();
  const { loading, data } = useFetch("get_users", "mount", slug);
  const { data: userProfile } = useFetch(
    "get_users",
    "mount",
    "?parent_id=" + state.id + "&user_group_id=5&limit=5000"
  );

  const { data: crewProfile } = useFetch(
    "get_users",
    "mount",
    "?created_by=" + state.id + "&user_group_id=4&limit=5000"
  );

  let profiles = [];
  let crew = [];
  if (!window._.isEmpty(userProfile)) {
    userProfile.forEach((value, key) =>
      profiles.push({
        id: value.id,
        name: value.name,
        email: value.email,
        mobile_number: value.mobile_no,
      })
    );
  }

  if (!window._.isEmpty(crewProfile)) {
    crewProfile.forEach((value, key) =>
      crew.push({
        id: value.id,
        name: value.name,
        email: value.email,
        mobile_number: value.mobile_no,
      })
    );
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setmodalData] = useState(false);

  const showModal = (obj) => {
    setmodalData(obj);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
                    <hr></hr>
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
                <div className="card-header card-default">
                  Company Information
                </div>
                <div className="widget white-bg friends-group clearfix">
                  <small className="text-muted">Company Name </small>
                  <p>{data.company_name}</p>
                  <small className="text-muted">Company Email </small>
                  <p>{data.company_email_address}</p>
                  <small className="text-muted">Company Phone</small>
                  <p>{data.company_mobile_number}</p>
                  <small className="text-muted">Company Address</small>
                  <p>{data.company_address}</p>
                </div>
              </div>
              <div className="col-8">
                <div className="card">
                  <div className="card-header card-default">Details</div>
                  <div className="card-body">
                    <Tabs defaultActiveKey="1" onChange={onChange}>
                      <Tabs.TabPane tab="Customers" key="1">
                        <table
                          id="datatable"
                          className="table table-striped dt-responsive nowrap"
                        >
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
                      </Tabs.TabPane>
                      <Tabs.TabPane tab="Centers" key="2">
                        <table
                          id="datatable"
                          className="table table-striped dt-responsive nowrap"
                        >
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Email</th>
                              <th>Phone</th>
                            </tr>
                          </thead>
                          <tbody>
                            {crew.map((item) => (
                              <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.mobile_number}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </Tabs.TabPane>
                    </Tabs>
                  </div>
                </div>
              </div>
            </div>
          )}
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
  return [content];
};

export default React.memo(ViewContractor);
