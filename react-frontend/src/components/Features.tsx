import FeatureCard from "./FeatureCard";

function Features() {
    const features = [
        {
            title: "Original Languages",
            description:
                "Explore the Hebrew and Greek behind Scripture.",
            icon: "📜"
        },
        {
            title: "Historical Context",
            description:
                "Understand the world in which Scripture was written.",
            icon: "🏛️"
        },
        {
            title: "Translation Comparison",
            description:
                "Explore how different translations express the text.",
            icon: "📖"
        }
    ];

    return (
        <section className="features" id="features">
            <h2>Why Exegora?</h2>

            <div className="features-grid">
                {features.map((feature) => (
                    <FeatureCard
                        key={feature.title}
                        title={feature.title}
                        description={feature.description}
                        icon={feature.icon}
                    />
                ))}
            </div>
        </section>
    );
}

export default Features;