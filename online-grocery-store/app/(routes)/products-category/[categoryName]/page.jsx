import GlobalApi from '@/app/_utils/GlobalApi'
import React from 'react'
import TopCategoryList from '../_components/TopCategoryList';
import AllProducts from '@/app/_components/AllProducts';


async function ProductCateogry({params}) {
 const allProducts=await GlobalApi.getProductByCategory(params.categoryName);
 const categoryList=await GlobalApi.getCategoryList();
    return (
    <div>
        <h2 className='p-4 bg-primary text-white font-bold text-3xl text-center'>{params.categoryName}</h2>
        <TopCategoryList categoryList={categoryList}
            selectedCategory={params.categoryName}
        />
        <div className='p-5 md:p-10'>
            <AllProducts allProducts={allProducts}/>
        </div>
        
    </div>
  )
}

export default ProductCateogry