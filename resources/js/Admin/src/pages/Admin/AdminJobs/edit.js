import React, { useEffect, useState } from 'react'
import ContentWrapper from '../../../components/shared/Layout/index';
import BaseInput from "../../../components/shared/Input/index";
import { register } from "../../../config/form_validation_rules";
import { useFetch } from "../../../hooks/request";
import { Form, Input, Button } from 'antd';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';

const activityOptions = [
  { label: 'Pending', value: 1 },
  { label: 'Send to Admin', value: 2 },
  { label: 'Cancel', value: 3 },
]

const EditJob = () => {

  let { slug } = useParams();
  const { data } = useFetch("get_job", "mount", slug);
  const { loading, postData } = useFetch("update_job", "submit");
  let navigate = useNavigate();
  const fd = new FormData();
  const onFinish = (values) => {
    for (const key in values) {
      if(values[key] == 2){
        fd.append('send_to_admin', '1');
      }
      fd.append(key, values[key]);
    }
    const callback = (receivedData) => {
      return navigate("/admin/contractor-job");
    };
    postData(fd, callback, slug);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (

    <ContentWrapper title='Edit Job'>
      <section className="main-content">
        <div className='row'>
          <div className="col-sm-12">
            {
              !window._.isEmpty(data) &&
              <Form
                name="update-job"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                labelCol={{
                  span: 24,
                }}
                wrapperCol={{
                  span: 24,
                }}
                style={{

                  backgroundColor: "#fff",
                  margin: "30px",
                  marginTop: "50px"
                }}
                autoComplete="off"
              >
                <div className='row'>
                  <div className='col-12 col-md-6'>
                    <BaseInput defaultValue={Number(data?.job_status.id)} label="Status" name="job_status" type="select" options={activityOptions} />
                  </div>
                </div>
                <BaseInput loading={loading} title={loading ? "Updating..." : "Update"} className="btn-theme2 btn-dark" type="submit" htmlType="submit" />
              </Form>
            }
          </div>
        </div>
      </section>
    </ContentWrapper>


  )
}

export default React.memo(EditJob);