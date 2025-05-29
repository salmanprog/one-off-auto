import React,{useRef, useState, useEffect} from 'react'
import ContentWrapper from '../../../components/shared/Layout/index';
import Table from "../../../components/shared/tablecrew";
import { useFetch } from "../../../hooks/request";
import { Button, Input, Space, } from "antd";
import { useNavigate } from 'react-router';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';


const ApplicationCrew = () => {
   
  let navigate = useNavigate();
  let user = window.helpers.getStorageData('session');
  const {  data } = useFetch("get_users","mount","?created_by="+user.id+"&user_group_id=6");


    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState(data); // This will hold the filtered data
  
    // Update filtered data whenever data or searchText changes
    useEffect(() => {
      if (searchText === '') {
        setFilteredData(data); // If searchText is empty, show all data
      } else {
        const filtered = data.filter(item =>
          item.name.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredData(filtered); // Apply filter on name field
      }
    }, [searchText, data]);
  
    // Search input handler
    const handleSearch = (e) => {
      setSearchText(e.target.value); // Update searchText state
    };

  // Search
  
  const column = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
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
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone Number',
      dataIndex: 'mobile_no',
      key: 'mobile_no',
    },
    {
      title: 'Profile Type',
      dataIndex: 'profile_type',
      key: 'profile_type',
    },
    {
      title: 'Status',
      dataIndex: 'status_text',
      key: 'status_text',
    },
  ];
  const redirect_page = () => {
    return navigate("/admin/crew/add");
  }
  return (
    
    <ContentWrapper title='All Crew'>
      <section className="main-content" style={{padding: '30px'}}>
        <div className='row'>
          <div className="col-sm-12">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                  <h2>All Crew</h2>
                                  <Input
                                    placeholder="Search by Name"
                                    style={{ width: 250 }}
                                    value={searchText}
                                    onChange={handleSearch}
                                    onPressEnter={handleSearch}
                                    prefix={<SearchOutlined />}
                                  />
                                </div>
                  </div>
          <div className="col-sm-12">
          <Button type="primary" onClick={redirect_page} style={{marginBottom:'10px',float:'right'}} htmlType="submit">Add New</Button>
            <Table columns={column} data={filteredData} actions={['edit','view','delete']} delete_opt='delete_users' user={user}/>
        
          </div>
        </div>
      </section>
      </ContentWrapper>

  )
}

export default React.memo(ApplicationCrew);