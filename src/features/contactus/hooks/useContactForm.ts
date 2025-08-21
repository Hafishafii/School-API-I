import { useState } from "react";
import api from "../../../lib/api"; 

export function useContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await api.post("/enquiry/", {
        name: form.name,
        email: form.email,
        phone_number: form.phone, 
        message: form.message,
      });

      setSuccess(res.data.message || "Enquiry submitted successfully.");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err: any) {
      console.error("Error submitting enquiry:", err);
      setError(
        err.response?.data?.message || "Failed to submit enquiry. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return { form, handleChange, handleSubmit, loading, success, error };
}
