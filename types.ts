
export type Coordinates = {
    x: number;
    y: number;
};

export enum Direction {
    UP,
    DOWN,
    LEFT,
    RIGHT,
}

export type GameState = 'START' | 'PLAYING' | 'GAME_OVER';
