import React,{useEffect, useState} from 'react'
import ContentWrapper from '../../../components/shared/contentWrapper';
import { useFetch } from "../../../hooks/request";
import { useNavigate } from 'react-router';
import { Form, Input, Button } from 'antd';
import BaseInput from "../../../components/shared/Input/index";
import { register } from "../../../config/form_validation_rules";
import { useParams } from 'react-router-dom';

const InviteUser = () => {

  let user = window.helpers.getStorageData('session');
  let { slug } = useParams();
  const {  data } = useFetch("get_invite_crew_by_token", "mount", slug);
    const { loading, postData } = useFetch("update_invite_crew", "submit");
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
      fd.append('user_link', slug)
      const callback = (receivedData) => {
        return navigate("/");
      };
      postData(fd, callback);
    };
    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
    const redirect_page = () => {
      return navigate("/admin/dashboard");
    }
    return (
      <ContentWrapper>
        <section className="main-content s d-flex align-items-center justify-content-center min-vh-100">
          {
            !window._.isEmpty(user) ? (
              <div className='row' style={{ background: "#65636c66", borderRadius: "5px" }}>
                <div className="col-sm-12 text-center">
                  <h3>You need to be log out first </h3>
                  <Button type="primary" onClick={redirect_page} style={{marginBottom:'10px'}} htmlType="submit">Click Here</Button>
                </div>
              </div>
            ) : (
              !window._.isEmpty(data) ? (
                <div className='row' style={{ background: "#65636c66", borderRadius: "5px" }}>
                  <div className="col-sm-12 text-center">
                    <img className='my-4' src='/images/app_logo.png' alt='' height={"150px"} />
                    <h2>Invite Crew</h2>
                  </div>
                  <div className="col-sm-12">
                    <Form
                      name="update-user"
                      onFinish={onFinish}
                      onFinishFailed={onFinishFailed}
                      initialValues={{
                        email: data?.info.email,
                      }}
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      style={{
                        backgroundColor: "#fff",
                        margin: "30px",
                        marginTop: "50px",
                        borderRadius: "5px"
                      }}
                      autoComplete="off"
                    >
                      <div className='row'>
                        <div className='col-12 col-md-6'>
                          <BaseInput label="Crew Name" name="name" type="text" rules={register.name} />
                        </div>
                        <div className='col-12 col-md-6'>
                          <BaseInput label="Crew Email" name="email" type="text" rules={register.email} disabled />
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-12 col-md-6'>
                          <BaseInput label="Crew Phone" name="mobile_number" type="text" rules={[...register.phone, phoneValidation]} />
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
    
                      <BaseInput loading={loading} title={loading ? "Sending..." : "Sign-Up"} className="btn-theme2 btn-dark" type="submit" htmlType="submit" />
                    </Form>
                  </div>
                </div>
              ) : (
                <div className='row' style={{ background: "#65636c66", borderRadius: "5px" }}>
                  <div className="col-sm-12 text-center">
                    <h3>Link has been expired</h3>
                  </div>
                </div>
              )
            )
          }
        </section>
      </ContentWrapper>
    );
    

}

export default React.memo(InviteUser);