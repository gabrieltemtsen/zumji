import { Button, Icon } from "konsta/react";
import React, { CSSProperties } from "react";

interface CustomButtonProps {
  icon?: string;
  iconPosition?: "startIcon" | "endIcon";
  label?: string;
  href?: string;
  style?: CSSProperties;
  iconStyle?: CSSProperties;
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  attributes?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  onClick?:
    | ((event: React.MouseEvent<HTMLButtonElement>) => void)
    | undefined;
  children?: React.ReactNode;
  color?: "primary" | "secondary" | "success" | "warning" | "danger";
  variant?: "contained" | "outlined" | "text";
  customType?:
    | "buttonContained"
    | "buttonCustomized"
    | "buttonColored"
    | "buttonFab"
    | "buttonFabSizes"
    | "buttonIcon"
    | "buttonSizes"
    | "buttonOutlined"
    | "buttonWithIconAndLabel"
    | "buttonText";
}

const CustomButton = ({ children, ...props }: CustomButtonProps) => {
  const {
    icon,
    iconPosition,
    style,
    label,
    href,
    iconStyle,
    size,
    disabled,
    attributes,
    onClick,
    color,
    variant,
  } = props;

  const renderIcon = () => {
    if (!icon) return null;
    return (
      <Icon
        className="icon"
        style={{ ...iconStyle }}
        material={icon} 
      />
    );
  };

  return (
    <Button
      {...attributes}
      href={href}
      style={{ ...style }}
      className={`button-${variant || "default"} button-${color || "primary"} ${
        size ? `button-${size}` : ""
      }`}
      disabled={disabled}
      onClick={onClick}
    >
      {iconPosition === "startIcon" && renderIcon()}
      {label && <span className="label">{label}</span>}
      {children}
      {iconPosition === "endIcon" && renderIcon()}
    </Button>
  );
};

export default CustomButton;
