import React, { useEffect, useState } from 'react'
import ContentWrapper from '../../../components/shared/Layout/index';
import BaseInput from "../../../components/shared/Input/index";
import { register } from "../../../config/form_validation_rules";
import { useFetch } from "../../../hooks/request";
import { Form, Input, Button } from 'antd';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';

const activityOptions = [
  { label: 'Active', value: 1 },
  { label: 'De-active', value: 0 },
]

const EditContractor = () => {

  let { slug } = useParams();
  const { data } = useFetch("get_users", "mount", slug);
  const { loading, postData } = useFetch("update_users", "submit");
  let navigate = useNavigate();
  const fd = new FormData();
  const onFinish = (values) => {
    for (const key in values) {
      fd.append(key, values[key]);
    }
    const callback = (receivedData) => {
      return navigate("/admin/contractor/edit/" + slug);
    };
    postData(fd, callback, slug);
  };

  const phoneValidation = {
    pattern: /^\d{3}-\d{3}-\d{4}$/,  // Regex for phone number format XXX-XXX-XXXX
    message: "Please enter a valid phone number in the format XXX-XXX-XXXX",
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (

    <ContentWrapper title='Edit User'>
      <section className="main-content">
        <div className='row'>
          <div className="col-sm-12">
            {
              !window._.isEmpty(data) &&
              <Form
                name="update-user"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                initialValues={{
                  company_name: data?.company_name,
                  company_email_address: data?.company_email_address,
                  company_mobile_number: data?.company_mobile_number,
                  company_address: data?.company_address,
                  name: data?.name,
                  email: data?.email,
                  mobile_number: data?.mobile_no,
                  dob: data?.dob,
                }}
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
                  <BaseInput label="Company Email" name="company_email_address" type="text" rules={register.email} disabled/>
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
                  <BaseInput label="Contractor Email" name="email" type="text" rules={register.email} disabled/>
                </div>
              </div>
              <div className='row'>
                <div className='col-12 col-md-6'>
                  <BaseInput label="Contractor Phone" name="mobile_number" type="text" rules={[...register.phone, phoneValidation]} disabled/>
                </div>
                <div className='col-12 col-md-6'>
                <BaseInput label="Date Of Birth" name="dob" type="text" rules={register.dob} disabled/>
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

export default React.memo(EditContractor);