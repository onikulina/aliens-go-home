import { calculateAngle } from "../utils/formulas";
import { numberOfLives } from "../utils/constants";
import createFlyingObjects from './createFlyingObjects';
import moveBalls from './moveCannonBalls';
import checkCollisions from './checkCollisions';

function moveObjects(state, action) {
    if (!state.gameState.started) return state;

    const mousePosition = action.mousePosition || {
        x: 0,
        y: 0,
    };

    let cannonBalls = moveBalls(state.gameState.cannonBalls);

    const newState = createFlyingObjects(state);

    const now = (new Date()).getTime();

    let flyingObjects = newState.gameState.flyingObjects.filter(object => {
        return (now - object.createdAt) < state.gameState.level;
    }); // flying objects only appear for 4 seconds

    const lostLife = state.gameState.flyingObjects.length > flyingObjects.length;
    let lives = state.gameState.lives;
    if (lostLife) {
        lives--;
    }

    const started = lives > 0;
    if (!started) {
        flyingObjects = [];
        cannonBalls = [];
        lives = numberOfLives;
    }

    const { x, y } = mousePosition;
    const angle = calculateAngle(0, 0, x, y);

    const objectsDestroyed = checkCollisions(cannonBalls, flyingObjects, state.gameState.level);
    const cannonBallsDestroyed = objectsDestroyed.map(object => (object.cannonBallId));
    const flyingDiscsDestroyed = objectsDestroyed.map(object => (object.flyingDiscId));

    cannonBalls = cannonBalls.filter(cannonBall => (cannonBallsDestroyed.indexOf(cannonBall.id)));
    flyingObjects = flyingObjects.filter(flyingDisc => (flyingDiscsDestroyed.indexOf(flyingDisc.id)));

    const kills = state.gameState.kills + flyingDiscsDestroyed.length;

    return {
        ...newState,
        gameState: {
            ...newState.gameState,
            flyingObjects,
            cannonBalls,
            lives,
            started,
            kills,
        },
        angle,
    };
}

export default moveObjects;