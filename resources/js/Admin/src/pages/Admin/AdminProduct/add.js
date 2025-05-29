import React, { useEffect, useState } from 'react'
import ContentWrapper from '../../../components/shared/Layout/index';
import { useFetch } from "../../../hooks/request";
import { useNavigate } from 'react-router';
import { Form, Input, Button } from 'antd';
import BaseInput from "../../../components/shared/Input/index";
import { register } from "../../../config/form_validation_rules";
import UploadProfile from "../../../components/shared/Input/imgUpload";

const AddJProduct = () => {

  let user = window.helpers.getStorageData('session');
  const { data } = useFetch("get_product_category", "mount", '?limit=5000');
  const { loading, postData } = useFetch("create_product", "submit");
  const [imageUrl, setImageUrl] = useState();
    const [file, setFile] = useState(user?.image_url);
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
      return navigate("/admin/product");
    };
    postData(fd, callback);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  let category = [];
  if (!window._.isEmpty(data)) {
    data.forEach((value, key) =>
      category.push({ label: value.title, value: value.id })
    );
  }
  return (

    <ContentWrapper title='Application Product'>
      <section className="main-content">
        <div className='row'>
          <div className="col-sm-12">
            <Form
              name="create-product"
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
              initialValues={{ product_cate_id: 1 }}
            >
              <div className='row'>
                <div className='col-12 col-md-6'>
                  <BaseInput label="Category" name="product_cate_id" type="select" options={category} />
                </div>
                <div className='col-12 col-md-6'>
                  <BaseInput label="Product Title" name="title" type="text" rules={register.title} />
                </div>
              </div>
              <div className='row'>
                <div className='col-12 col-md-6'>
                  <BaseInput label="Product Quantity" name="quantity" type="text" rules={register.quantity} />
                </div>
                <div className='col-12 col-md-6'>
                  <BaseInput label="Product Price" name="amount" type="text" rules={register.only_number} />
                </div>
              </div>
              <div className='row'>
                <div className='col-12'>
                  <BaseInput label="Product Description" name="description" type="text-area" rules={register.description} />
                </div>
              </div>
              <UploadProfile
                callback={fileUploadCallback}
                static_img={imageUrl}
              />
              <BaseInput loading={loading} title={loading ? "Creating..." : "Create Product"} className="btn-theme2 btn-dark" type="submit" htmlType="submit" />
            </Form>
          </div>
        </div>
      </section>
    </ContentWrapper>

  )
}

export default React.memo(AddJProduct);