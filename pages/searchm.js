import React from "react";
import Product from "../models/Product";
import connectDb from "../middleware/mongoose";
import mongoose from "mongoose";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

const Searchm = ({ products, query }) => {
  const [search, setsearch] = useState("");
  const handleChange = (e) => {
    if (e.target.name == "search") {
      setsearch(e.target.value);
    }
  };
  return (
    <section className="text-gray-600 min-h-screen body-font">
      <Head>
        <title>Care-Leisure.com-Wear the style</title>
        <meta name="description" content="StylesWear" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div class="container py-12 m-auto ">
      <div className="flex flex-wrap mx-9 items-center justify-center m-auto">
            <form action="">
              <input
                type="text"
                placeholder="Search"
                value={search}
                name="search"
                id="search"
                onChange={handleChange}
                className="border-2 border-gray-200 rounded-full py-2 px-4 w-full sm:w-64 md:w-96 lg:w-128 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />

              <Link legacyBehavior href={"/searchm?squery=" + search}>
                <a>
                  <button className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">
                    Search
                  </button>
                </a>
              </Link>
            </form>
          </div>
        <div class="flex flex-wrap mx-5 justify-center">
          {Object.keys(products).length === 0 && (
            <p>
              Sorry, all hoodies are out of stock. New stock coming soon...Stay
              Tuned!
            </p>
          )}
          {Object.keys(products)
            .filter((item) =>
              products[item].title.toLowerCase().includes(query.toLowerCase())
            )
            .map((item) => {
              return (
                <Link
                  key={item}
                  legacyBehavior
                  href={`/product/${products[item].slug}`}
                >
                  <div class="lg:w-1/5 cursor-pointerfhost m-4 shadow-md hover:shadow-xl md:w-1/2 p-4 w-full">
                    <a class="block relative rounded overflow-hidden">
                      <img
                        alt="ecommerce"
                        class="h-[36vh] m-auto"
                        src={products[item].img}
                      />
                    </a>
                    <div class="mt-4 text-center">
                      <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">
                        <p>{query}</p>
                        T-Shirts
                      </h3>
                      <h2 class="text-gray-900 title-font text-lg font-medium">
                        {products[item].title}
                      </h2>
                      <p class="mt-1">₹{products[item].price}</p>
                      <div class="mt-1">
                        {products[item].size.includes("S") && (
                          <span className="mx-1 py-2 hover:text-white hover:bg-gray-700 px-1 border border-gray-300">
                            S
                          </span>
                        )}
                        {products[item].size.includes("M") && (
                          <span className="mx-1 px-2 py-1 hover:text-white hover:bg-gray-700 border border-gray-300">
                            M
                          </span>
                        )}
                        {products[item].size.includes("L") && (
                          <span className="mx-1 px-2 border py-1 hover:text-white hover:bg-gray-700 border-gray-300">
                            L
                          </span>
                        )}
                        {products[item].size.includes("XL") && (
                          <span className="mx-1 px-2 border py-1 hover:text-white hover:bg-gray-700 border-gray-300">
                            XL
                          </span>
                        )}
                        {products[item].size.includes("XXL") && (
                          <span className="mx-1 px-2 border py-1 hover:text-white hover:bg-gray-700 border-gray-300">
                            XXL
                          </span>
                        )}
                      </div>
                      <div className="mt-1">
                        {products[item].color.includes("Black") && (
                          <button class="border-2 border-gray-300 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none"></button>
                        )}
                        {products[item].color.includes("Blue") && (
                          <button class="border-2 border-gray-300 ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none"></button>
                        )}
                        {products[item].color.includes("Red") && (
                          <button class="border-2 border-gray-300 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none"></button>
                        )}
                        {products[item].color.includes("White") && (
                          <button class="border-2 border-gray-400 ml-1 bg-white  rounded-full w-6 h-6 focus:outline-none"></button>
                        )}
                        {products[item].color.includes("Maroon") && (
                          <button class="border-2 border-gray-400 ml-1 bg-[#800000]  rounded-full w-6 h-6 focus:outline-none"></button>
                        )}
                        {products[item].color.includes("Green") && (
                          <button class="border-2 border-gray-400 ml-1 bg-green-500  rounded-full w-6 h-6 focus:outline-none"></button>
                        )}
                        {products[item].color.includes("Yellow") && (
                          <button class="border-2 border-gray-400 ml-1 bg-yellow-300  rounded-full w-6 h-6 focus:outline-none"></button>
                        )}
                        {products[item].color.includes("Dark Blue") && (
                          <button class="border-2 border-gray-400 ml-1 bg-blue-900  rounded-full w-6 h-6 focus:outline-none"></button>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(
      "mongodb+srv://aditya:aditya@cluster0.ypoa7js.mongodb.net/ecommerceretryWrites=true&w=majority"
    );
  }
  let products = await Product.find({ category: "mugs" });
  let mugs = {};

  for (let item of products) {
    if (item.title in mugs) {
      if (
        !mugs[item.title].color.includes(item.color) &&
        item.availableQty > 0
      ) {
        mugs[item.title].color.push(item.color);
      }
      if (
        !mugs[item.title].size.includes(item.size) &&
        item.availableQty > 0
      ) {
        mugs[item.title].size.push(item.size);
      }
    } else {
      mugs[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        mugs[item.title].color = [item.color];
        mugs[item.title].size = [item.size];
      } else {
        mugs[item.title].color = [];
        mugs[item.title].size = [];
      }
    }
  }
  return {
    props: {
      products: JSON.parse(JSON.stringify(mugs)),
      query: context.query.squery,
    },
  };
}

export default Searchm;
