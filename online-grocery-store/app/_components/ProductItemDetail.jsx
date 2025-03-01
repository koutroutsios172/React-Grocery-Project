"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ShoppingBasket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import GlobalApi from "../_utils/GlobalApi";
import { toast } from "sonner";

function ProductItemDetail({ product }) {
  if (!product || !product.images) {
    return <div>Product data is not available.</div>; // Handle missing product gracefully
  }

  const jwt = sessionStorage.getItem('jwt');
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [productTotalPrice,setProductTotalPrice]=useState(
    product.sellingPrice?
    product.sellingPrice:
    product.mrp
  )
  const router = useRouter();
  const [quanity, setQuantity] = useState(1);

  const addToCart = () => {
    if (!jwt) {
      router.push("/sign-in");
      return;
    }

  

    const data = {
      data: {
        quanity: quanity,
        amount: (quanity * productTotalPrice).toFixed(2),
        product: product.id, 
        users_permissions_user: user?.id ,
      },
    };
    console.log(product);
    console.log(user);
    

    GlobalApi.addToCart(data, jwt).then(
      (resp) => {
        console.log(resp);
        toast("Added to Cart");
      },
      (e) => {
        console.error("Error details:", e);
        toast("Error while adding to cart");
      }
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 p-7 bg-white text-black">
      <Image
        src={
          product.images[0]?.url
            ? process.env.NEXT_PUBLIC_BACKEND_BASE_URL + product.images[0].url
            : "/placeholder-image.png"
        }
        width={500}
        height={200}
        alt={product.name || "Product image"}
        className="bg-slate-200 p-5 h-[320px] w-[300px] object-contain rounded-lg"
      />
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-bold">{product.name}</h2>
        <h2 className="text-sm text-gray-500">{product.description}</h2>
        <div className="flex gap-3 items-center">
          {product.sellingPrice && (
            <h2 className="font-bold text-3xl">${product.sellingPrice}</h2>
          )}
          <h2
            className={`font-bold text-3xl ${
              product.sellingPrice ? "line-through text-gray-500" : ""
            }`}
          >
            ${product.mrp}
          </h2>
        </div>
        <h2 className="font-medium text-lg">
          Quantity ({product.itemQuantityType})
        </h2>
        <div className="flex flex-col items-baseline gap-3">
          <div className="flex gap-3 items-center">
            <div className="p-2 border flex gap-10 items-center px-5">
              <button
                disabled={quanity === 1}
                onClick={() => setQuantity(quanity - 1)}
              >
                -
              </button>
              <h2>{quanity}</h2>
              <button onClick={() => setQuantity(quanity + 1)}>+</button>
            </div>
            <h2 className="text-2xl font-bold">
              = ${(quanity * productTotalPrice).toFixed(2)}
            </h2>
          </div>
          <Button className="flex gap-3" onClick={()=>addToCart()}>
            <ShoppingBasket />
            Add To Cart
          </Button>
          <h2>
            <span className="font-bold">Category:</span>{" "}
            <span>{product.categories?.[0]?.name || "No Category"}</span>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default ProductItemDetail;


