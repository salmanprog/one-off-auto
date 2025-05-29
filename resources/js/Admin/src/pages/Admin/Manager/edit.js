import React, { useEffect, useState } from 'react'
import ContentWrapper from '../../../components/shared/Layout/index';
import BaseInput from "../../../components/shared/Input/index";
import { register } from "../../../config/form_validation_rules";
import { useFetch } from "../../../hooks/request";
import { Form, Input, Button, Select } from 'antd';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';

const activityOptions = [
  { label: 'Pending', value: 0 },
  { label: 'Approved', value: 1 },
  { label: 'Rejected', value: 2 },
]

const EditManager = () => {

  let { slug } = useParams();
  const { data } = useFetch("get_users", "mount", slug);
  const {  data:buildingTypes } = useFetch("get_building_type");
  const { loading, postData } = useFetch("update_users", "submit");
  let navigate = useNavigate();
  const fd = new FormData();
  const phoneValidation = {
    pattern: /^\d{3}-\d{3}-\d{4}$/,  // Regex for phone number format XXX-XXX-XXXX
    message: "Please enter a valid phone number in the format XXX-XXX-XXXX",
  };
  const onFinish = (values) => {
    for (const key in values) {
      fd.append(key, values[key]);
      if(key == 'user_status' && values[key] == '1'){
        fd.append('status', '1');
      }else if(key == 'user_status' && values[key] != '1'){
        fd.append('status', '0');
      }
    }
    const callback = (receivedData) => {
      return navigate("/admin/manager/edit/" + slug);
    };
    postData(fd, callback, slug);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  let buildingtypes = [];
  if (buildingTypes && !window._.isEmpty(buildingTypes)) {
    buildingtypes = buildingTypes.map((value) => ({
      label: value.title, // Assuming 'name' is the buildingTypes name
      value: value.id    // Assuming 'id' is the unique identifier for the buildingTypes
    }));
  }
  return (

    <ContentWrapper title='Edit Center'>
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
                  user_status: data?.user_status_number,
                  building_type_id: Number(data?.building_type_id),
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
                  <div className='col-12 col-md-12'>
                  <BaseInput
                      label="Select BuildingTypes"
                      name="building_type_id"
                      type="select"
                      options={buildingtypes}
                      rules={[{ required: true, message: 'Please select a BuildingTypes!' }]} // Added required rule
                    />
                  </div>
                </div>
                <div className='row'>
                  <div className='col-12 col-md-6'>
                    <BaseInput label="Branch Name" name="company_name" type="text" rules={register.name} />
                  </div>
                  <div className='col-12 col-md-6'>
                    <BaseInput label="Branch Email" name="company_email_address" type="text" rules={register.email} disabled/>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-12 col-md-6'>
                    <BaseInput label="Branch Phone" name="company_mobile_number" type="text" rules={[...register.phone, phoneValidation]} disabled/>
                  </div>
                  <div className='col-12 col-md-6'>
                    <BaseInput label="Branch Address" name="company_address" type="text" rules={register.name} />
                  </div>
                </div>
                <div className='row'>
                  <div className='col-12 col-md-6'>
                    <BaseInput label="Manager's Name" name="name" type="text" rules={register.name} />
                  </div>
                  <div className='col-12 col-md-6'>
                    <BaseInput label="Manager's Email" name="email" type="text" rules={register.email} disabled/>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-12 col-md-6'>
                    <BaseInput label="Manager's Contact Number" name="mobile_number" type="text" rules={[...register.phone, phoneValidation]} disabled/>
                  </div>
                  <div className='col-12 col-md-6'>
                    <BaseInput label="Date Of Birth" name="dob" type="text" rules={register.dob} disabled/>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-12 col-md-6'>
                    <Form.Item
                      label="Status"
                      name="user_status"
                      rules={[{ required: true, message: 'Please select the status' }]}
                    >
                      <Select placeholder="Select status" options={activityOptions} />
                    </Form.Item>
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

export default React.memo(EditManager);
