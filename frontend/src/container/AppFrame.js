import React from 'react'
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom'

const BarContainer = styled.div`
    height: 25%;
    position: sticky;
    background-color: #FAEBD7;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    ul li {
        list-style: none;
        display: table;
        margin: 0 auto;
      }
    ul {
        display: flex;
    }
    // ul {
    //     margin: 3% 30%;
    //     justify-content: space-between;
    // }
    // li {
    //     list-style: none;
    //     display: inline-block;
    //     color: #ccc;
    // }
`;

const AppFrame = () => {
    const navigate = useNavigate();
    return (
        <BarContainer>
            <ul>
                <li onclick={() => navigate('/products')}>產品總覽</li>
                <li onclick={() => navigate('/vip')}>會員專區</li>
                <li onclick={() => navigate('/contactUs')}>聯絡我們</li>
            </ul>
        </BarContainer>
    )
}
export default AppFrame