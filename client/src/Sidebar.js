import React from "react";
import styled from 'styled-components';

const StyledSidebar = styled.div`
  position: fixed;
  display: flex;
  z-index: 2;
  top: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.2);
  width: 300px;
  height: 100%;

  @media (max-width: 768px) {
    display: none;
  }
`;

const InnerSidebar = styled.div`
  background: rgba(30, 30, 30, 1);
  margin: 24px;
  padding: 24px;
  overflow: hidden;
  ˝
  @media (max-width: 768px) {
  }
`;

const StyledTitle = styled.h1`
  color: white;
  font-family: "Inconsolata", monospace;
  font-weight: bold;
  margin-bottom: 24px;
`;

const StyledContent = styled.div`
  display: flex;
  flex: 1 1 100%;
  flex-basis: 1;
  flex-direction: column;
  overflow-y: scroll;
  max-height: 100%;
`;

const SubHeader = styled.h4`
  color: white;
  font-family: "Open Sans", sans-serif;
`;

const Content = styled.p`
  color: white;
  font-family: "Open Sans", sans-serif;
  font-size: 13px;
`;

export const Sidebar = () => {
  return (
    <StyledSidebar>
      <InnerSidebar>
        <StyledTitle>Houston Noise Pollution</StyledTitle>
        <StyledContent>
          <SubHeader>What Is It?</SubHeader>
          <Content>
            Noise is all around you, from televisions and radios to lawn
            mowers and washing machines. Normally, you hear these sounds at
            safe levels that don’t affect hearing. However, exposure to
            excessive noise can damage hearing. Harmful or annoying levels of
            noise are considered noise pollution.
          </Content>
          <SubHeader>Why is it a concern?</SubHeader>
          <Content>
            Loud sounds can damage sensitive structures of the inner ear and
            cause hearing loss. This makes conversation and other daily
            activities more difficult, and also causes many other health
            problems. Exposure to noise causes stress, anxiety, depression,
            high blood pressure, and heart disease.
          </Content>
          <SubHeader>Who is at risk?</SubHeader>
          <Content>
            People differ in their sensitivity to noise. As a general rule,
            sounds louder than 80 decibels are hazardous. Noise may damage
            your hearing if you are at arm’s length and have to shout to make
            yourself heard. If noise is hurting your ears, your ears may ring,
            or you may have difficulty hearing for several hours after
            exposure to the noise.
            
            Children often participate in recreational
            activities that can harm their hearing. These activities include
            attending music concerts and sporting events, watching fireworks,
            and playing with noisy toys and video games. Listening to loud
            music, especially on headphones, is a common cause of
            noise-induced hearing loss.
          </Content>
        </StyledContent>
      </InnerSidebar>
    </StyledSidebar>
  );
};
