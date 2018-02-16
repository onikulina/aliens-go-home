import { connect } from "react-redux";
import App from "../App";
import { moveObjects, startGame, shoot, setLevel } from "../actions/index";

const mapStateToProps = state => ({
    angle: state.angle,
    gameState: state.gameState,
});

const mapDispatchToProps = dispatch => ({
    moveObjects: (mousePosition) => {
        dispatch(moveObjects(mousePosition));
    },
    startGame: () => {
        dispatch(startGame());
    },
    shoot: (mousePosition) => {
        dispatch(shoot(mousePosition));
    },
    setLevel: (level) => {
        dispatch(setLevel(level));
    }
});

const Game = connect(mapStateToProps, mapDispatchToProps)(App);

export default Game;