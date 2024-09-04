const Result = ({ stats, totalScore }) => {
    const getRank = (score) => {
        if (score >= 80) return 'Shinobi Legend';
        if (score >= 60) return 'High Jonin';
        if (score >= 40) return 'Jonin';
        if (score >= 20) return 'Chunin';
        return 'Genin';
    };

    const rank = getRank(totalScore);

    return (
        <div>
            <h2>Ranking</h2>
            <p>Total Score: {totalScore}</p>
            <p>Rank: {rank}</p>
            <div>
                {Object.entries(stats).map(([role, value]) => (
                    <p key={role}>{role}: {value}</p>
                ))}
            </div>
        </div>
    );
};

export default Result