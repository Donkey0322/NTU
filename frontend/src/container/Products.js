import React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import styled from 'styled-components';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Product from './Product';


const ProductContainer = styled.div`
    display: flex;
`;
const ListContainer = styled.div`
    width: 25%;
`;
const RightContainer = styled.div`
    width: 70%;
`;
const SelectorContainer = styled.div`
    height: 10%;
`;


const Products = () => {
    const [sort, setSort] = useState('');

    const handleChange = (event) => {
        setSort(event.target.value);
    };
    return (
        <ProductContainer>
            <ListContainer>
                <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <Divider />
                <nav aria-label="secondary mailbox folders">
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton>
                            <ListItemText primary="熱門商品" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton component="a" href="#simple-list">
                            <ListItemText primary="可麗露" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton component="a" href="#simple-list">
                            <ListItemText primary="巴斯克乳酪蛋糕" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton component="a" href="#simple-list">
                            <ListItemText primary="餅乾" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </nav>
                </Box>
            </ListContainer>
            <RightContainer>
                <SelectorContainer>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <InputLabel id="demo-select-small">排序</InputLabel>
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={sort}
                            label="Age"
                            onChange={handleChange}>
                            <MenuItem value={10}>價格由低到高</MenuItem>
                            <MenuItem value={20}>價格由高到低</MenuItem>
                            <MenuItem value={30}>銷量由高到低</MenuItem>
                        </Select>
                    </FormControl>
                </SelectorContainer>
                <Product />
            </RightContainer>
        </ProductContainer>
        
    );
}
export default Products;