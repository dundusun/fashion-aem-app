import { useQuery } from '@tanstack/react-query';
import { MOCK_PRODUCTS } from '../api/mockData';

const USE_MOCK = true;

export function useProductDetail(slug) {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: () => {
      if (USE_MOCK) {
        const product = MOCK_PRODUCTS.find(p => p.slug === slug) ?? null;
        return Promise.resolve(product);
      }
      return fetch(`${import.meta.env.VITE_AEM_HOST}${import.meta.env.VITE_AEM_GRAPHQL_ENDPOINT}/product-by-slug;slug=${slug}`)
        .then(r => r.json())
        .then(d => d?.data?.productList?.items?.[0] ?? null);
    },
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
}