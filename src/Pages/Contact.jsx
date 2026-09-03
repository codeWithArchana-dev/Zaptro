import React, { useRef } from "react";
import emailjs from "emailjs-com";

const Contact = () => {
  const form = useRef();

  const sendEmail = async (e) => {
    e.preventDefault();

    const name = form.current["user_name"].value;
    const email = form.current["user_email"].value;
    const message = form.current["message"].value;

    try {
      await emailjs.sendForm(
        "service_589o4gy", // apna service ID
        "template_w04jhhm", // apna template ID
        form.current,
        "7ikV-7EjvjPxL8HG9", // apna public key
      );

      alert("Message sent Successfully");
      form.current.reset();
    } 
    catch (error) {
         console.error("EmailJS/Firebase Error:", error);

           alert("Something went wrong!\nStatus: " )
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center px-4 py-10">
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-10 w-full max-w-5xl">
        <h2 className="md:text-4xl text-2xl font-bold text-white text-center  md:mb-10 whitespace-nowrap">
          Get in Touch with <span className="text-red-400">Zaptro</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Info Section */}
          <div className="text-white space-y-6">
            <div>
              <h3 className=" md:text-2xl text-lg font-semibold">
                Contact Info
              </h3>
              <p className="text-gray-300">
                Have a question or need support? We're here to help you with
                your electronics journey.
              </p>
            </div>
            <div>
              <p>
                <strong>📍 Address:</strong> Khora Colony Noida sector 62 ,
                India
              </p>
              <p>
                <strong>📧 Email:</strong> archana10122004@gmail.com
              </p>
              <p>
                <strong>📞 Phone:</strong> +91 8707586243
              </p>
            </div>
          </div>

          {/* Form Section */}
          <form className="space-y-6" ref={form}
            onSubmit={sendEmail}>
            <div>
              <label className="block text-white mb-1">Your Name</label>
              <input
              name = 'user_name'
                type="text"
                placeholder="Enter Your Name"
                className="w-full px-4 py-2 bg-white/20 border border-white/30 text-white 
                rounded-xl placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-white mb-1">Email Address</label>
              <input
              name ='user_email'
                type="email"
                placeholder="Enter Your Email"
                className="w-full px-4 py-2 bg-white/20 border border-white/30 text-white 
                rounded-xl placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-white mb-1">Your Message</label>
              <textarea
              name= "message"
                rows="4"
                placeholder="Type your message..."
                className="w-full px-4 py-2 bg-white/20 border border-white/30 text-white rounded-xl 
                placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-500 to-purple-500 
              text-white font-semibold py-2 rounded-xl hover:opacity-90 transition-all duration-300"
            >
              Send Message 🚀
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
