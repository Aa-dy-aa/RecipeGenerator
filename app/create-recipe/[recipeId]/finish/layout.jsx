import FinishScreenClient from './page';

export default async function FinishPageWrapper({ params }) {
  const recipeId = params.recipeId;
  return (
    <FinishScreenClient recipeId={recipeId} /> 
  );
}