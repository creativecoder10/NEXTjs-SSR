import { useEffect, useState } from "react";
import useHttp from "../hooks/use-http";

const ACTIONS = ["View", "Reply"];

const Listing = (props) => {
  // TODO
  // This should be the component which renders an individual listing to the page
  /**
   * Developer notes
   * 1. I would have preferred to make it a separate component but with time
   */
  
};

const Listings = (props) => {

    // Method to call to format the currency value into a currency data type 

    const formatAsCurrency = (data) => {
        // TODO
        let transformedData = [...data];
        transformedData.forEach((listing) => {
          listing.price = Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "AUD",
          }).format(listing.price);
        });
        setListings(transformedData);
      };

    //   listings is the local state, set to show the value of listings
      const [listings, setListings]= useState([]);

  // TODO
  // This component should make a request to the api endpoint (props.dataEndpoint)

  const {
    isLoading,
    error,
    sendRequest: fetchListings,
  } = useHttp({ url: props.dataEndpoint }, formatAsCurrency);

  useEffect(() => {
    fetchListings();
  }, []);
  // then render the result as set of listings as per the design mocks
  // check props passed in from parent for other values that you may need to use

  return (
    <div>
      <div className="listings__header"></div>
      <div className="listings__grid">
      {
          listings && listings.length > 0 && 
          listings.map ((listing)=> {
              return (
                <Listing></Listing>
              )
          })
      }
      </div>
    </div>
  );
};

export default Listings;
