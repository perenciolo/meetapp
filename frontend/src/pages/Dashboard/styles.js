import styled from 'styled-components';

export const Container = styled.div`
  max-width: 900px;
  margin: 60px auto;
  display: flex;
  justify-content: stretch;
  flex-direction: column;

  header {
    display: flex;
    align-items: center;
    flex: 1;
    margin-bottom: 30px;

    h1 {
      color: #fff;
      font-size: 32px;
      font-weight: bold;
    }

    > button {
      font-size: 16px;
      font-weight: bold;
      margin-left: auto;
      width: 200px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #f94d6a;
      color: #fff;
      border: transparent;
      border-radius: 4px;
      padding: 10px;

      span {
        display: inline-flex;
        margin-left: 10px;
      }
    }
  }

  main {
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: stretch;

    button {
      flex: 1;
      display: flex;
      align-items: center;
      color: #fff;
      border-radius: 4px;
      background: rgba(0, 0, 0, 0.3);
      border: transparent;
      padding: 20px 30px;

      &:not(:last-child) {
        margin-bottom: 10px;
      }

      div {
        font-size: 18px;
        font-weight: bold;
      }

      time {
        display: flex;
        align-items: center;
        margin-left: auto;
        font-size: 16px;

        span {
          display: inline-flex;
          font-size: 16px;
          margin-right: 30px;
          opacity: 0.6;
        }
      }
    }
  }
`;
