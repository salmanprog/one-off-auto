import React,{useRef, useState} from 'react'
import ContentWrapper from '../../../components/shared/Layout/index';
import Table from "../../../components/shared/tablecondition";
import { useFetch } from "../../../hooks/request";
import { Tooltip, Button, Avatar, Input, Space, Modal, Checkbox } from "antd";
import { useNavigate } from 'react-router';
import { SearchOutlined, AlertOutlined, FileExcelOutlined, BranchesOutlined, EyeOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import HttpRequest from "../../../repositories";

const ApplicationJob = () => {
   
  let navigate = useNavigate();
  let user = window.helpers.getStorageData('session');
  const {  data } = useFetch("get_job",
    "mount",
    "?send_to_admin=1");
  const {  data:total_job } = useFetch("get_status_job","mount","?send_to_admin=1");
  const {  data:total_complete_job } = useFetch("get_status_job","mount","?send_to_admin=1&job_status=6");
  const {  data:total_inprogress_job } = useFetch("get_status_job","mount","?send_to_admin=1&job_status=5");
  const {  data:total_pending_job } = useFetch("get_status_job","mount","?send_to_admin=1&job_status=2");
  const {  data:crew } = useFetch("get_users","mount","?created_by="+user.id+"&user_group_id=6");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setmodalData] = useState(false);
  const [selectedCrew, setSelectedCrew] = useState([]);
  const [jobId, setJobId] = useState(null);
  // Admin accept job requests
  const acceptAdminJob = async (slug,status) => {
    const fd = new FormData();
    fd.append('job_status', status);

    try {
      // Making the API call to update the job
      const response =  await HttpRequest.makeRequest('PUT', window.constants.api_base_url + 'admin/job/' + slug, fd)
      //const result = await response.json();
      
      if (response) {
        console.log("Job accepted successfully:");
        navigate(0);  // Redirect after success
        
      } else {
        console.error("Error accepting job:");
      }
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };
  const handleCheckboxChange = (checked, crewId) => {
    if (checked) {
      setSelectedCrew(prevSelected => [...prevSelected, crewId]);
    } else {
      setSelectedCrew(prevSelected => prevSelected.filter(id => id !== crewId));
    }
  };
  const showModal = (crewData, job_id) => {
    setmodalData(crewData);  // Set the crew data in state
    setJobId(job_id);        // Set the job_id in a separate state (if needed)
    setIsModalOpen(true);    // Open the modal
  };
  const handleOk = async (job_id) => {
    const fd = new FormData();
    fd.append('job_id', job_id);
    fd.append('assignee', selectedCrew);

    try {
      // Making the API call to update the job
      const response =  await HttpRequest.makeRequest('POST', window.constants.api_base_url + 'admin/assign/job/', fd)
      //const result = await response.json();
      
      if (response.code == 400) {
        console.log("Job accepted successfully:",response);
        setIsModalOpen(true);
        
      } else if (response.code == 200) {
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
  return (
    
    <ContentWrapper title='All Jobs'>
      <section className="main-content">
        <div class="row">
                <div class="col-md-12">
                    <div class="card">
					 
                    <div class="row">
                          <div class="col">
                              <div class="widget bg-primary padding-15">
                                  <div class="row row-table">
                                      <div class="col-xs-8 padding-15 text-center">
                                          <h4 class="mv-0">{total_job ? total_job.total : 0}</h4>
                                          <div class="margin-b-0 ">Total Jobs</div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div class="col">
                              <div class="widget bg-warning padding-15">
                                  <div class="row row-table">
                                      <div class="col-xs-8 padding-15 text-center">
                                          <h4 class="mv-0">{total_inprogress_job ? total_inprogress_job.total : 0}</h4>
                                          <div class="margin-b-0">In-Progress Jobs</div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div class="col">
                              <div class="widget bg-success padding-15">
                                  <div class="row row-table">
                                      <div class="col-xs-8 padding-15 text-center">
                                          <h4 class="mv-0">{total_complete_job ? total_complete_job.total : 0}</h4>
                                          <div class="margin-b-0">Complete Jobs</div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div class="col">
                              <div class="widget bg-danger padding-15">
                                  <div class="row row-table">
                                      <div class="col-xs-8 padding-15 text-center">
                                          <h4 class="mv-0">{total_pending_job ? total_pending_job.total : 0}</h4>
                                          <div class="margin-b-0">Pending Jobs</div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <table id="datatable" class="table table-striped nowrap dataTable no-footer dtr-inline" width="100%">
                          <thead>
                              <tr>
                                  <th>
                                      <strong>Job ID #</strong>
                                  </th>
                                  <th>
                                      <strong>Created By</strong>
                                  </th>
                                  <th>
                                      <strong>Email</strong>
                                  </th>
                                  <th>
                                      <strong>Phone</strong>
                                  </th>
                                  <th>
                                      <strong>Service</strong>
                                  </th>
                                  <th>
                                      <strong>Job Date</strong>
                                  </th>
                                  <th>
                                      <strong>Status</strong>
                                  </th>
                                  <th>
                                      <strong>Action</strong>
                                  </th>
                              </tr>
                          </thead>
                          <tbody>
                          {!window._.isEmpty(data) && (
                                  data.map((value, key) => {
                                    let btn;
                                    if (value.job_status.id === 2) {
                                      btn = (
                                      <>
                                      <Tooltip title="Accept Job">
                                        <button onClick={() => { acceptAdminJob(value.slug,5); }} type="button" className="btn btn-sm btn-warning">
                                          <AlertOutlined />
                                        </button>
                                        </Tooltip>
                                        &nbsp;
                                        <Tooltip title="Reject Job">
                                          <button onClick={() => { acceptAdminJob(value.slug,4); }} type="button" className="btn btn-sm btn-danger">
                                            <FileExcelOutlined />
                                          </button>
                                          </Tooltip>
                                          &nbsp;
                                          <Tooltip title="View Job">
                                          <button onClick={() => navigate('view' + '/' + value.slug)} type="button" className="btn btn-sm btn-info">
                                            <EyeOutlined />
                                          </button>
                                          </Tooltip>
                                      </>  
                                      );
                                    }else if (value.job_status.id === 4) {
                                      btn = (
                                        <>
                                        <Tooltip title="View Job">
                                          <button onClick={() => navigate('view' + '/' + value.slug)} type="button" className="btn btn-sm btn-info">
                                                <EyeOutlined />
                                              </button>
                                        </Tooltip>      
                                      </>
                                      );
                                    } else if (value.job_status.id === 5){
                                      btn = (
                                        <>
                                        <Tooltip title="Assign Crew">
                                        <button onClick={() => { showModal(crew, value.id); }} type="button" className="btn btn-sm btn-primary">
                                          <BranchesOutlined />
                                        </button>
                                        </Tooltip>
                                        &nbsp;
                                        <Tooltip title="View Job">
                                          <button onClick={() => navigate('view' + '/' + value.slug)} type="button" className="btn btn-sm btn-info">
                                            <EyeOutlined />
                                          </button>
                                          </Tooltip>
                                        </>
                                      );
                                    }else {
                                      btn = (
                                        <>
                                        <Tooltip title="View Job">
                                          <button onClick={() => navigate('view' + '/' + value.slug)} type="button" className="btn btn-sm btn-info">
                                            <EyeOutlined />
                                          </button>
                                          </Tooltip>
                                        </>
                                      );
                                    }

                                    return (
                                      <tr key={key}>
                                        <td>{value.id}</td>
                                        <td>
                                          <Avatar src={value.created_by.image_url} /> {value.created_by.name}
                                        </td>
                                        <td>{value.created_by.email}</td>
                                        <td>{value.created_by.mobile_no}</td>
                                        <td>{value.title}</td>
                                        <td>{value.schedule_day}</td>
                                        <td>
                                          <span className="label" style={{ backgroundColor: value.job_status.color }}>
                                            {value.status_text}
                                          </span>
                                        </td>
                                        <td className="text-center">
                                          {btn}
                                        </td>
                                      </tr>
                                    );
                                  })
                                )}
                          </tbody>
                      </table>                          
                    </div>
                </div>
            </div>
            <Modal
                        title="Crew Available"
                        open={isModalOpen}
                        onOk={() => handleOk(jobId)}
                        onCancel={handleCancel}
                        width={1000}
                        footer={[
                          <Button key="back" onClick={handleCancel}>Cancel</Button>,
                          <Button
                            key="submit"
                            type="primary"
                            onClick={() => handleOk(jobId)}
                            disabled={selectedCrew.length === 0}  // Disable the button if no crew is selected
                          >
                            Assign Crew
                          </Button>
                        ]}
                      >
                        {modalData && modalData.length > 0 ? (
                        <table id="datatable" class="table table-striped nowrap dataTable no-footer dtr-inline" width="100%">
                        <thead>
                            <tr>
                                <th>
                                    <strong>ID</strong>
                                </th>
                                <th>
                                    <strong>Name</strong>
                                </th>
                                <th>
                                    <strong>Email</strong>
                                </th>
            <th>
                                    <strong>Phone</strong>
                                </th>
                                <th>
                                    <strong>Action</strong>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {modalData.map((value, key) => (
                                <tr key={key}>
                                    <td>{value.id}</td>
                                    <td>{<Avatar src={value.image_url} />}{value.name}</td>
                                    <td>{value.email}</td>
                                    <td>{value.mobile_no}</td>
                                    <td>
                                    <Checkbox
                                        onChange={(e) => handleCheckboxChange(e.target.checked, value.id)}
                                    />
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                            </table>
                    ) : (
                        <p>No crew available</p>  // If no crew data is available
                    )}
                      </Modal>
      </section>
      </ContentWrapper>

  )
}

export default React.memo(ApplicationJob);