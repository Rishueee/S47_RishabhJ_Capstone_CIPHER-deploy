export const actionType = {
  SET_USER: "SET_USER",
  SET_ALL_USERS: "SET_ALL_USER",
  SET_ALL_SONGS: "SET_ALL_SONGS",
  SET_ARTISTS: "SET_ARTISTS",
  SET_ALL_ALBUMS: "SET_ALL_ALBUMS",
  // filters
  SET_FILTER_TERM: "SET_FILTER_TERM",
  SET_ARTIST_FILTER: "SET_ARTIST_FILTER",
  SET_LANGUAGE_FILTER: "SET_LANGUAGE_FILTER",
  SET_ALBUM_FILTER: "SET_ALBUM_FILTER",

  SET_ALERT_TYPE: "SET_ALERT_TYPE",
  SET_CURRENT_USER: "SET_CURRENT_USER:",

  SET_ISSONG_PLAYING: "SET_ISSONG_PLAYING",
  SET_SONG_INDEX: "SET_SONG_INDEX",
  SET_MINI_PLAYER: "SET_MINI_PLAYER",

  SET_SEARCH_TERM: "SET_SEARCH_TERM",
};

const reducer = (state, action) => {
  // console.log(action.users.users);
  switch (action.type) {
    case actionType.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case actionType.SET_ALL_USERS:
      return {
        ...state,
        allUsers: action.allUsers,
      };

    case actionType.SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.searchTerm,
      };

    case actionType.SET_ALL_SONGS:
      return {
        ...state,
        allSongs: action.allSongs,
      };

    case actionType.SET_ARTISTS:
      return {
        ...state,
        allArtist: action.allArtist,
      };
    case actionType.SET_ALL_ALBUMS:
      return {
        ...state,
        allAlbums: action.allAlbums,
      };

    // filter case
    case actionType.SET_FILTER_TERM:
      return {
        ...state,
        filterTerm: action.filterTerm,
      };

    case actionType.SET_ARTIST_FILTER:
      return {
        ...state,
        artistFilter: action.artistFilter,
      };

    case actionType.SET_LANGUAGE_FILTER:
      return {
        ...state,
        languageFilter: action.languageFilter,
      };
    case actionType.SET_ALBUM_FILTER:
      return {
        ...state,
        albumFilter: action.albumFilter,
      };

    case actionType.SET_ALERT_TYPE:
      return {
        ...state,
        alertType: action.alertType,
      };

    case actionType.SET_CURRENT_USER:
      return {
        ...state,
        CurrentUser: action.CurrentUser,
      };

    case actionType.SET_ISSONG_PLAYING:
      return {
        ...state,
        isSongPlaying: action.isSongPlaying,
      };
    case actionType.SET_SONG_INDEX:
      return {
        ...state,
        songIndex: action.songIndex,
      };

    case actionType.SET_MINI_PLAYER:
      return {
        ...state,
        miniPlayer: action.miniPlayer,
      };

    default:
      return state;
  }
};

export default reducer;
