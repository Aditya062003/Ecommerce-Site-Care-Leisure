import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

const Login = () => {
  const Router = useRouter();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const handleChange = (e) => {
    if (e.target.name == "email") {
      setemail(e.target.value);
    } else if (e.target.name == "password") {
      setpassword(e.target.value);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email, password };
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/adminlogin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let response = await res.json();

    setemail("");
    setpassword("");
    if (response.success) {
      localStorage.setItem(
        "adminuser",
        JSON.stringify({
          admintoken: response.admintoken,
          email: response.email,
        })
      );

      toast.success("Admin successfully logged in!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        Router.push(`${process.env.NEXT_PUBLIC_HOST}/admin`);
      }, 2000);
    } else {
      toast.error(response.error, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  return (
    <section className="h-screen m-auto">
      <style jsx global>{`
        footer {
          display: none;
        }
        navbar{
          display:none;
      `}</style>
      <Head>
        <title>Care-Leisure.com-Wear the style</title>
        <meta name="description" content="StylesWear" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer />
      <div className="container h-full px-6 py-24 m-auto mb-6">
        <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between m-auto">
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="w-full"
              alt="Phone image"
            />
          </div>
          <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
            <form onSubmit={handleSubmit} method="POST">
              <div class="container flex">
                <div class="lg:w-3/4 bg-white rounded-lg p-8 flex flex-col mx-auto w-full mt-10 md:mt-0 shadow-xl">
                  <h1 class="text-gray-900 mb-3 text-2xl text-center font-bold title-font">
                    Please login to your Account
                  </h1>
                  <div class="relative mb-4">
                    <label for="email" class="leading-7 text-sm text-gray-600">
                      Email
                    </label>
                    <input
                      onChange={handleChange}
                      value={email}
                      type="email"
                      id="email"
                      name="email"
                      class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                  <div class="relative mb-4">
                    <label
                      for="password"
                      class="leading-7 text-sm text-gray-600"
                    >
                      Password
                    </label>
                    <input
                      onChange={handleChange}
                      value={password}
                      type="password"
                      id="password"
                      name="password"
                      class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>

                  <button class="text-white bg-indigo-500 w-[40%] m-auto py-2 px-3 mt-2 focus:outline-none hover:bg-indigo-600 rounded-lg text-lg">
                    Signin
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
