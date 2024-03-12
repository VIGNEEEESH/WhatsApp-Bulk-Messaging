import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {Helmet} from "react-helmet";

const Home = () => {
  return (
    <><Navbar/>
      <Helmet>
            <title>Bulk Messager | Home </title>
            <meta name="description" content="Nested component" />
        </Helmet>
      <section className="bg-white mt-8 lg:mt-16">
        <div className="py-10 px-6 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
          <svg
            className="ml-2 w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
          </svg>
          <h1 className="mb-4 text-2xl font-bold tracking-tight leading-none text-black md:text-5xl lg:text-6xl">Whatsapp Bulk Message Sender</h1>
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
            We are the people from the Correct Steps. we make your work Simpler with the Automation Softwares.
          </p>
          <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <a
              href="#"
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-customGreen hover:bg-customGreenLight focus:ring-4 focus:ring-customGreenLight"
            >
              Learn more
              <svg
                className="ml-2 -mr-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </a>
            {/* <a
              href="#"
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-black rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100"
            >
              <svg
                className="mr-2 -ml-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
              </svg>
              Watch video
            </a> */}
          </div>
        </div>
      </section>
      <section className="bg-white">
  <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
    <div className="grid gap-8 lg:grid-cols-2">
      <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md">
        <div className="flex justify-between items-center mb-5 text-gray-500">
          <span className="bg-customGreen text-white text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded">
            <svg className="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
            </svg>
            Tutorial
          </span>
          <span className="text-sm">14 days ago</span>
        </div>
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-black">
          <a href="#">How to quickly deploy a static website</a>
        </h2>
        <p className="mb-5 font-light text-gray-500">
          Static websites are now used to bootstrap lots of websites and are becoming the basis for a variety of tools that even influence both web designers and developers influence both web designers and developers.
        </p>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img className="w-7 h-7 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png" alt="Jese Leos avatar" />
            <span className="font-medium">
              Jese Leos
            </span>
          </div>
          <a href="#" className="inline-flex items-center font-medium text-customGreenLight hover:underline">
            Read more
            <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
            </svg>
          </a>
        </div>
      </article>
      <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md">
        <div className="flex justify-between items-center mb-5 text-gray-500">
          <span className="bg-customGreen text-white text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded">
            <svg className="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd"></path><path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"></path>
            </svg>
            Article
          </span>
          <span className="text-sm">14 days ago</span>
        </div>
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-black">
          <a href="#">Our first project with React</a>
        </h2>
        <p className="mb-5 font-light text-gray-500">
          Static websites are now used to bootstrap lots of websites and are becoming the basis for a variety of tools that even influence both web designers and developers influence both web designers and developers.
        </p>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img className="w-7 h-7 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png" alt="Bonnie Green avatar" />
            <span className="font-medium">
              Bonnie Green
            </span>
          </div>
          <a href="#" className="inline-flex items-center font-medium text-customGreenLight hover:underline">
            Read more
            <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
            </svg>
          </a>
        </div>
      </article>
    </div>
  </div>
</section>
<Footer/>
    </>
  );
};

export default Home;