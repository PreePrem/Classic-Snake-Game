
import React from 'react';
import { useGameLogic } from './hooks/useGameLogic';
import GameCanvas from './components/GameCanvas';
import StartScreen from './components/StartScreen';
import GameOverScreen from './components/GameOverScreen';
import ScoreDisplay from './components/ScoreDisplay';

const App: React.FC = () => {
    const {
        gameState,
        snake,
        food,
        score,
        highScore,
        handleDirectionChange,
        startGame,
        restartGame
    } = useGameLogic();

    return (
        <div className="bg-gray-900 min-h-screen w-full flex flex-col items-center justify-center p-4 text-lime-400">
            <div className="w-full max-w-lg md:max-w-xl lg:max-w-2xl aspect-square border-4 border-lime-400 p-2 shadow-[0_0_20px_#32CD32]">
                <header className="flex justify-between items-center mb-2">
                    <h1 className="text-xl md:text-2xl text-shadow-[0_0_5px_#32CD32]">Classic Snake</h1>
                    <ScoreDisplay score={score} highScore={highScore} />
                </header>
                <main className="relative w-full h-[calc(100%-40px)] bg-black">
                    {gameState === 'START' && <StartScreen onStart={startGame} />}
                    {gameState === 'GAME_OVER' && <GameOverScreen score={score} highScore={highScore} onRestart={restartGame} />}
                    {(gameState === 'PLAYING' || gameState === 'GAME_OVER') && (
                         <GameCanvas 
                            snake={snake} 
                            food={food} 
                            onDirectionChange={handleDirectionChange} 
                         />
                    )}
                </main>
            </div>
             <footer className="mt-4 text-center text-xs text-gray-500">
                <p>Use Arrow Keys or Swipe to move</p>
            </footer>
        </div>
    );
};

export default App;
