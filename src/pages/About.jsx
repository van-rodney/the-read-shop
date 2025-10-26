import React from "react";

export default function About() {
  return (
    <section className="about-page min-h-screen py-20 px-6 bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="max-w-5xl mx-auto bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-10 border border-blue-100">
        <h1 className="text-5xl font-extrabold text-center text-blue-700 mb-8 drop-shadow-md">
          About The Read Shop
        </h1>

        <p className="text-gray-700 leading-relaxed mb-6 text-lg">
          <strong>The Read Shop</strong> was created by{" "}
          <span className="text-blue-700 font-semibold">
            Van-Elloh Rodney Bright
          </span>
          — a passionate front-end developer, designer, and teacher from Ghana.
          This project began as a personal mission to combine technology,
          education, and creativity into a single platform that inspires
          discovery and lifelong learning.
        </p>

        <p className="text-gray-700 leading-relaxed mb-6 text-lg">
          The Read Shop helps readers easily explore books, authors, and topics
          using real data from open-source book databases. It’s designed to feel
          light, simple, and delightful — with smooth animations and a clean,
          modern interface that keeps your focus on what matters: <em>reading</em>.
        </p>

        <div className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white p-6 rounded-2xl shadow-lg my-10">
          <h2 className="text-2xl font-bold mb-2">Why The Read Shop Exists</h2>
          <p className="text-white/90 leading-relaxed">
            Books change lives — they teach, comfort, and connect people across
            time and culture. The Read Shop was built to make the joy of
            discovery more accessible to everyone, especially students and
            curious learners who want knowledge at their fingertips.
          </p>
        </div>

        <p className="text-gray-700 leading-relaxed mb-6 text-lg">
          This project also serves as a creative playground for exploring
          <strong> React.js</strong>, <strong>Tailwind CSS</strong>, and
          <strong> API integration</strong>. It reflects Van’s journey as a
          self-taught developer dedicated to growth, innovation, and sharing
          knowledge through interactive web experiences.
        </p>

        <blockquote className="italic text-center text-gray-600 border-l-4 border-blue-600 pl-4 my-10">
          “Every book holds a new world. The Read Shop is my way of helping
          others discover those worlds — one page at a time.”
        </blockquote>

        {/* Developer Card Section */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-md mt-12 hover:shadow-xl transition-all duration-300 text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Developer"
            className="w-28 h-28 rounded-full mx-auto mb-4 shadow-md"
          />
          <h3 className="text-2xl font-bold text-blue-700 mb-2">
            Van-Elloh Rodney Bright
          </h3>
          <p className="text-gray-600 mb-4">
            Front-End Developer • Graphic Designer • Educator
          </p>
          <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto">
            Van believes in using creativity and technology to make learning
            interactive and enjoyable. Through projects like The Read Shop, he
            hopes to inspire others to explore their passions, stay curious, and
            keep learning something new every day.
          </p>
          <div className="mt-6 flex justify-center space-x-4">
            <a
              href="#"
              className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition-all duration-300"
            >
              View Portfolio
            </a>
            <a
              href="#"
              className="border-2 border-blue-600 text-blue-600 px-5 py-2 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300"
            >
              Contact Me
            </a>
          </div>
        </div>

        <p className="text-center text-gray-500 mt-10 text-sm">
           Built with love, code, and creativity — by{" "}
          <span className="text-blue-700 font-semibold">
            Van-Elloh Rodney Bright
          </span>
          .
        </p>
      </div>
    </section>
  );
}