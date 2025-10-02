import React from "react";
import { Button } from "primereact/button";
import "./Button.css";

export default function Custom_Button({ 
  text, 
  icon, 
  className, 
  type,
  ...props 
}) {
  return (
    <div className="button-container">
    <Button
      label={text}
      icon={icon}
      className={className}
      type={type}
      {...props}
    />
  </div>
  );
}
