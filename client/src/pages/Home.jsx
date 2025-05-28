import React from 'react';
import HomeSlider from '../components/HomeSlider';
import CategorySection from '../components/CategorySection';
import MenFashionSection from '../components/homefasion/MenFashionSection';
import ElectronicsSection from '../components/homefasion/ElectronicsSection';
import WomenFashionSection from '../components/homefasion/WomenFashionSection';
import JewelarySection from '../components/homefasion/JewelarySection';
import Footer from '../components/Footer';


function Home() {
    return (
        <div>
            <HomeSlider />
            <CategorySection />
            <MenFashionSection />
            <JewelarySection />
            <WomenFashionSection />
            <ElectronicsSection />
            <Footer />
        </div>
    );
}

export default Home;