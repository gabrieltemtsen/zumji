     
        import {
          Page,
          Navbar,
          Block,
          Button,
          List,
          ListItem,
          
          BlockTitle,
          Preloader,
          Chip,
        } from 'konsta/react';
import Layout from './Layout';
import Link from 'next/link';
        
        export default function Home() {
          return (
            <Layout>
      <Navbar title="Zumji" />

      <div className="h-full">
          
          <section className="dark:bg-gradient-to-b from-yellow-700/[4.79] via-yellow-800 h-full">
            <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-12">
              <a
                href="https://celo.org"
                target="_blank"
                className="inline-flex items-center justify-between px-1 py-1 pr-4 text-sm text-gray-700 bg-gray-100 rounded-full mb-7 dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                role="alert"
              >
                <Chip
                  media={
                    <img
                      alt="celo"
                      className="ios:h-7 material:h-6 rounded-full"
                      src="/celo.png"
                    />
                  }
                  className="text-xs bg-black rounded-full text-white px-4 py-1.5 mr-3"
                ></Chip>{" "}
                <span className="text-sm font-medium ml-2">Powered by Celo</span>
                <svg
                  className="w-5 h-5 ml-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </a>
              <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                Buy and Sell products with ease and Trust
              </h1>
              <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
                We provide a platform for you to buy and sell products with ease
              </p>
              <div className="flex mb-8 align-center justify-center space-x-4 lg:mb-16 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                <Link
                  href={''}
                  className="inline-flex bg-blue-600  max-w-sm justify-center items-center gap-x-3 text-center shadow-lg shadow-transparent hover:shadow-blue-700/50 border border-transparent text-white text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white py-3 px-6 dark:focus:ring-offset-gray-800"
                >
                  Market
                  <svg
                    className="w-2.5 h-2.5"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </Link>
                <Link
                  className=" max-w-sm inline-flex justify-center items-center gap-x-1 text-center bg-gray-600 shadow-2xl shadow-transparent hover:shadow-black-700/50 border border-transparent text-white text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white py-3 px-6 dark:focus:ring-offset-gray-800 mx-5"
                  href="/company"
                >
                  Orders
                  <svg
                    className="w-2.5 h-2.5"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </section>

      
        </div>
    </Layout>
          );
        }
        
        