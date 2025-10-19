
import React from 'react';

interface StartScreenProps {
    onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-80">
            <h2 className="text-4xl md:text-5xl mb-8 text-shadow-[0_0_10px_#32CD32]">Classic Snake</h2>
            <button
                onClick={onStart}
                className="px-8 py-4 bg-lime-500 text-black text-lg md:text-xl border-2 border-lime-300 hover:bg-lime-400 transition-colors shadow-[0_0_15px_#32CD32]"
            >
                Start Game
            </button>
        </div>
    );
};

export default StartScreen;
