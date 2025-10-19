
import React from 'react';

interface ScoreDisplayProps {
    score: number;
    highScore: number;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score, highScore }) => {
    return (
        <div className="text-right text-sm md:text-base">
            <div>Score: {score}</div>
            <div>High: {highScore}</div>
        </div>
    );
};

export default ScoreDisplay;
