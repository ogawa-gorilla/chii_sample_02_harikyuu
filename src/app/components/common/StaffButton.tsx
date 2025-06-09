import { User } from '@/app/types/user';
import { ReactNode } from 'react';
import { Button } from 'react-bootstrap';

interface StaffButtonProps {
  staff: User;
  onClick?: (staffId: string) => void;
  children?: ReactNode;
  className?: string;
  variant?: string;
  size?: 'sm' | 'lg';
}

export default function StaffButton({
  staff,
  onClick,
  children,
  className = "py-3",
  variant = "outline-primary",
  size = "lg"
}: StaffButtonProps) {
  const handleClick = () => {
    if (onClick) {
      onClick(staff.id);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      style={{
        fontSize: '18px',
        fontWeight: 'bold',
        borderColor: staff.themeColor,
        color: staff.themeColor,
        minHeight: '60px'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = staff.themeColor;
        e.currentTarget.style.color = 'white';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
        e.currentTarget.style.color = staff.themeColor;
      }}
      onClick={handleClick}
    >
      {children || `${staff.name}の予約を作成する`}
    </Button>
  );
} 