import React,{useRef, useState} from 'react'
import ContentWrapper from '../../../components/shared/Layout/index';
import Table from "../../../components/shared/tablecondition";
import { useFetch } from "../../../hooks/request";
import { Tooltip, Button, Avatar, Input, Space, Modal, Checkbox } from "antd";
import { useNavigate } from 'react-router';
import { SearchOutlined, AlertOutlined, FileExcelOutlined, BranchesOutlined, EyeOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import HttpRequest from "../../../repositories";

const ApplicationOrder = () => {
   
  let navigate = useNavigate();
  let user = window.helpers.getStorageData('session');
  const {  data } = useFetch("get_orders","mount","?created_by_id="+user.id);
  
  // Admin accept job request
  const acceptAdminJob = async (slug,status) => {
    const fd = new FormData();
    fd.append('order_status', status);

    try {
      // Making the API call to update the job
      const response =  await HttpRequest.makeRequest('PUT', window.constants.api_base_url + 'admin/order/' + slug, fd)
      //const result = await response.json();
      
      if (response) {
        console.log("order accepted successfully:");
        navigate(0);  // Redirect after success
        
      } else {
        console.error("Error accepting order:");
      }
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };
 
  return (
    
    <ContentWrapper title='All Orders'>
      <section className="main-content">
        <div class="row">
                <div class="col-md-12">
                    <div class="card">

                      <table id="datatable" class="table table-striped nowrap dataTable no-footer dtr-inline" width="100%">
                          <thead>
                              <tr>
                                  <th>
                                      <strong>Order ID #</strong>
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
                                      <strong>Order Date</strong>
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
                                    if (value.order_status === '0' && value.created_by_id != user.id) {
                                      btn = (
                                      <>
                                      <Tooltip title="Accept Order">
                                        <button onClick={() => { acceptAdminJob(value.slug,'1'); }} type="button" className="btn btn-sm btn-warning">
                                          <AlertOutlined />
                                        </button>
                                        </Tooltip>
                                        &nbsp;
                                          <Tooltip title="View Order">
                                          <button onClick={() => navigate('view' + '/' + value.slug)} type="button" className="btn btn-sm btn-info">
                                            <EyeOutlined />
                                          </button>
                                          </Tooltip>
                                      </>  
                                      );
                                    }else {
                                      btn = (
                                        <>
                                        <Tooltip title="View Order">
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
                                        <td>{value.order_date}</td>
                                        {/* <td>{value.order_status}</td> */}
                                        <td>
                                          <span className="label" style={{ backgroundColor: value.status_text.color }}>
                                            {value.status_text.status_text}
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
            
      </section>
      </ContentWrapper>

  )
}

export default React.memo(ApplicationOrder);