export const ALL_PRODUCTS_QUERY = `
  query AllProducts($category: String) {
    productList(
      filter: {
        category: { _expressions: [{ value: $category }] }
      }
    ) {
      items {
        _path
        title
        slug
        price
        oldPrice
        category
        brand
        sizes
        colors
        inStock
        featured
        thumbnailImage {
          ... on ImageRef {
            _path
            mimeType
          }
        }
      }
    }
  }
`;

export const PRODUCT_BY_SLUG_QUERY = `
  query ProductBySlug($slug: String!) {
    productList(
      filter: {
        slug: { _expressions: [{ value: $slug }] }
      }
    ) {
      items {
        _path
        title
        slug
        description { html plaintext }
        price
        oldPrice
        category
        brand
        sizes
        colors
        inStock
        featured
        thumbnailImage {
          ... on ImageRef { _path mimeType }
        }
        galleryImages {
          ... on ImageRef { _path mimeType width height }
        }
      }
    }
  }
`;

export const FEATURED_PRODUCTS_QUERY = `
  query FeaturedProducts {
    productList(
      filter: {
        featured: { _expressions: [{ value: true }] }
      }
    ) {
      items {
        title
        slug
        price
        thumbnailImage {
          ... on ImageRef { _path }
        }
      }
    }
  }
`;