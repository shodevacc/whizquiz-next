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
const Notification = styled.div`
    position: fixed;
    top:10%;
    right:1%;
    background: ${({ theme }) => theme.colors.light_blue};
    padding: 5px 10px;
    border-radius:5px;
    p{
        color: #fff;
    }


`
export default function Index() {
    const [showHelp, setShowHelp] = React.useState(false)
    const [showNotification, setShowNotification] = React.useState(false)

    async function onShare() {
        try {
            await navigator.share({
                title: "Whiz Quiz",
                url: window.location.href
            });
        }

        catch (e) {
            if (e instanceof TypeError && !navigator.share) {
                navigator.clipboard.writeText(window.location.href);
                setShowNotification(true)
                setTimeout(() => {
                    setShowNotification(false)
                }, 1500)
            }
        }
    }
    return (
        <div style={{ zIndex: 10, position: 'relative' }}>
            {showNotification && <Notification>
                <p>Copied to clipboard</p>
            </Notification>}
            {showHelp && <Help setState={setShowHelp} />}
            <Container>
                <Icon onClick={() => setShowHelp(true)} icon={faQuestionCircle} />
                <Title>WhizQuiz</Title>
                <Icon onClick={onShare} icon={faShareAlt} />
            </Container>
        </div>

    )
}
