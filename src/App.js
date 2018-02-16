import React, { Component } from "react";
import PropTypes from "prop-types";
import { getCanvasPosition } from "./utils/formulas";
import Canvas from './components/Canvas';

class App extends Component {

	componentDidMount() {
		const self = this;
		setInterval(() => {
			self.props.moveObjects(self.canvasMousePosition);
		}, 10);
		window.onresize = () => {
			const cnv = document.getElementById("aliens-go-home-canvas");
			cnv.style.width = `${window.innerWidth}px`;
			cnv.style.height = `${window.innerHeight}px`;
		};
		window.onresize();
	}

	handleTrackMouse = (event) => {
		this.canvasMousePosition = getCanvasPosition(event);
	}

	handleShoot = () => {
		this.props.shoot(this.canvasMousePosition);
	}

	handleStartGame = (event) => {
		event.stopPropagation();
		this.props.startGame();
	}

	handleSetLevel = (event) => {
		const target = event.currentTarget;
		const attribute = target.getAttribute("data-level");
		this.props.setLevel(parseInt(attribute, 10));
	}

	render() {
		return (
			<Canvas
				angle={this.props.angle}
				trackMouse={this.handleTrackMouse}
				startGame={this.handleStartGame}
				gameState={this.props.gameState}
				shoot={this.handleShoot}
				setLevel={this.handleSetLevel}
			/>
		);
	}
}

App.propTypes = {
	angle: PropTypes.number.isRequired,
	moveObjects: PropTypes.func.isRequired,
	gameState: PropTypes.shape({
		started: PropTypes.bool.isRequired,
		kills: PropTypes.number.isRequired,
		lives: PropTypes.number.isRequired,
		level: PropTypes.number.isRequired,
		flyingObjects: PropTypes.arrayOf(PropTypes.shape({
			position: PropTypes.shape({
				x: PropTypes.number.isRequired,
				y: PropTypes.number.isRequired
			}).isRequired,
			id: PropTypes.number.isRequired,
		})).isRequired,
	}).isRequired,
	startGame: PropTypes.func.isRequired,
	shoot: PropTypes.func.isRequired,
	setLevel: PropTypes.func.isRequired,
};

export default App;

// Gautam's suggestions:
// Different ammo types that you can get by successfully shooting out packages from the sky
// Ammo type examples: grapeshot (shotgun for cannon)
// Powerup where you create duplicate copies of your cannon (maybe to left and right of screen), and they shoot when you shoot at the same spot that you do
// Different enemy types that take a non-linear path down
// S-shaped path, sin-wave path
// visual indicator for when you lose a life (screen flash)
// 'boss' enemies that are tougher to kill but move more slowly -- taking multiple shots 
// explodey bits for when you kill saucers
// add trees and clouds

// https://codepen.io/photonicPeep/pen/MpYjqP - tree
// https://codepen.io/saadbess/pen/ejhlr - cloud
