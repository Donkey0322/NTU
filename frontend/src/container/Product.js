import styled from 'styled-components';


const ProductContainer = styled.div`
    display: flex;
    flex-direction: column;
`;
const OutContainer = styled.div`
    display: flex;
`;

const Product = () => {
    return (
        <OutContainer>
            <ProductContainer>
                <img src='../../images/canele1.png' />
            </ProductContainer>
        </OutContainer>
    )
}

export default Product;