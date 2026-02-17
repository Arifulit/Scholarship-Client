

  
import { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight, FiPlay } from "react-icons/fi";
import { HiAcademicCap, HiTrendingUp, HiGlobeAlt } from "react-icons/hi";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    id: 1,
    image: "https://cdn.experteducation.com/wp-content/uploads/sites/15/2023/09/20180924/Scholarships-for-USA.jpg",
    title: "Discover Your Dream Scholarship",
    subtitle: "Global Opportunities Await",
    description:
      "Unlock access to thousands of scholarships from top universities worldwide. Your future starts with the perfect match.",
    cta: "Explore Scholarships",
    stats: [
      { icon: HiAcademicCap, value: "1000+", label: "Scholarships" },
      { icon: HiGlobeAlt, value: "50+", label: "Countries" },
      { icon: HiTrendingUp, value: "95%", label: "Success Rate" },
    ],
  },
  {
    id: 2,
    image: "https://www.lsbu.ac.uk/__data/assets/image/0010/246367/Graduation-1316x567.jpg",
    title: "Success Stories That Inspire",
    subtitle: "Join 10,000+ Graduates",
    description:
      "Connect with a global community of scholars who transformed their lives through education. Your journey begins here.",
    cta: "Read Success Stories",
    stats: [
      { icon: HiAcademicCap, value: "10K+", label: "Graduates" },
      { icon: HiGlobeAlt, value: "200+", label: "Universities" },
      { icon: HiTrendingUp, value: "$50M+", label: "Awarded" },
    ],
  },
  {
    id: 3,
    image: "https://www.scholarshipsinindia.com/wp-content/themes/unicat/images/home/scholarship213.jpg",
    title: "Start Your Application Today",
    subtitle: "Free Application Support",
    description:
      "Get personalized guidance from our expert mentors. We'll help you find and apply to the perfect scholarship program.",
    cta: "Get Started",
    stats: [
      { icon: HiAcademicCap, value: "24/7", label: "Support" },
      { icon: HiGlobeAlt, value: "Free", label: "Consultation" },
      { icon: HiTrendingUp, value: "100%", label: "Satisfaction" },
    ],
  },
];

const Advertisement = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto-slide
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const currentSlideData = slides[currentSlide];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Background */}
      <AnimatePresence mode="wait">
        <motion.img
          key={currentSlideData.id}
          src={currentSlideData.image}
          alt={currentSlideData.title}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <motion.div
              key={currentSlideData.id}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-white space-y-8"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-lime-500/20 border border-lime-400/30 rounded-full px-4 py-2 shadow-md">
                <span className="w-2 h-2 bg-lime-400 rounded-full animate-ping"></span>
                <span className="text-lime-300 text-sm font-medium">
                  {currentSlideData.subtitle}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-6xl font-bold leading-tight drop-shadow-lg">
                {currentSlideData.title}
              </h1>

              {/* Description */}
              <p className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed">
                {currentSlideData.description}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                {currentSlideData.stats.map((stat, i) => (
                  <div key={i} className="text-center lg:text-left">
                    <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                      <stat.icon className="w-6 h-6 text-lime-400" />
                      <span className="text-2xl font-bold text-white">
                        {stat.value}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/all-scholarship"
                  className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-lime-500 to-emerald-600 text-white font-semibold px-8 py-4 rounded-xl hover:from-lime-600 hover:to-emerald-700 transition-transform transform hover:scale-105 shadow-xl"
                >
                  {currentSlideData.cta}
                  <HiAcademicCap className="w-5 h-5" />
                </Link>

                <button className="inline-flex items-center justify-center gap-3 bg-white/10 border border-white/20 backdrop-blur-md text-white px-8 py-4 rounded-xl hover:bg-white/20 transition">
                  <FiPlay className="w-5 h-5" />
                  Watch Video
                </button>
              </div>
            </motion.div>

            {/* Right Glow */}
            <div className="hidden lg:block">
              <div className="relative w-[420px] h-[420px]">
                <div className="absolute inset-0 bg-gradient-to-tr from-lime-400/30 to-emerald-500/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-10 border border-white/20 shadow-lg">
                    <HiAcademicCap className="w-28 h-28 text-white/80" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <div className="flex items-center gap-6 bg-white/10 backdrop-blur-xl rounded-full px-6 py-3 border border-white/20 shadow-lg">
          <button
            onClick={prevSlide}
            className="p-2 text-white/70 hover:text-white"
          >
            <FiChevronLeft className="w-6 h-6" />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-2 rounded-full transition-all ${
                  currentSlide === i
                    ? "bg-lime-400 w-8"
                    : "bg-white/40 hover:bg-white/60 w-2"
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="p-2 text-white/70 hover:text-white"
          >
            <FiChevronRight className="w-6 h-6" />
          </button>

          <div className="w-px h-6 bg-white/20 mx-2"></div>

          {/* Play / Pause */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 text-white/70 hover:text-white"
          >
            {isPlaying ? (
              <div className="flex gap-1">
                <div className="w-1 h-3 bg-current"></div>
                <div className="w-1 h-3 bg-current"></div>
              </div>
            ) : (
              <FiPlay className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
        <motion.div
          key={currentSlide}
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 7, ease: "linear" }}
          className="h-full bg-gradient-to-r from-lime-400 to-emerald-500"
        />
      </div>
    </div>
  );
};

export default Advertisement;
