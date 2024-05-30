

          
    
      
    
          
    
      
    
        // Konsta UI components
        import {
          Page,
          Navbar,
          Block,
          Button,
          List,
          ListItem,
          Link,
          BlockTitle,
          Preloader,
        } from 'konsta/react';
import Layout from './Layout';
        
        export default function Home() {
          return (
            <Layout>
      <Navbar title="Staking" />

      <div className="m-5 p-5">
        <BlockTitle> Stake CELO </BlockTitle>

        <Block>
          <div className="max-w-sm mx-auto">
            <strong className="mb-8 pb-4">
              {" "}
              <h1>Current Reward Rate: 0.5 cUSD / CELO </h1>{" "}
            </strong>

            <div className="mb-5 mt-5">
              <label
               
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Stake Amount (CELO)
              </label>

              <input
               
                type="text"
                id="text"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="100"
                required
              />
            </div>
            <div className="mb-5">
              <label
               
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Reward (cUSD)
              </label>
              <input
                value={"100 eth"}
                type="text"
                id="text"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="emergency"
                disabled
              />
            </div>

            {/* {inTxn ? (
              <Preloader className="center-item mt-3" />
            ) : (
              <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Stake
              </button>
            )} */}
          </div>
        </Block>

        <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>
      </div>
    </Layout>
          );
        }
        
        