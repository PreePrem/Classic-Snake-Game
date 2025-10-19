
import React, { useRef, useEffect, useState } from 'react';
import { Coordinates, Direction } from '../types';
import { GRID_SIZE, SNAKE_COLOR, FOOD_COLOR, BACKGROUND_COLOR } from '../constants';

interface GameCanvasProps {
    snake: Coordinates[];
    food: Coordinates;
    onDirectionChange: (direction: Direction) => void;
}

const GameCanvas: React.FC<GameCanvasProps> = ({ snake, food, onDirectionChange }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const touchStartRef = useRef<{ x: number, y: number } | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');

        if (canvas && context) {
            const cellSize = canvas.width / GRID_SIZE;
            
            // Clear canvas
            context.fillStyle = BACKGROUND_COLOR;
            context.fillRect(0, 0, canvas.width, canvas.height);

            // Draw food
            context.fillStyle = FOOD_COLOR;
            context.shadowBlur = 10;
            context.shadowColor = FOOD_COLOR;
            context.fillRect(food.x * cellSize, food.y * cellSize, cellSize, cellSize);
            
            // Draw snake
            context.fillStyle = SNAKE_COLOR;
            context.shadowBlur = 10;
            context.shadowColor = SNAKE_COLOR;
            snake.forEach(segment => {
                context.fillRect(segment.x * cellSize, segment.y * cellSize, cellSize, cellSize);
            });
            context.shadowBlur = 0; // Reset shadow
        }
    }, [snake, food]);

    const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
        e.preventDefault();
        const touch = e.touches[0];
        touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    };

    const handleTouchEnd = (e: React.TouchEvent<HTMLCanvasElement>) => {
        e.preventDefault();
        if (!touchStartRef.current) return;

        const touch = e.changedTouches[0];
        const dx = touch.clientX - touchStartRef.current.x;
        const dy = touch.clientY - touchStartRef.current.y;

        if (Math.abs(dx) > Math.abs(dy)) {
            // Horizontal swipe
            if (dx > 0) onDirectionChange(Direction.RIGHT);
            else onDirectionChange(Direction.LEFT);
        } else {
            // Vertical swipe
            if (dy > 0) onDirectionChange(Direction.DOWN);
            else onDirectionChange(Direction.UP);
        }
        touchStartRef.current = null;
    };
    
    return (
        <canvas
            ref={canvasRef}
            width="600"
            height="600"
            className="w-full h-full"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        />
    );
};

export default GameCanvas;
