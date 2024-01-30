/* eslint-disable react/prop-types */
import "./searchItem.css";

const SearchItem = ({ hotel }) => {
  return (
    <div className="searchItem">
      <img src={hotel.thumbnail} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{hotel.hotelName}</h1>
        <span className="siDistance">{hotel.location}</span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siSubtitle">{hotel.title}</span>
        <span className="siFeatures">
          {/* Entire studio • 1 bathroom • 21m² 1 full bed */}
          Rooms available: {hotel.availableRooms}
        </span>
        <span className="siCancelOp">Free cancellation </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        <div className="siRating">
          <span>Excellent</span>
          <button>{hotel.rating}</button>
        </div>
        <div className="siDetailTexts">
          <span className="siPrice">${hotel.pricePerNight}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <button className="siCheckButton">See availability</button>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
