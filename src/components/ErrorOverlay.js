import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
    position: fixed;
    top:0;
    left:0;
    height: 100vh;
    width: 100vw;
    display:flex;
    justify-content: center;
    align-items: center;
    background: rgba(0,0,0,0.5) ;
`
const ContainerInner = styled.div`
    padding: 30px;
    background: #fff;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const Button = styled.button`
    background: ${({ theme }) => theme.colors.blue};
    padding: 10px;
    border-radius: 5px;
    color: white;
    border:none;
    margin: 10px 0 0 0;
    cursor: pointer;
`
export default function ErrorOverlay({ children, close }) {
    return (
        <Container>
            <ContainerInner>
                {children}
                <Button onClick={close}>close</Button>
            </ContainerInner>

        </Container>
    )
}
