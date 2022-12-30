import React from 'react'
import styled from 'styled-components';

const Mainage = styled.section`
  display: flex;
  flex-direction: column;
`;

const MainPage = () => {
    return (
        <div className='mainPageContainer'>
            <h2>What do you want to eat?</h2>
        </div>
    )
}
export default MainPage