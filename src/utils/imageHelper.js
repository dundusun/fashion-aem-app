const AEM_HOST = import.meta.env.VITE_AEM_HOST;

export function damUrl(path, width = 800) {
  if (!path) return `https://placehold.co/${width}x${Math.round(width * 1.3)}?text=Fashion`;

  // External URL అయితే (Unsplash mock) directly return చేయి
  if (path.startsWith('http')) return path;

  // AEM DAM path అయితే full URL build చేయి
  return `${AEM_HOST}${path}?width=${width}&preferwebp=true`;
}