import React, { useEffect, useState } from 'react'
import ContentWrapper from '../../../components/shared/Layout/index';
import { useFetch } from "../../../hooks/request";
import { useNavigate } from 'react-router';
import { Form, Input, Button, TreeSelect } from 'antd';
import BaseInput from "../../../components/shared/Input/index";
import { register } from "../../../config/form_validation_rules";
import HttpRequest from "../../../repositories";

const AddCategory = () => {
  const { data } = useFetch("get_application_category", "mount", '?limit=5000');
  const { loading, postData } = useFetch("add_application_category", "submit");
  let navigate = useNavigate();
  const [value, setValue] = useState();
  const onFinish = (values) => {
    const fd = new FormData();
    for (const key in values) {
      fd.append(key, values[key]);
    }
    if (value) {
      fd.append('parent_id', value)
    }
    const callback = (receivedData) => {
      return navigate("/admin/application-category");
    };
    postData(fd, callback);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
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
    if (data && data.length) {
      setTreeData(data.map(i => getFormattedTreeItem(i)))
    }
  }, [data])

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

  return (

    <ContentWrapper title='Application Category'>
      <section className="main-content">
        <div className='row'>
          <div className="col-sm-12">
            <Form
              name="update-user"
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
                  <BaseInput label="Title" name="title" type="text" rules={register.name} />
                </div>
              </div>
              <div className='row'>
                <div className='col-12 col-md-6'>
                  <BaseInput label="Category Type" placeHolder="Category Type" name="category_type" type="select" options={cat_type} />
                </div>
              </div>
              <div className='row'>
                <div className='col-12 col-md-6'>
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
                    treeData={treeData}
                  />
                </div>
              </div>
              <BaseInput loading={loading} title={loading ? "Submitting..." : "Add"} className="btn-theme2 btn-dark" type="submit" htmlType="submit" />
            </Form>
          </div>
        </div>
      </section>
    </ContentWrapper>

  )
}

export default React.memo(AddCategory);