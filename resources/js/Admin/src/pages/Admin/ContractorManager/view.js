import React, { useEffect, useState } from "react";
import ContentWrapper from "../../../components/shared/Layout/index";
import BaseInput from "../../../components/shared/Input/index";
import { register } from "../../../config/form_validation_rules";
import { useFetch } from "../../../hooks/request";
import { Form, Spin, Avatar, List, Tabs, Image, Modal } from "antd";
import { useLocation, useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

let content;
const onChange = (key) => {
  // console.log('key>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',key);
};

const ViewManager = () => {
  let { state } = useLocation();
  const [items, setItems] = useState([]);
  let user = window.helpers.getStorageData('session');
  const [alignValue, setAlignValue] = useState("center");
  let { slug } = useParams();
  const { loading, data } = useFetch("get_users", "mount", slug);
  const { data: userProfile } = useFetch(
    "get_job",
    "mount",
    "?created_by_id=" + state.id
  );
  
  let profiles = [];
  if (!window._.isEmpty(userProfile)) {
    userProfile.forEach((value, key) =>
      profiles.push({
        id:value.id,
        title: value.title,
        name: value.name,
        mobile_number: value.monile_no,
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
           <div class="row">
              <div class="col-md-4">
                <div class="widget white-bg">
                  <div class="padding-20 text-center">
                  <Image
                        width={140}
                        className="rounded-circle mar-btm margin-b-10 circle-border"
                        src={data.image_url}
                      />
                              <p class="lead font-500 margin-b-0">{data.name}</p>
                              <hr></hr>
                              <ul class="list-unstyled margin-b-0 text-center row">
                                  <li class="col-4">
                                      <span class="font-600">{data.email}</span>
                                      <p class="text-muted text-sm margin-b-0">Email</p>
                                  </li>
                                  <li class="col-4">
                                      <span class="font-600">{data.mobile_no}</span>
                                      <p class="text-muted text-sm margin-b-0">Phone</p>
                                  </li>
                                  <li class="col-4">
                                      <span class="font-600">Active</span>
                                      <p class="text-muted text-sm margin-b-0">Status</p>
                                  </li>
                              </ul>
                          </div>
                </div>
                <div class="card-header card-default">
                          Branch Information
                        </div>
                <div class='widget white-bg friends-group clearfix'>
                <small class="text-muted">Branch Name </small>
                                  <p>{data.company_name}</p> 
                    <small class="text-muted">Branch Email </small>
                                  <p>{data.company_email_address}</p> 
                    <small class="text-muted">Branch Phone</small>
                                  <p>{data.company_mobile_number}</p> 
                    <small class="text-muted">Branch Address</small>
                                  <p>{data.company_address}</p>
                     
                    </div>
                
              </div>
              <div class="col-8">
                <div class="card">
                <div class="card-header card-default">
                          Job Requests
                        </div>
                        <div class="card-body">
                            <table id="datatable" class="table table-striped dt-responsive nowrap">
                                            <thead>
                                                <tr>
                                                    <th>Service</th>
                                                    <th>Contact Name</th>
                                                    <th>Contact Number</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                            {profiles.map((item) => (
                                                <tr key={item.id}>
                                                  <td>{item.title}</td>
                                                  <td>{item.name}</td>
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

export default React.memo(ViewManager);
