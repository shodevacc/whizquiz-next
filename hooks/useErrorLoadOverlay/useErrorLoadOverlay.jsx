import React from "react";
import styled from 'styled-components';
import styles from './style.module.css'


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

export function useErrorLoadOverlay() {
  const [state, setState] = React.useState({
    loading: false,
    error: null
  })
  const [error, setErr] = React.useState(null);
  const [loading, setLoad] = React.useState(null);
  const setLoading = React.useCallback(
    (newState) => {
      if (state.loading === newState) {
        return
      }

      else {
        // If loading is being set to true, make error null
        if (newState) {
          setState({ loading: newState, error: null })
        }
        setState(state => { return { ...state, loading: newState } })
      }
    }
    , [state.loading])
  const setError = React.useCallback(
    (newState) => {
      if (state.error === newState) {
        return
      }
      else {
        // If error is being set make loading false
        if (newState) {
          setState({ error: newState, loading: false })
        }
        setState(state => { return { ...state, error: newState } })
        return
      }
    }
    , [state.error])
  // console.log("THE STATE IS", state)
  return {
    error:state.error,
    loading:state.loading,
    setError,
    setLoading,
    errorElement: <>
      {state.error && <Container>
        <ContainerInner>
          {state.error}
          <Button onClick={() => setError(null)}>close</Button>
        </ContainerInner>
      </Container>}
    </>

    ,
    loadingElement: <>{state.loading && <Container>
      <div className={styles["lds-roller"]}>
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </Container>}</>,
  };
}
