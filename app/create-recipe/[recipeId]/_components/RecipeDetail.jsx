import { HiOutlineChartBar,HiOutlineClock,HiOutlineArchive,HiOutlineClipboardList} from "react-icons/hi";

function RecipeDetail({recipe}) {
  return (
    <div className='border p-6 rounded-xl shadow-sm mt-3'>
        <div className='grid grid-cols-2 md:grid-cols-4'>
            <div className='flex gap-2'>
                <HiOutlineChartBar style={{ color: '#FF7B74' }} className='text-4xl' />
                <div>
                    <h2 className='text-xs text-gray-500'>Category</h2>
                    <h2 className='font-medium text-lg'>{recipe?.recipeOutput?.cuisineCategory}</h2>
                </div>
            </div>
            <div className='flex gap-2'>
                <HiOutlineClock style={{ color: '#FF7B74' }} className='text-4xl' />
                <div>
                    <h2 className='text-xs text-gray-500'>Duration</h2>
                    <h2 className='font-medium text-lg'>{recipe?.duration}</h2>
                </div>
            </div>
            <div className='flex gap-2'>
                <HiOutlineArchive style={{ color: '#FF7B74' }} className='text-4xl' />
                <div>
                    <h2 className='text-xs text-gray-500'>Serves</h2>
                    <h2 className='font-medium text-lg'>{recipe?.recipeOutput?.serves}</h2>
                </div>
            </div>
            <div className='flex gap-2'>
                <HiOutlineClipboardList style={{ color: '#FF7B74' }} className='text-4xl' />
                <div>
                    <h2 className='text-xs text-gray-500'>Calories Per Serving</h2>
                    <h2 className='font-medium text-lg'>{recipe?.recipeOutput?.caloriesPerServing}</h2>
                </div>
            </div>
        </div>
    </div>
  )
}

export default RecipeDetail