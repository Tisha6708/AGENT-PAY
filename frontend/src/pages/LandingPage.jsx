import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ChatPreview from "../components/ChatPreview";
import FeatureStrip from "../components/FeatureStrip";

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-white">
      <div className="max-w-7xl mx-auto px-8 py-10">
        <Navbar />

        <div className="grid lg:grid-cols-2 gap-14 items-center py-16">
          <Hero />
          <ChatPreview />
        </div>

        <FeatureStrip />
      </div>
    </div>
  );
}

export default LandingPage;