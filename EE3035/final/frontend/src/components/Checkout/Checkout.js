import { FormControlLabel, Button, Checkbox, Paper } from "@mui/material";
import styled from "styled-components";
import CheckoutForm from "./CheckoutForm";

const BoxContainer = styled.div`
  margin-top: 10vmin;
  p {
    text-align: center;
  }
  div {
    display: flex;
    justify-content: space-around;
    margin-top: 3vmin;
  }
`;

const FormContainer = styled.div`
  width: 100%;
  margin-top: 5vmin;
`;

const DownContainer = styled.div`
  margin-top: 2%;
  margin-bottom: 2%;
  width: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  p {
    margin-left: 3%;
    position: inline-block;
    text-align: center;
  }
  div {
    display: flex;
    justify-content: flex-end;
    width: 50%;
    align-items: center;
    p {
      margin-right: 3%;
    }
  }
`;
const form = [
  {
    title: "訂購人姓名",
    label: "訂購人姓名",
    name: "customer_name",
    inputType: "standard",
    variant: "standard",
  },
  {
    title: "訂購人手機號碼",
    label: "手機號碼",
    name: "cellphone_number",
    inputType: "standard",
    variant: "standard",
  },
  {
    title: "付款方式",
    label: "付款方式",
    name: "payBy",
    inputType: "select",
    select: ["取貨付款", "銀行轉帳"],
  },
  {
    title: "寄送方式",
    label: "寄送方式",
    name: "deliver_method",
    inputType: "select",
    select: ["面交", "Lalamove", "冷藏宅配"],
  },
];

const meetForm = [
  {
    title: "面交地點",
    label: "面交地點",
    name: "deliver_location",
    inputType: "select",
    select: ["永安市場捷運站", "公館捷運站", "科技大樓捷運站"],
  },
  {
    title: "面交時間",
    label: "面交時間",
    name: "deliver_date",
    inputType: "date",
  },
];

const checkSubmit = (data, checked) => {
  const banSubmit =
    !checked ||
    !data.customer_name ||
    !data.cellphone_number ||
    !data.payBy ||
    !data.deliver_method ||
    !data.deliver_location ||
    !data.deliver_method
      ? true
      : data.deliver_method === "面交"
      ? !data.deliver_method
      : false;
  return banSubmit;
};

const Checkout = ({
  toMain,
  toVip,
  checked,
  handleChange,
  send,
  data,
  handleInputChange,
  handleCheckoutSubmit,
  sum,
  time,
}) => {
  if (send === true)
    return (
      <BoxContainer>
        <p>
          已成功送出訂單～選擇銀行轉帳的顧客請在三日內將款項匯至 <br />
          （333）123456654321 <br />
          確認款項後會立即出貨，請至會員專區查看訂單狀況。
        </p>
        <div>
          <Button variant="contained" onClick={toVip}>
            至會員專區
          </Button>
          <Button variant="contained" onClick={toMain}>
            返回主頁
          </Button>
        </div>
      </BoxContainer>
    );
  else
    return (
      // console.log('check', !checked),
      // console.log('name', typeof data.customer_name == 'undefined'),
      // console.log('number', typeof data.cellphone_number == 'undefined'),
      // console.log('pay', typeof data.payBy == 'undefined'),
      // console.log('method', typeof data.deliver_method == 'undefined'),
      // console.log('location', typeof data.deliver_location== 'undefined'),
      // console.log('time', typeof data.deliver_method == 'undefined' ?  true : data.deliver_method == '面交' ? false : data.deliver_method == 'undefined'),
      // console.log(!checked || typeof data.customer_name == 'undefined' ||
      // typeof data.cellphone_number == 'undefined' || typeof data.payBy == 'undefined' ||
      // typeof data.deliver_method == 'undefined'|| typeof data.deliver_location== 'undefined' ||
      // typeof data.deliver_method == 'undefined' ?  true : data.deliver_method == '面交' ? typeof data.deliver_method == 'undefined' : false),
      // console.log(data.phone_number),
      // console.log(data),
      <FormContainer>
        <Paper
          sx={{ display: "flex", flexDirection: "column", rowGap: "3vmin" }}
        >
          {form.map((f, index) => (
            <CheckoutForm
              title={f.title}
              label={f.label}
              name={f.name}
              inputType={f.inputType}
              handleInputChange={handleInputChange}
              key={index}
              select={f.inputType === "select" && f.select}
              variant={f.variant}
              value={data[f.name] && data[f.name]}
            />
          ))}
          {data.deliver_method === "面交" ? (
            <>
              {meetForm.map((f, index) => (
                <CheckoutForm
                  title={f.title}
                  label={f.label}
                  name={f.name}
                  inputType={f.inputType}
                  handleInputChange={handleInputChange}
                  key={index}
                  select={f.inputType === "select" && f.select}
                  variant={f.variant}
                  value={
                    f.name === "deliver_datedata"
                      ? time
                      : data[f.name] && data[f.name]
                  }
                />
              ))}
            </>
          ) : data.deliver_method ? (
            <CheckoutForm
              title={"送貨地址"}
              label={"送貨地址"}
              name={"deliver_location"}
              inputType={"standard"}
              handleInputChange={handleInputChange}
              variant={"standard"}
              value={data.deliver_location && data.deliver_location}
            />
          ) : null}
        </Paper>
        <DownContainer>
          <FormControlLabel
            control={<Checkbox checked={checked} onChange={handleChange} />}
            label="我同意訂單一旦送出，未經賣家同意不得取消訂單"
          />
          <div>
            <p>總價 NT$ {sum}</p>
            <Button
              variant="contained"
              onClick={handleCheckoutSubmit}
              disabled={checkSubmit(data, checked)}
            >
              送出訂單
            </Button>
          </div>
        </DownContainer>
      </FormContainer>
    );
};

export default Checkout;
