import styled from 'styled-components';
import React from 'react';
import Paper from '@mui/material/Paper';
import {useState} from 'react';
import CartDetail from '../components/CartDetail';
import Button from '@mui/material/Button';

const DetailContainer = styled.div`
    display: flex;
    height: 50%;
`;
const WholeContainer = styled.div`
    display: flex;
    flex-direction: column;
`;
const DownContainer = styled.div`
    margin-top: 2%;
    margin-bottom: 2%;
    width: 100;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    p {
        margin-right: 3%;
        position: inline-block;
        text-align: center;
    }
`;

const ShoppingCart = () => {
    return (
        <WholeContainer>
            <Paper>
                {/* map */}
                <CartDetail />
                <CartDetail />
                <CartDetail />
                <CartDetail />
                <CartDetail />
                <CartDetail />
                <CartDetail />
                <CartDetail />
                <CartDetail />
            </Paper>
            <DownContainer>
                <p>總價 NT$ 500</p>
                <Button variant="contained">前往結帳</Button>
            </DownContainer>
            
                
        </WholeContainer>
    )
}
export default ShoppingCart