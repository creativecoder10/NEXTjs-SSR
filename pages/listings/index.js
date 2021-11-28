import { useState } from "react";
import Listing from "../../components/Listing";
import styles from "../../styles/Listings.module.css";

const LISTINGS_ENDPOINT = "http://localhost:3000/api/listings";

function Listings({ cars }) {
  //   listings is the local state, set to show the value of listings
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


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
    </div>
  );
}

export default Listings;

export async function getServerSideProps() {
  const response = await fetch(LISTINGS_ENDPOINT);
  const data = await response.json();
  console.log(data);

  return {
    props: {
      cars: data,
    },
  };
}
