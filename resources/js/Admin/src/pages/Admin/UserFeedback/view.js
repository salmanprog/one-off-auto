import React, { useEffect, useState } from 'react';
import ContentWrapper from '../../../components/shared/Layout/index';
import { useFetch } from "../../../hooks/request";
import { useNavigate } from 'react-router';
import { Form, Typography, Card } from 'antd'; // Import Card from Ant Design
import BaseInput from "../../../components/shared/Input/index";
import { useParams } from 'react-router-dom';

const { Title, Text } = Typography;

const ViewUserFeedback = () => {
  let { slug } = useParams();
  let user = window.helpers.getStorageData('session');
  const { data } = useFetch("get_user_feedback", "mount", slug);
  let navigate = useNavigate();
  const fd = new FormData();

  // Handle form submission
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

  return (
    <ContentWrapper title='Application Feedback'>
      <section className="main-content">
        <div className='row'>
          <div className="col-sm-12">
            {
              !window._.isEmpty(data) && (
                <Form
                  name="create-feedback"
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  initialValues={{
                    question: data?.question,
                    answer: data?.answer,
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
                      <Title level={3}>Question</Title> {/* Heading for the question */}
                      {/* Box for Question */}
                      <Card
                        bordered={true} 
                        style={{ marginBottom: '20px', padding: '16px', backgroundColor: '#f9f9f9' }}
                      >
                        <Text style={{ fontSize: '16px', color: '#555' }}>{data?.question}</Text>
                      </Card>
                    </div>
                  </div>

                  <div className='row'>
                    <div className='col-12'>
                      <Title level={3}>Feedback</Title> {/* Heading for the answer */}
                      {/* Box for Answer */}
                      <Card
                        bordered={true}
                        style={{ padding: '16px', backgroundColor: '#f9f9f9' }}
                      >
                        <Text style={{ fontSize: '16px', color: '#555' }}>{data?.answer}</Text>
                      </Card>
                    </div>
                  </div>
                </Form>
              )
            }
          </div>
        </div>
      </section>
    </ContentWrapper>
  );
};

export default React.memo(ViewUserFeedback);
