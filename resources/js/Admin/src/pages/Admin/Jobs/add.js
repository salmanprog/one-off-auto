import React, { useEffect, useState } from 'react'
import ContentWrapper from '../../../components/shared/Layout/index';
import { useFetch } from "../../../hooks/request";
import { useNavigate } from 'react-router';
import { Form, Input, Button } from 'antd';
import BaseInput from "../../../components/shared/Input/index";
import { register } from "../../../config/form_validation_rules";
import UploadProfile from "../../../components/shared/Input/imgUpload";

const numberOfPersonOptions = [
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: '4', value: 4 },
  { label: '5', value: 5 },
  { label: '6', value: 6 },
  { label: '7', value: 7 },
  { label: '8', value: 8 },
  { label: '9', value: 9 },
  { label: '10', value: 10 },
]

const numberOfJobHourOptions = [
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: '4', value: 4 },
  { label: '5', value: 5 },
  { label: '6', value: 6 },
  { label: '7', value: 7 },
  { label: '8', value: 8 },
  { label: '9', value: 9 },
  { label: '10', value: 10 },
]

const AddJob = () => {

  let user = window.helpers.getStorageData('session');
  const { data } = useFetch("get_service", "mount", '?limit=5000');
  const { loading, postData } = useFetch("create_job", "submit");
  const [imageUrl, setImageUrl] = useState('');
    const [file, setFile] = useState('');
    const fileUploadCallback = (file) => {
      setFile(file);
    };
  let navigate = useNavigate();
  const fd = new FormData();
  const phoneValidation = {
    pattern: /^\d{3}-\d{3}-\d{4}$/,  // Regex for phone number format XXX-XXX-XXXX
    message: "Please enter a valid phone number in the format XXX-XXX-XXXX",
  };
  const onFinish = (values) => {
    for (const key in values) {
      fd.append(key, values[key]);
    }
    if(values.schedules_day){
      fd.append('schedule_day', values.schedules_day.format('YYYY-MM-DD'))
    }
    if(values.schedules_time){
      fd.append('schedule_time', values.schedules_time.format('h:mm a'))
    }
    fd.append('group_id', user.user_group_id)
    fd.append('parent_id', user.parent_id)
    fd.append('send_to_contractor', 1)
    fd.append('send_to_admin', 0)
    fd.append('job_status', 1)
    const callback = (receivedData) => {
      return navigate("/admin/job");
    };
    postData(fd, callback);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  let services = [];
  if (!window._.isEmpty(data)) {
    data.forEach((value, key) =>
        services.push({ label: value.title, value: value.id })
    );
  }
  return (

    <ContentWrapper title='Application Job'>
      <section className="main-content">
        <div className='row'>
          <div className="col-sm-12">
            <Form
              name="create-job"
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
              initialValues={{ service_id: 1 }}
            >
              <div className='row'>
                <div className='col-12 col-md-6'>
                  {/* <BaseInput label="Job Title" name="title" type="text" rules={register.title} /> */}
                  <BaseInput label="Services" name="service_id" type="select" options={services} />
                </div>
                <div className='col-12 col-md-3'>
                  <BaseInput label="Schdule Job Date" name="schedules_day" type="date" rules={register.selectdate} />
                </div>
                <div className='col-12 col-md-3'>
                  <BaseInput label="Schdule Job Time" name="schedules_time" type="time" rules={register.selecttime} />
                </div>
              </div>
              <div className='row'>
                <div className='col-12'>
                  <BaseInput label="Job Description" name="description" type="text-area" rules={register.description} />
                </div>
              </div>
              <div className='row'>
                {/* <div className='col-12 col-md-3'>
                <BaseInput label="Number of Person" name="number_of_person" type="select" options={numberOfPersonOptions} />
                </div>
                <div className='col-12 col-md-3'>
                <BaseInput label="Total Job Hour" name="job_hour" type="select" options={numberOfJobHourOptions} />
                </div> */}
                {/* <div className='col-12 col-md-6'>
                  <BaseInput label="Schdule Job Date" name="schedules_day" type="date" rules={register.selectdate} />
                </div>
                <div className='col-12 col-md-6'>
                  <BaseInput label="Schdule Job Time" name="schedules_time" type="time" rules={register.selecttime} />
                </div> */}
              </div>
              {/* <div className='row'>
                <div className='col-12 col-md-6'>
                  <BaseInput label="Contact Name" name="name" type="text" rules={register.name} />
                </div>
                <div className='col-12 col-md-6'>
                  <BaseInput label="Contact Number" name="monile_no" type="text" rules={[...register.phone, phoneValidation]} />
                </div>
              </div> */}
              <BaseInput loading={loading} title={loading ? "Request Sending..." : "Create Job Request"} className="btn-theme2 btn-dark" type="submit" htmlType="submit" />
            </Form>
          </div>
        </div>
      </section>
    </ContentWrapper>

  )
}

export default React.memo(AddJob);