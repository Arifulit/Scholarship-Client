/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

// FAQ Data
const faqs = [
  {
    question: "How do I apply for a scholarship?",
    answer:
      "Visit the application page, choose the scholarship that suits you, fill out the application form, and submit all required documents.",
  },
  {
    question: "Are scholarships available for international students?",
    answer:
      "Yes, we offer a wide range of scholarships for both local and international students from various countries.",
  },
  {
    question: "What documents do I need to apply?",
    answer:
      "Typically, you will need to provide academic transcripts, a recommendation letter, proof of identity, and sometimes, a personal statement.",
  },
  {
    question: "When is the deadline for applying?",
    answer:
      "The deadline varies for each scholarship, so please check the individual scholarship page for the exact dates.",
  },
  {
    question: "Can I apply for multiple scholarships?",
    answer:
      "Yes, you can apply for multiple scholarships, but make sure you meet the eligibility requirements for each one.",
  },
  {
    question: "How will I be notified about the results?",
    answer:
      "You will receive an email notification with the outcome of your application. If selected, further instructions will be provided.",
  },
];

// Card Component
const Card = ({ icon, title, description, feedback, name, scholarship }) => {
  return (
    <div className="shadow-lg rounded-lg p-6 transform transition duration-300 hover:scale-105 max-w-xs sm:max-w-md md:max-w-lg">
      {icon && <div className="text-4xl mb-4 text-black">{icon}</div>}
      {title && <h3 className="text-xl font-semibold mb-2 text-black">{title}</h3>}
      {description && <p className="text-black">{description}</p>}
      {feedback && <p className="text-lg italic mb-4 text-black">{feedback}</p>}
      {name && <h4 className="font-bold text-black">{name}</h4>}
      {scholarship && <p className="text-sm text-gray-600">{scholarship}</p>}
    </div>
  );
};

// FAQ Section
const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full py-16 ">
    <div className="w-full mx-auto px-6">
      <h2 className="text-4xl font-bold text-center mb-8 text-black">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className=" p-6 rounded-lg shadow-md cursor-pointer w-full"
            onClick={() => toggleFAQ(index)}
          >
            <div className="flex justify-between items-center w-full">
              <h3 className="font-semibold text-xl text-black w-full">{faq.question}</h3>
              <span className="text-black">{openIndex === index ? <FaMinus /> : <FaPlus />}</span>
            </div>
            {openIndex === index && (
              <p className="text-black mt-2 w-full">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
  
  );
};

// Main Scholarship Page
const ExtraSection = () => {
  const whyChooseUs = [
    { title: 'Expert Guidance', description: 'Get advice from top experts to help you find the best scholarship opportunities.', icon: '💡' },
    { title: 'Global Reach', description: 'Access scholarships from universities worldwide in a variety of fields.', icon: '🌍' },
    { title: 'Easy Application Process', description: 'Our platform simplifies the scholarship application process for you.', icon: '📝' },
  ];

  const testimonials = [
    { name: 'Ariful Islam', scholarship: 'Fully Funded Scholarship at MIT', feedback: 'Thanks to this platform, I found the perfect scholarship for my Master’s degree!' },
    { name: 'Rayhan Ahmed', scholarship: 'Postgraduate Scholarship at Oxford University', feedback: 'The guidance I received here made the application process easy and successful.' },
    { name: 'Rakibul Hasan', scholarship: 'Fully Funded Scholarship at MIT', feedback: 'Thanks to this platform, I found the perfect scholarship for my Master’s degree!' },
  ];

  return (
    <div>
  
     {/* Why Choose Us Section */}
<section className="py-16 ">
  <h2 className="text-3xl font-bold text-center mb-8 text-black">Why Choose Us?</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 place-items-center">
    {whyChooseUs.map((item, index) => (
      <Card key={index} icon={item.icon} title={item.title} description={item.description} className="max-w-sm w-full" />
    ))}
  </div>
</section>

{/* Testimonials Section */}
<section className="py-16">
  <h2 className="text-3xl font-bold text-center mb-8 text-black">What Our Users Say</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 place-items-center">
    {testimonials.map((testimonial, index) => (
      <Card key={index} feedback={testimonial.feedback} name={testimonial.name} scholarship={testimonial.scholarship} className="max-w-sm w-full" />
    ))}
  </div>
</section>


    

      {/* Scholarship Tips Section */}
      <section className="scholarship-tips py-16">
        <h2 className="text-3xl font-bold text-center mb-8 text-black">Scholarship Application Tips</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="tip-card p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4 text-black">Tip 1: Be Thorough</h3>
            <p className="text-black">Ensure you have all your documents ready and fill out all sections of the form accurately.</p>
          </div>
          <div className="tip-card  p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4 text-black">Tip 2: Apply Early</h3>
            <p className="text-black">Start the application process as soon as possible to avoid missing deadlines.</p>
          </div>
          <div className="tip-card  p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4 text-black">Tip 3: Highlight Achievements</h3>
            <p className="text-black">Showcase your academic achievements and extra-curricular activities to stand out.</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />
    </div>
  );
};

export default ExtraSection;
