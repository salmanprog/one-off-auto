import React,{useRef, useState} from 'react'
import ContentWrapper from '../../../components/shared/Layout/index';
import Table from "../../../components/shared/tablecondition";
import { useFetch } from "../../../hooks/request";
import { Button, Input, Space, } from "antd";
import { useNavigate } from 'react-router';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';


const ApplicationCrewJob = () => {
   
  let navigate = useNavigate();
  let user = window.helpers.getStorageData('session');
  const {  data } = useFetch("get_crew_job");
  // Search
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    console.log("")
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
  const column = [
    {
      title: 'Service',
      dataIndex: 'title',
      key: 'title',
      ...getColumnSearchProps('title'),
    },
    {
      title: 'Created By',
      dataIndex: 'created_name',
      key: 'created_name',
      ...getColumnSearchProps('created_name'),
    },
    {
      title: 'Email',
      dataIndex: 'created_email',
      key: 'created_email',
      ...getColumnSearchProps('created_email'),
    },
    {
      title: 'Schedule Date',
      dataIndex: 'schedule_day',
      key: 'schedule_day',
      ...getColumnSearchProps('schedule_day'),
    },
    {
      title: 'Schedule Time',
      dataIndex: 'schedule_time',
      key: 'schedule_time',
      ...getColumnSearchProps('schedule_time'),
    },
    {
      title: 'Status',
      dataIndex: 'status_text',
      key: 'status_text',
    },
  ];
  return (
    
    <ContentWrapper title='All Jobs'>
      <section className="main-content" style={{
                padding: '30px',
                marginTop: '50px'
            }}>
        <div className='row'>
       
          <div className="col-sm-12">
            
            <Table columns={column} data={data} actions={['view','start','complete']} delete_opt='' user={user} />
        
          </div>
        </div>
      </section>
      </ContentWrapper>

  )
}

export default React.memo(ApplicationCrewJob);