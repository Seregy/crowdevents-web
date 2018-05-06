import React from "react";
import { Link } from 'react-router-dom'

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faHeart from '@fortawesome/fontawesome-free-regular/faHeart';
import faCircle from '@fortawesome/fontawesome-free-solid/faCircle';

import '../css/FollowIcon.css';

function FollowIcon(props) {
  const size = props.size || 1;
  const circleTransform = 'inverse grow-' + (12 * size);
  const heartTransform = 'inverse grow-' + (1 * size);

  return (
    <span className="follow-icon fa-layers fa-fw">
      <FontAwesomeIcon className="circle-icon" icon={faCircle} transform={circleTransform} />
      <Link to={'/follow'}><FontAwesomeIcon className="heart-icon" icon={faHeart} transform={heartTransform}/></Link>
    </span>
  );
}

export default FollowIcon;