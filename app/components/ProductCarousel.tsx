import React, { useEffect, useState } from 'react';
import { Carousel, Card, Button, Typography } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import Image from 'next/image';
import styles from './ProductCarousel.module.css';

const { Text } = Typography;

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface ProductCarouselProps {
  onAddToCart: (product: Product) => void;
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ onAddToCart }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 50000, // Increased to make it much slower
    autoplaySpeed: 0,
    cssEase: "linear",
    rtl: true, // This makes the carousel move from right to left
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <div className={styles.carouselContainer}>
      <Carousel {...settings}>
        {products.map((product) => (
          <div key={product.id} className={styles.carouselItem}>
            <Card
              hoverable
              style={{ width: 240, margin: '0 10px' }}
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
                  onClick={() => onAddToCart(product)}
                >
                  Add to Cart
                </Button>
              ]}
            >
              <Card.Meta
                title={<Text ellipsis>{product.title}</Text>}
                description={<Text strong>${product.price.toFixed(2)}</Text>}
              />
            </Card>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ProductCarousel;
