export default function About() {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-100 min-h-[80vh] flex flex-col items-center justify-center text-center px-6 py-12">
      {/* Floating background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-bounce"></div>
      </div>

      <div className="relative z-10 max-w-3xl">
        <h2 className="text-4xl font-bold mb-6 text-gray-800">About The Read Shop</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          The Read Shop is an online space built for readers and learners.
          We connect passionate book lovers with stories that inspire, teach,
          and entertain. Whether you’re looking for classic literature,
          bestsellers, or hidden gems, we’ve got you covered.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Our mission is to make reading simple, enjoyable, and accessible
          to everyone — because every great journey begins with a single page.
        </p>
      </div>
    </section>
  );
}