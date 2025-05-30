import React from 'react';

const PlayerTrackNextIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="18" 
    height="18" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className="icon icon-tabler icons-tabler-outline icon-tabler-player-track-next"
    {...props}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M3 5v14l8 -7z" />
    <path d="M14 5v14l8 -7z" />
  </svg>
);

export default PlayerTrackNextIcon;
