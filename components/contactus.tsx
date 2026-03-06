import React, { useState, useRef } from "react";
import emailjs from "emailjs-com";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const form = useRef<HTMLFormElement>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.current) {
      emailjs
        .sendForm(
          import.meta.env.VITE_EMAILJS_SERVICE_ID!,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID!,
          form.current,
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY!
        )
        .then(
          () => {
            alert("Message sent successfully!");
            setFormData({ name: "", email: "", message: "" });
          },
          () => {
            alert("Failed to send message. Please try again later.");
          }
        );
    }
  };

  return (
    <section id="contact" className="opacity-0 w-full py-20 flex flex-col items-center">
      <div className="neo-box w-full max-w-5xl bg-white dark:bg-zinc-800 p-8 md:p-12 relative">
        <div className="absolute -top-6 -left-6 bg-neo-cyan border-4 border-black dark:border-white p-3 z-10 hidden md:block">
          <h2 className="text-3xl font-black uppercase text-black">Contact Me</h2>
        </div>
        <div className="md:hidden bg-neo-cyan border-4 border-black dark:border-white p-3 mb-6 block w-fit">
          <h2 className="text-3xl font-black uppercase text-black">Contact Me</h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 mt-4">
          <div className="w-full lg:w-2/3">
            <form
              ref={form}
              onSubmit={handleSubmit}
              className="flex flex-col gap-6"
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="font-bold text-black dark:text-white uppercase text-lg">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="neo-box p-4 text-black bg-gray-50 focus:bg-white focus:outline-none"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-bold text-black dark:text-white uppercase text-lg">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="neo-box p-4 text-black bg-gray-50 focus:bg-white focus:outline-none"
                  placeholder="Your Email"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="font-bold text-black dark:text-white uppercase text-lg">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="neo-box p-4 text-black bg-gray-50 focus:bg-white focus:outline-none min-h-[150px]"
                  placeholder="Your Message..."
                  required
                />
              </div>
              <button
                type="submit"
                className="neo-btn bg-neo-yellow text-black px-8 py-4 font-black uppercase text-xl w-full"
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="w-full lg:w-1/3 flex flex-col gap-6">
            <div className="neo-box bg-neo-orange p-6 flex flex-col items-center justify-center text-center gap-4">
              <h3 className="font-black uppercase text-black text-2xl">Connect</h3>
              <p className="text-black font-semibold">Reach out to me on social media!</p>
              
              <div className="flex gap-4 mt-2">
                <a
                  href="https://www.linkedin.com/in/ojaswi-bhardwaj-962393281/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neo-btn bg-white p-3 flex"
                  aria-label="LinkedIn Profile"
                >
                  <FaLinkedin size={32} className="text-black" />
                </a>
                <a
                  href="https://github.com/ojaswi1234"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neo-btn bg-white p-3 flex"
                  aria-label="GitHub Profile"
                >
                  <FaGithub size={32} className="text-black" />
                </a>
                <a
                  href="mailto:ojaswideep2020@gmail.com"
                  className="neo-btn bg-white p-3 flex"
                  aria-label="Email"
                >
                  <FaEnvelope size={32} className="text-black" />
                </a>
              </div>
            </div>

            <div className="neo-box bg-neo-green p-6 mt-auto">
              <h3 className="font-black uppercase text-black text-xl mb-3">Get In Touch</h3>
              <p className="text-black font-mono text-sm">+91-7840089727</p>
              <p className="text-black font-mono text-sm break-words">ojaswideep2020@gmail.com</p>
              <p className="text-black text-sm mt-3 font-mono border-t-2 border-black pt-2">Responds within 48 hours.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
