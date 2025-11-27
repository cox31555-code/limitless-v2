"use client";

import { useEffect } from "react";
import styles from "./downloadedDocumentsModal.module.css";

export default function DownloadedDocumentsModal({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Finding downloaded documents on your device</h2>
          <button onClick={onClose} className={styles.closeButton} aria-label="Close">
            ×
          </button>
        </div>

        <div className={styles.content}>
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Where are my downloaded documents stored on my iOS device?</h3>
            <p className={styles.text}>
              When you download a document in the app or MyAccount, you'll be asked where you want to save it. Downloaded documents are usually saved in the Files app in the iCloud Drive folder, under 'Downloads'.
            </p>
          </section>

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>How do I access the Files app to find my downloads?</h3>
            <p className={styles.text}>
              You can find the Files app on your home screen or by searching for it in the App Library. Tap the icon to open it, then go to 'Downloads.'
            </p>
          </section>

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>How do I delete a downloaded document I no longer need?</h3>
            <p className={styles.text}>
              Touch and hold the file to bring up the menu, then tap Delete. Or, tap the More button (three dots in a circle) in the top right corner of the screen, then tap Select. Select the files you want to delete, then tap the Delete button. If you're in List view, you can also swipe left on the file, and tap Delete.
            </p>
          </section>

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Where are my downloaded documents stored on my Android device?</h3>
            <p className={styles.text}>
              When you download a document in the app or MyAccount, you'll be asked where you want to save it. Downloaded documents are usually stored in the 'Downloads' folder. You can find this using the Files app or a file manager app on your Android device.
            </p>
          </section>

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>How do I access the Files app to find my downloads?</h3>
            <p className={styles.text}>
              Look for an app named 'Files', 'My Files', 'File Manager', or something similar on your device. Tap to open it and go to the 'Downloads' folder.
            </p>
          </section>

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>How do I delete a downloaded document I no longer need?</h3>
            <p className={styles.text}>
              Locate the document in your file manager app, long-press it, and select 'Delete' or use the delete/trash icon.
            </p>
          </section>

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Where do my downloaded files go when I download them in a web browser?</h3>
            <p className={styles.text}>
              Most web browsers save downloaded files to the 'Downloads' folder on your computer. This folder can usually be found using the File Explorer (Windows) or Finder (macOS).
            </p>
          </section>

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Can I view my download history in my web browser?</h3>
            <p className={styles.text}>
              Yes, most browsers allow you to view your download history. Usually, you can get to this by clicking on the 'Downloads' icon (often represented by a downward arrow) or by going to the browser menu and selecting 'Downloads.'
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
