import Checkbox from '@mui/material/Checkbox';
import styled from 'styled-components';
import React from 'react';
import IconButton from '@mui/material/IconButton';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import {useState} from 'react';
import {
    InputLabel,
    MenuItem,
    FormControl,
    Select,
  } from "@mui/material";
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const ItemContainer = styled.div`
    display: flex;
    align-item: center;
    justify-content: space-between;
    height: 15vh;
    width: 80vw;
`;
const LeftContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 50%;
    img {
        height: 100%;
        margin: 3%;
        padding: 0.5%;
    }
    p {
        margin: 3%;
        position: inline-block;
        text-align: center;
    }
`;
const RightContainer = styled.div`
    display: flex;
    align-items: center;
    width: 50%;
    justify-content: flex-end;
    div {
        margin-right: 3%;
    }
    p {
        margin: 3%;
        position: inline-block;
        text-align: center;
    }
`;


const CartDetail = () => {
    const [num, setNum] = useState(1);
    const handleChange = (event) => {
        setNum(event.target.value);
    };
    return (
        <ItemContainer>
            <LeftContainer>
                <Checkbox {...label} />
                <img src={require('../images/canele1.png')} alt="" />
                <p>抹茶可麗露</p>
            </LeftContainer>
            <RightContainer>
                <p>NT$80</p>
                <FormControl sx={{ minWidth: 70, mb: "2vmin" }} size="small">
                <InputLabel id="demo-select-small">數量</InputLabel>
                <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={num}
                    label="num"
                    onChange={handleChange}
                >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                    <MenuItem value={7}>7</MenuItem>
                    <MenuItem value={8}>8</MenuItem>
                    <MenuItem value={9}>9</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                </Select>
                </FormControl>
                <IconButton aria-label="delete">
                    <HighlightOffOutlinedIcon />
                </IconButton>
            </RightContainer>
            
        </ItemContainer>

    )
}
export default CartDetail