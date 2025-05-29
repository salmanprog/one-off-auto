import React, { useEffect, useState } from 'react';
import ContentWrapper from '../../../components/shared/Layout/index';
import { useFetch } from "../../../hooks/request";
import { useNavigate } from 'react-router';
import { Form, Input, Button } from 'antd';
import BaseInput from "../../../components/shared/Input/index";
import { register } from "../../../config/form_validation_rules";

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
];

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
];

const schduleJobOptions = [
  { label: 'Daily', value: 'daily' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' },
  { label: '6-Months', value: '6-months' },
  { label: 'Yearly', value: 'yearly' },
];

const jobTypeOptions = [
  { label: 'Schedule Jobs', value: 'schedule' },
  { label: 'Adhoc Jobs', value: 'urgent' },
];

const AddJob = () => {
  let user = window.helpers.getStorageData('session');
  const { loading, postData } = useFetch("create_job", "submit");
  const { data } = useFetch("get_users", "mount", "?parent_id=" + user.id + "&user_group_id=5");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [serviceOptions, setServiceOptions] = useState([]); // Keep this state for service options
  const fd = new FormData();
  const [form] = Form.useForm(); // Create form instance
  const [jobType, setJobType] = useState('schedule'); // Track selected job type
  let navigate = useNavigate();

  const phoneValidation = {
    pattern: /^\d{3}-\d{3}-\d{4}$/,  // Regex for phone number format XXX-XXX-XXXX
    message: "Please enter a valid phone number in the format XXX-XXX-XXXX",
  };

  const onFinish = (values) => {
    for (const key in values) {
      fd.append(key, values[key]);
    }
    if (values.schedules_day) {
      fd.append('schedule_day', values.schedules_day.format('YYYY-MM-DD'));
    }
    if (values.schedules_end_day) {
      fd.append('schedule_end_day', values.schedules_end_day.format('YYYY-MM-DD'));
    }
    if (values.schedules_time) {
      fd.append('schedule_time', values.schedules_time.format('h:mm a'));
    }
    fd.append('group_id', user.user_group_id);
    fd.append('parent_id', user.parent_id);
    fd.append('send_to_contractor', 1);
    fd.append('send_to_admin', 1);
    fd.append('job_status', 2);
    const callback = (receivedData) => {
      return navigate("/admin/contractor-job");
    };
    postData(fd, callback);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleJobTypeChange = (value) => {
    setJobType(value);
  };

  // Handle customer change event to load services
  const handleCustomerChange = (value) => {
    const customer = data.find(cust => cust.id === value);
    setSelectedCustomer(customer);
    if (customer) {
      // Extract services for the selected customer
      const serviceOptions = customer.services?.map(service => ({
        label: service.service_name, // Use 'service_name' for display
        value: service.service_id            // Use service id for value
      })) || [];
      setServiceOptions(serviceOptions); // Update service options based on the selected customer
    } else {
      // Reset service options to empty if no customer is selected
      setServiceOptions([]);
    }

    // Reset selected service (this ensures that the previous selection is cleared)
    form.setFieldsValue({ service_id: undefined });
  };

  // Map customer data to select options
  let customer = [];
  if (data && !window._.isEmpty(data)) {
    customer = data.map((value) => ({
      label: value.name, // Assuming 'name' is the customer name
      value: value.id    // Assuming 'id' is the unique identifier for the customer
    }));
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
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              style={{
                backgroundColor: "#fff",
                margin: "30px",
                marginTop: "50px"
              }}
              autoComplete="off"
              form={form} // Bind the form instance here
            >
              <div className='row'>
                <div className='col-12 col-md-6'>
                  <BaseInput
                    label="Select Customer"
                    name="target_id"
                    type="select"
                    options={customer}
                    selectHandle={handleCustomerChange} // Handle customer selection change
                    rules={[{ required: true, message: 'Please select a customer!' }]} // Added required rule
                  />
                </div>
                <div className='col-12 col-md-6'>
                  <BaseInput
                    label="Customer Services"
                    name="service_id"
                    type="select"
                    options={serviceOptions} // Render services dynamically based on the selected customer
                    rules={[{ required: true, message: 'Please select a service!' }]} // Optional: Add validation if needed
                  />
                </div>
              </div>
              <div className='row'>
                
                <div className='col-12 col-md-6'>
                  <BaseInput
                    label="Job Type"
                    name="job_type"
                    type="select"
                    selectHandle={handleJobTypeChange} // Handle customer selection change
                    options={jobTypeOptions} // Render services dynamically based on the selected customer
                    rules={[{ required: true, message: 'Please select a Job Type!' }]} // Optional: Add validation if needed
                  />
                </div>
                {jobType === 'schedule' && (
                  <div className='col-12 col-md-6'>
                    <BaseInput
                      label="Job Schdule"
                      name="job_duration"
                      type="select"
                      options={schduleJobOptions}
                      rules={[{ required: true, message: 'Please select a Job Schdule!' }]} // Optional: Add validation if needed
                    />
                  </div>
                )}
              </div>
              {jobType === 'schedule' && (
              <div className='row'>
                <div className='col-12 col-md-4'>
                  <BaseInput
                    label="Schedule Job Start Date"
                    name="schedules_day"
                    type="date"
                    rules={register.selectdate}
                  />
                </div>
                <div className='col-12 col-md-4'>
                  <BaseInput
                    label="Schedule Job End Date"
                    name="schedules_end_day"
                    type="date"
                    rules={register.selectdate}
                  />
                </div>
                <div className='col-12 col-md-4'>
                  <BaseInput
                    label="Schedule Job Time"
                    name="schedules_time"
                    type="time"
                    rules={register.selecttime}
                  />
                </div>
              </div>
              )}
              <div className='row'>
                <div className='col-12'>
                  <BaseInput
                    label="Job Description"
                    name="description"
                    type="text-area"
                    rules={register.description}
                  />
                </div>
              </div>
              <BaseInput
                loading={loading}
                title={loading ? "Request Sending..." : "Create Job Request"}
                className="btn-theme2 btn-dark"
                type="submit"
                htmlType="submit"
              />
            </Form>
          </div>
        </div>
      </section>
    </ContentWrapper>
  );
};

export default React.memo(AddJob);
