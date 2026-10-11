type FeatureCardProps = {
    title: string;
    description: string;
    icon: string;
};

function FeatureCard({
    title,
    description,
    icon
}: FeatureCardProps) {
    return (
        <article className="feature-card">
            <div className="feature-icon">{icon}</div>
            <h3>{title}</h3>
            <p>{description}</p>
        </article>
    );
}

export default FeatureCard;