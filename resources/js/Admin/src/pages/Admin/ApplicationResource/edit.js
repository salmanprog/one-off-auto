import React, { useEffect, useState } from 'react'
import ContentWrapper from '../../../components/shared/Layout/index';
import { useFetch } from "../../../hooks/request";
import { useNavigate } from 'react-router';
import { Form, Input, Button, TreeSelect } from 'antd';
import BaseInput from "../../../components/shared/Input/index";
import { register } from "../../../config/form_validation_rules";
import HttpRequest from "../../../repositories";
import { useParams } from 'react-router-dom';

const EditResource = () => {
  let { slug } = useParams();
  const { data } = useFetch("get_application_resource", "mount", slug);
  const { data: categories } = useFetch("get_application_category", "mount", '?limit=5000&except_slug=' + slug);
  const { loading, postData } = useFetch("update_application_resource", "submit");
  let navigate = useNavigate();
  const [value, setValue] = useState();
  const fd = new FormData();
  const onFinish = (values) => {
    for (const key in values) {
      fd.append(key, values[key]);
    }
    if (value) {
      fd.append('category_id', value)
    }
    const callback = (receivedData) => {
      return navigate("/admin/application-resource/edit/" + slug);
    };
    postData(fd, callback, slug);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  console.log(data)
  const [treeData, setTreeData] = useState([
    {
      id: 1,
      pId: 0,
      value: '1',
      title: 'Expand to load',
    },
    {
      id: 2,
      pId: 0,
      value: '2',
      title: 'Expand to load',
    },
    {
      id: 3,
      pId: 0,
      value: '3',
      title: 'Tree Node',
      isLeaf: true,
    },
  ]);
  const genTreeNode = async (parentId, isLeaf = false) => {
    let { data: response } = await HttpRequest.makeRequest('get', window.constants.api_base_url + 'admin/application-category?parent_id=' + parentId, '')
    return response.data.length ? response.data.map(i => getFormattedTreeItem(i)) : [];
  };
  const onLoadData = async ({ id }) => {
    if (treeData.filter(i => i.pId === id).length === 0) {
      genTreeNode(id, false).then(res => {
        setTreeData(treeData.concat(res))
      });
    }
  }
  const onChange = (newValue) => {
    setValue(newValue);
  };

  function getFormattedTreeItem(item) {
    return {
      id: item.id,
      pId: item.parent_id,
      value: item.id,
      title: item.title,
      isLeaf: (item.is_subcategory == 0) ? true : false,
    }
  }

  useEffect(() => {
    if (categories && categories.length) {
      setTreeData(categories.map(i => getFormattedTreeItem(i)))
    }
  }, [categories])

  const cat_type = [
    {
      value: 'personality_profile',
      label: 'Personality Profile',
    },
    {
      value: 'details_log',
      label: 'Detailed Log',
    },
    {
      value: 'quiz',
      label: 'Quiz',
    }
  ]

  const cat_status = [
    {
      value: '0',
      label: 'Deactive',
    },
    {
      value: '1',
      label: 'Active',
    }
  ]


  return (
    <ContentWrapper title='Application Resource'>
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
                  title: data.title,
                  description: data.description
                }}
                labelCol={{
                  span: 24,
                }}
                wrapperCol={{
                  span: 24,
                }}
                style={{

                  backgroundColor: "#fff",
                  padding: "30px",
                  marginTop: "50px"
                }}
                autoComplete="off"
              >
                <div className='row'>
                  <div className='col-12 col-md-6'>
                    <BaseInput label="Title" name="title" type="text" rules={register.name} />
                  </div>
                </div>
                <div className='row'>
                  <div className='col-12 col-md-12'>
                    {
                      treeData.length && data ?
                        <TreeSelect
                          treeDataSimpleMode
                          style={{
                            width: '100%',
                          }}
                          value={value}
                          dropdownStyle={{
                            maxHeight: 400,
                            overflow: 'auto',
                          }}
                          placeholder="Please select"
                          onChange={onChange}
                          loadData={onLoadData}
                          defaultValue={data.category_id}
                          treeDefaultExpandedKeys={[treeData.find(i => i.id == data.category_id)?.pId]}
                          treeData={treeData}
                        />
                        :
                        <></>
                    }
                  </div>
                </div>
                <div className='row'>
                <div className='col-12 col-md-12'>
                  <BaseInput label="Description" name="description" type="text-area" />
                </div>
              </div>
              <div className='row'>
                  <div className='col-12 col-md-6'>
                    <BaseInput label="Status" name="status" type="select" defaultValue={data.status} options={cat_status} />
                  </div>
                </div>
                <BaseInput loading={loading} title={loading ? "Updating..." : "Update"} className="btn-theme2 btn-dark" type="submit" htmlType="submit" />
              </Form>
            }
          </div>
        </div>
      </section>
    </ContentWrapper>

  )
}

export default React.memo(EditResource);