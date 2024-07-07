export const addToPlaylist = (movie)=>{
    return(dispatch)=>{
        dispatch({
            type: 'ADD_TO_PLAYLIST',
            payload: movie
        });
    }
}


export const removeToPlaylist = (movieId)=>{
    return(dispatch, getState)=>{
        const current = getState();
        if(current){
            dispatch({
                type: 'REMOVE_FROM_PLAYLIST',
                payload: movieId
            });
        }
    }
}