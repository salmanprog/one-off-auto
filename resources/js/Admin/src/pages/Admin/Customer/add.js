import React, { useEffect, useState } from 'react';
import ContentWrapper from '../../../components/shared/Layout/index';
import { useFetch } from "../../../hooks/request";
import { useNavigate } from 'react-router';
import { Form, Input, Button, Select, Typography } from 'antd'; // Import Select from Ant Design
import BaseInput from "../../../components/shared/Input/index";
import { register } from "../../../config/form_validation_rules";
import UploadProfile from "../../../components/shared/Input/imgUpload";

const { Option } = Select;

const AddCustomer = () => {

  let user = window.helpers.getStorageData('session');
  const { data } = useFetch("get_service", "mount", '?limit=5000');
  const { loading, postData } = useFetch("create_users", "submit");
  const [imageUrl, setImageUrl] = useState('');
  const [file, setFile] = useState('');
  const [selectedServices, setSelectedServices] = useState([]); // State to store selected services
  const fileUploadCallback = (file) => {
    setFile(file);
  };
  let navigate = useNavigate();
  const fd = new FormData();
  const phoneValidation = {
    pattern: /^\d{3}-\d{3}-\d{4}$/,  // Regex for phone number format XXX-XXX-XXXX
    message: "Please enter a valid phone number in the format XXX-XXX-XXXX",
  };

  // Handle service selection changes
  const handleServiceChange = (value) => {
    // Make sure we handle the value correctly if it's a string with comma-separated services
    if (typeof value === 'string') {
      value = value.split(','); // Convert comma-separated string into array of strings
    }

    // Update state to store unique selected service IDs
    const uniqueServices = [...new Set(value)];
    setSelectedServices(uniqueServices); // Store only unique service IDs
  };

  const onFinish = (values) => {
    // Reset FormData before appending values
    const fd = new FormData();
    
    for (const key in values) {
      fd.append(key, values[key]);
    }
    if(values.dobs){
      fd.append('dob', values.dobs.format('YYYY-MM-DD'))
    }
    // Append only unique services (already ensured by Select multiple)
    fd.append('parent_id', user.id);
    fd.append('user_group_id', 5);

    // Ensure selectedServices is an array of unique service IDs
    const uniqueServices = [...new Set(selectedServices)]; // This ensures no duplicates

    // Append services as an array of IDs
    uniqueServices.forEach(service => fd.append('services_arr[]', service)); // Append as array

    const callback = (receivedData) => {
      return navigate("/admin/customer");
    };
    postData(fd, callback);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // Prepare services for dropdown
  let services = [];
  if (!window._.isEmpty(data)) {
    data.forEach((value, key) =>
      services.push({ label: value.title, value: value.id })
    );
  }

  // Custom validation for services
  const validateServices = (_, value) => {
    if (!value || value.length === 0) {
      return Promise.reject(new Error('Please select at least one service'));
    }
    return Promise.resolve();
  };

  return (
    <ContentWrapper title='Application Customer'>
      <section className="main-content">
        <div className='row'>
          <div className="col-sm-12">
            <Form
              name="update-user"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              style={{
                backgroundColor: "#fff",
                margin: "30px",
                marginTop: "50px"
              }}
              autoComplete="off"
            >
              <div className='row'>
                <div className='col-12 col-md-6'>
                  <BaseInput label="Customer Name" name="name" type="text" rules={register.name} />
                </div>
                <div className='col-12 col-md-6'>
                  <BaseInput label="Customer Email" name="email" type="text" rules={register.email} />
                </div>
              </div>
              <div className='row'>
                <div className='col-12 col-md-6'>
                  <BaseInput label="Customer Phone" name="mobile_number" type="text" rules={[...register.phone, phoneValidation]} />
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

              {/* Services Dropdown */}
              <div className='row'>
                <div className='col-12'>
                  <Typography.Title level={4} style={{ marginBottom: '20px', color: '#333' }}>Available Services</Typography.Title>
                  <Form.Item
                    name="services"
                    rules={[{ validator: validateServices }]} // Custom validation for services
                  >
                    <Select
                      mode="multiple"
                      style={{ width: '100%' }}
                      placeholder="Select services"
                      value={selectedServices}
                      onChange={handleServiceChange} // Update the state when services are selected
                    >
                      {services.map((service) => (
                        <Option key={service.value} value={service.value}>
                          {service.label}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
              </div>

              <BaseInput loading={loading} title={loading ? "Submitting..." : "Add"} className="btn-theme2 btn-dark" type="submit" htmlType="submit" />
            </Form>
          </div>
        </div>
      </section>
    </ContentWrapper>
  );
};

export default React.memo(AddCustomer);
