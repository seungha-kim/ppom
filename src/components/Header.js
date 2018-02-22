import React, { Component } from 'react';
// import { Menu } from 'semantic-ui-react'
import styled from 'styled-components';

const Wrap = styled.header`
  display:flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f03e3e;
  color:#181818;
  padding:10px;
`;

export const Button = styled.button`
  display: inline-block;
  margin:0;
  padding:0;
  cursor:pointer;
`;
export const Link = Button.withComponent('a');

const HeaderLink = Link.extend`
  display:block;
  padding:10px;
  font-size: 16px;
  border-radius: 2px;
  color: #fff;
  &:hover, &:focus, &:active {
    color: #fff;
  }
`;

const Title = styled.h1`
  margin:0;
  padding:0;
  font-weight:normal;
  font-size: 20px;
  color:#fff;
`;

export default class Header extends Component {
  render() {
    return (
      <Wrap>
        <HeaderLink href="/make-goal">추가</HeaderLink>
        <Title>목표</Title>
        <HeaderLink>기록</HeaderLink>
      </Wrap>
    );
  }
}
