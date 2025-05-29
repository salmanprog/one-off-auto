import React, { useState } from 'react';
import ContentWrapper from '../../../components/shared/Layout/index';
import { Button, Space, Avatar, Typography, Row, Col, Card, List, Modal, InputNumber, message } from 'antd';
import { useFetch } from "../../../hooks/request";
import { useNavigate } from 'react-router';
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import HttpRequest from "../../../repositories";

const { Title, Text } = Typography;

const ApplicationCart = () => {
  let navigate = useNavigate();
  let user = window.helpers.getStorageData('session');

  // Fetch the cart data
  const { data, loading, error } = useFetch("get_cart");

  // State for modal visibility and selected product details
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [updatedQuantity, setUpdatedQuantity] = useState(1); // Default quantity to 1

  // Handle checkout
  const handleCheckout = async (totalPrice) => {
    const fd = new FormData();
    fd.append('total_amount', totalPrice);
      try {
        // Making the API call to update the job
        const response =  await HttpRequest.makeRequest('POST', window.constants.api_base_url + 'admin/order/', fd)
        //const result = await response.json();
        
        if (response) {
          navigate('/admin/user-orders');  // Redirect after success
          
        } else {
          console.error("Error accepting order:");
        }
      } catch (error) {
        console.error("Error during API call:", error);
      }
  };

  // Handle removing items from cart (this can be customized based on API)
  const handleRemoveItem = async (slug) => {
    const fd = new FormData();
      
      try {
        // Making the API call to update the job
        const response =  await HttpRequest.makeRequest('DELETE', window.constants.api_base_url + 'admin/orderproduct/' + slug, fd)
        //const result = await response.json();
        
        if (response) {
          message.success('Quantity updated successfully');
          navigate(0);  // Redirect after success
          
        } else {
          console.error("Error accepting job:");
        }
      } catch (error) {
        console.error("Error during API call:", error);
      }
    // Call API to remove the item from the cart
  };

  // Handle viewing the item details (open the modal with selected product)
  const handleViewItem = (productId) => {
    const product = data.find(item => item.id === productId);
    setSelectedProduct(product);  // Set the selected product in the state
    setUpdatedQuantity(product.quantity);  // Set the default quantity in the modal
    setIsModalVisible(true);  // Show the modal
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  // Handle quantity change in the modal
  const handleQuantityChange = (value) => {
    setUpdatedQuantity(value); // Update quantity in the modal
  };

  // Handle saving the updated quantity (you can modify this function to call an API)
  const handleSaveQuantity = async () => {
    // Check if the quantity is valid (greater than 0)
    if (updatedQuantity > 0) {
      console.log(`Updated quantity for product ID ${selectedProduct.slug} to ${updatedQuantity}`);
      const fd = new FormData();
      fd.append('product_id', selectedProduct.product_id);
      fd.append('quantity', updatedQuantity);
      fd.append('amount', selectedProduct.amount);

      try {
        // Making the API call to update the job
        const response =  await HttpRequest.makeRequest('PUT', window.constants.api_base_url + 'admin/orderproduct/' + selectedProduct.slug, fd)
        //const result = await response.json();
        
        if (response) {
          message.success('Quantity updated successfully');
          navigate(0);  // Redirect after success
          
        } else {
          console.error("Error accepting job:");
        }
      } catch (error) {
        console.error("Error during API call:", error);
      }

      
      setIsModalVisible(false); // Close the modal after saving the update
    } else {
      message.error('Quantity must be greater than 0');
    }
  };

  // Handle loading and error states
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching cart data.</div>;

  // Check if data is available before rendering
  if (!data) {
    return <div>No items in the cart.</div>;
  }

  // Total price calculation
  const totalPrice = data?.reduce((acc, item) => acc + item.total, 0);

  return (
    <ContentWrapper title="View Cart">
      <section className="main-content" style={{ padding: '0', marginTop: '50px' }}>
        <Row gutter={24} style={{ margin: 0 }}>
          <Col xs={24}>
            <Card title="Your Cart" bordered={false} style={{ width: '100%' }}>
              <Row gutter={16} style={{ marginBottom: '20px', fontWeight: 'bold' }}>
                <Col xs={8} sm={6} md={4}>
                  <Text>Product</Text>
                </Col>
                <Col xs={8} sm={6} md={4}>
                  <Text>Price</Text>
                </Col>
                <Col xs={8} sm={6} md={4}>
                  <Text>Quantity</Text>
                </Col>
                <Col xs={8} sm={6} md={4}>
                  <Text>Total</Text>
                </Col>
                <Col xs={8} sm={6} md={4}>
                  <Text>Actions</Text>
                </Col>
              </Row>
              <List
                dataSource={data}
                renderItem={(item) => (
                  <List.Item key={item.id} style={{ padding: '16px', borderBottom: '1px solid #f0f0f0' }}>
                    <Row gutter={24} align="middle" style={{ width: '100%' }}>
                      <Col xs={8} sm={6} md={4}>
                        <Text>{item.product_title}</Text>
                      </Col>
                      <Col xs={8} sm={6} md={4}>
                        <Text>${item.amount}</Text>
                      </Col>
                      <Col xs={8} sm={6} md={4}>
                        <Text>{item.quantity}</Text>
                      </Col>
                      <Col xs={8} sm={6} md={4}>
                        <Text>${item.total}</Text>
                      </Col>
                      <Col xs={8} sm={6} md={4}>
                        <Space size="middle" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                          <Button
                            type="success"
                            icon={<EyeOutlined />}
                            onClick={() => handleViewItem(item.id)}
                            style={{ backgroundColor: '#7bcb4d', borderColor: '#7bcb4d', color: 'white' }}
                          >
                            View
                          </Button>

                          <Button
                            type="danger"
                            icon={<DeleteOutlined />}
                            onClick={() => handleRemoveItem(item.slug)}
                            style={{ backgroundColor: '#f4516c', borderColor: '#f4516c', color: 'white' }}
                          >
                            Remove
                          </Button>
                        </Space>
                      </Col>
                    </Row>
                  </List.Item>
                )}
              />

              <div style={{ flexGrow: 1 }}></div>
              {!window._.isEmpty(data) && (
              <Button
              type="warning"
              size="large"
              onClick={() => handleCheckout(totalPrice)}  // <-- Wrap in an anonymous function to delay execution
              style={{ backgroundColor: '#F6BB42', borderColor: '#F6BB42', color: 'white', float: 'right' }}
            >
              Proceed to Checkout - ${totalPrice.toFixed(2)}
            </Button>
              )}
            </Card>
          </Col>
        </Row>
      </section>

      {/* Modal for Product Details */}
      <Modal
        title="Product Details"
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
        width={600}
      >
        {selectedProduct && (
          <div>
            <Row gutter={16} style={{ marginBottom: '20px' }}>
              <Col span={6}>
                <Avatar size={100} src={selectedProduct.product.image_url} />
              </Col>
              <Col span={18}>
                <h3>{selectedProduct.product_title}</h3>
                <p><strong>Price:</strong> ${selectedProduct.amount}</p>
                <p><strong>Description:</strong> {selectedProduct.product.description || 'No description available.'}</p>
              </Col>
            </Row>

            {/* Quantity Update Section */}
            <Row gutter={16} style={{ marginBottom: '20px' }}>
              <Col span={12}>
                <Text><strong>Update Quantity:</strong></Text>
              </Col>
              <Col span={12}>
                <InputNumber
                  min={1}
                  value={updatedQuantity}
                  onChange={handleQuantityChange}
                  style={{ width: '100%' }}
                />
              </Col>
            </Row>

            {/* Save Button */}
            <Space style={{ float: 'right' }}>
              <Button
                type="primary"
                onClick={handleSaveQuantity}
                style={{ top:'-14px' }}
              >
                Save Quantity
              </Button>
            </Space>
          </div>
        )}
      </Modal>
    </ContentWrapper>
  );
};

export default React.memo(ApplicationCart);
