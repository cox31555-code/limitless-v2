'use client';

import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useLoading } from '@/contexts/LoadingContext';
import ErrorModal from './ErrorModal';

const messageTemplates = {
  driver: {
    title: 'Unable to Update Driver Details',
    message: "We're unable to process the driver update at this time. This may be due to system maintenance or policy restrictions.",
    contactText: 'Please contact our support team who will be happy to assist you with updating driver details.',
  },
  vehicle: {
    title: 'Unable to Make These Changes',
    message: "We're unable to process your vehicle update at this time. This may be due to system maintenance or policy restrictions.",
    contactText: 'Please contact our support team who will be happy to assist you with these changes.',
  },
  replace: {
    title: 'Unable to Change Vehicle',
    message: "We're unable to process your vehicle change at this time. This may be due to system maintenance or policy restrictions.",
    contactText: 'Please contact our support team who will be happy to assist you with changing your vehicle.',
  },
  policy: {
    title: 'Unable to Cancel Policy',
    message: "We're unable to process your policy cancellation at this time. This may be due to system maintenance or policy restrictions.",
    contactText: 'Please contact our support team who will be happy to assist you with cancelling your policy.',
  },
};

const UnableToUpdateModal = ({
  isOpen,
  onClose,
  type = 'driver', // 'driver', 'vehicle', 'replace', 'policy'
  messages = null, // Optional override for custom messages
  onContactSupport = null, // Optional custom handler
}) => {
  const router = useRouter();
  const { showLoading } = useLoading();

  // Get message template for the type
  const template = messages || messageTemplates[type] || messageTemplates.driver;

  // Handle contact support button click
  const handleContactSupport = useCallback(() => {
    onClose();
    if (onContactSupport) {
      onContactSupport();
    } else {
      showLoading();
      router.push('/contact');
    }
  }, [onClose, onContactSupport, showLoading, router]);

  // Handle close button click
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <ErrorModal
      isOpen={isOpen}
      onClose={handleClose}
      title={template.title}
      message={template.message}
      contactText={template.contactText}
      icon="info"
      variant="unable-to-update"
      primaryAction={{
        label: 'Contact Support',
        onClick: handleContactSupport,
      }}
      secondaryAction={{
        label: 'Close',
        onClick: handleClose,
      }}
    />
  );
};

export default UnableToUpdateModal;
