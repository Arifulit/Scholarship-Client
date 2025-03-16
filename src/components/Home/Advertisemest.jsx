

import { useState, useEffect } from "react";

const slides = [
  {
    id: 1,
    image: "https://cdn.experteducation.com/wp-content/uploads/sites/15/2023/09/20180924/Scholarships-for-USA.jpg",
    title: "Explore Scholarship Opportunities",
    description: "Unlock a world of possibilities with exclusive scholarships in top universities.",
  },
  {
    id: 2,
    image: "https://www.lsbu.ac.uk/__data/assets/image/0010/246367/Graduation-1316x567.jpg",
    title: "Celebrate Your Success",
    description: "Join thousands of graduates achieving their dreams with top-tier education.",
  },
  {
    id: 3,
    image: "https://www.scholarshipsinindia.com/wp-content/themes/unicat/images/home/scholarship213.jpg",
    title: "Your Future Starts Here",
    description: "Apply today for scholarships that can shape your career and future success.",
  },
];

const Advertisement = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[70vh] sm:h-[80vh] lg:h-[75vh] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Background Image */}
          <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center text-white px-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">{slide.title}</h2>
            <p className="text-md sm:text-lg md:text-xl max-w-2xl">{slide.description}</p>
          </div>
        </div>
      ))}

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index ? "bg-white scale-110" : "bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Advertisement;

  