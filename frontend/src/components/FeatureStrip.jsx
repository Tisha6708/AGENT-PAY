function FeatureStrip() {
  const features = [
    {
      title: "KYA",
      subtitle: "Verified AI Identity",
      icon: "🛡️",
    },
    {
      title: "Wallet",
      subtitle: "Programmable Spending",
      icon: "💳",
    },
    {
      title: "Firewall",
      subtitle: "Blocks Rogue Payments",
      icon: "🔥",
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6 mt-10">
      {features.map((item) => (
        <div
          key={item.title}
          className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition"
        >
          <div className="text-4xl mb-3">{item.icon}</div>

          <h3 className="text-xl font-bold">{item.title}</h3>

          <p className="text-gray-600 mt-2">{item.subtitle}</p>
        </div>
      ))}
    </div>
  );
}

export default FeatureStrip;