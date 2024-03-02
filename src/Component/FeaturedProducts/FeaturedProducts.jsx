import React, { useContext, useEffect, useState } from "react";
import style from "./FeaturedProducts.module.css";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function FeaturedProducts() {
  const [wishIcon, setWishIcon] = useState([]);

  function getProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  let { data, isLoading } = useQuery("featuredProducts", getProducts, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
  let { addToCart, setCount, getWhishlist, addToWhishlist, removeFromWhishlist } = useContext(CartContext);
  async function postToCart(id) {
    let { data } = await addToCart(id);
    if (data.status == "success") {
      setCount(data.numOfCartItems);

      toast.success(data.message, {
        duration: 2000,
      });
    }
  }

  const handleWishList = async (id) => {
    const isInWishlist = wishIcon.some((item) => item.id === id);

    if (isInWishlist) {
      await removeToWhishlist(id);
      setWishIcon(wishIcon.filter((item) => item.id !== id));
      toast.success("Product removed successfully to your wishlist", {
        duration: 2000,
      });
    } else {
      await postToWhishlist(id);
      setWishIcon([...wishIcon, { id }]);
      toast.success("Product added successfully to your wishlist", {
        duration: 2000,
      });
    }
  };

  async function showWhishlist() {
    let { data } = await getWhishlist();
    if (data.status == "success") {
      setWishIcon(data.data);
    }
  }

  useEffect(() => {
    showWhishlist();
  }, []);

  async function postToWhishlist(id) {
    let { data } = await addToWhishlist(id);
    if (data.status == "success") {
      showWhishlist();
    }
  }
  async function removeToWhishlist(id) {
    let { data } = await removeFromWhishlist(id);
    if (data.status == "success") {
      showWhishlist();
    }
  }

  return (
    <>
      <section className="mt-5">
        <div className="container">
          <h3 className="h4 fw-bold mb-4">Best Selling Products</h3>

          {isLoading ? (
            <div className="container">
              <div className="row align-items-center vh-100">
                <ThreeDots visible={true} height={100} width={100} color="#0aad0a" radius="9" ariaLabel="three-dots-loading" wrapperStyle={{}} wrapperClass="justify-content-center" />
              </div>
            </div>
          ) : (
            <div className="row gy-4">
              {data?.data.data.map((product) => (
                <div className={`col-lg-2 col-md-4 col-sm-6 ${style.screenSm}`} key={product.id}>
                  <div className="product p-2 position-relative">
                    <button onClick={() => handleWishList(product.id)} className={`position-absolute end-0 border-0 bg-transparent`}>
                      <i className={`${wishIcon.map((id) => id.id).includes(product.id) ? "fa-solid" : "fa-regular"} fa-heart text-danger`}></i>
                    </button>
                    <Link to={`/productdetails/${product.id}`}>
                      <img src={product.imageCover} className="w-100" alt={product.title} />
                      <span className={`${style.categoryDesc} fw-bold text-main`}>{product.category.name}</span>
                      <h3 className="h6 fw-bold mt-1">{product.title.split(" ").slice(0, 2).join(" ")}</h3>
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="font-sm text-danger fw-bold">{product.price} EGP</span>
                        <span className="font-sm">
                          {product.ratingsAverage} <i className="fas fa-star rating-color me-1"></i>
                        </span>
                      </div>
                    </Link>
                    <button onClick={() => postToCart(product.id)} className="btn bg-main text-main-light w-100 btn-sm">
                      Add To Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
