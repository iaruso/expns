import React from 'react';

const Logo = ({ className }) => {
  return (
    <svg className={className} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_236_945)">
        <path d="M3 12C4.65685 12 6 10.6569 6 9C6 7.34315 4.65685 6 3 6C1.34315 6 0 7.34315 0 9C0 10.6569 1.34315 12 3 12Z" fill="#5163EB"/>
        <path d="M9 6C10.6569 6 12 4.65685 12 3C12 1.34315 10.6569 0 9 0C7.34315 0 6 1.34315 6 3C6 4.65685 7.34315 6 9 6Z" fill="#3A4AD9"/>
        <path d="M3.75 0H2.25C1.00736 0 0 1.00736 0 2.25V3.75C0 4.99264 1.00736 6 2.25 6H3.75C4.99264 6 6 4.99264 6 3.75V2.25C6 1.00736 4.99264 0 3.75 0Z" fill="#2433C2"/>
        <path d="M9.75 6H8.25C7.00736 6 6 7.00736 6 8.25V9.75C6 10.9926 7.00736 12 8.25 12H9.75C10.9926 12 12 10.9926 12 9.75V8.25C12 7.00736 10.9926 6 9.75 6Z" fill="#687DFC"/>
      </g>
      <defs>
        <clipPath id="clip0_236_945">
          <rect width="12" height="12" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  );
};

export default Logo;
