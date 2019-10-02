import styled from 'styled-components';

import camera from '~/assets/camera.svg';

export const Container = styled.div`
  label {
    width: 100%;
    flex: 1;
    background: rgba(0, 0, 0, 0.1);
    height: 300px;
    color: rgba(255, 255, 255, 0.3);
    font-size: 16px;
    font-weight: bold;
    padding: 60px 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 4px;

    &:before {
      content: '';
      background: url(${camera}) center center no-repeat;
      opacity: 0.3;
      background-size: cover;
      width: 70px;
      height: 70px;
    }
  }

  #banner {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
  }
`;
