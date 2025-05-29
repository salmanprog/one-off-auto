import React, { useState } from 'react';
import ContentWrapper from '../../../components/shared/Layout/index';
import { useFetch } from "../../../hooks/request";
import { Avatar, Spin, Button, Row, Col, Card, Typography, Modal, Input } from "antd";
import { useNavigate } from 'react-router';
import HttpRequest from "../../../repositories";
import { useParams } from "react-router-dom";

const { Title, Text } = Typography;

const ApplicationProduct = () => {
  let navigate = useNavigate();
  let { id } = useParams();
  let user = window.helpers.getStorageData('session');

  // Create a state to track loading for each product
  const [loadingStates, setLoadingStates] = useState({});

  // State to track modal visibility and the selected product
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Function to open the modal with product details
  const showProductDetails = (product) => {
    setSelectedProduct(product);
    setIsModalVisible(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedProduct(null);
  };

  const addToCart = async (product_id, quantity, amount) => {
    setLoadingStates((prevStates) => ({
      ...prevStates,
      [product_id]: true, // Set the loading state for the clicked product
    }));

    const fd = new FormData();
    fd.append('product_id', product_id);
    fd.append('quantity', quantity);
    fd.append('amount', amount);

    try {
      // Making the API call to add product to cart
      const response = await HttpRequest.makeRequest('POST', window.constants.api_base_url + 'admin/orderproduct', fd);

      if (response) {
        console.log("Product added successfully");
        setLoadingStates((prevStates) => ({
          ...prevStates,
          [product_id]: false, // Set the loading state to false after successful API call
        }));
        navigate(0); // Redirect after success
      } else {
        console.error("Error accepting cart:");
        setLoadingStates((prevStates) => ({
          ...prevStates,
          [product_id]: false, // Set the loading state to false if there was an error
        }));
      }
    } catch (error) {
      console.error("Error during API call:", error);
      setLoadingStates((prevStates) => ({
        ...prevStates,
        [product_id]: false, // Set the loading state to false if there was an error
      }));
    }
  };

  // Fetch the product data using the custom hook
  const { data, loading } = useFetch("get_product", "mount", '?product_cate_id='+id+'&limit=5000');
  
  // State for search query
  const [searchQuery, setSearchQuery] = useState('');

  // Filter products based on search query
  const filteredData = Array.isArray(data) ? data.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  if (loading) {
    // Show spinner while data is being fetched
    return (
      <div className="min-vw-100 min-vh-100 d-flex align-items-center justify-content-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <ContentWrapper title="All Products">
      <section className="main-content" style={{ padding: '30px' }}>

        {/* Heading and Search Box */}
        <Row justify="space-between" align="middle" style={{ marginBottom: '30px' }}>
          <Col>
            <Title level={2}>All Products</Title>
          </Col>
          <Col>
            <Input.Search
              placeholder="Search by product title"
              onSearch={value => setSearchQuery(value)}
              enterButton
              style={{ width: 300 }}
            />
          </Col>
        </Row>

        {/* Product List */}
        {filteredData.length > 0 ? (
          <Row gutter={[24, 24]} justify="start">
            {filteredData.map((value, key) => (
              <Col xs={24} sm={12} md={8} lg={6} key={key} className="product-col">
                <Card
                  hoverable
                  cover={<img alt={value.title} src={value.image_url} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />}
                  className="product-card"
                  bodyStyle={{ padding: '20px' }}
                  style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '10px' }}
                >
                  <Card.Meta
                    title={<Title level={5} className="product-title" style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '10px', cursor: 'pointer' }} onClick={() => showProductDetails(value)}>{value.title}</Title>}
                    description={
                      <>
                        {/* Category Name and Price in different sides */}
                        <Row gutter={16} style={{ marginBottom: '10px' }}>
                          <Col span={12}>
                            <Text style={{ fontSize: '12px', fontWeight: 'bold', color: '#2c3e50' }}>{value.product_cate_title}</Text> {/* Category Name with smaller font size */}
                          </Col>
                          <Col span={12} style={{ textAlign: 'right' }}>
                            <Text strong style={{ fontSize: '14px', color: '#e74c3c' }}>${value.amount}</Text> {/* Price with smaller font size */}
                          </Col>
                        </Row>

                        {/* Truncated Description */}
                        <Text>{value.description && value.description.length > 100 ? value.description.slice(0, 100) + '...' : value.description}</Text>
                      </>
                    }
                  />
                  <Row gutter={16} justify="center" style={{ marginTop: '10px' }}>
                    <Col>
                      <Button
                        type="primary"
                        onClick={() => addToCart(value.id, 1, value.amount)}
                        loading={loadingStates[value.id] || false}
                      >
                        Add to Cart
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        type="default"
                        onClick={() => showProductDetails(value)}
                      >
                        View Details
                      </Button>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <Row justify="center" align="middle">
            <Col>
              <Text style={{ fontSize: '16px', color: '#7f8c8d', textAlign: 'center' }}>
                No products available in this category.
              </Text>
            </Col>
          </Row>
        )}
      </section>

      {/* Modal for Product Details */}
      {selectedProduct && (
        <Modal
          title="Product Details"
          visible={isModalVisible}
          onCancel={closeModal}
          footer={null}
          width={600}
        >
          <Row gutter={16} style={{ marginBottom: '20px' }}>
            <Col span={6}>
              <Avatar size={100} src={selectedProduct.image_url} />
            </Col>
            <Col span={18}>
              <h3>{selectedProduct.title}</h3>
              <p><strong>Price:</strong> ${selectedProduct.amount}</p>
              <p><strong>Category:</strong> {selectedProduct.product_cate_title}</p>
              <p><strong>Description:</strong> {selectedProduct.description || 'No description available.'}</p>
            </Col>
          </Row>
        </Modal>
      )}
    </ContentWrapper>
  );
};

export default React.memo(ApplicationProduct);
