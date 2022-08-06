import styled from 'styled-components'

export const Candy = styled('div')<{ color: string; hasBorder?: boolean }>`
  /* border-radius: 5px; */
  background: rgba(${(props) => props.color}, 0.8);
  border: ${(props) => (props.hasBorder === false ? '0px solid' : '0.1px solid')};
  border-bottom-color: rgba(${(props) => props.color}, 0.1);
  border-right-color: rgba(${(props) => props.color}, 1);
  border-top-color: rgba(${(props) => props.color}, 1);
  border-left-color: rgba(${(props) => props.color}, 0.3);
  width: 70px;
  height: 70px;
`
