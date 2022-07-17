import styled from 'styled-components';
import { ErrorMessage as EM } from 'formik';

export const Title = styled.h2`
    text-align: center;
    ${({ theme }) => theme.colors.blue};
    font-size: 100px;
    ${({ theme }) => theme.sizes.md}{
        font-size:100px;
    }
`

export const Button = styled.button`
    background: ${({ theme }) => theme.colors.blue};
    color: #fff;
    border-radius: 10px;
    border:none;
    padding: 10px 10px;
    transition: transform .2s ease;
    cursor: pointer;
    margin: 0 auto;
    :hover{
        transform: scale(1.1)
    }
`


export const ErrorMessage = (props) => {
    return (
        <EM component="p" style={{ color: 'red', margin: '5px 0 0 0' }} {...props} />
    )
}
export const Row = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
`
export const FieldContaner = styled.div`
    margin: 10px 0;
    padding: 0 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
`
export const Label = styled.label`
    text-transform: capitalize;
    
`
export const Input = styled.input`
    width: 100%;
    padding:5px;
`