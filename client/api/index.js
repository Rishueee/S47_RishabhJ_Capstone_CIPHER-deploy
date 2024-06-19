import axios from "axios"

const baseURL = "http://localhost:3000/"


export const validateuser = async (token) => {
    try {
        const res = await axios.get(`${baseURL}api/users/login`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return res.data;
    } catch (error) {
        console.log(error)
    }

    
    
}


export const signup = async (userData, token) => {
  const {username} = userData;

  try {
      const res = await fetch(`${baseURL}api/users/signup`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              Authorization : "Bearer " + token
          },
          body: JSON.stringify({
              username
          })
      })
      return res.json();
  } catch (error) {
      return null;
  }
}



export const getAllUsers = async () => {
    try {
        const res = await axios.get(`${baseURL}api/users/getUsers `)
        console.log("user data" ,res.data);
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const getAllArtist = async () => {
    try {
      const res = await axios.get(`${baseURL}api/artist/getAll`);
      return res.data;
    } catch (error) {
      return null;
    }
  };


  export const getAllAlbums = async () => {
    try {
      const res = await axios.get(`${baseURL}api/album/getAll`);
      return res.data;
    } catch (error) {
      return null;
    }
  };

  export const getAllSongs = async () => {
    try {
      const res = await axios.get(`${baseURL}api/songs/getAll`);
      return res.data;
    } catch (error) {
      return null;
    }
  };
  
  export const deleteSongById = async (id) => {
    console.log(id)
    try {
      const res = axios.delete(`${baseURL}api/songs/delete/${id}`);
      return res;
    } catch (error) {
      return null;
    }
  };
  
  
  
  export const changingUserRole = async (userId, role) => {
    try {
      const res = await axios.put(`${baseURL}api/users/updateRole/${userId}`, {
        role: role,
      });
      console.log(res)
      return res;
    } catch (error) {
      console.error("Error updating user role:", error);
      throw error; 
    }
  };
  export const removeUser = async (userId) => {
    try {
      const res = axios.delete(`${baseURL}api/users/deleteUser/${userId}`);
      return res;
    } catch (error) {
      return null;
    }
  };
  
  export const saveNewSong = async (data) => {
    try {
      console.log(data);
      
      const res = await axios.post(`${baseURL}api/songs/save`, data);
      return res.data.Song; 
    } catch (error) {
      console.error("Error saving song:", error);
      return null;
    }
  };

  export const SaveNewArtist = async (data) => {
    console.log(data)
    try {
      const res = axios.post(`${baseURL}api/artist/save`,{...data});
      return (await res).data.savedArtist;
    } catch (error) {
      console.error("Error saving artist:", error);
      return null;
    }
    
    
  }

  export const SaveNewAlbum = async (data) => {
    try {
      const res = axios.post(`${baseURL}api/album/save`,{...data});
      return (await res).data.savedAlbum;
    } catch (error) {
      return null;
    }
  }

  export const deleteArtistById = async (artistId) => {
    try {
      const res = axios.delete(`${baseURL}api/artist/delete/${artistId}`);
      return res;
    } catch (error) {
      return null;
    }
  }


  export const deleteAlbumById = async (albumId) => {
    try {
      const res = axios.delete(`${baseURL}api/album/delete/${albumId}`);
      return res;
    } catch (error) {
      return null;
    }
  }

  export const updatePhoneNumber = async (user_id, ph_number) => {
    try {
        const res = await axios.post(`${baseURL}api/users/updatePhoneNumber/${user_id}/${ph_number}`)
        return res.data;
    } catch (error) {
        return null;
    }
}



export const updateProfileImage = async (data) => {
  try {
      const res = axios.post(`${baseURL}api/users/updateProfileImage`, {...data});
      return (await res).data;
  } catch (error) {
    console.log(error)
  }
}

