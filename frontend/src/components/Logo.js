import styled from "styled-components";
import "./style.css";

const LogoImg = styled.div`
  margin-top: 2vmin;
  width: max(120px, 32vmin);
  height: calc(max(10px, 15vmin) * 0.75);
  position: relative;
  border-radius: 10px;
  border-width: 0.5vmin;
  border-style: double;
  border-color: darkgoldenrod;
  background-size: cover;
  background-position-x: center;
  background-position-y: center;
  background-image: url(${({ img }) => img});
`;

export default function Logo({ img }) {
  return <LogoImg img={img} ></LogoImg>;
}
