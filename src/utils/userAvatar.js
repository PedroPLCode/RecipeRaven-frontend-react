import Avatar from "@mui/material/Avatar";
import React from "react";

export default function UserAvatar({ userName, userPicture, onClick }) {
  return (
    <Avatar 
      src={userPicture}
      {...(!userPicture && stringAvatar(userName))} 
      onClick={() => onClick()} 
    />
  );
}

function stringToColor(string) {

  if (!string) {
    return '#000';
  }

  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  const nameParts = name.split(" ");
  
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: nameParts.length > 1
      ? `${nameParts[0][0]}${nameParts[1][0]}`
      : `${nameParts[0][0]}`,
  };
}