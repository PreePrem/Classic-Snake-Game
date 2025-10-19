
import { useState, useEffect, useCallback, useRef } from 'react';
import { Coordinates, Direction, GameState } from '../types';
import { GRID_SIZE, INITIAL_SPEED, MIN_SPEED, SPEED_INCREMENT } from '../constants';

const getRandomCoordinate = (snakeBody: Coordinates[] = []): Coordinates => {
    let newFoodPosition: Coordinates;
    do {
        newFoodPosition = {
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE),
        };
    } while (snakeBody.some(segment => segment.x === newFoodPosition.x && segment.y === newFoodPosition.y));
    return newFoodPosition;
};

const getInitialHighScore = (): number => {
    const savedScore = localStorage.getItem('snakeHighScore');
    return savedScore ? parseInt(savedScore, 10) : 0;
};

export const useGameLogic = () => {
    const initialSnake = [{ x: Math.floor(GRID_SIZE / 2), y: Math.floor(GRID_SIZE / 2) }];
    
    const [gameState, setGameState] = useState<GameState>('START');
    const [snake, setSnake] = useState<Coordinates[]>(initialSnake);
    const [food, setFood] = useState<Coordinates>(() => getRandomCoordinate(initialSnake));
    const [direction, setDirection] = useState<Direction>(Direction.RIGHT);
    const [speed, setSpeed] = useState<number>(INITIAL_SPEED);
    const [score, setScore] = useState<number>(0);
    const [highScore, setHighScore] = useState<number>(getInitialHighScore);

    const directionRef = useRef(direction);

    const resetGame = useCallback(() => {
        setSnake(initialSnake);
        setFood(getRandomCoordinate(initialSnake));
        setDirection(Direction.RIGHT);
        directionRef.current = Direction.RIGHT;
        setSpeed(INITIAL_SPEED);
        setScore(0);
    }, [initialSnake]);

    const startGame = () => {
        resetGame();
        setGameState('PLAYING');
    };
    
    const restartGame = () => {
        resetGame();
        setGameState('PLAYING');
    };

    const handleDirectionChange = useCallback((newDirection: Direction) => {
        const currentDirection = directionRef.current;
        const isOpposite = (
            (newDirection === Direction.UP && currentDirection === Direction.DOWN) ||
            (newDirection === Direction.DOWN && currentDirection === Direction.UP) ||
            (newDirection === Direction.LEFT && currentDirection === Direction.RIGHT) ||
            (newDirection === Direction.RIGHT && currentDirection === Direction.LEFT)
        );
        if (!isOpposite) {
            setDirection(newDirection);
        }
    }, []);
    
    useEffect(() => {
        directionRef.current = direction;
    }, [direction]);

    const moveSnake = useCallback(() => {
        if (gameState !== 'PLAYING') return;

        setSnake(prevSnake => {
            const newSnake = [...prevSnake];
            const head = { ...newSnake[0] };

            switch (direction) {
                case Direction.UP: head.y -= 1; break;
                case Direction.DOWN: head.y += 1; break;
                case Direction.LEFT: head.x -= 1; break;
                case Direction.RIGHT: head.x += 1; break;
            }

            // Wall collision
            if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
                setGameState('GAME_OVER');
                return prevSnake;
            }

            // Self collision
            for (let i = 1; i < newSnake.length; i++) {
                if (head.x === newSnake[i].x && head.y === newSnake[i].y) {
                    setGameState('GAME_OVER');
                    return prevSnake;
                }
            }

            newSnake.unshift(head);

            // Food collision
            if (head.x === food.x && head.y === food.y) {
                setScore(prevScore => prevScore + 1);
                setFood(getRandomCoordinate(newSnake));
                setSpeed(prevSpeed => Math.max(MIN_SPEED, prevSpeed - SPEED_INCREMENT));
            } else {
                newSnake.pop();
            }

            return newSnake;
        });
    }, [direction, food, gameState]);
    
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'ArrowUp': handleDirectionChange(Direction.UP); break;
                case 'ArrowDown': handleDirectionChange(Direction.DOWN); break;
                case 'ArrowLeft': handleDirectionChange(Direction.LEFT); break;
                case 'ArrowRight': handleDirectionChange(Direction.RIGHT); break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleDirectionChange]);

    useEffect(() => {
        if (gameState === 'PLAYING') {
            const gameInterval = setInterval(moveSnake, speed);
            return () => clearInterval(gameInterval);
        }
    }, [gameState, moveSnake, speed]);

    useEffect(() => {
        if (gameState === 'GAME_OVER') {
            if (score > highScore) {
                setHighScore(score);
                localStorage.setItem('snakeHighScore', score.toString());
            }
        }
    }, [gameState, score, highScore]);

    return {
        gameState,
        snake,
        food,
        score,
        highScore,
        handleDirectionChange,
        startGame,
        restartGame,
    };
};
