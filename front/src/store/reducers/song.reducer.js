const initialState = {
    songs: [],
}

export function songReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_SONGS':
            return { ...state, songs: action.songs }
        case 'ADD_SONG':
            return { ...state, songs: [...state.songs, action.song] }
        case 'UPDATE_SONG':
            return {
                ...state,
                songs: state.songs.map(song => song._id === action.song._id ? action.song : song)
            }
        case 'REMOVE_SONG':
            return {
                ...state,
                songs: state.songs.filter(song => song._id !== action.songId)
            }
        default:
            return state
    }
} 