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
import HttpRequest from "../../../repositories";

let content;
const onChange = (key) => {
  // console.log('key>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',key);
};

const ViewJob = () => {
  let { state } = useLocation();
  let navigate = useNavigate();
  let user = window.helpers.getStorageData('session');
  const [items, setItems] = useState([]);
  const [alignValue, setAlignValue] = useState("center");
  let { slug } = useParams();
  const { loading, data } = useFetch("get_job", "mount", slug);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setmodalData] = useState(false);
  const [jobId, setJobId] = useState(null);
  const [feedbackText, setFeedbackText] = useState(null);
  const [feedbackError, setFeedbackError] = useState('');
  const [area, setArea] = useState('Main Entrance'); // Track selected job type
  const numberOfAreasOptions = [
    { label: 'Main Entrance', value: 'Main Entrance' },
    { label: 'Common Areas', value: 'Common Areas' },
    { label: 'Washrooms', value: 'Washrooms' },
    { label: 'Floors', value: 'Floors' },
    { label: 'Garbage', value: 'Garbage' },
  ];
  const showModal = (job_id) => {
    setJobId(job_id);
    setIsModalOpen(true);
  };
  const handleOk = async (job_id,answer) => {
    if (!answer || answer.trim() === '') {
      setFeedbackError("Feedback cannot be empty.");
      return;
    }
    setFeedbackError('');
    const fd = new FormData();
    fd.append('job_id', job_id);
    fd.append('created_by_id', user.id);
    fd.append('question_id', 1);
    fd.append('answer', answer);
    fd.append('feedback_area', area);

    try {
      // Making the API call to update the job
      const response =  await HttpRequest.makeRequest('POST', window.constants.api_base_url + 'admin/user_feedbacks/', fd)
      //const result = await response.json();
      
      if (response.code == 400) {
        console.log("Feedback send successfully:",response);
        setIsModalOpen(true);
        
      } else if (response.code == 200) {
        console.log("Feedback send successfully:",response);
        navigate(0);
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleAreasChange = (value) => {
    setArea(value);
  };

  if (!window._.isEmpty(data)) {
    content = (
      <ContentWrapper title="View User">
        <section className="main-content">
          {!window._.isEmpty(data) && (
           <div class="row">
              <div class="col-md-6">
                <div class="widget white-bg">
                  <div class="padding-20 text-center">
                  <Image
                        width={140}
                        className="rounded-circle mar-btm margin-b-10 circle-border"
                        src={data.target_by.image_url}
                      />
                              <p class="lead font-500 margin-b-0">{data.target_by.name}</p>
                              <hr></hr>
                              <ul class="list-unstyled margin-b-0 text-center row">
                                  <li class="col-4">
                                      <span class="font-600">{data.target_by.email}</span>
                                      <p class="text-muted text-sm margin-b-0">Email</p>
                                  </li>
                                  <li class="col-4">
                                      <span class="font-600">{data.target_by.mobile_no}</span>
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
              {!window._.isEmpty(data.target_by.company_name) && (
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
              )}
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
								<h4 class="mv-0">{data.schedule_day} - {data.schedule_end_day}</h4>
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
								<div class="col-md-2 col-xs-6 b-r"> <strong>Service Name</strong>
									<br/>
									<p class="text-muted">{data.title}</p>
								</div>
								<div class="col-md-4 col-xs-6 b-r"> <strong>Job Type</strong>
									<br/>
									<p class="text-muted">{data.job_type}</p>
								</div>
								<div class="col-md-4 col-xs-6 b-r"> <strong>Job Schedule</strong>
									<br/>
									<p class="text-muted">{data.job_duration}</p>
								</div>
								<div class="col-md-2 col-xs-6"> <strong>Customer</strong>
									<br/>
									<p class="text-muted">{data.target_by.name}</p>
								</div>
						</div>
					  <hr/>
					  <p class="mt-20">
					  {data.description}
					  </p>
            {data.is_feedback == 1 && (
            <p class="mt-20">
            <button onClick={() => { showModal(data.id); }} type="button" className="btn btn-sm btn-primary">Write Feedback</button>
              </p>
            )}
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

                        {!window._.isEmpty(data.feedback) && (
                          <div class="row">
                            <div class="col-sm-12">
                            <div class="card">
                                  <div class="card-header card-default">
                                      Recent Feedbacks
                                  </div>
                                  <div class="card-body">
                                      <div class="form-group">
                                              <div class="row">
                                              {data.feedback.map((feedbackvalue, feedbackkey) => (
                                                  <div className="col-12">
                                                    <div className="comment-box p-3 bg-light rounded shadow-sm w-100">
                                                      <div className="d-flex justify-content-between align-items-center mb-2">
                                                        <h6 className="mb-0 text-primary">{feedbackvalue.created_name}</h6>
                                                        <small className="text-muted">{feedbackvalue.submit_date}</small>
                                                      </div>
                                                      <p className="mb-0 text-dark"><strong>Area: </strong>{feedbackvalue.feedback_area}</p>
                                                      <p className="mb-0 text-dark"><strong>Feedback: </strong>{feedbackvalue.answer}</p>
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

                        <Modal
                        title="Write Feedback"
                        open={isModalOpen}
                        onOk={() => handleOk(jobId,feedbackText)}
                        onCancel={handleCancel}
                        width={1000}
                      >
                        <BaseInput
                          label="Areas"
                          name="feedback_area"
                          type="select"
                          selectHandle={handleAreasChange} // Handle customer selection change
                          defaultValue='Main Entrance'
                          options={numberOfAreasOptions} // Render services dynamically based on the selected customer
                          rules={[{ required: true, message: 'Please select area!' }]} // Optional: Add validation if needed
                        />
                        <label for="areas" class="ant-form-item-required" title="Write Feedback:">Write Feedback</label>
                        <textarea
                            className="form-control"
                            value={feedbackText}
                            onChange={(e) => setFeedbackText(e.target.value)}
                          />
                          {feedbackError && (
                            <div style={{ color: "red", marginTop: "10px" }}>
                              {feedbackError}
                            </div>
                          )}
                      </Modal>
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
