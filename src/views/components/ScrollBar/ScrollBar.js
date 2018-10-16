import React from 'react';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import { compose, withStateHandlers } from 'recompose';

const ScrollbarsComponent = ({
  children,
  trackVerticalInfoPage,
  trackVerticalStyle,
  trackVerticalThumbStyle,
  trackVerticalHover,
  trackVerticalOut,
  autoHeight = false,
  autoHeightMin = 0,
  autoHeightMax = 0
}) => (
  <Scrollbars
    autoHeight={autoHeight}
    autoHeightMin={autoHeightMin}
    autoHeightMax={autoHeightMax}
    renderView={({ style, ...props }) => (<div
      className="scroll-view"
      id="scroll-view"
      {...props}
      style={{
        ...style
      }}
    />)}
    renderTrackVertical={({ style, ...props }) => (<div
      {...props}
      className="scroll-view-track-vertical"
      style={{
        ...style,
        ...trackVerticalStyle,
        ...trackVerticalInfoPage
      }}
      onMouseOver={e => trackVerticalHover(e)}
      onMouseOut={trackVerticalOut}
      onFocus={e => trackVerticalHover(e)}
      onBlur={trackVerticalOut}
    />)}
    renderThumbVertical={({ style, ...props }) => (<div
      {...props}
      className="thumb-vertical"
      style={{
        ...style,
        ...trackVerticalThumbStyle,
        backgroundColor: '#A0A0A0'
      }}
    />)}
    renderTrackHorizontal={({ style, ...props }) => <div {...props} style={{ ...style, marginBottom: '-18px' }} />}
    autoHide
  >
    {children}
  </Scrollbars>
);

export default compose(
  connect(() => ({
  })),
  withStateHandlers(({
    initTrackVerticalStyle = {
      position: 'absolute',
      width: 3,
      transition: 'height 0.4s, width 0.3s, opacity 0.2s',
      opacity: '0',
      right: 2,
      bottom: 2,
      top: 2,
      borderRadius: 3
    },
    initTrackVerticalThumbStyle = {
      position: 'relative',
      display: 'block',
      width: '100 %',
      cursor: 'pointer',
      borderRadius: 3
    }
  }) => ({
    trackVerticalStyle: initTrackVerticalStyle,
    trackVerticalThumbStyle: initTrackVerticalThumbStyle
  }), {
    trackVerticalHover: ({ trackVerticalStyle }) => e => {
      let targetHeight = '0px';

      // this is to check if it has a height of thumb-vertical
      if (e.target.className === 'thumb-vertical') {
        targetHeight = e.target.style.height;
      } else if (e.target.getElementsByClassName('thumb-vertical')[0]) {
        targetHeight = e.target.getElementsByClassName('thumb-vertical')[0].style.height;
      }

      const trackVerticalhoverValues = {
        ...trackVerticalStyle,
        width: 8,
        backgroundColor: (targetHeight === '0px') ? 'transparent' : '#EDEDED',
        borderRadius: 6
      };

      return ({
        trackVerticalStyle: trackVerticalhoverValues
      });
    },
    trackVerticalOut: ({ trackVerticalStyle }) => () => {
      const trackVerticalhoverValues = {
        ...trackVerticalStyle,
        width: 3,
        backgroundColor: 'transparent',
        borderRadius: 3
      };

      return ({
        trackVerticalStyle: trackVerticalhoverValues
      });
    }
  })
)(ScrollbarsComponent);
