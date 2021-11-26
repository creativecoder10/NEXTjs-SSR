import { useCallback, useEffect, useState, useReducer } from "react";
import useHttp from "../hooks/use-http";
import styles from "../styles/Listings.module.css";

const ACTIONS = ["View", "Reply"];

const initialTitle = '';
const reducer = (title, action) => {
	switch (action.type) {
		case ACTIONS[0]:
			return console.log(action.type,":", action.value);    
		case ACTIONS[1]:
      return console.log(action.type,":", action.value);  
		default:
			return null;
	}
}

const Listing = (props) => {
  // TODO
  // This should be the component which renders an individual listing to the page
  /**
   * Developer notes
   * 1. I would have preferred to make it a separate component but with time constraints I left the component her 
   */

   const [title, dispatch] = useReducer(reducer, initialTitle);

   useCallback(()=>{
     console.log(title);
   },[title]);

  // Note - 1. I have added tab indices so that the elements are accessible via keyboard using the tabs

  return (
    <div role="listitem" className={styles.listings} tabIndex="0">
      <article>
        <h1
          className={styles.listings__title + " " + styles.truncate__text}
          tabIndex="0"
        >
          {props.title}{" "}
        </h1>
        <div tabIndex="0" className={styles.listings__price__location}>
          <div tabIndex="0" className={styles.listings__price}>
            {props.price}
          </div>
          <div tabIndex="0" className={styles.listings__location}>
            {props.location}
          </div>
        </div>
        {props.url && (
          <img
            src={props.url}
            alt={props.title}
            className={styles.listings__img}
          ></img>
        )}
        <div
          tabIndex="0"
          className={styles.listings__description + " " + styles.truncate__text}
        >
          {props.description}
        </div>
        <div className={styles.listings__buttons__container}>
          <button
            className={styles.cta__button}
            onClick={()=>{
              dispatch({type: ACTIONS[0],value: props.title})
            }}
          >
            View
          </button>
          <button
            className={styles.cta__button}
            onClick={()=>{
              dispatch({type: ACTIONS[1],value: props.title})
            }}
          >
            Reply
          </button>
        </div>
      </article>
    </div>
  );
};

const Listings = (props) => {

  // Method to call to format the currency value into a currency data type
  const formatAsCurrency = useCallback((data) => {
    // TODO
    let transformedData = [...data];
    transformedData.forEach((listing) => {
      listing.price = Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "AUD",
      }).format(listing.price);
    });
    setListings(transformedData);
  }, []);

  //   listings is the local state, set to show the value of listings
  const [listings, setListings] = useState([]);

  // TODO
  // This component should make a request to the api endpoint (props.dataEndpoint)

  const { isLoading, error, sendRequest: fetchListings } = useHttp();

  useEffect(() => {
    fetchListings({ url: props.dataEndpoint }, formatAsCurrency);
  }, [fetchListings]);
  // then render the result as set of listings as per the design mocks
  // check props passed in from parent for other values that you may need to use

// Notes
// 1. I have added the criteria for following scenarios 
//  a. If the API throws an error
//  b. If the API returns no value 
//  c. If the API is taking long to respond

  return (
    <div>
      <div className={styles.listings__header}>
        <h1 tabIndex="0">Search results</h1>
        {!isLoading && listings.length > 0 && (
          <h2 tabIndex="0">
            <span> {listings.length ? listings.length : null} results </span>{" "}
            for <span>{props.keyword}</span> in <span>{props.location}</span>
          </h2>
        )}
      </div>
      <hr className={styles.horizontal__separator} />

      {isLoading && (
        <div className={styles.listings__loading}> loading data...</div>
      )}

      {error && (
        <div>
          {" "}
          seems an error fetching the data. Please Retry after sometime. If problems persists, please contact the support team
          providing the details as{" "}
          <span className={styles.listings__error}> {error}</span>{" "}
        </div>
      )}

      {!error && !isLoading && listings.length === 0 && (
        <div> There are no items matching your criteria </div>
      )}

      <div role="list" className={styles.listings__grid}>
        {listings &&
          listings.length > 0 &&
          listings.map((listing) => {
            return (
              <Listing
                key={listing.id}
                loading={isLoading}
                title={listing.title}
                description={listing.description}
                price={listing.price}
                location={listing.location}
                url={listing.imgUrl}
              ></Listing>
            );
          })}
      </div>
    </div>
  );
};

export default Listings;
