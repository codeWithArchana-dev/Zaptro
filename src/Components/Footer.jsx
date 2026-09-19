import React, { useState } from "react";
import { FaGithub, FaLinkedin, FaInstagram, FaGlobe } from "react-icons/fa";

const Footer = () => {
  const [suscribed, setSuscribed] = useState(false);
  const [email, setEmail] = useState("");

  const handleSuscribe = () => {
    if (email.trim() !== "") {
      setSuscribed(true);
    }
  };

  return (
    <footer className="bg-[#0f172a] text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          <div>
            <h2 className="text-2xl font-bold text-red-500 mb-4">Zaptro</h2>

            <p className="text-sm leading-6 text-gray-400">
              Powering Your World with the Best in Electronics.
            </p>
            <p className="text-sm text-gray-400">
              Email: archana10122004@gmail.com
            </p>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Customer Service
            </h3>

            <ul className="space-y-3 text-sm">
              <li className="hover:text-white cursor-pointer">Contact Us</li>

              <li className="hover:text-white cursor-pointer">
                Shipping & Returns
              </li>

              <li className="hover:text-white cursor-pointer">FAQs</li>

              <li className="hover:text-white cursor-pointer">
                Order Tracking
              </li>

              <li className="hover:text-white cursor-pointer">Size Guide</li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Connect With me
            </h3>

            <div className="flex gap-4">
              <a
                href="https://github.com/codeWithArchana-dev"
                className="text-gray-400 hover:text-white transition"
              >
                <FaGithub size={20} />
              </a>

              <a
                href=" https://linkedin.com/in/codewitharchu"
                className="text-gray-400 hover:text-white transition"
              >
                <FaLinkedin size={20} />
              </a>

              <a
                href="https://instagram.com/itz_archu1012"
                className="text-gray-400 hover:text-white transition"
              >
                <FaInstagram size={20} />
              </a>

              <a
                href="https://archana-vishwakarma-portfolio.vercel.app/"
                className="text-gray-400 hover:text-white transition"
              >
                <FaGlobe size={20} />
              </a>
            </div>
          </div>

          {/* Stay in the Loop */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Stay in the Loop
            </h3>

            <p className="text-sm text-gray-400 mb-5">
              Subscribe to get special offers, free giveaways, and more.
            </p>

            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full bg-white text-gray-800 px-3 py-2
                 rounded-md outline-none"
              />

              <button
                onClick={handleSuscribe}
                className={`text-white px-4 py-2 rounded-md transition ${
                  suscribed
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-red-500 hover:bg-red-600"
                }`}
              >
                {suscribed ? "Subscribed" : "Subscribe"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-5 text-center">
          <p className="text-sm text-gray-400">
            © 2026 Shopora. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
