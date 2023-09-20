import { useEffect, useState } from "react";
import styled from "styled-components";
import { IP_ADDRESS, ISP, LOCATION, TIMEZONE } from "../utils/constants";

const InputBox = () => {
  const [inputTerm, setInputTerm] = useState(IP_ADDRESS);
  const [data, setData] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => fetchData(), 300);

    return () => {
      clearTimeout(timer);
    };
  }, [inputTerm]);

  const fetchData = async () => {
    const key = import.meta.env.VITE_API_KEY;
    const response = await fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_${key}&ipAddress=${inputTerm}`
    );
    const data = await response.json();
    setData(data);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData();
  };
  
  let ip, region, city, postalCode, timezone, isp;

  if (data) {
    ip = data.ip;
    region = data.location?.region;
    city = data.location?.city;
    postalCode = data.location?.postalCode;
    timezone = data.location?.timezone;
    isp = data.isp;
  }

  return (
    <section className="flex flex-col justify-center items-center gap-12 p-8">
      <h1 className="text-3xl tracking-tight font-medium text-white">
        IP Address Tracker
      </h1>
      <div className="flex justify-center">
        <form onSubmit={(event) => handleSubmit(event)}>
          <input
            type="text"
            className="md:w-[555px] w-[327px] h-12 rounded-l-2xl outline-none p-2"
            value={inputTerm}
            onChange={(event) => setInputTerm(event.target.value)}
          />
        </form>
        <button
          type="submit"
          className="bg-black p-2 md:p-3 rounded-r-2xl hover:bg-[rgba(63, 63, 63, 1)]"
          onClick={() => fetchData()}
        >
          <img src="../../public/assets/icon-arrow.svg" alt="right-arrow" />
        </button>
      </div>

      <div className="h-72 md:h-44 xl:w-[1110px] flex flex-col md:flex-row gap-8 md:gap-16 items-start md:items-center md:justify-evenly bg-white rounded-2xl p-3 md:p-8">
        <div className="border-r-1 border-black">
          <StyledH1>ip address</StyledH1>
          <P>{ip || IP_ADDRESS}</P>
        </div>
        <div>
          <StyledH1>location</StyledH1>
          <P>{`${region} ${city} ${postalCode}` || LOCATION}</P>
        </div>
        <div>
          <StyledH1>Timezone</StyledH1>
          <P>{timezone || TIMEZONE}</P>
        </div>
        <div>
          <StyledH1>ISP</StyledH1>
          <P>{isp || ISP}</P>
        </div>
      </div>
    </section>
  );
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
