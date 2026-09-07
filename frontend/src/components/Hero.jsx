import { useNavigate } from "react-router-dom";

function Hero() {
    const navigate = useNavigate();
    return (
        <div>
            <div className="flex gap-3 mb-6">
                <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">
                    Verified AI
                </span>

                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                    Razorpay Ready
                </span>
            </div>

            <p className="text-violet-600 font-semibold tracking-wide mb-4">
                TRUST INFRASTRUCTURE FOR AI COMMERCE
            </p>

            <h1 className="text-6xl font-bold leading-tight text-gray-900">
                Let AI shop.
                <span className="text-violet-700"> You stay in control.</span>
            </h1>

            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                Compare hotels, food and products with AI using verified identity,
                programmable wallets and secure Razorpay payments.
            </p>

            <button
                onClick={() => navigate("/chat")}
                className="mt-8 flex items-center gap-3 bg-white border border-gray-200 px-6 py-4 rounded-2xl shadow hover:shadow-md transition"
            >
                <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="Google"
                    className="w-6 h-6"
                />
                <span className="font-semibold">Continue with Google</span>
            </button>

            <p className="text-sm text-gray-500 mt-3">
                Your payment details are never shared with AI.
            </p>
        </div>
    );
}

export default Hero;