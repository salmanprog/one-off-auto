import React,{useRef, useState, useEffect} from 'react'
import ContentWrapper from '../../../components/shared/Layout/index';
import Table from "../../../components/shared/tablecondition";
import { useFetch } from "../../../hooks/request";
import { Button, Input, Space, } from "antd";
import { useNavigate } from 'react-router';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';


const ApplicationJob = () => {
   
  let navigate = useNavigate();
  let user = window.helpers.getStorageData('session');
  const {  data } = useFetch("get_job","mount","?created_by_id="+user.parent_id+"&target_id="+user.id);
  // Search
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(data); // This will hold the filtered data

  // Update filtered data whenever data or searchText changes
  useEffect(() => {
    if (searchText === '') {
      setFilteredData(data); // If searchText is empty, show all data
    } else {
      const filtered = data.filter(item =>
        item.title.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredData(filtered); // Apply filter on name field
    }
  }, [searchText, data]);

  // Search input handler
  const handleSearch = (e) => {
    setSearchText(e.target.value); // Update searchText state
  };
  const column = [
    {
      title: 'Service',
      dataIndex: 'title',
      key: 'title',
      render: (text) => (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ),
    },
    {
      title: 'Created By',
      dataIndex: 'created_name',
      key: 'created_name',
    },
    {
      title: 'Email',
      dataIndex: 'created_email',
      key: 'created_email',
    },
    {
      title: 'Schedule Date',
      dataIndex: 'schedule_day',
      key: 'schedule_day',
    },
    {
      title: 'Schedule Time',
      dataIndex: 'schedule_time',
      key: 'schedule_time',
    },
    {
      title: 'Feedback Status',
      dataIndex: 'feedback_status',
      key: 'feedback_status',
    },
    {
      title: 'Status',
      dataIndex: 'status_text',
      key: 'status_text',
    },
  ];
  const redirect_page = () => {
    return navigate("/admin/customer-job/add");
  }
  return (
    
    <ContentWrapper title='All Jobs'>
      <section className="main-content" style={{padding: '30px'}}>
        <div className='row'>
          <div className="col-sm-12">
                    {/* <Button type="primary" onClick={redirect_page} style={{marginBottom:'10px',float:'right'}} htmlType="submit">Add New</Button> */}
                    <div className="col-sm-12">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                      <h2>All Jobs</h2>
                                      <Input
                                        placeholder="Search by Service"
                                        style={{ width: 250 }}
                                        value={searchText}
                                        onChange={handleSearch}
                                        onPressEnter={handleSearch}
                                        prefix={<SearchOutlined />}
                                      />
                                    </div>
                      </div>
                  </div>
          <div className="col-sm-12">
            <Table columns={column} data={filteredData} actions={['view','delete']} delete_opt='delete_job' user={user}/>
        
          </div>
        </div>
      </section>
      </ContentWrapper>

  )
}

export default React.memo(ApplicationJob);