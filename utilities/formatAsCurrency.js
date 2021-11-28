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
  }