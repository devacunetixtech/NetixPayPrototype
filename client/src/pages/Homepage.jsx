import React from 'react';
import MyImage from '../assets/logo2.png';

const HomePage = () => {
  return (
    <>
    {/* HERO SECTION */}
      <div className="min-h-screen" id="marketing-banner">
        {/* HERO SECTION */}
        <section  className="bg-center bg-no-repeat bg-[url('https://wallpaperaccess.com/full/2312112.png')] bg-gray-700 bg-blend-multiply">
            <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
                <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">NETIXPAY</h1>
                <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">We invest in the world’s potential</h1>
                <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">Here at NetixPay we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>
                <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                    <a href="/register" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                        Get started
                        <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </a>
                    <a href="/" className="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400">
                        Learn more
                    </a>  
                </div>
            </div>
        </section>

        <div className="flex flex-col md:flex-row items-center justify-center my-3 ">
          <div className=" w-full md:w-1/2 p-4">
            <main className="container mx-auto py-4">
              <section className="mb-8">
                <h2 className="text-2xl text-gray-800 font-bold">Banking Made Easy</h2>
                <p className="text-gray-600 text-lg">Open an account with NetixPay and enjoy a seamless banking experience.</p>
                <a href='/register'><button className="dark:bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded mt-4">Open an Account</button></a>
              </section>
              <section className="mb-8">
                <h2 className="text-2xl text-gray-800 font-bold">Personalized Services</h2>
                <p className="text-gray-600 text-lg">Explore our range of personalized services to meet your financial needs.</p>
                <ul className="list-disc list-inside text-gray-700">
                  <li>Online Banking</li>
                  <li>Mobile Banking</li>
                  <li>Investment Services</li>
                </ul>
              </section>
              <section>
                <h2 className="text-2xl text-gray-800 font-bold">Contact Us</h2>
                <p className="text-gray-600 text-lg">Have any questions or need assistance? Contact our support team.</p>
                <button className="dark:bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded mt-4">Contact Support</button>
              </section>
            </main>
          </div>

          {/* PHONE MOCKUP */}
          <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px]">
              <div className="h-[32px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -left-[17px] top-[72px] rounded-l-lg"></div>
              <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
              <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
              <div className="h-[64px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>
              <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white dark:bg-gray-800">
                  <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/mockup-1-light.png" className="dark:hidden w-[272px] h-[572px]" alt=""/>
                  <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/mockup-1-dark.png" className="hidden dark:block w-[272px] h-[572px]" alt=""/>
              </div>
          </div>
        </div>

        {/* NEWSLETTER SECTION */}
        <footer className="">
          <section className="bg-white dark:bg-gray-800">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-8 lg:px-6">
                <div className="mx-auto max-w-screen-md sm:text-center">
                    <h2 className="mb-4 text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl dark:text-white">Sign up for our newsletter</h2>
                    <p className="mx-auto mb-8 max-w-2xl font-light text-gray-500 md:mb-12 sm:text-xl dark:text-gray-400">Stay up to date with the roadmap progress, announcements and exclusive discounts feel free to sign up with your email.</p>
                    <form action="/">
                        <div className="items-center mx-auto mb-3 space-y-4 max-w-screen-sm sm:flex sm:space-y-0">
                            <div className="relative w-full">
                                <label className="hidden mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email address</label>
                                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                                </div>
                                <input className="block p-3 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:rounded-none sm:rounded-l-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your email" type="email" id="email" required=""/>
                            </div>
                            <div>
                                <button type="submit" className="py-3 px-5 w-full text-sm font-medium text-center text-white rounded-lg border cursor-pointer bg-blue-700 border-blue-600 sm:rounded-none sm:rounded-r-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Subscribe</button>
                            </div>
                        </div>
                        <div className="mx-auto max-w-screen-sm text-sm text-center text-gray-500 newsletter-form-footer dark:text-gray-300">We care about the protection of your data. <a href="/" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Read our Privacy Policy</a>.
                        </div>
                    </form>
              </div>
            </div>
          </section>
        </footer>
      </div>
      
      {/* <div tabIndex="-1" className="fixed z-50 flex flex-col md:flex-row justify-between w-[calc(100%-2rem)] p-4 -translate-x-1/2 bg-white border border-gray-100 rounded-lg shadow-sm lg:max-w-7xl left-1/2 top-6 dark:bg-gray-700 dark:border-gray-600">
          <div className="flex flex-col items-start mb-3 mr-4 md:items-center md:flex-row md:mb-0">
              <a href="https://flowbite.com/" className="flex items-center mb-2 border-gray-200 md:pr-4 md:mr-4 md:border-r md:mb-0 dark:border-gray-600">
                  <img src={MyImage} className="h-6 mr-2" alt="Flowbite Logo"/>
                  <span className="self-center text-lg font-semibold whitespace-nowrap dark:text-white">NETIXPAY</span>
              </a>
              <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">Access to a platform that gives fast and smooth transactions with NetixPay</p>
          </div>
          <div className="flex items-center flex-shrink-0">
              <a href="/register" className="px-5 py-2 mr-2 text-xs font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-gray-500 dark:hover:bg-gray-900 focus:outline-none dark:focus:ring-blue-800">Sign up</a>
              <button data-dismiss-target="#marketing-banner" type="button" className="flex-shrink-0 inline-flex justify-center w-7 h-7 items-center text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 dark:hover:bg-gray-600 dark:hover:text-white">
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                  </svg>
                  <span className="sr-only">Close banner</span>
              </button>
          </div>
      </div> */}
    </>
  );
}

  
  export default HomePage;