import { useQuery } from '@tanstack/react-query';
import { aemGraphQL } from '../api/aemClient';

export function useBanners() {
  return useQuery({
    queryKey: ['banners'],
    queryFn: () =>
      aemGraphQL('all-banners')
        .then(data => data?.bannerList?.items ?? []),
    staleTime: 10 * 60 * 1000,
  });
}