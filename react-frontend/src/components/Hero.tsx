import { Link } from "react-router";

function Hero() {
    return (
        <section className="hero">
            <div className="hero-content">
                <h1>Study Scripture With Confidence</h1>

                <p>
                    Explore the Bible through original languages,
                    historical context, and deeper understanding.
                </p>

                <div className="hero-buttons">
                    <Link to="/reader" className="btn-primary">
                         Begin Reading
                    </Link>

                    <a href="#features" className="btn-secondary">
                        Learn More
                    </a>
                </div>
            </div>
        </section>
    );
}

export default Hero;