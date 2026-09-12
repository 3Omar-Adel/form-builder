

// export default Home;
import Navbar from "./components/Navbar/Navbar";
import HeroSection from "./components/HeroSection/HeroSection";
import FeaturesSection from "./components/FeaturesSection/FeaturesSection";
import CTASection from "./components/CTASection/CTASection";
import Footer from "./components/Footer/Footer";

import "./Home.css";

const Home = () => {
    return (
        <div className="home">
            <Navbar />

            <main>
                <HeroSection />

                <FeaturesSection />

                <CTASection />
            </main>

            <Footer />
        </div>
    );
};

export default Home;