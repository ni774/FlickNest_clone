
const existingPlaylist = JSON.parse(localStorage.getItem("myplaylist")) || [];
// let existingPlaylist = [{title: 'ram', url: "http://"},{title: "syaml", url: "http://"}]
// console.log("exiting", existingPlaylist);

const myPlaylistReducer = (state = existingPlaylist, action) => {
    switch(action.type) {
        case 'ADD_TO_PLAYLIST':
            const newStateAdd = [ action.payload, ...state];
            localStorage.setItem("myplaylist", JSON.stringify(newStateAdd));
            return newStateAdd;
        case 'REMOVE_FROM_PLAYLIST':
            const newStateRemove = state.filter(m => m.id !== action.payload);
            localStorage.setItem("myplaylist", JSON.stringify(newStateRemove));
            return newStateRemove;
        default:
            return state;
    }
}

export {myPlaylistReducer};