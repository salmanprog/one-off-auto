import React, { useEffect, useState } from 'react'
import ContentWrapper from '../../../components/shared/Layout/index';
import { useFetch } from "../../../hooks/request";
import { useNavigate } from 'react-router';
import { Form, Input, Button } from 'antd';
import BaseInput from "../../../components/shared/Input/index";
import { register } from "../../../config/form_validation_rules";
import UploadProfile from "../../../components/shared/Input/imgUpload";


const AddUserFeedback = () => {

  let user = window.helpers.getStorageData('session');
  const { loading, postData } = useFetch("create_user_feedback", "submit");
  const { data } = useFetch("get_feedback_question");
  const [imageUrl, setImageUrl] = useState('');
    const [file, setFile] = useState('');
    const fileUploadCallback = (file) => {
      setFile(file);
    };
  let navigate = useNavigate();
  const fd = new FormData();
  const onFinish = (values) => {
    for (const key in values) {
      fd.append(key, values[key]);
    }
    const callback = (receivedData) => {
      return navigate("/admin/feedback");
    };
    postData(fd, callback);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  let feedback_question = [];
  if (data && !window._.isEmpty(data)) {
    feedback_question = data.map((value) => ({
      label: value.question, // Assuming 'name' is the customer name
      value: value.id    // Assuming 'id' is the unique identifier for the customer
    }));
  }
  return (

    <ContentWrapper title='Application Feedback'>
      <section className="main-content">
        <div className='row'>
          <div className="col-sm-12">
            <Form
              name="create-feedback"
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
                <div className='col-12 col-md-12'>
                <BaseInput
                    label="Select Question"
                    name="question_id"
                    type="select"
                    options={feedback_question}
                    rules={[{ required: true, message: 'Please select a question!' }]} // Added required rule
                  />
                </div>
              </div>
              <div className='row'>
                <div className='col-12'>
                  <BaseInput label="Write Feedback" name="answer" type="text-area" rules={register.description} />
                </div>
              </div>
              <BaseInput loading={loading} title={loading ? "Sending..." : "Send Feedback"} className="btn-theme2 btn-dark" type="submit" htmlType="submit" />
            </Form>
          </div>
        </div>
      </section>
    </ContentWrapper>

  )
}

export default React.memo(AddUserFeedback);