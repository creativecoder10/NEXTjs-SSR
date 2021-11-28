import styles from '../styles/Listings.module.css';

const Listing = (props)=> {
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
          className={[styles["listings__description"] + " " + styles["truncate__text"]]}
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
    )
}

export default Listing;