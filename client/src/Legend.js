import React, { Fragment } from "react";
import styled from "styled-components";

const LegendContainer = styled.div`
  position: fixed;
  bottom: 0px;
  left: calc(50% - 300px);

  width: 250px;
  height: 64px;
  margin: 16px;
  background: rgba(30, 30, 30, 1);
  padding: 8px 16px 16px;
  @media (max-width: 768px) {
    left: 50%;
    transform: translateX(-50%);
  }
`;

const LegendSlideColors = styled.div`
  display: flex;
  flex: 1 1 100%;
  height: 5px;
  margin-top: 4px;
  > * {
    flex-basis: 20%;
  }
`;

const SingleSlide = styled.div`
  height: 5px;
  width: 20%;
`;

const NumberTick = styled.div`
  position: relative;
  top: 4px;
  left: 0;
  color: white;
  font-family: "Inconsolata", monospace;
`;

const Label = styled.label`
  color: white;
  font-family: "Inconsolata", monospace;
`;

const SlideColor = ({ color, number }) => {
  return (
    <Fragment>
      <SingleSlide style={{ background: color }}>
        <NumberTick>{number}</NumberTick>
      </SingleSlide>
    </Fragment>
  );
};

export const Legend = () => {
  return (
    <LegendContainer>
      <Label>Legend:</Label>
      <LegendSlideColors>
        <SlideColor color="#ffffb2" number={0} />
        <SlideColor color="#fecc5c" number={50} />
        <SlideColor color="#fd8d3c" number={75} />
        <SlideColor color="#f03b20" number={100} />
        <SlideColor color="#bd0026" number={150} />
      </LegendSlideColors>
    </LegendContainer>
  );
};
