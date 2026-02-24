import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-red-200 pt-16 pb-12 border-t border-gray-200">
      <div className="container mx-auto px-4">

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Get the FreshCart app</h2>
          <p className="text-gray-600 mb-6 font-medium">We will send you a link, open it on your phone to download the app.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full sm:w-[70%] px-5 py-4 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            />
            <button className="w-full sm:w-[30%] bg-red-600 hover:bg-red-700 text-white py-4 px-8 rounded-xl font-bold transition-all whitespace-nowrap">
              Share App Link
            </button>
          </div>
        </div>


        <div className="h-[1px] bg-gray-200 w-full mb-8"></div>


        <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

          <div className="flex flex-wrap items-center gap-10">
            <div className="flex items-center gap-4">
              <span className="text-gray-900 font-bold whitespace-nowrap mb-3.5">Payment Partners :</span>
              <div className="flex items-center gap-4 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <Image src="/images/amazon-pay.png" alt="Amazon Pay" width={60} height={20} className="h-4 w-auto object-contain" />
                <Image src="/images/American-Express-Color.png" alt="American Express" width={40} height={25} className="h-5 w-auto object-contain" />
                <Image src="/images/mastercard.webp" alt="Mastercard" width={40} height={25} className="h-6 w-auto object-contain" />
                <Image src="/images/paypal.png" alt="PayPal" width={70} height={20} className="h-4 w-auto object-contain" />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-900 font-bold whitespace-nowrap w-auto h-9">Download App:</span>
            <div className="flex gap-4 items-center">
              <Link href="#" className="hover:opacity-80 transition-opacity">
                <Image src="/images/get-apple-store.png" alt="App Store" width={140} height={42} className="h-9 w-auto" />
              </Link>
              <Link href="#" className="hover:opacity-80 transition-opacity">
                <Image src="/images/get-google-play.png" alt="Google Play" width={140} height={42} className="h-9 w-auto" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

