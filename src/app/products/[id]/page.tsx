import { Metadata } from 'next';
import { fetchProduct } from '@/lib/api';
import { ProductDetails } from '../../../components/ProductDetails';

interface ProductPageProps { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await fetchProduct(id);
  return {
    title: product.seoMetadata?.title || product.name,
    description: product.seoMetadata?.description || product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await fetchProduct(id);
  return <ProductDetails product={product} />;
}