export default (state, action) => {
    return {
        ...state,
        gameState: {
            ...state.gameState,
            level: action.level,
        },
    };
};