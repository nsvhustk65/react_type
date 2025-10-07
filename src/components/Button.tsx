import React, { useState } from "react";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  color?: string;
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const ColorButton: React.FC<ButtonProps> = ({ label, onClick, color }) => {
  const [btnColor, setBtnColor] = useState<string>(color || getRandomColor());
  const [showPicker, setShowPicker] = useState(false);

  const handleClick = () => {
    setShowPicker(true);
    if (onClick) onClick();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBtnColor(e.target.value);
    setShowPicker(false);
  };

  const handleBlur = () => {
    if (showPicker) {
      setBtnColor(getRandomColor());
      setShowPicker(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        style={{
          backgroundColor: btnColor,
          color: "#fff",
          padding: "10px 20px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        {label}
      </button>

      {showPicker && (
        <input
          type="color"
          autoFocus
          onChange={handleChange}
          onBlur={handleBlur}
          style={{ marginLeft: "10px" }}
        />
      )}
    </div>
  );
};

export default ColorButton;
