import { useCallback, useEffect, useState } from "react";
import Listing from "../../components/Listing";
import styles from "../../styles/Listings.module.css";

const LISTINGS_ENDPOINT = "http://localhost:3000/api/listings";

function Listings({ cars, keyword, location, error, loading }) {
  //   listings is the local state, set to show the value of listings
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
    setIsLoading(loading);
  },[]);

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

      {error && 
        <div>
          seems an error fetching the data. Please Retry after sometime. If
          problems persists, please contact the support team providing the
          details as <span className={styles.listings__error}> {error}</span>{" "}
        </div>
      }

      {cars.length >0 && (
        <div role="list" className={styles.listings__grid}>
          {cars &&
            cars.length > 0 &&
            cars.map((car) => {
              return (
                <Listing
                  key={car.id}
                  loading={isLoading}
                  title={car.title}
                  description={car.description}
                  price={car.price}
                  location={car.location}
                  url={car.imgUrl}
                ></Listing>
              );
            })}
        </div>
      )}
    </div>
  );
}

export default Listings;

// export async function getServerSideProps() {
//   let data = [];
//   let error = "";
//   const response = await fetch(LISTINGS_ENDPOINT);
//   const data = await response.json();
//   //   transform the data
//   const transformedData = formatAsCurrency(data);

//   return {
//     props: {
//       cars: transformedData,
//       keyword: "Ferrari",
//       location: "Australia",
//       isFetching: transformedData ? false : null,
//       error: { code: errorCode, message: "Error!" },
//       loading: false,
//     },
//   };
// }

export const getStaticProps = async () => {
  let data = [];
let transformedData = [];
  let error = "";
  try {
    const res = await fetch(LISTINGS_ENDPOINT,{
        method: "GET",
        headers: {
          // update with your user-agent
          "User-Agent":
            "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36",
          Accept: "application/json; charset=UTF-8",
        },
      }
    );

    if (res.status !== 200)
      throw String(`Invalid server response: ${res.status} ${res.statusText}`);

    data = await res.json();
    transformedData = formatAsCurrency(data);
    if ((data.length ===0)) throw String("No data was found!");

    data = JSON.parse(JSON.stringify(data));
  } catch (e) {
    error = e.toString();
  }

  return {
    props: {
      cars:transformedData,
      keyword: "Ferrari",
      location: "Australia",
      loading:false,
      error,
    },
  };
};

const formatAsCurrency = (data) => {
  // TODO
  let transformedData = [...data];
  transformedData.forEach((listing) => {
    listing.price = Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "AUD",
    }).format(listing.price);
  });

  return transformedData;
};

