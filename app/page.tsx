'use client';

import React, { useEffect, useState } from 'react';
import { Layout, Typography, Card, Button, Badge, Menu, Row, Col, Space } from 'antd';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import Image from 'next/image';
import Link from 'next/link';
import ProductCarousel from './components/ProductCarousel';

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;
const { Meta } = Card;

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products?limit=8')
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);

  const handleAddToCart = (product: Product) => {
    setCartItems(prevItems => [...prevItems, product]);
  };

  return (
    <Layout>
      <Header style={{ background: '#fff', padding: '0 50px' }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={3} style={{ margin: 0 }}>Tech Byte</Title>
          </Col>
          <Col>
            <Menu mode="horizontal" defaultSelectedKeys={['1']}>
              <Menu.Item key="1">All</Menu.Item>
              <Menu.Item key="2">Shirts</Menu.Item>
              <Menu.Item key="3">Stickers</Menu.Item>
            </Menu>
          </Col>
          <Col>
            <Space size="large">
              <Badge count={cartItems.length}>
                <Button icon={<ShoppingCartOutlined />} />
              </Badge>
              <Button icon={<UserOutlined />} />
            </Space>
          </Col>
        </Row>
      </Header>
      <Content style={{ padding: '0 50px', marginTop: 64 }}>
        <Row gutter={[16, 16]}>
          {products.map((product) => (
            <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
              <Card
                hoverable
                cover={
                  <div style={{ height: 200, position: 'relative' }}>
                    <Image
                      alt={product.title}
                      src={product.image}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                }
                actions={[
                  <Button 
                    key="addToCart" 
                    type="primary" 
                    icon={<ShoppingCartOutlined />}
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </Button>
                ]}
              >
                <Meta 
                  title={<Link href={`/product/${product.id}`}>{product.title}</Link>}
                  description={<Text strong>${product.price.toFixed(2)} USD</Text>}
                />
              </Card>
            </Col>
          ))}
        </Row>
        <Title level={2} style={{ marginTop: 48, marginBottom: 24 }}>Featured Products</Title>
        <ProductCarousel onAddToCart={handleAddToCart} />
      </Content>
      <Footer style={{ textAlign: 'center', background: '#f0f2f5', marginTop: 64 }}>
        <Text>© {new Date().getFullYear()} Acme Store. All rights reserved.</Text>
      </Footer>
    </Layout>
  );
}