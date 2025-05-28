import React from "react";
import Swal from 'sweetalert2';

const ContactUs = () => {

  const handleSubmitContact = (event) => {
    event.preventDefault();

    const Name = event.target.name.value;
    const Email = event.target.email.value;
    const Subject = event.target.subject.value;
    const Message = event.target.message.value;

    fetch('http://localhost:5000/api/contacts', {
      method: 'POST',
      body: JSON.stringify({ Name, Email, Subject, Message }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.success && json.data) {
          Swal.fire({
            title: 'Success',
            text: 'Successfully submitted',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          event.target.reset();
        } else {
          Swal.fire({
            title: 'Error!',
            text: json.error || 'Failed to submit contact form',
            icon: 'error',
            confirmButtonText: 'Cool'
          });
        }
      })
      .catch(error => {
        console.error('Error:', error);
        Swal.fire({
          title: 'Error!',
          text: 'An error occurred while submitting',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
  }

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Contact Us
          </h1>
          <p className="mt-3 text-sm sm:text-base text-gray-200">
            We'd love to hear from you! Reach out with any questions or feedback.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white shadow-xl rounded-lg p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">
              Send us a message
            </h2>
            <form onSubmit={handleSubmitContact} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="block w-full border border-orange-500 rounded-md py-2 px-3 sm:py-3 sm:px-4 focus:ring-orange-500 focus:border-orange-500 text-sm sm:text-base"
                  placeholder="Jabir"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="block w-full border border-orange-500 rounded-md py-2 px-3 sm:py-3 sm:px-4 focus:ring-orange-500 focus:border-orange-500 text-sm sm:text-base"
                  placeholder="you@email.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  className="block w-full border border-orange-300 rounded-md py-2 px-3 sm:py-3 sm:px-4 focus:ring-orange-500 focus:border-orange-500 text-sm sm:text-base"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="block w-full border border-orange-300 rounded-md py-2 px-3 sm:py-3 sm:px-4 focus:ring-orange-500 focus:border-orange-500 text-sm sm:text-base"
                  placeholder="Your message here..."
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full py-2 sm:py-3 px-4 sm:px-6 border border-transparent rounded-md shadow-sm text-sm sm:text-base font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white shadow-xl rounded-lg p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">
                Contact Information
              </h2>

              <div className="space-y-6 text-sm sm:text-base">
                {/* Address */}
                <ContactItem
                  iconPath="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  title="Our Address"
                  content="Sonadanga, Khulna Sadar, Khulna, Bangladesh."
                />
                {/* Phone */}
                <ContactItem
                  iconPath="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  title="Phone"
                  content="(+880)1784-672862 | Support: (+880)1784-672862"
                />
                {/* Email */}
                <ContactItem
                  iconPath="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  title="Email"
                  content="support@gmail.com | sales@jabir.com"
                />
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-white shadow-xl rounded-lg p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">
                Business Hours
              </h2>
              <div className="space-y-4 text-sm sm:text-base">
                <BusinessHour day="Monday - Friday" hours="9:00 AM - 6:00 PM" />
                <BusinessHour day="Saturday" hours="10:00 AM - 4:00 PM" />
                <BusinessHour day="Sunday" hours="Closed" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactItem = ({ iconPath, title, content }) => (
  <div className="flex items-start">
    <div className="flex-shrink-0 bg-orange-100 p-3 rounded-full">
      <svg className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPath} />
      </svg>
    </div>
    <div className="ml-4">
      <h3 className="text-base font-medium text-gray-900">{title}</h3>
      <p className="mt-1 text-gray-600">{content}</p>
    </div>
  </div>
);

const BusinessHour = ({ day, hours }) => (
  <div className="flex justify-between">
    <span className="text-gray-600">{day}</span>
    <span className="font-medium text-gray-900">{hours}</span>
  </div>
);

export default ContactUs;
