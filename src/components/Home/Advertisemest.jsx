

import { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight, FiPlay } from "react-icons/fi";
import { HiAcademicCap, HiTrendingUp, HiGlobeAlt } from "react-icons/hi";
import { Link } from "react-router-dom";

const slides = [
  {
    id: 1,
    image: "https://cdn.experteducation.com/wp-content/uploads/sites/15/2023/09/20180924/Scholarships-for-USA.jpg",
    title: "Discover Your Dream Scholarship",
    subtitle: "Global Opportunities Await",
    description: "Unlock access to thousands of scholarships from world's top universities. Your future starts with the perfect scholarship match.",
    cta: "Explore Scholarships",
    stats: [
      { icon: HiAcademicCap, value: "1000+", label: "Scholarships" },
      { icon: HiGlobeAlt, value: "50+", label: "Countries" },
      { icon: HiTrendingUp, value: "95%", label: "Success Rate" }
    ]
  },
  {
    id: 2,
    image: "https://www.lsbu.ac.uk/__data/assets/image/0010/246367/Graduation-1316x567.jpg",
    title: "Success Stories That Inspire",
    subtitle: "Join 10,000+ Graduates",
    description: "Connect with a community of scholars who have transformed their lives through education. Your success story begins here.",
    cta: "Read Success Stories",
    stats: [
      { icon: HiAcademicCap, value: "10K+", label: "Graduates" },
      { icon: HiGlobeAlt, value: "200+", label: "Universities" },
      { icon: HiTrendingUp, value: "$50M+", label: "Awarded" }
    ]
  },
  {
    id: 3,
    image: "https://www.scholarshipsinindia.com/wp-content/themes/unicat/images/home/scholarship213.jpg",
    title: "Start Your Application Today",
    subtitle: "Free Application Support",
    description: "Get personalized guidance from our expert counselors. We'll help you find and apply to the perfect scholarship program.",
    cta: "Get Started",
    stats: [
      { icon: HiAcademicCap, value: "24/7", label: "Support" },
      { icon: HiGlobeAlt, value: "Free", label: "Consultation" },
      { icon: HiTrendingUp, value: "100%", label: "Satisfaction" }
    ]
  },
];

const Advertisement = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto-slide functionality
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [isPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={currentSlideData.image} 
          alt={currentSlideData.title}
          className="w-full h-full object-cover transition-all duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-white space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-lime-500/20 backdrop-blur-sm border border-lime-400/30 rounded-full px-4 py-2">
                <span className="w-2 h-2 bg-lime-400 rounded-full animate-pulse"></span>
                <span className="text-lime-300 text-sm font-medium">{currentSlideData.subtitle}</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {currentSlideData.title}
              </h1>

              {/* Description */}
              <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                {currentSlideData.description}
              </p>

              {/* Statistics */}
              <div className="grid grid-cols-3 gap-6">
                {currentSlideData.stats.map((stat, index) => (
                  <div key={index} className="text-center lg:text-left">
                    <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                      <stat.icon className="w-6 h-6 text-lime-400" />
                      <span className="text-2xl lg:text-3xl font-bold text-white">{stat.value}</span>
                    </div>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/all-scholarship"
                  className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-lime-500 to-emerald-600 text-white font-semibold px-8 py-4 rounded-xl hover:from-lime-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  {currentSlideData.cta}
                  <HiAcademicCap className="w-5 h-5" />
                </Link>
                
                <button className="inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/20 transition-all duration-300">
                  <FiPlay className="w-5 h-5" />
                  Watch Video
                </button>
              </div>
            </div>

            {/* Visual Element */}
            <div className="hidden lg:block">
              <div className="relative">
                <div className="w-96 h-96 bg-gradient-to-tr from-lime-400/20 to-emerald-500/20 rounded-full blur-3xl"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                    <HiAcademicCap className="w-32 h-32 text-white/80" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center gap-6 bg-white/10 backdrop-blur-lg rounded-full px-6 py-3 border border-white/20">
          {/* Previous Button */}
          <button
            onClick={prevSlide}
            className="p-2 text-white/70 hover:text-white transition-colors duration-200"
          >
            <FiChevronLeft className="w-5 h-5" />
          </button>

          {/* Dots Indicator */}
          <div className="flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index 
                    ? "bg-lime-400 w-8" 
                    : "bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="p-2 text-white/70 hover:text-white transition-colors duration-200"
          >
            <FiChevronRight className="w-5 h-5" />
          </button>

          {/* Play/Pause Button */}
          <div className="w-px h-6 bg-white/20 mx-2"></div>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 text-white/70 hover:text-white transition-colors duration-200"
          >
            {isPlaying ? (
              <div className="w-3 h-3 flex gap-1">
                <div className="w-1 h-3 bg-current"></div>
                <div className="w-1 h-3 bg-current"></div>
              </div>
            ) : (
              <FiPlay className="w-3 h-3" />
            )}
          </button>
        </div>
      </div>

      {/* Slide Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-20">
        <div 
          className="h-full bg-gradient-to-r from-lime-400 to-emerald-500 transition-all duration-300"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default Advertisement;

  