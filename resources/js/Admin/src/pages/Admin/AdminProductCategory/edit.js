import React, { useEffect, useState } from 'react'
import ContentWrapper from '../../../components/shared/Layout/index';
import BaseInput from "../../../components/shared/Input/index";
import { register } from "../../../config/form_validation_rules";
import { useFetch } from "../../../hooks/request";
import { Form, Input, Button } from 'antd';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import UploadProfile from "../../../components/shared/Input/imgUpload";

const activityOptions = [
  { label: 'Active', value: 1 },
  { label: 'De-active', value: 0 },
]

const EditProductCategory = () => {

  let { slug } = useParams();
  const { data } = useFetch("get_product_category", "mount", slug);
  const { loading, postData } = useFetch("update_product_category", "submit");
  const [imageUrl, setImageUrl] = useState(data?.image_url);
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
    if (file && file instanceof File) {
      fd.append("image_url", file);  // Ensure 'file' is a valid file object
    }
    const callback = (receivedData) => {
      return navigate("/admin/product-category/edit/" + slug);
    };
    postData(fd, callback, slug);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (

    <ContentWrapper title='Edit Category'>
      <section className="main-content">
        <div className='row'>
          <div className="col-sm-12">
            {
              !window._.isEmpty(data) &&
              <Form
                name="update-category"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                initialValues={{
                  title: data?.title,
                  description: data?.description,
                  image_url: data?.image_url,
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
                <div className='col-12 col-md-6'>
                  <BaseInput label="Category Title" name="title" type="text" rules={register.title} />
                </div>
                </div>
                <div className='row'>
                  <div className='col-12'>
                    <BaseInput label="Category Description" name="description" type="text-area" rules={register.description} />
                  </div>
                </div>
                <div className='row'>
                  <div className='col-12 col-md-6'>
                    <BaseInput  label="Status" name="status" type="select" options={activityOptions} />
                  </div>
                </div>
                <UploadProfile
                  callback={fileUploadCallback}
                  static_img={data?.image_url}
                />
                
                <BaseInput loading={loading} title={loading ? "Updating..." : "Update Category"} className="btn-theme2 btn-dark" type="submit" htmlType="submit" />
              </Form>
            }
          </div>
        </div>
      </section>
    </ContentWrapper>


  )
}

export default React.memo(EditProductCategory);