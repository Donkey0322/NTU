import styled from 'styled-components';


const SmallProductContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 5%;
    img {
        height: 250px;
        width: 250px;
    }
    text {
        text-align: center;
    }
`;
const OutContainer = styled.div`
    display: flex;
`;

const Product = () => {
    return (
        <OutContainer>
            <SmallProductContainer>
                <img src={require('../images/canele1.png')} alt="" />
                <text>抹茶可麗露 $80</text>
            </SmallProductContainer>
            <SmallProductContainer>
                <img src={require('../images/canele2.png')} alt="" />
                <text>抹茶可麗露 $80</text>
            </SmallProductContainer>
            <SmallProductContainer>
                <img src={require('../images/canele3.png')} alt="" />
                <text>抹茶可麗露 $80</text>
            </SmallProductContainer>
        </OutContainer>
    )
}

export default Product;