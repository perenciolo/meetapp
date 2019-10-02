import styled from 'styled-components';

export const Container = styled.div`
  max-width: 900px;
  margin: 60px auto;
  display: flex;

  form {
    flex: 1;

    > button {
      align-self: flex-end;
      display: flex;
      align-items: center;
      font-weight: bold;
      padding: 5px 10px;
      margin-top: 10px;

      > svg {
        margin-right: 5px;
      }

      > span {
        color: #fff;
        margin: 0;
      }
    }
  }
`;
