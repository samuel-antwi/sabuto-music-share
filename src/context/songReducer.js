const songReducer = (state, action) => {
  // console.log(action.payload);
  switch (action.type) {
    case 'PLAY_SONG':
      return {
        ...state,
        isPlaying: true,
      };
    case 'PAUSE_SONG':
      return {
        ...state,
        isPlaying: false,
      };

    case 'RESET_SONG':
      return {
        ...state,
        song: action.payload.song,
      };

    case 'ADD_TO_QUEUE':
      return {
        ...state,
        queue: action.payload.song,
      };
    default:
      return state;
  }
};

export default songReducer;
