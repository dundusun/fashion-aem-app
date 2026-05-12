const AEM_HOST     = import.meta.env.VITE_AEM_HOST;
const AEM_ENDPOINT = import.meta.env.VITE_AEM_GRAPHQL_ENDPOINT;

export async function aemGraphQL(queryName, variables = {}) {
  // Build URL with variables as query params
  const params = new URLSearchParams();
  Object.entries(variables).forEach(([key, val]) => {
    if (val !== null && val !== undefined) {
      params.append(key, val);
    }
  });

  const url = `${AEM_HOST}${AEM_ENDPOINT}/${queryName}${
    params.toString() ? '?' + params.toString() : ''
  }`;

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`AEM API Error: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();

    if (json.errors) {
      throw new Error(json.errors[0].message);
    }

    return json.data;
  } catch (err) {
    console.error(`[AEM GraphQL] ${queryName} failed:`, err.message);
    throw err;
  }
}