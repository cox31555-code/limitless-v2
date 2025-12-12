'use client';

import React from 'react';
import styles from './contentWrapper.module.css';

const ContentWrapper = ({
  children,
  maxWidth = '680px',
  gap = '3rem',
  paddingRight = '100px',
  as: Component = 'div',
  className = '',
}) => {
  return (
    <Component
      className={`${styles.wrapper} ${className}`}
      style={{
        '--content-max-width': maxWidth,
        '--content-gap': gap,
        '--content-padding-right': paddingRight,
      }}
    >
      {children}
    </Component>
  );
};

export default ContentWrapper;
