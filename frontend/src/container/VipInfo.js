import Chip from '@mui/material/Chip';
import React, { useState } from "react";
import styled from "styled-components";
import Paper from '@mui/material/Paper';
import VipSideBar from './VipSideBar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const WholeContainer = styled.div`
    width: 100%;
    display: flex;
    margin-bottom: 5vmin;
    .sideBar {
        width: 100%;
        display: flex;
    }
    .info {
        padding-left: 15vmin;
        padding-top: 7vmin;
        width: 80%;
        border-left: solid;
        padding-bottom: 5vmin;
    }
    .input {
        // display: flex;
        // align-items: center;
        // justify-content: space-between;
        margin-top: 5vmin;
        padding-left: 5vmin;
    }
    .side {
        padding: 0.5vmin;
    }
    h1 {
        border-bottom: 8px solid #57c4d0;
        font-size: 24px;
        display: inline-block;
    }
    .title {
        margin-bottom: 20px;
    }
    .text {
        margin-top: 1vmin;
    }
    .edit {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-top: 3vmin;
        padding-right: 15vmin;
    }
`;



const VipInfo = () => {
    const [edit, setEdit] = useState(true);
    return (
        <WholeContainer>
            <Paper className='sideBar'>
                <div className='side'>
                    <VipSideBar />
                </div>
                <div className="info">
                    <div className="title">
                        <h1>會員資料</h1>
                    </div>  
                    <div className="input">
                        <p>會員姓名</p>
                        <TextField className='text' label="" variant="standard" defaultValue="王小明" />
                    </div> 
                    <div className="input">
                        <p>會員信箱</p>
                        <TextField  className="text" variant="standard" defaultValue="abc@gmail.com" disabled/>
                    </div> 
                    <div className="input">
                        <p>會員手機號碼</p>
                        <TextField className="text" label="" variant="standard" />
                    </div> 
                    <div className="input">
                        <p>會員生日</p>
                        <TextField
                            className="text"
                            label=""
                            type="date"
                            variant="standard"
                            defaultValue="2001-12-31"
                            sx={{ width: 220 }}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                    </div>
                    <div className="edit">
                        {edit ? <Button variant="contained">儲存變更</Button> : <Button disabled>儲存變更</Button>}
                    </div> 

                </div>
            </Paper>
        </WholeContainer>
        
    );
};

export default VipInfo;
