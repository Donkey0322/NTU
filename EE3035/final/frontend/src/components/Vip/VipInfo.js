import VipSideBar from "./VipSideBar";
import VipInfoBox from "./VipInfoBox";
import { Paper, Button } from "@mui/material";
import styled from "styled-components";

const WholeContainer = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 5vmin;
  .sideBar {
    width: 100%;
    display: flex;
  }
  .info {
    /* padding-left: 15vmin;
    padding-top: 7vmin; */
    width: 80%;
    border-left: solid;
    padding-bottom: 5vmin;
  }
  .input {
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

const info = [
  {
    title: "姓名",
    name: "customer_name",
    inputType: "standard",
    variant: "standard",
    value: "123",
  },
  {
    title: "信箱",
    name: "mail",
    inputType: "standard",
    variant: "standard",
    disabled: true,
  },
  {
    title: "手機號碼",
    name: "phone_number",
    inputType: "standard",
    variant: "standard",
  },
  {
    title: "會員生日",
    name: "birthday",
    inputType: "date",
    variant: "date",
  },
];

const VipInfo = ({ SIDEBAR, INFO }) => {
  const { edit, data, time, handleInputChange, handleUpdateInfo } = INFO;

  return (
    <WholeContainer>
      <Paper className="sideBar">
        <div className="side">
          <VipSideBar SIDEBAR={SIDEBAR} />
        </div>
        <div className="info">
          {info.map((f, index) => (
            <VipInfoBox
              title={f.title}
              name={f.name}
              inputType={f.inputType}
              handleInputChange={handleInputChange}
              key={index}
              variant={f.variant}
              value={
                f.name === "birthday" ? time : data[f.name] && data[f.name]
              }
            />
          ))}
          <div className="edit">
            <Button
              variant="contained"
              disabled={!edit}
              onClick={handleUpdateInfo}
            >
              儲存變更
            </Button>
          </div>
        </div>
      </Paper>
    </WholeContainer>
  );
};

export default VipInfo;
