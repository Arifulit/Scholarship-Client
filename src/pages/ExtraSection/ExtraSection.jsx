


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
      {icon && <div className="text-4xl mb-4 ">{icon}</div>}
      {title && <h3 className="text-xl font-semibold mb-2 ">{title}</h3>}
      {description && <p >{description}</p>}
      {feedback && <p className="text-lg italic mb-4 ">{feedback}</p>}
      {name && <h4 className="font-bold ">{name}</h4>}
      {scholarship && <p className="text-sm ">{scholarship}</p>}
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
        <h2 className="text-4xl font-bold text-center mb-8 ">
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
                <h3 className="font-semibold text-xl  w-full">{faq.question}</h3>
                <span className="">{openIndex === index ? <FaMinus /> : <FaPlus />}</span>
              </div>
              {openIndex === index && (
                <p className=" mt-2 w-full">{faq.answer}</p>
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
  const scholarshipTypes = [
    { title: "Merit-Based Scholarships", description: "Awarded based on academic, artistic, or athletic achievements." },
    { title: "Need-Based Scholarships", description: "Granted to students with demonstrated financial need." },
    { title: "Athletic Scholarships", description: "For students excelling in sports, covering tuition and other costs." },
    { title: "Minority Scholarships", description: "Designed to support underrepresented groups in higher education." },
  ];

  return (
    <div>
      {/* Types of Scholarships Section */}
      <section className="py-16">
      <h2 className="text-3xl font-bold text-center mb-4">Types of Scholarships</h2>
      <p className="text-center max-w-3xl mx-auto mb-6">
        Discover different types of scholarships available for students, including merit-based, need-based, athletic, and minority scholarships.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {scholarshipTypes.map((scholarship, index) => (
          <div key={index} className="p-6  rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold mb-2">{scholarship.title}</h3>
            <p>{scholarship.description}</p>
          </div>
        ))}
      </div>
    </section>
      
      {/* How to Apply Section */}
      <section className="py-16">
      <h2 className="text-3xl font-bold text-center mb-8">How to Apply</h2>
      <p className="text-center max-w-3xl mx-auto mb-6">
        Follow our step-by-step guide on applying for scholarships, from finding opportunities to submitting your application and required documents.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div className="p-6  rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Step 1: Research Scholarships</h3>
          <p>Identify scholarships that match your qualifications and interests.</p>
        </div>
        <div className="p-6  rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Step 2: Prepare Documents</h3>
          <p>Gather academic transcripts, recommendation letters, and a personal statement.</p>
        </div>
        <div className="p-6  rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Step 3: Submit Application</h3>
          <p>Complete and submit your application before the deadline.</p>
        </div>
      </div>
    </section>
      
      {/* Why Choose Us Section */}
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center mb-8">Why Choose Us?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 place-items-center">
          {whyChooseUs.map((item, index) => (
            <Card key={index} icon={item.icon} title={item.title} description={item.description} className="max-w-sm w-full" />
          ))}
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center mb-8">What Our Users Say</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 place-items-center">
          {testimonials.map((testimonial, index) => (
            <Card key={index} feedback={testimonial.feedback} name={testimonial.name} scholarship={testimonial.scholarship} className="max-w-sm w-full" />
          ))}
        </div>
      </section>

      {/* Eligibility Criteria Section */}
<section className="py-16">
  <h2 className="text-3xl font-bold text-center mb-8">Eligibility Criteria</h2>
  <p className="text-center max-w-3xl mx-auto mb-6">
    Each scholarship has specific eligibility requirements. Below are some common criteria you may need to meet:
  </p>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
    <div className="p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold mb-4">Academic Excellence</h3>
      <p>Maintain a strong academic record to qualify for merit-based scholarships.</p>
    </div>
    <div className="p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold mb-4">Financial Need</h3>
      <p>Some scholarships are awarded based on demonstrated financial need.</p>
    </div>
    <div className="p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold mb-4">Extracurricular Activities</h3>
      <p>Participation in sports, arts, or volunteer work can improve your chances.</p>
    </div>
    <div className="p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold mb-4">Leadership Qualities</h3>
      <p>Scholarships often favor students with leadership experience and community involvement.</p>
    </div>
    <div className="p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold mb-4">Field of Study</h3>
      <p>Some scholarships are designed for students pursuing specific fields of study.</p>
    </div>
    <div className="p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold mb-4">Nationality</h3>
      <p>Eligibility may vary based on your nationality and country of residence.</p>
    </div>
  </div>
</section>

      
      {/* FAQ Section */}
      <FAQSection />
    </div>
  );
};

export default ExtraSection;
