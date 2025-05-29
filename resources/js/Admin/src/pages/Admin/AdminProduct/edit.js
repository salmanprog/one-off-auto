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

const EditJob = () => {

  let { slug } = useParams();
  const { data } = useFetch("get_product", "mount", slug);
  const { data:productcategory } = useFetch("get_product_category", "mount", '?limit=5000');
  const { loading, postData } = useFetch("update_product", "submit");
  const [imageUrl, setImageUrl] = useState(data?.image_url);
      const [file, setFile] = useState(data?.image_url);
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
      return navigate("/admin/product/edit/" + slug);
    };
    postData(fd, callback, slug);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  let category = [];
  if (!window._.isEmpty(productcategory)) {
    productcategory.forEach((value, key) =>
      category.push({ label: value.title, value: value.id })
    );
  }
  return (

    <ContentWrapper title='Edit Product'>
      <section className="main-content">
        <div className='row'>
          <div className="col-sm-12">
            {
              !window._.isEmpty(data) &&
              <Form
                name="update-product"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                initialValues={{
                  title: data?.title,
                  amount: Number(data?.amount),
                  description: data?.description,
                  image_url: data?.image_url,
                  product_cate_id: data?.product_cate_id,
                  quantity: data?.quantity,
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
                static_img={data?.image_url}
              />
                <BaseInput loading={loading} title={loading ? "Updating..." : "Update"} className="btn-theme2 btn-dark" type="submit" htmlType="submit" />
              </Form>
            }
          </div>
        </div>
      </section>
    </ContentWrapper>


  )
}

export default React.memo(EditJob);