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

const EditFeedbackQuestion = () => {

  let { slug } = useParams();
  const { data } = useFetch("get_feedback_question", "mount", slug);
  const { loading, postData } = useFetch("update_feedback_question", "submit");
  let navigate = useNavigate();
  const fd = new FormData();
  const onFinish = (values) => {
    for (const key in values) {
      fd.append(key, values[key]);
    }
    const callback = (receivedData) => {
      return navigate("/admin/feedback_question/edit/" + slug);
    };
    postData(fd, callback, slug);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (

    <ContentWrapper title='Edit Question'>
      <section className="main-content">
        <div className='row'>
          <div className="col-sm-12">
            {
              !window._.isEmpty(data) &&
              <Form
                name="update-question"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                initialValues={{
                  question: data?.question,
                  status: Number(data?.status),
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
                  <BaseInput label="Question" name="question" type="text" rules={register.field} />
                </div>
              </div>
                <div className='row'>
                  <div className='col-12 col-md-6'>
                    <BaseInput label="Status" name="status" type="select" options={activityOptions} />
                  </div>
                </div>
                <BaseInput loading={loading} title={loading ? "Updating..." : "Update Question"} className="btn-theme2 btn-dark" type="submit" htmlType="submit" />
              </Form>
            }
          </div>
        </div>
      </section>
    </ContentWrapper>


  )
}

export default React.memo(EditFeedbackQuestion);