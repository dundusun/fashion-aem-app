export const BANNERS_QUERY = `
  query AllBanners {
    bannerList {
      items {
        title
        subtitle
        ctaText
        redirectLink
        bannerImage {
          ... on ImageRef { _path mimeType }
        }
      }
    }
  }
`;