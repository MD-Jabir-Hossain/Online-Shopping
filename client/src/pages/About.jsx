import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const About = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const teamMembers = [
        {
            name: "Jennifer Lawrence",
            position: "Tech Leader",
            bio: "Pellentesque dictumst nibh nulla dul at urna leo wisi dul.",
            image: "/images/popupimage/cl-image-1.png"
        },
        {
            name: "Michael Jordan",
            position: "Manager",
            bio: "Aliquam tincidunt mauris eu risus. Vestibulum auctor dapibus neque.",
            image: "/images/popupimage/cl-image-2.png"
        },
        {
            name: "Emma Watson",
            position: "Art Director",
            bio: "Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis.",
            image: "/images/popupimage/cl-image-3.png"
        },
        {
            name: "Chris Evans",
            position: "Design Leader",
            bio: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem.",
            image: "/images/popupimage/cl-image-4.png"
        }
    ];

    const teamMemberPairs = [];
    for (let i = 0; i < teamMembers.length; i += 2) {
        teamMemberPairs.push(teamMembers.slice(i, i + 2));
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % teamMemberPairs.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [teamMemberPairs.length]);

    

    return (
        <div className="max-w-full mx-auto px-5 py-12 font-serif text-white">

            {/* About Title */}
            <h1 className="text-3xl font-bold text-center mb-16 uppercase tracking-wider">About Us</h1>

            <div className="flex flex-col lg:flex-row justify-between border border-gray-200 p-5 rounded-lg space-y-10 lg:space-y-0 lg:space-x-6">
                {/* Left Column - 70% */}
                <div className="w-full lg:w-[70%] space-y-6">
                    <h2 className="text-3xl font-medium mb-4">Welcome To Shop</h2>
                    <div className="flex flex-col md:flex-row">
                        <img src="/images/popupimage/about-us.png" alt="About us" className="w-full md:w-1/2 rounded-md" />
                        <div className="space-y-12 text-gray-300 text-justify md:ml-6 mt-4 md:mt-0">
                            <p>
                                Nullo auctor mounts ut dul luctus semper. In hoc habitasse platea dictumst. Duis pellentesque ligula a risus suscipit dignissim.
                            </p>
                            <p>
                                Pellentesque semper congue sodales. In consequat, metus eget consequat ornare, augue dolor blandit purus.
                            </p>
                            <p>
                                Nulla auctor mounts ut dul luctus semper. Suspendisse aliquam leo id neque auctor molestie. Etiam at nulla tellus.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="flex-1 border-t lg:border-t-0 lg:border-l border-white lg:pl-6 pt-6 lg:pt-0">
                    <h2 className="text-3xl font-medium  mb-8">Why Choose Us</h2>
                    <div className="space-y-4">
                        {['Shipping & Returns', 'Secure Shopping', 'International Shipping', 'Affiliates', 'Group Sales'].map((item) => (
                            <div key={item} className="flex items-center">
                                <span className="text-green-500 text-xl mr-3">✔</span>
                                <span className="text-gray-200 text-lg">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Team Section */}
            <div className="mt-20 border border-gray-200 rounded-lg px-6 py-12">
                <h2 className="text-3xl font-bold text-center mb-8">Our Members</h2>

                <div className="text-center text-gray-300 mb-12">
                    <p className="mb-2">Connecteur adipiscing elit. Donec pellentesque venenatis elit.</p>
                    <p>Aenean facilisis aliquet feugiat. Suspendisse lacinia congue est ac semper.</p>
                </div>

                <div className="relative overflow-hidden min-h-[500px]">
                    {teamMemberPairs.map((pair, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-500 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                        >
                            <div className="flex flex-col md:flex-row justify-center gap-8">
                                {pair.map((member, memberIndex) => (
                                    <div key={memberIndex} className="w-full md:w-1/2 lg:w-1/3 mx-auto">
                                        <div className=" p-6 rounded-lg shadow-lg border h-full">
                                            <div className="flex flex-col items-center text-center">
                                                <div className="w-96 h-72 rounded-md border overflow-hidden mb-4">
                                                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                                </div>
                                                <h3 className="text-xl font-bold">{member.name}</h3>
                                                <p className="text-orange-400 mb-4">{member.position}</p>
                                                <p className="text-gray-300">{member.bio}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default About;
