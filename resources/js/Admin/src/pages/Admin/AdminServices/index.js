import React,{useRef, useState, useEffect} from 'react'
import ContentWrapper from '../../../components/shared/Layout/index';
import Table from "../../../components/shared/table";
import { useFetch } from "../../../hooks/request";
import { Button, Input, Space, } from "antd";
import { useNavigate } from 'react-router';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';


const ApplicationServices = () => {
   
  let navigate = useNavigate();
  let user = window.helpers.getStorageData('session');
  const {  data } = useFetch("get_service");
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
      setFilteredData(filtered); // Apply filter on title field
    }
  }, [searchText, data]);

  // Search input handler
  const handleSearch = (e) => {
    setSearchText(e.target.value); // Update searchText state
  };
  const column = [
    {
      title: 'Title',
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
      title: 'Price',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Status',
      dataIndex: 'status_text',
      key: 'status_text',
    },
  ];
  const redirect_page = () => {
    return navigate("/admin/services/add");
  }
  return (
    
    <ContentWrapper title='All Services'>
      <section className="main-content" style={{padding: '30px'}}>
        <div className='row'>
          <div className="col-sm-12">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <h2>All Services</h2>
                          <Input
                            placeholder="Search by Title"
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
            <Table columns={column} data={filteredData} actions={['edit','delete']} delete_opt='delete_service'/>
        
          </div>
        </div>
      </section>
      </ContentWrapper>

  )
}

export default React.memo(ApplicationServices);