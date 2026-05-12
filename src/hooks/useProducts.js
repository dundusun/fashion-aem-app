import { useQuery } from '@tanstack/react-query';
import { MOCK_PRODUCTS } from '../api/mockData';

const USE_MOCK = true; // AEM ready అయిన తర్వాత false చేయి

export function useProducts(category = null) {
  return useQuery({
    queryKey: ['products', category],
    queryFn: () => {
      if (USE_MOCK) {
        const filtered = category
          ? MOCK_PRODUCTS.filter(p => p.category === category)
          : MOCK_PRODUCTS;
        return Promise.resolve(filtered);
      }
      return fetch(`${import.meta.env.VITE_AEM_HOST}${import.meta.env.VITE_AEM_GRAPHQL_ENDPOINT}/all-products`)
        .then(r => r.json())
        .then(d => d?.data?.productList?.items ?? []);
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useFeaturedProducts() {
  return useQuery({
    queryKey: ['products', 'featured'],
    queryFn: () => {
      if (USE_MOCK) {
        return Promise.resolve(MOCK_PRODUCTS.filter(p => p.featured));
      }
      return fetch(`${import.meta.env.VITE_AEM_HOST}${import.meta.env.VITE_AEM_GRAPHQL_ENDPOINT}/featured-products`)
        .then(r => r.json())
        .then(d => d?.data?.productList?.items ?? []);
    },
    staleTime: 5 * 60 * 1000,
  });
}