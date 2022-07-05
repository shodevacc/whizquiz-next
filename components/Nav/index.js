import React from 'react'
import styled from 'styled-components';
import Help from 'components/Help'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle, faShareAlt } from '@fortawesome/free-solid-svg-icons'

const Container = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: ${({ theme }) => theme.colors.blue}; 
    padding: 20px 30px;
    
  /* height: ; */
`;
const Title = styled.h1`
    font-size: 24px;
    margin:0;
    color: #fff;
    text-align:center;
    ${({ theme }) => theme.sizes.md}{
        font-size:32px;
    }
`
const Icon = styled(FontAwesomeIcon)`
    color: white;
    font-size: 20px;
    cursor:pointer;
    ${({ theme }) => theme.sizes.md}{
        font-size:25px;
    }
`
export default function Index() {
    const [showHelp, setShowHelp] = React.useState(false)
    return (
        <>
            {showHelp && <Help setState={setShowHelp} />}
            <Container>
                <Icon onClick={()=>setShowHelp(true)} icon={faQuestionCircle} />
                <Title>WhizQuiz</Title>
                <Icon icon={faShareAlt} />
            </Container>
        </>

    )
}
