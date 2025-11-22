'use client';

import { useEffect } from 'react';
import styles from './chatWidget.module.css';

export default function ChatWidget() {
  useEffect(() => {
    const chatButton = document.getElementById('custom-chat-button');
    const chatWindow = document.getElementById('custom-chat-window');
    const closeChat = document.getElementById('close-chat');

    if (chatButton && chatWindow && closeChat) {
      chatButton.onclick = () => {
        chatWindow.style.display = 'flex';
        chatButton.style.display = 'none';
      };

      closeChat.onclick = () => {
        chatWindow.style.display = 'none';
        chatButton.style.display = 'flex';
      };
    }
  }, []);

  return (
    <>
      <div id="custom-chat-button" className={styles.chatButton}>
        💬
      </div>

      <div id="custom-chat-window" className={styles.chatWindow}>
        <div id="chat-header" className={styles.chatHeader}>
          <span>Chat Support</span>
          <button id="close-chat" className={styles.closeButton}>
            ✕
          </button>
        </div>

        <iframe
          id="tawk-frame"
          src="https://embed.tawk.to/69215735430d9c1961f493f7/1jal3pauh"
          frameBorder="0"
          className={styles.tawkFrame}
        />
      </div>
    </>
  );
}
