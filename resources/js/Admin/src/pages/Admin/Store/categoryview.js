import React, { useState } from 'react';
import ContentWrapper from '../../../components/shared/Layout/index';
import { useFetch } from "../../../hooks/request";
import { Avatar, Spin, Button, Row, Col, Card, Typography, Modal, Input } from "antd";
import { useNavigate } from 'react-router';
import HttpRequest from "../../../repositories";

const { Title, Text } = Typography;

const ApplicationProductCategory = () => {
  let navigate = useNavigate();
  let user = window.helpers.getStorageData('session');

  // Create a state to track loading for each product
  const [loadingStates, setLoadingStates] = useState({});
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  // Fetch the product data using the custom hook
  const { data, isLoading } = useFetch("get_product_category");

  // Check if data is available and filter it
  const filteredData = Array.isArray(data) ? data.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  if (isLoading) {
    // Show spinner if data is still loading
    return (
      <div className="min-vw-100 min-vh-100 d-flex align-items-center justify-content-center">
        <Spin size="large" />
      </div>
    );
  }

  if (!Array.isArray(data) || data.length === 0) {
    // Handle empty or null data scenario
    return (
      <ContentWrapper title="All Products Category">
        <section className="main-content" style={{ padding: '30px', marginTop: '10px' }}>
          <Title level={2}>No Categories Available</Title>
        </section>
      </ContentWrapper>
    );
  }

  return (
    <ContentWrapper title="All Products Category">
      <section className="main-content" style={{ padding: '30px', marginTop: '10px' }}>
        {/* Heading and Search Box */}
        <Row justify="space-between" style={{ marginBottom: '20px' }}>
          <Col>
            <Title level={2}>All Products Category</Title>
          </Col>
          <Col>
            <Input.Search
              placeholder="Search by title"
              onSearch={value => setSearchQuery(value)}
              enterButton
              style={{ width: 300 }}
            />
          </Col>
        </Row>

        {/* Category List */}
        <Row gutter={[16, 16]} justify="start">
          {filteredData.map((value, key) => (
            <Col xs={24} sm={12} md={8} lg={6} key={key} className="category-col">
              <Card
                hoverable
                cover={<img alt={value.title} src={value.image_url} />}
                className="category-card"
              >
                <Title level={4}>{value.title}</Title>
                
                {/* Limit Description to 100 characters */}
                <Text>
                  {value.description.length > 100 ? value.description.slice(0, 100) + "..." : value.description}
                </Text>
                
                <Button type="primary" onClick={() => navigate(`/admin/product-view/${value.id}`)}>View Products</Button>
              </Card>
            </Col>
          ))}
        </Row>
      </section>
    </ContentWrapper>
  );
};

export default React.memo(ApplicationProductCategory);
