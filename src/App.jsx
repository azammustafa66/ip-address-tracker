import styled from "styled-components";
import InputBox from "./components/InputBox";
import Map from "./components/Map";
import { useState } from "react";

const App = () => {
  const [location, setLocation] = useState([19.03681, 73.01582]);
  return (
    <main className="h-screen">
      <Container>
        <InputBox setLocation={setLocation} />
      </Container>
      <Map location={location} />
    </main>
  );
};

export default App;

const Container = styled.div`
  @media (min-width: 375px) {
    background: url("../assets/pattern-bg-mobile.png") no-repeat;
    background-size: cover;
    height: 30vh;
  }

  @media (min-width: 768px) {
    background: url("../assets/pattern-bg-desktop.png") no-repeat;
    background-size: cover;
    height: 45vh;
  }
  z-index: 10;
`;
