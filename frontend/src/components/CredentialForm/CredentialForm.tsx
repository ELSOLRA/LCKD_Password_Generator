import React from "react";
import "./credentialForm.scss";

interface CredentialFormProps {
  onSubmit: (data: { www: string; username: string; password: string }) => void;
}

const CredentialForm: React.FC<CredentialFormProps> = ({ onSubmit }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      www: formData.get("www") as string,
      username: formData.get("username") as string,
      password: formData.get("password") as string,
    };
    onSubmit(data);
  };

  return (
    <form className="credential-form" onSubmit={handleSubmit}>
      <input type="text" name="www" placeholder="WWW" required />
      <input type="text" name="username" placeholder="USERNAME" required />
      <input
        type="password"
        name="password"
        placeholder="SECURE PASSWORD"
        required
      />
      <button type="submit">CREATE LCKD</button>
    </form>
  );
};

export default CredentialForm;
