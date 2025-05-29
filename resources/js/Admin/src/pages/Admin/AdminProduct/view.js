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

const ViewJob = () => {
  let { state } = useLocation();
  const [items, setItems] = useState([]);
  const [alignValue, setAlignValue] = useState("center");
  let { slug } = useParams();
  const { loading, data } = useFetch("get_job", "mount", slug);

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
      <ContentWrapper title="View Job">
        <section className="main-content">
          {!window._.isEmpty(data) && (
           <div class="row">
              <div class="col-md-6">
                <div class="widget white-bg">
                  <div class="padding-20 text-center">
                  <Image
                        width={140}
                        className="rounded-circle mar-btm margin-b-10 circle-border"
                        src={data.created_by.image_url}
                      />
                              <p class="lead font-500 margin-b-0">{data.created_by.name}</p>
                              <hr></hr>
                              <ul class="list-unstyled margin-b-0 text-center row">
                                  <li class="col-4">
                                      <span class="font-600">{data.created_by.email}</span>
                                      <p class="text-muted text-sm margin-b-0">Email</p>
                                  </li>
                                  <li class="col-4">
                                      <span class="font-600">{data.created_by.mobile_no}</span>
                                      <p class="text-muted text-sm margin-b-0">Phone</p>
                                  </li>
                                  <li class="col-4">
                                      <span class="font-600">Active</span>
                                      <p class="text-muted text-sm margin-b-0">Status</p>
                                  </li>
                              </ul>
                          </div>
                </div>
                
              </div>
              <div class="col-md-6">
                <div class="widget white-bg">
                  <div class="padding-20">
                            <small class="text-muted">Branch Name </small>
                            <p>{data.created_by.company_name}</p> 
							              <small class="text-muted">Branch Email</small>
                            <p>{data.created_by.company_email_address}</p> 
							              <small class="text-muted">Branch Number</small>
                            <p>{data.created_by.company_mobile_number}</p>
                            <small class="text-muted">Branch Address</small>
                            <p>{data.created_by.company_address}</p>
                          </div>
                          
                </div>
                
              </div>
              <div class="col-12">
	<div class="card">
	<div class="card-header card-default">
			  Job Details
			</div>
		
			<div class="row">
					  <div class="col">
							<div class="widget bg-primary padding-15">
							  <div class="row row-table">
								<div class="col-xs-8 padding-15 text-center">
								  <h4 class="mv-0">{data.number_of_person}</h4>
								  <div class="margin-b-0 ">No. Assign Crew</div>
								</div>
							  </div>
							</div>
					  </div>
					  <div class="col">
						  <div class="widget bg-warning padding-15">
							<div class="row row-table">
							  <div class="col-xs-8 padding-15 text-center">
								<h4 class="mv-0">{data.schedule_day}</h4>
								<div class="margin-b-0">Schedule Date</div>
							  </div>
							</div>
						  </div>
						</div>
						<div class="col">
							<div class="widget bg-success padding-15">
							  <div class="row row-table">
								<div class="col-xs-8 padding-15 text-center">
								  <h4 class="mv-0">{data.schedule_time}</h4>
								  <div class="margin-b-0">Schedule Time</div>
								</div>
							  </div>
							</div>
						  </div>
						  <div class="col">
							<div class="widget bg-danger padding-15">
							  <div class="row row-table">
								<div class="col-xs-8 padding-15 text-center">
								  <h4 class="mv-0">{data.status_text}</h4>
								  <div class="margin-b-0">Job Status</div>
								</div>
							  </div>
							</div>
						</div>


			  </div>
			<div class="widget white-bg">
						<div class="row">
								<div class="col-md-2 col-xs-6 b-r"> <strong>Job Title</strong>
									<br/>
									<p class="text-muted">{data.title}</p>
								</div>
								<div class="col-md-4 col-xs-6 b-r"> <strong>Contact Name</strong>
									<br/>
									<p class="text-muted">{data.name}</p>
								</div>
								<div class="col-md-4 col-xs-6 b-r"> <strong>Contact Number</strong>
									<br/>
									<p class="text-muted">{data.monile_no}</p>
								</div>
								<div class="col-md-2 col-xs-6"> <strong>Address</strong>
									<br/>
									<p class="text-muted">{data.address}</p>
								</div>
						</div>
					  <hr/>
					  <p class="mt-20">
					  {data.description}
					  </p>
			 </div>

			
	</div>
  </div>
           </div>
          )}
          {!window._.isEmpty(data.crew) && (
                <div class="row">
                  <div class="col-sm-12">
                  <div class="card">
                        <div class="card-header card-default">
                            Assign Crew
                        </div>
                        <div class="card-body">
                            <div class="form-group">
                                    <div class="row">
                                    {data.crew.map((crewvalue, crewkey) => (
                                        <div class="col-md-4">
                                            <div class="widget white-bg text-center">
                                                {<Avatar src={crewvalue.assignee.image_url} />}
                                                <h4 class="font-400 margin-b-0">{crewvalue.assignee.name}</h4>
                                                <p class="text-muted margin-b-10">{crewvalue.assignee.email}</p>
                                                <p class="text-muted margin-b-10">{crewvalue.assignee.mobile_no}</p>
                                            </div>
                                        </div>
                                    ))}
                                    </div>
                            </div>
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

export default React.memo(ViewJob);
