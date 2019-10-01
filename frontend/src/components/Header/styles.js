import styled from 'styled-components';

export const Container = styled.div`
  background: rgba(0, 0, 0, 0.3);
  padding: 0 30px;
`;

export const Content = styled.div`
  color: white;
  height: 92px;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const UserData = styled.div`
  margin-left: auto;
  display: flex;
  justify-content: space-between;
  align-items: stretch;

  div {
    width: 117px;
    font-size: 14px;
    flex: 2;
    display: flex;
    flex-direction: column;
    margin-right: 30px;
    align-items: flex-end;
    justify-content: space-between;

    > button {
      background: none;
      border: none;
      color: rgba(255, 255, 255, 0.5);
      margin-top: 5px;
    }
  }

  > button {
    font-weight: bold;
    font-size: 16px;
    flex: 1;
    background: #d44059;
    color: white;
    border: transparent;
    border-radius: 4px;
    width: 71px;
  }
`;
