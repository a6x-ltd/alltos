// utils/images.ts
export const getImageUrl = (imagePath: string): string => {
  if (!imagePath) return '/images/placeholder.png';
  
  // If it's already an absolute URL (starts with http:// or https://)
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // If it starts with '/', it's already relative to the root
  if (imagePath.startsWith('/')) {
    return imagePath;
  }
  
  // Otherwise, prepend '/' to make it relative to the root
  return `/${imagePath}`;
};