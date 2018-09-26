import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Row } from './Flex.style';

const theme =  {
    barSize: '15px',
};

const RateContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 6px;
  align-items: center;
  font-size: 70%;
  cursor: default;
  user-select: none;
`;
const RateTitle = styled.div`
  display: flex;
  width: 37%;
  cursor: default;
  user-select: none;
`;

export const Rate = ({ title, count, icon }) => {
    return (
        <ThemeProvider theme={theme}>
            <RateContainer id='rate-container'>
                <RateTitle id='rate-title'>
                    {title}
                </RateTitle>
                <RateBars id='rate-bars' count={count} icon={icon}/>
            </RateContainer>
        </ThemeProvider>
    );
};



const BarsRow = styled.img`
  padding: 2px;
  width: ${props => props.theme.barSize};
  height: ${props => props.theme.barSize};
`;

const RateBars = ({ count, icon }) => {
    const bars = Array.apply(null, {length: (count<1? 1 : count>5? 5 : count)}).map(Number.call, Number);
    return (
        <Row id='bars-container' width='initial'>
            {bars.map(x => (
                <BarsRow id={`bars-row-${x+1}`} src={icon} key={x+1} alt='*'/>
            ))}
        </Row>
    );
};
