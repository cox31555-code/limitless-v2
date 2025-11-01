import { useState, useEffect, useRef, useId } from "react";

// Global state to track which dropdown is currently open
let currentOpenDropdown = null;
const dropdownListeners = new Set();

// Custom hook to manage dropdown singleton behavior
export const useDropdownManager = () => {
  const [isOpen, setIsOpen] = useState(false);
  const id = useId();
  const dropdownId = useRef(id);

  const openDropdown = () => {
    // Close any currently open dropdown
    if (currentOpenDropdown && currentOpenDropdown !== dropdownId.current) {
      // Notify other dropdowns to close
      dropdownListeners.forEach((listener) => {
        if (listener.id !== dropdownId.current) {
          listener.close();
        }
      });
    }

    // Set this dropdown as the currently open one
    currentOpenDropdown = dropdownId.current;
    setIsOpen(true);
  };

  const closeDropdown = () => {
    if (currentOpenDropdown === dropdownId.current) {
      currentOpenDropdown = null;
    }
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    if (isOpen) {
      closeDropdown();
    } else {
      openDropdown();
    }
  };

  // Register this dropdown instance
  useEffect(() => {
    const currentId = dropdownId.current;
    const listener = {
      id: currentId,
      close: () => setIsOpen(false),
    };

    dropdownListeners.add(listener);

    // Cleanup on unmount
    return () => {
      dropdownListeners.delete(listener);
      if (currentOpenDropdown === currentId) {
        currentOpenDropdown = null;
      }
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // This will be handled by the dropdown component itself
      // by checking if the click is outside its container
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  return {
    isOpen,
    openDropdown,
    closeDropdown,
    toggleDropdown,
    dropdownId: dropdownId.current,
  };
};
