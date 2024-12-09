import React from 'react';
import { Image, StyleSheet } from 'react-native';

const Icons = ({ type }) => {

  let imageSource;
  let iconStyle = [styles.icon];

  switch (type) {
    case 'advice':
      imageSource = require('../assets/panel/advice.png');
      // iconStyle.push(styles.active);
      break;
    case 'plan':
      imageSource = require('../assets/panel/plan.png');
      // iconStyle.push(styles.active);
      break;
    case 'cream':
      imageSource = require('../assets/panel/cream.png');
      // iconStyle.push(styles.active);
      break;
    case 'tracker':
      imageSource = require('../assets/panel/tracker.png');
      // iconStyle.push(styles.active);
      break;
    case 'game':
      imageSource = require('../assets/panel/game.png');
      // iconStyle.push(styles.active);
      break;
    case 'close':
        imageSource = require('../assets/common/close.png');
        iconStyle.push(styles.pink);
    break;
    case 'settings':
      imageSource = require('../assets/common/settings.png');
    break;
    case 'music':
      imageSource = require('../assets/common/music.png');
    break;
    case 'back':
        imageSource = require('../assets/common/back.png');
        iconStyle.push(styles.darkPink);
    break;
    case 'share':
      imageSource = require('../assets/common/share.png');
    break;
    case 'crown-pink':
      imageSource = require('../assets/common/crown-pink.png');
    break;
    case 'home':
      imageSource = require('../assets/common/home.png');
    break;
    case 'arrow':
      imageSource = require('../assets/common/arrow.png');
    break;
    case 'camera':
      imageSource = require('../assets/common/camera.png');
    break;
    case 'calendar':
      imageSource = require('../assets/common/calendar.png');
    break;
    case 'delete':
      imageSource = require('../assets/common/delete.png');
    break;
    case 'task':
      imageSource = require('../assets/common/task.png');
    break;
    case 'play':
      imageSource = require('../assets/common/play.png');
      iconStyle.push(styles.contain);
    break;
    case 'start':
      imageSource = require('../assets/common/start.png');
      iconStyle.push(styles.contain);
    break;
    case 'finish':
      imageSource = require('../assets/common/finish.png');
      iconStyle.push(styles.contain);
    break;
  }

  return (
    <Image 
      source={imageSource} 
      style={iconStyle} 
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  active: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    tintColor: '#fff',
  },
  pink: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    tintColor: '#fa7fd9',
  },
  darkPink: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    tintColor: '#C80064',
  },
  contain: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  }
});

export default Icons;
