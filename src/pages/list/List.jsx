/* eslint-disable no-unused-vars */
import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import Loading from "../Loading/Loading";

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [hotels, setHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchLocation = useRef();

  useEffect(() => {
    async function getHotels() {
      setIsLoading(true);
      const res = await fetch("https://rezauls-json-server.vercel.app/hotels");
      const data = await res.json();

      if (destination) {
        setHotels(
          data.filter((d) =>
            d.location.toLowerCase().includes(destination.toLowerCase())
          )
        );
      } else {
        setHotels(data);
      }
      setIsLoading(false);
    }
    getHotels();
  }, [destination]);

  if (isLoading) {
    return <Loading />;
  }

  const handleDateSelection = (item) => {
    setDate([item.range1]);
    setOpenDate(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setDestination(searchLocation.current.value);
    searchLocation.current.value = "";
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listResult">
            {hotels.length > 0 ? (
              hotels.map((hotel) => <SearchItem key={hotel.id} hotel={hotel} />)
            ) : (
              <h3 className="notAvailableMsg">
                There is no hotel available in
                <span>&#34;{destination}&#34; !!</span>
              </h3>
            )}
          </div>

          {/* search section */}
          <form onSubmit={handleSearch}>
            <div className="listSearch">
              <h1 className="lsTitle">Search</h1>
              <div className="lsItem">
                <label>Destination</label>
                <input
                  ref={searchLocation}
                  placeholder={destination || "Enter your destination"}
                  defaultValue={destination}
                  type="text"
                />
              </div>
              <div className="lsItem">
                <label>Check-in Date</label>
                <span
                  className="selectedDate"
                  onClick={() => setOpenDate(!openDate)}
                >{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                  date[0].endDate,
                  "MM/dd/yyyy"
                )}`}</span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => handleDateSelection(item)}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                    className="date"
                    minDate={new Date()}
                  />
                )}
              </div>
              <div className="lsItem">
                <label>Options</label>
                <div className="lsOptions">
                  <div className="lsOptionItem">
                    <span className="lsOptionText">
                      Min price <small>per night</small>
                    </span>
                    <input type="number" className="lsOptionInput" />
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText">
                      Max price <small>per night</small>
                    </span>
                    <input type="number" className="lsOptionInput" />
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText">Adult</span>
                    <input
                      type="number"
                      min={1}
                      className="lsOptionInput"
                      placeholder={options.adult}
                    />
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText">Children</span>
                    <input
                      type="number"
                      min={0}
                      className="lsOptionInput"
                      placeholder={options.children}
                    />
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText">Room</span>
                    <input
                      type="number"
                      min={1}
                      className="lsOptionInput"
                      placeholder={options.room}
                    />
                  </div>
                </div>
              </div>
              <button>Search</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default List;
