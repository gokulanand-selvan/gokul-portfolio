import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white px-32 py-4 ">
      <section className="bg-gray-900 text-white px-32 py-4 flex items-center justify-evenly ">
        <div className="flex flex-col gap-2  font-semibold">
          <p className="font-bold text-2xl">Contact</p>
          <div>
            <p>+91&nbsp;8754916425</p>
            <p>gokul2848@gmail.com</p>
          </div>
        </div>
        <div className="text-2xl font-semibold">
          Made with Love and Javascript❤️
        </div>
      </section>
    </footer>
  );
}
