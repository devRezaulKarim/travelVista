/* eslint-disable react/prop-types */
import {
  faBed,
  faCalendarDays,
  faCar,
  faHouseCircleCheck,
  faLocationDot,
  faMountainSun,
  faPerson,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { DateRange } from "react-date-range";
import { useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const Header = ({ type }) => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const navigate = useNavigate();

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const handleSearch = () => {
    navigate("/hotels", { state: { destination, date, options } });
  };

  const handleDateSelection = (item) => {
    setDate([item.range1]);
    setOpenDate(false);
  };

  return (
    <div className="header">
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        {type !== "list" && (
          <>
            <div className="hero">
              <div className="hero-left">
                <h1 className="headerTitle">
                  Click, book, and embark <br /> it&#39;s that easy!
                </h1>
                <p className="headerDesc">
                  Your journey, your way. Discover seamless booking and unlock a{" "}
                  <br />
                  world of possibilities. Where will your next adventure take
                  you?
                </p>
                <button
                  onClick={() => navigate("/login")}
                  className="headerBtn"
                >
                  Book Now
                  <FontAwesomeIcon icon={faHouseCircleCheck} />
                </button>
              </div>
              <div className="hero-right">
                <img
                  src="https://media.cntraveler.com/photos/58e4005abdecd628dc467e91/master/w_1600,c_limit/Exterior-TaylorRiverLodge-Colorado-CRHotel.jpg"
                  alt=""
                />
              </div>
            </div>

            <div className="headerList">
              <div className="headerListItem active">
                <FontAwesomeIcon icon={faBed} />
                <span>Stays</span>
              </div>
              <div className="headerListItem">
                <FontAwesomeIcon icon={faPlane} />
                <span>Flights</span>
              </div>
              <div className="headerListItem">
                <FontAwesomeIcon icon={faCar} />
                <span>Car rentals</span>
              </div>
              <div className="headerListItem">
                <FontAwesomeIcon icon={faMountainSun} />
                <span>Attractions</span>
              </div>
              <div className="headerListItem">
                <FontAwesomeIcon icon={faTaxi} />
                <span>Airport taxis</span>
              </div>
            </div>

            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faLocationDot} className="headerIcon" />
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className="headerSearchInput"
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="headerSearchText"
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
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                <span
                  onClick={() => setOpenOptions(!openOptions)}
                  className="headerSearchText"
                >{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
                {openOptions && (
                  <div className="options">
                    <div className="optionItem">
                      <span className="optionText">Adult</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.adult <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.adult}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Children</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.children <= 0}
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.children}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Room</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.room <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.room}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                <div className="smallDevicesSearchButton">
                  <button className="headerBtn" onClick={handleSearch}>
                    Search
                  </button>
                </div>
              </div>
              <div className="headerSearchItem largeDeviceSearchButton">
                <button className="headerBtn" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
