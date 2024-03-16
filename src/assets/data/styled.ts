import styled from 'styled-components';
import classNames from 'classnames';

const SliderStyled = styled.input`
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 8px;
  background: #3f3f3f;
  outline: none;
  opacity: 1;
  transition: opacity 0.2s;
  border-radius: 9999px;

  &:hover {
    opacity: 1;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    background: #ffffff;
    cursor: pointer;
    border-radius: 50%;
  }

  &::-moz-range-thumb {
    width: 16px;
    height: 16px;
    background: #ffffff;
    cursor: pointer;
    border-radius: 50%;
  }
`;

const ScrollbarStyled = styled.body`
  &::-webkit-scrollbar {
    background-color: #1f1f1f;
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background-color: #1f1f1f;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ffffff;
    border-radius: 8px;
    border: 2px solid #1f1f1f;
  }

  &::-webkit-scrollbar-button {
    display: none;
  }
`;

export const sliderClassName = classNames({
  'ui-slider': true
});

export const scrollbarClassName = classNames({
  'body::-webkit-scrollbar': true,
  'body::-webkit-scrollbar-track': true,
  'body::-webkit-scrollbar-thumb': true,
  'body::-webkit-scrollbar-button': true
});
