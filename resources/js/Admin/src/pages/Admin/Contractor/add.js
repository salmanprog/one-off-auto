import React, { useEffect, useState } from 'react'
import ContentWrapper from '../../../components/shared/Layout/index';
import { useFetch } from "../../../hooks/request";
import { useNavigate } from 'react-router';
import { Form, Input, Button } from 'antd';
import BaseInput from "../../../components/shared/Input/index";
import { register } from "../../../config/form_validation_rules";
import UploadProfile from "../../../components/shared/Input/imgUpload";

const AddContractor = () => {

  let user = window.helpers.getStorageData('session');
  const { loading, postData } = useFetch("create_users", "submit");
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
    if(values.dobs){
      fd.append('dob', values.dobs.format('YYYY-MM-DD'))
    }
    fd.append('parent_id', user.id)
    fd.append('user_group_id', 3)
    const callback = (receivedData) => {
      return navigate("/admin/contractor");
    };
    postData(fd, callback);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (

    <ContentWrapper title='Application Contractor'>
      <section className="main-content">
        <div className='row'>
          <div className="col-sm-12">
            <Form
              name="update-user"
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
                  <BaseInput label="Company Name" name="company_name" type="text" rules={register.name} />
                  <input type='hidden' name='parent_id' id='parent_id' value='2'></input>
                  <input type='hidden' name='user_group_id' id='user_group_id' value='3'></input>
                </div>
                <div className='col-12 col-md-6'>
                  <BaseInput label="Company Email" name="company_email_address" type="text" rules={register.email} />
                </div>
              </div>
              <div className='row'>
                <div className='col-12 col-md-6'>
                  <BaseInput label="Company Phone" name="company_mobile_number" type="text" rules={[...register.phone, phoneValidation]} />
                </div>
                <div className='col-12 col-md-6'>
                  <BaseInput label="Company Address" name="company_address" type="text" rules={register.name} />
                </div>
              </div>
              <div className='row'>
                <div className='col-12 col-md-6'>
                  <BaseInput label="Contractor Name" name="name" type="text" rules={register.name} />
                </div>
                <div className='col-12 col-md-6'>
                  <BaseInput label="Contractor Email" name="email" type="text" rules={register.email} />
                </div>
              </div>
              <div className='row'>
                <div className='col-12 col-md-6'>
                  <BaseInput label="Contractor Phone" name="mobile_number" type="text" rules={[...register.phone, phoneValidation]} />
                </div>
                <div className='col-12 col-md-6'>
                <BaseInput label="Date Of Birth" name="dobs" type="date" rules={register.dob} />
                </div>
              </div>
              <div className='row'>
                <div className='col-12 col-md-6'>
                  <BaseInput label="Password" name="password" type="text" rules={register.password} />
                </div>
                <div className='col-12 col-md-6'>
                  <BaseInput label="Confirm Password" name="confirm_password" type="text" />
                </div>
              </div>
              
              <BaseInput loading={loading} title={loading ? "Submitting..." : "Add"} className="btn-theme2 btn-dark" type="submit" htmlType="submit" />
            </Form>
          </div>
        </div>
      </section>
    </ContentWrapper>

  )
}

export default React.memo(AddContractor);