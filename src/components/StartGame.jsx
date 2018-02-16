import React from "react";
import PropTypes from "prop-types";
import { gameWidth, levels } from "../utils/constants";

const StartGame = (props) => {
    const button = {
        x: gameWidth / -2, // half width
        y: -600, // minus means up (above 0)
        width: gameWidth,
        height: 330,
        rx: 10, // border radius
        ry: 10, // border radius
        style: {
            fill: "transparent",
            stroke: 'black',
            strokeDasharray: '15',
        },
    };

    const text = {
        textAnchor: "middle",
        x: 0,
        y: -500,
        style: {
            fontFamily: `"Joti One", cursive`,
            fontSize: 60,
            fill: "#e3e3e3",
            cursor: "pointer",
        },
        onClick: props.onStartGame,
    };

    const levelButtons = Object.keys(levels).map((levelName, i) => {
        const levelPosition = {
            key: i,
            x: ((i - 1) * 200),
            textAnchor: "middle",
            y: -350,
            style: {
                fontFamily: `"Joti One", cursive`,
                fontSize: 40,
                fill: props.currentLevel === levels[levelName] ? "#cbca62" : "#e3e3e3",
                cursor: "pointer",
            },
            "data-level": levels[levelName],
            onClick: props.onSetLevel
        };

        return (
            <text {...levelPosition}>
                {levelName}
            </text>
        );
    });

    return (
        <g filter="url(#shadow)">
            <rect {...button} />
            <text {...text}>
                {props.startButtonText}
            </text>
            {levelButtons}
        </g>
    );
};

StartGame.propTypes = {
    onStartGame: PropTypes.func.isRequired,
    onSetLevel: PropTypes.func.isRequired,
    currentLevel: PropTypes.number.isRequired,
    startButtonText: PropTypes.string.isRequired,
};

export default StartGame;
