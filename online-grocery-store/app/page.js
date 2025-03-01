import { Button } from "@/components/ui/button";
import Image from "next/image";
import Slider from "./_components/Slider";
import GlobalApi from "./_utils/GlobalApi";
import CategoryList from "./_components/CategoryList";
import AllProducts from "./_components/AllProducts";
import Footer from "./_components/Footer";
import ProductItemDetail from "./_components/ProductItemDetail";

export default async function Home() {

  const sliderList=await GlobalApi.getSliders();
  const categoryList=await GlobalApi.getCategoryList();
  const allProducts=await GlobalApi.getAllProducts();
  return (
    <div className="p-5 md:p-10 px-16">
      {/*slider*/}
      <Slider sliderList={sliderList}/>
      {/*CategoryList*/}
      <CategoryList categoryList={categoryList}/>
       {/*AllProducts*/}
      <AllProducts allProducts={allProducts}/>
      {/*banner*/}
      <Image 
        src="/banner.png"
        width={1000}
        height={300}
        alt="banner"
        className="w-full h-[400px] object-contain"
        />
         {/*banner*/}
         <Footer/>
         {/*ProductDetails*/}
        <ProductItemDetail/> 
      </div>
  );
}
