// frontend/src/pages/restaurant/Home.js
import React from 'react';
import Navbar from '../../components/common/RestaurantNavbar';

const Home = () => {
  return (
    <div className="font-sans">
      {/* Navigation Bar */}
      <Navbar />

      {/* Hero Section */}
      <div
        className="h-[400px] bg-cover bg-center flex items-center justify-start px-5"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1600891964599-f61ba0e24092")',
        }}
      >
        <div className="max-w-xl">
          <h1 className="text-5xl font-bold text-black mb-5">Order delivery near you</h1>
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Enter delivery address"
              className="p-3 text-base rounded-md border border-gray-300 w-full max-w-md"
            />
            <div className="flex gap-3">
              <button className="px-5 py-2 bg-white border border-gray-300 rounded-full text-base cursor-pointer">
                Deliver now
              </button>
              <button className="px-5 py-2 bg-black text-white border-none rounded-full text-base cursor-pointer">
                Find Food
              </button>
            </div>
          </div>
          <p className="mt-3 text-sm">
            <a href="/login" className="text-black underline">Or sign in</a>
          </p>
        </div>
      </div>

      {/* Cards Section */}
      <div className="flex justify-center gap-5 py-10 px-5">
        <div className="w-[300px] text-left">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
            alt="Feed your employees"
            className="w-full h-[200px] object-cover rounded-lg"
          />
          <h3 className="text-2xl font-bold mt-3 mb-1">Feed your employees</h3>
          <p className="text-base text-black">Create a business account</p>
        </div>
        <div className="w-[300px] text-left">
          <img
            src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
            alt="Your restaurant, delivered"
            className="w-full h-[200px] object-cover rounded-lg"
          />
          <h3 className="text-2xl font-bold mt-3 mb-1">Your restaurant, delivered</h3>
          <p className="text-base text-black">Add your restaurant</p>
        </div>
        <div className="w-[300px] text-left">
          <img
            src="https://images.unsplash.com/photo-1595341888016-a392ef81b7de"
            alt="Deliver with Food Delivery"
            className="w-full h-[200px] object-cover rounded-lg"
          />
          <h3 className="text-2xl font-bold mt-3 mb-1">Deliver with Food Delivery</h3>
          <p className="text-base text-black">Sign up to deliver</p>
        </div>
      </div>
    </div>
  );
};

export default Home;