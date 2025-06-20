
export function getRecipeImageUrl(recipeName) {
  const encodedName = encodeURIComponent(recipeName || 'food');
  return `https://loremflickr.com/600/400/${encodedName}`;
}
