import { useState } from "react";
import { Input } from "./Input";
import { Button } from "./Button";

export function PasswordInput({
  id,
  name,
  value,
  placeholder,
  disabled = false,
  onChange,
  autoComplete,
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="password-input-wrapper">
      <Input
        id={id}
        name={name}
        type={visible ? "text" : "password"}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
        autoComplete={autoComplete}
      />

      <Button
        type="button"
        variant="ghost"
        disabled={disabled}
        onClick={() => setVisible((current) => !current)}
      >
        {visible ? "Hide" : "Show"}
      </Button>
    </div>
  );
}