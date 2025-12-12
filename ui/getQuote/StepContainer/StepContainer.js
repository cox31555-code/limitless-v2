'use client';

import React from 'react';
import styles from './stepContainer.module.css';

const StepContainer = ({
  title,
  children,
  gap = '2.8rem',
  maxWidth = '680px',
  paddingRight = '100px',
  className = '',
  showDivider = true,
}) => {
  return (
    <div className={`${styles.container} ${className}`} style={{ '--step-gap': gap }}>
      {title && (
        <div className={styles.stepTitle} style={{ '--show-divider': showDivider ? '1' : '0' }}>
          <h2 className={styles.stepTitleText}>{title}</h2>
        </div>
      )}
      <div
        className={styles.contentWrapper}
        style={{
          '--max-width': maxWidth,
          '--padding-right': paddingRight,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default StepContainer;
