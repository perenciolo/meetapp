import styled from 'styled-components';

export const Container = styled.div`
  max-width: 900px;
  margin: 60px auto;
  display: flex;
  justify-content: stretch;
  flex-direction: column;
  color: #fff;

  header {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    margin-bottom: 30px;

    h1 {
      font-size: 32px;
      font-weight: bold;
      margin-right: 15px;
    }

    div {
      margin-left: auto;
      display: flex;
      flex-wrap: nowrap;

      > button {
        display: flex;
        align-items: center;
        color: #fff;
        font-size: 16px;
        font-weight: bold;
        border-radius: 4px;
        padding: 10px 20px;

        > svg {
          margin-right: 5px;
        }
      }

      button + button {
        margin-left: 10px;
      }
    }
  }

  p {
    font-size: 18px;
    margin-top: 30px;
  }
`;

export const Banner = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-height: 300px;
  }
`;

export const Footer = styled.footer`
  display: flex;
  flex: 1;
  font-size: 16px;
  margin-top: 30px;
  opacity: 0.6;

  time {
    display: flex;
    align-items: center;
    margin-right: 15px;

    svg {
      margin-right: 5px;
    }
  }

  div {
    display: flex;
    align-items: center;

    svg {
      margin-right: 5px;
    }
  }
`;

export const Button = styled.button`
  background: #f94d6a;
  border: #f94d6a;
`;

export const ButtonSecondary = styled.button`
  background: #4dbaf9;
  border: #4dbaf9;
`;
