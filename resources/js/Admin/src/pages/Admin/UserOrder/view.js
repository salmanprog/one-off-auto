import React, { useState } from "react";
import ContentWrapper from "../../../components/shared/Layout/index";
import { useFetch } from "../../../hooks/request";
import { Spin, Avatar, List, Row, Col, Card, Table } from "antd";
import { useParams } from "react-router";
import "react-h5-audio-player/lib/styles.css";

const ViewJob = () => {
  let { slug } = useParams();
  let user = window.helpers.getStorageData('session');
  const { loading, data } = useFetch("get_orders", "mount", slug);

  // Function to format price with dollar sign
  const formatPrice = (amount) => {
    return `$${amount.toFixed(2)}`;
  };

  if (!window._.isEmpty(data)) {
    return (
      <ContentWrapper title="View Order">
        <section className="main-content" style={{ marginTop: '50px' }}>
          {!window._.isEmpty(data) ? (
            <>
              <Row gutter={16}>
                {/* User Profile Section */}
                <Col md={12}>
                  <Card className="text-center">
                    <Avatar size={140} src={data.created_by.image_url} className="mar-btm" />
                    <p className="lead font-500">{data.created_by.name}</p>
                    <hr />
                    <List
                      className="text-center"
                      grid={{ gutter: 16, column: 3 }}
                      dataSource={[
                        { label: 'Email', value: data.created_by.email },
                        { label: 'Phone', value: data.created_by.mobile_no },
                        { label: 'Status', value: 'Active' },
                      ]}
                      renderItem={(item) => (
                        <List.Item>
                          <p className="font-600">{item.value}</p>
                          <p className="text-muted text-sm">{item.label}</p>
                        </List.Item>
                      )}
                    />
                  </Card>
                </Col>

                {/* Company Details Section */}
                {data.created_by.company_name && (
                  <Col md={12}>
                    <Card title="Branch Details">
                      <p><strong>Branch Name:</strong> {data.created_by.company_name}</p>
                      <p><strong>Branch Email:</strong> {data.created_by.company_email_address}</p>
                      <p><strong>Branch Phone:</strong> {data.created_by.company_mobile_number}</p>
                      <p><strong>Branch Address:</strong> {data.created_by.company_address}</p>
                    </Card>
                  </Col>
                )}
              </Row>

              {/* Product Table */}
              <Table
                style={{ marginTop: '30px' }}
                dataSource={data.products}
                columns={[
                  { title: "ID", dataIndex: "id", key: "id" },
                  { title: "Name", dataIndex: "product_title", key: "name" },
                  { title: "Quantity", dataIndex: "quantity", key: "quantity" },
                  { title: "Price", dataIndex: "amount", key: "price", render: (text) => formatPrice(text) },
                  { title: "Total Price", dataIndex: "total", key: "total", render: (text) => formatPrice(text) },
                ]}
                rowKey="id"
                pagination={false}
                footer={() => (
                  <div style={{ fontWeight: 'bold', float: 'right' }}>
                    <span>Total Price: </span>
                    <span>{formatPrice(data.total_amount)}</span>
                  </div>
                )}
              />
            </>
          ) : (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
              <Spin size="large" />
            </div>
          )}
        </section>
      </ContentWrapper>
    );
  }

  return <div />;
};

export default React.memo(ViewJob);
