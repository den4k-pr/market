import { IProduct } from '@/types/product.interface';
import Meta from '@/ui/Meta';
import AddProductCart from '@/ui/catalog/product-item/AddProductCart';
import Layout from '@/ui/layout/Layout';
import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next';

export const getProductBySlug = async (slug: string) => {
  try {
    const response = await axios.get(`http://localhost:4200/api/products/by-slug/${slug}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

interface ProductPageProps {
  product: IProduct;
}

const ProductPage: NextPage<ProductPageProps> = ({ product }) => {
  return (
    <>
      <Meta title='product'>
        <Layout>
          <section>
            <div className="container">
              <div className="productPage">
                <img className='productPage-img' src={product.images[0]} alt={product.name} />
                <div className="productPage__info">
                  <h3 className="productPage__info-name">{product.name}</h3>
                  <div className="productPage__info-box">
                    <h3 className='productPage__info-box_title'>Price</h3>
                    <div className="text">${product.price}</div>
                  </div>
                  <div className="productPage__info-box">
                    <h3 className='productPage__info-box_title'>Description</h3>
                    <span className="text">{product.description}</span>
                  </div>
                </div>
              </div>
              <AddProductCart product={product} />
            </div>
          </section>
        </Layout>
      </Meta>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<ProductPageProps> = async ({ params }) => {
  const { slug } = params || {};

  const product = await getProductBySlug(slug as string);

  return {
    props: {
      product,
    },
  };
};

export default ProductPage;
