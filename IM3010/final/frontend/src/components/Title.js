import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  /* position: absolute; */
  top: 25vh;
  h1 {
    margin: 0;
    margin-right: 20px;
    font-size: 3em;
  }
`;

const Title = () => (
  <Wrapper>
    <h1>Random Game Room</h1>
  </Wrapper>
);

export default Title;
