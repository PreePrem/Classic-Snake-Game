
import React from 'react';

interface GameOverScreenProps {
    score: number;
    highScore: number;
    onRestart: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ score, highScore, onRestart }) => {
    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-80 z-10">
            <h2 className="text-4xl md:text-5xl text-red-500 mb-4 text-shadow-[0_0_10px_#FF0000]">Game Over</h2>
            <p className="text-lg md:text-xl mb-2">Your Score: {score}</p>
            <p className="text-lg md:text-xl mb-8">High Score: {highScore}</p>
            <button
                onClick={onRestart}
                className="px-8 py-4 bg-lime-500 text-black text-lg md:text-xl border-2 border-lime-300 hover:bg-lime-400 transition-colors shadow-[0_0_15px_#32CD32]"
            >
                Restart
            </button>
        </div>
    );
};

export default GameOverScreen;
