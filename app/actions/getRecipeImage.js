import {createClient} from "pexels";
const client=createClient(process.env.NEXT_PUBLIC_PEXELS_API_KEY);
export async function getRecipeImageUrl(recipeName){
  try{
    const result=await client.photos.search({
      query:recipeName || "food",
      per_page:1,
      page:1,
      size:"large",
      orientation:"landscape"
    });
    if(result.photos && result.photos.length>0){
      return result.photos[0].src.medium;
    }
    else{
      return `https://source.unsplash.com/600x400/?${encodeURIComponent(
        recipeName || "food"
      )}`;
    }
  } catch(error){
    console.error("Error fetching image",error);
    return None;
  }
}