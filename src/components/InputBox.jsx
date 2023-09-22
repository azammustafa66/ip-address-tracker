import { useState } from "react";
import styled from "styled-components";
import { IP_ADDRESS, ISP, LOCATION, TIMEZONE } from "../utils/constants";
import PropTypes from "prop-types";

const InputBox = ({ setLocation }) => {
  const [inputTerm, setInputTerm] = useState("");
  const [data, setData] = useState({});

  const fetchData = async () => {
    const key = import.meta.env.VITE_API_KEY;
    const response = await fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_${key}&ipAddress=${inputTerm}`
    );
    const data = await response.json();
    setData(data);
    setLocation([data?.location?.lat, data?.location?.lng]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData();
  };

  const handleValueChange = (searchTerm) => {
    setInputTerm(searchTerm);
  };

  let ip, region, city, country, timezone, isp;
  if (data) {
    ip = data.ip;
    region = data.location?.region;
    city = data.location?.city;
    country = data.location?.country;
    timezone = data.location?.timezone;
    isp = data.isp;
  }

  const formattedLocation =
    city && region && country ? `${city} ${region} ${country}` : LOCATION;

  return (
    <StyledInputSection className="flex flex-col justify-center items-center gap-4">
      <h1 className="text-3xl tracking-tight font-medium text-white">
        IP Address Tracker
      </h1>
      <div className="flex justify-center">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search for any IP address or domain"
            className="md:w-[555px] w-[327px] h-12 rounded-l-2xl outline-none p-2 placeholder:text-[#2c2c2c] placeholder:text-xl placeholder:font-normal"
            value={inputTerm}
            onChange={(event) => handleValueChange(event.target.value)}
          />
        </form>
        <button
          type="submit"
          className="bg-black p-4 md:p-3 rounded-r-2xl hover:bg-[rgba(63, 63, 63, 1)]"
          onClick={fetchData}
        >
          <img
            src="../../assets/icon-arrow.svg"
            alt="right-arrow"
            className="text-white"
          />
        </button>
      </div>

      <div className="h-60 md:h-44 md:w-[730px] xl:w-[1110px] flex flex-col md:flex-row gap-3 md:gap-8 items-center md:justify-evenly bg-white rounded-2xl p-4 md:p-10">
        <div className="flex flex-col md:flex-row justify-evenly gap-y-3 md:gap-x-5 lg:gap-x-8 md:gap-y-0">
          <div className="relative lg:border-custom lg:p-4">
            <StyledH1>ip address</StyledH1>
            <P>{ip || IP_ADDRESS}</P>
          </div>
          <div className="relative lg:border-custom lg:p-4">
            <StyledH1>location</StyledH1>
            <P>{formattedLocation}</P>
          </div>
          <div className="relative lg:border-custom lg:p-4">
            <StyledH1>Timezone</StyledH1>
            <P>{timezone || TIMEZONE}</P>
          </div>
          <div className="lg:p-4">
            <StyledH1>ISP</StyledH1>
            <P>{isp || ISP}</P>
          </div>
        </div>
      </div>
    </StyledInputSection>
  );
};

InputBox.propTypes = {
  setLocation: PropTypes.func.isRequired,
};

export default InputBox;

const StyledH1 = styled.h1`
  color: #2c2c2c;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 1.75px;
  text-transform: uppercase;
  opacity: 0.5;
  margin-bottom: 2px;
`;

const P = styled.p`
  color: #2c2c2c;
  font-family: Rubik;
  font-size: 26px;
  font-style: normal;
  font-weight: 500;
  line-height: 30px;
  letter-spacing: -0.232px;
`;

const StyledInputSection = styled.section`
  position: absolute;
  top: 2.5%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;

  @media (min-width: 768px) {
    top: 10%;
  }
`;
