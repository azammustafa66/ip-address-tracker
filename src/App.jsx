import styled from "styled-components";
import InputBox from "./components/InputBox";
import Map from "./components/Map";

/**
 *
 *
 * Blue background
 *
 * Input
 * IP Address location box
 *
 * Map
 *
 */

const App = () => {
  return (
    <main className="h-screen">
      <StyledDiv>
        <InputBox />
      </StyledDiv>
      <div className="w-full">
        <Map />
      </div>
    </main>
  );
};

export default App;

const StyledDiv = styled.div`
  @media (min-width: 375px) {
    background: url("../public/assets/pattern-bg-mobile.png");
  }

  @media (min-width: 768px) {
    background: url("../public/assets/pattern-bg-desktop.png");
  }
  height: 40vh;
`;
