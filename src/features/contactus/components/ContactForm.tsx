import { useContactForm } from "../hooks/useContactForm";

const ContactForm = () => {
  const { form, handleChange, handleSubmit, loading, success, error } = useContactForm();

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email Address"
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <input
        type="tel"
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder="Mobile Number"
        className="w-full p-2 border rounded"
      />
      <textarea
        name="message"
        value={form.message}
        onChange={handleChange}
        rows={5}
        placeholder="Message"
        className="w-full p-2 border rounded"
      ></textarea>

      <div>
        <input type="checkbox" required id="notRobot" />{" "}
        <label htmlFor="notRobot">I'm not a robot</label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-900 text-white px-6 py-2 rounded hover:bg-blue-800 disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit"}
      </button>

      {success && <p className="text-green-600 mt-2">{success}</p>}
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </form>
  );
};

export default ContactForm;
