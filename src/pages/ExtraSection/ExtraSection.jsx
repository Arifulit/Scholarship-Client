 // Assuming Card component is in this path

const ExtraSection = () => {
  // Example scholarship data for the "Featured Scholarships" section
 

  // Why Choose Us Section
  const whyChooseUs = [
    {
      title: 'Expert Guidance',
      description: 'Get advice from top experts to help you find the best scholarship opportunities.',
      icon: '💡',
    },
    {
      title: 'Global Reach',
      description: 'Access scholarships from universities worldwide in a variety of fields.',
      icon: '🌍',
    },
    {
      title: 'Easy Application Process',
      description: 'Our platform simplifies the scholarship application process for you.',
      icon: '📝',
    },
  ];

  // Testimonials Section
  const testimonials = [
    {
      name: 'John Doe',
      scholarship: 'Fully Funded Scholarship at MIT',
      feedback: 'Thanks to this platform, I found the perfect scholarship for my Master’s degree!',
    },
    {
      name: 'Jane Smith',
      scholarship: 'Postgraduate Scholarship at Oxford University',
      feedback: 'The guidance I received here made the application process easy and successful.',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero bg-blue-600 text-white p-8 text-center">
        
        <p className="text-xl mt-4">Find the best scholarships from top universities worldwide.</p>
      </section>

      {/* Featured Scholarships Section */}
    
      

      {/* Why Choose Us Section */}
      <section className="why-choose-us py-12 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-8">Why Choose Us?</h2>
        <div className="flex justify-center gap-16">
          {whyChooseUs.map((item, index) => (
            <div key={index} className="text-center max-w-xs">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials py-12">
        <h2 className="text-3xl font-bold text-center mb-8">What Our Users Say</h2>
        <div className="flex justify-center gap-16">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card max-w-xs bg-white shadow-lg p-6 rounded-lg">
              <p className="text-lg italic mb-4">"{testimonial.feedback}"</p>
              <h4 className="font-bold">{testimonial.name}</h4>
              <p className="text-sm text-gray-500">{testimonial.scholarship}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ExtraSection;
