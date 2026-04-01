import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './Dropdown.module.scss';

export interface DropdownItem {
  label: string;
  onClick: () => void;
  danger?: boolean;
}

interface DropdownProps {
  items: DropdownItem[];
  children: React.ReactNode;
  onClose?: () => void;
}

export const Dropdown = ({ items, children, onClose }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    if (!isOpen) {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const isMobile = window.innerWidth <= 600;

        const dropdownWidth = isMobile ? 160 : 200;
        const dropdownHeight = isMobile
          ? items.length === 1
            ? 54
            : 137
          : items.length === 1
            ? 54
            : 146;

        let left = rect.right - dropdownWidth;

        if (left + dropdownWidth > window.innerWidth) {
          left = window.innerWidth - dropdownWidth - 8;
        }

        if (left < 8) {
          left = 8;
        }

        const spaceBelow = window.innerHeight - rect.bottom;
        let top = rect.bottom + 8;

        if (spaceBelow < dropdownHeight) {
          top = rect.top - dropdownHeight - 8;

          if (top < 8) {
            top = rect.bottom + 8;
          }
        }

        setDropdownPosition({
          top: top,
          left: left,
        });
      }
    }
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
    onClose?.();
  };

  const handleItemClick = (item: DropdownItem) => {
    item.onClick();
    closeDropdown();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        const dropdownElement = document.querySelector('.dropdown-fixed');
        if (
          dropdownElement &&
          !dropdownElement.contains(event.target as Node)
        ) {
          closeDropdown();
        } else if (!dropdownElement) {
          closeDropdown();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScrollOrResize = () => {
      if (isOpen) {
        closeDropdown();
      }
    };

    window.addEventListener('scroll', handleScrollOrResize);
    window.addEventListener('resize', handleScrollOrResize);

    return () => {
      window.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleScrollOrResize);
    };
  }, [isOpen]);

  if (items.length === 0) {
    return <>{children}</>;
  }

  return (
    <div className={styles.dropdownWrapper}>
      <div
        ref={buttonRef}
        onClick={toggleDropdown}
        className={styles.dropdownTrigger}
      >
        {children}
      </div>

      {isOpen &&
        createPortal(
          <div
            className={`${styles.dropdown} dropdown-fixed`}
            data-items-count={items.length}
            style={{
              position: 'fixed',
              top: `${dropdownPosition.top}px`,
              left: `${dropdownPosition.left}px`,
              zIndex: 9999,
            }}
          >
            <div className={styles.dropdownContent}>
              {items.map((item, index) => (
                <button
                  key={index}
                  className={`${styles.dropdownItem} ${item.danger ? styles.danger : ''}`}
                  onClick={() => handleItemClick(item)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};
