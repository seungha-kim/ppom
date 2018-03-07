import React, { Component } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import stampOn from './Timer/img/tomato_active_70x76.png';
import stampOff from './Timer/img/tomato_deactive_70x76.png';

import Header from './Header';

const redTheme = {
  bg: '#f03e3e',
};
const greenTheme = {
  bg: '#556bb3',
};
const blueTheme = {
  bg: '#099268',
};
const Wrap = styled.div`
  background-color: ${props => props.theme.bg};
`;
Wrap.defaultProps = {
  theme: {
    bg: '#fff',
  },
};
const TimerWrap = styled.div`
  position: absolute;
  top: 56px;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: ${props => props.theme.bg};
`;
TimerWrap.defaultProps = {
  theme: {
    bg: '#f03e3e',
  },
};
const TimerTitle = styled.h1`
  width: 100%;
  font-size: 2em;
  padding: 3.5em 20px 0;
  color: #fff;
  text-align:center;
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const SetTimer = styled.p`
  display: block;
  font-size: 6.5em;
  color: #fff;
  font-weight: 100;
  margin: 0;
  padding: 0px 20px;
`;
const CurrStampWrap = styled.div`
  width: 100%;
  text-align: center;
  padding: 20px;
`;
const TimerButtonWrap = styled.div`
`;
const TimerButton = styled.button`
  position: absolute;
  width: 120px;
  height: 120px;
  bottom: 10%;
  left: 50%;
  background-color: transparent;
  font-size: 25px;
  transform: translateX(-50%);
  border-radius: 50%;
  border: 3px solid #fff;
  color: #fff;
`;
const stampStyle = { width: '50px', height: '54px', margin: '5px' };

function formatTime(time) {
  if (!time) return '';
  const minutes = Math.floor(time / 60);
  time -= minutes * 60;
  const seconds = parseInt(time % 60, 10);

  return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10
    ? `0${seconds}`
    : seconds}`;
}

function getTheme(type) {
  switch (type) {
    case 'PPOM_TIMER':
      return redTheme;
    case 'BREAK_TIMER':
      return blueTheme;
    case 'LONG_BREAK_TIMER':
      return greenTheme;
    default:
      return { bg: '#fff' };
  }
}

export default class Timer extends Component {
  // componentWillReceiveProps(nextProps) {
  //   const currentProps = this.props;
  //   if (!currentProps.isPlaying && nextProps.isPlaying) {
  //     const timerInterval = setInterval(() => {
  //       currentProps.addSecond();
  //     }, 1000);
  //     this.setState({
  //       interval: timerInterval,
  //     });
  //   } else if (currentProps.isPlaying && !nextProps.isPlaying) {
  //     clearInterval(this.state.interval);
  //   }
  // }

  // componentWillReceiveProps(nextProps) {
  //   const currentProps = this.props;
  //   if (!currentProps.isPlaying && nextProps.isPlaying) {
  //     currentProps.addSecond();
  //   } else {
  //     console.log(nextProps.elapsedTime);
  //   }
  // }

  render() {
    const {
      isPlaying,
      elapsedTime,
      timerDetail,
      startTimer,
      pauseTimer,
      restartTimer,
      timerType,
      ppomTimes,
    } = this.props;
    const {
      ppomtime, goal, longbreaktime, breaktime, quote,
    } = timerDetail;
    const theme = getTheme(timerType);
    const leftFunc = () => {
      this.props.history.goBack();
    };
    return (
      <ThemeProvider theme={theme}>
        <div>
          {(timerType === 'PPOM_TIMER') && (
            <Wrap>
              <Header title="집중 시간" leftLabel="뒤로" leftFunc={leftFunc} rightLabel="다시" rightFunc={restartTimer} theme="white" />
              <TimerWrap style={redTheme}>
                <TimerTitle>{goal}</TimerTitle>
                <SetTimer> {formatTime((ppomtime * 60) - elapsedTime)}</SetTimer>
                <CurrStampWrap>
                  {
                    [...Array((ppomTimes > 5) ? 5 : ppomTimes)].map((e, i) => (
                      <img src={stampOn} alt={`${i}ppom`} key={i} style={stampStyle} />
                    ))
                  }
                  {(ppomTimes < 5) && (
                    <img src={stampOff} alt="현재뽐" style={stampStyle} />)}
                  {(ppomTimes > 5) && (
                    <span>x {ppomTimes}</span>
                  )}
                </CurrStampWrap>
                <TimerButtonWrap>
                  {!isPlaying && (
                    <TimerButton onClick={startTimer} >시작</TimerButton>
                  )}
                  {isPlaying && (
                    <TimerButton onClick={pauseTimer} >일시정지</TimerButton>
                  )}
                </TimerButtonWrap>
              </TimerWrap>
            </Wrap>
          )}
          {(timerType === 'BREAK_TIMER') && (
            <Wrap>
              <Header title="휴식 시간" leftLabel="뒤로" leftFunc={leftFunc} theme="white" />
              <TimerWrap>
                <TimerTitle>{quote}</TimerTitle>
                <SetTimer> {formatTime((breaktime * 60) - elapsedTime)}</SetTimer>
                <TimerButtonWrap>
                  {!isPlaying && (
                    <TimerButton onClick={startTimer} >시작</TimerButton>
                  )}
                  {isPlaying && (
                    <TimerButton onClick={pauseTimer} >일시정지</TimerButton>
                  )}
                </TimerButtonWrap>
              </TimerWrap>
            </Wrap>
          )}
          {(timerType === 'LONG_BREAK_TIMER') && (
            <Wrap>
              <Header title="긴 휴식 시간" leftLabel="뒤로" leftFunc={leftFunc} theme="white" />
              <TimerWrap>
                <TimerTitle>{quote}</TimerTitle>
                <SetTimer> {formatTime((longbreaktime * 60) - elapsedTime)}</SetTimer>
                <TimerButtonWrap>
                  {!isPlaying && (
                    <TimerButton onClick={startTimer} >시작</TimerButton>
                  )}
                  {isPlaying && (
                    <TimerButton onClick={pauseTimer} >일시정지</TimerButton>
                  )}
                </TimerButtonWrap>
              </TimerWrap>
            </Wrap>
          )}
        </div>
      </ThemeProvider>
    );
  }
}
