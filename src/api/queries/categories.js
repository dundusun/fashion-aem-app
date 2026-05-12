export const CATEGORIES_QUERY = `
  query AllCategories {
    categoryList {
      items {
        title
        slug
        description
        image {
          ... on ImageRef { _path mimeType }
        }
      }
    }
  }
`;