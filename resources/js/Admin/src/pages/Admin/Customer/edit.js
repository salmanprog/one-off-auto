import React, { useState, useEffect } from 'react';
import ContentWrapper from '../../../components/shared/Layout/index';
import BaseInput from "../../../components/shared/Input/index";
import { register } from "../../../config/form_validation_rules";
import { useFetch } from "../../../hooks/request";
import { Form, Select, Typography } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

const { Option } = Select;

const EditCustomer = () => {
  let { slug } = useParams();
  const { data } = useFetch("get_users", "mount", slug);  // Fetch user data
  const { data: service } = useFetch("get_service", "mount", '?limit=5000');  // Fetch services
  const { loading, postData } = useFetch("update_users", "submit");

  // Initialize selectedServices as empty array
  const [selectedServices, setSelectedServices] = useState([]);
  const [formData, setFormData] = useState(null); // Hold form data

  let navigate = useNavigate();
  const fd = new FormData();
  const phoneValidation = {
    pattern: /^\d{3}-\d{3}-\d{4}$/,  // Regex for phone number format XXX-XXX-XXXX
    message: "Please enter a valid phone number in the format XXX-XXX-XXXX",
  };

  // Handle service selection changes
  const handleServiceChange = (value) => {
    setSelectedServices(value); // Update selected services when user selects/deselects services
  };

  const onFinish = (values) => {
    // Append form values to FormData
    for (const key in values) {
      fd.append(key, values[key]);
    }

    // Append selected services to FormData
    const uniqueServices = [...new Set(selectedServices)];
    uniqueServices.forEach(service => fd.append('services_arr[]', service)); // Append services as array

    const callback = (receivedData) => {
      navigate("/admin/customer/edit/" + slug);
    };
    postData(fd, callback, slug);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // Prepare services for the select dropdown
  let services = [];
  if (service && !window._.isEmpty(service)) {
    services = service.map((value) => ({
      label: value.title,
      value: value.id
    }));
  }

  // Custom validation for services
  const validateServices = (_, value) => {
    if (!value || value.length === 0) {
      return Promise.reject(new Error('Please select at least one service'));
    }
    return Promise.resolve();
  };

  // Set selectedServices and form data once user data is fetched
  useEffect(() => {
    if (data && data.services) {
      setSelectedServices(data.services.map(service => service.service_id));
      setFormData({
        name: data?.name,
        email: data?.email,
        mobile_number: data?.mobile_no,
        dob: data?.dob,
        services: data.services.map(service => service.service_id),
      });
    }
  }, [data]);  // Only update selectedServices and formData when user data changes

  return (
    <ContentWrapper title="Edit User">
      <section className="main-content">
        <div className="row">
          <div className="col-sm-12">
            {
              formData && (
                <Form
                  name="update-user"
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  initialValues={formData} // Use the updated formData
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
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <BaseInput label="Customer Name" name="name" type="text" rules={register.name} />
                    </div>
                    <div className="col-12 col-md-6">
                      <BaseInput label="Customer Email" name="email" type="text" rules={register.email} disabled />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <BaseInput label="Customer Phone" name="mobile_number" type="text" rules={[...register.phone, phoneValidation]} disabled />
                    </div>
                    <div className="col-12 col-md-6">
                      <BaseInput label="Date Of Birth" name="dob" type="text" rules={register.dob} disabled />
                    </div>
                  </div>

                  {/* Services Dropdown */}
                  <div className="row">
                    <div className="col-12">
                      <Typography.Title level={4} style={{ marginBottom: '20px', color: '#333' }}>Available Services</Typography.Title>
                      <Form.Item
                        name="services"
                        rules={[{ validator: validateServices }]} // Custom validation for services
                      >
                        <Select
                          mode="multiple"
                          style={{ width: '100%' }}
                          placeholder="Select services"
                          value={selectedServices} // Use value instead of defaultValue for controlled form
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

                  <BaseInput loading={loading} title={loading ? "Updating..." : "Update"} className="btn-theme2 btn-dark" type="submit" htmlType="submit" />
                </Form>
              )
            }
          </div>
        </div>
      </section>
    </ContentWrapper>
  );
};

export default React.memo(EditCustomer);
