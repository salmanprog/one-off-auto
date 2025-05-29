import React, { useEffect, useState } from 'react'
import ContentWrapper from '../../../components/shared/Layout/index';
import { useFetch } from "../../../hooks/request";
import { useNavigate } from 'react-router';
import { Form, Input, Button } from 'antd';
import BaseInput from "../../../components/shared/Input/index";
import { register } from "../../../config/form_validation_rules";
import UploadProfile from "../../../components/shared/Input/imgUpload";


const AddBuildingType = () => {

  let user = window.helpers.getStorageData('session');
  const { loading, postData } = useFetch("create_building_type", "submit");
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
    fd.append('created_by_id', user.id)
    const callback = (receivedData) => {
      return navigate("/admin/building_types");
    };
    postData(fd, callback);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (

    <ContentWrapper title='Application BuildingTypes'>
      <section className="main-content">
        <div className='row'>
          <div className="col-sm-12">
            <Form
              name="create-building"
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
                  <BaseInput label="Title" name="title" type="text" rules={register.title} />
                </div>
              </div>
              <BaseInput loading={loading} title={loading ? "Creating..." : "Create Building Type"} className="btn-theme2 btn-dark" type="submit" htmlType="submit" />
            </Form>
          </div>
        </div>
      </section>
    </ContentWrapper>

  )
}

export default React.memo(AddBuildingType);