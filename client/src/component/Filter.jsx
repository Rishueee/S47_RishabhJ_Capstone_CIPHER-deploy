import React, { useEffect } from "react";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import { getAllAlbums, getAllArtist } from "../../api";
import { filterByLanguage, filters } from "../utils/Supportfunctions";
import FilterButtons from "./FilterButtons";
import { MdClearAll } from "react-icons/md";
import { motion } from "framer-motion";

const Filter = ({ setFilteredSongs, onFilterChange }) => {
  const [{ filterTerm, allArtist, allAlbums }, dispatch] = useStateValue();

  useEffect(() => {
    if (!allArtist) {
      getAllArtist().then((data) => {
        console.log("allArtist data", data);
        dispatch({ type: actionType.SET_ARTISTS, allArtist: data.artist });
      });
    }

    if (!allAlbums) {
      getAllAlbums().then((data) => {
        console.log("album", data.album);
        dispatch({ type: actionType.SET_ALL_ALBUMS, allAlbums: data.album });
      });
    }
  }, [allArtist, allAlbums, dispatch]);

  const updateFilter = (filterType, value) => {
    onFilterChange(filterType, value);
  };

  const clearAllFilter = () => {
    setFilteredSongs(null);
    dispatch({ type: actionType.SET_ARTIST_FILTER, artistFilter: null });
    dispatch({ type: actionType.SET_LANGUAGE_FILTER, languageFilter: null });
    dispatch({ type: actionType.SET_ALBUM_FILTER, albumFilter: null });
    dispatch({ type: actionType.SET_FILTER_TERM, filterTerm: null });
  };

  return (
    <div className="w-full my-4 px-6 py-4 flex flex-wrap items-center justify-center gap-4 md:gap-6 lg:gap-8 mx-auto">
      <FilterButtons filterData={allArtist} flag={"Artist"} onFilterChange={(value) => updateFilter("artistFilter", value)} />

      <div className="flex items-center gap-2 md:gap-4 lg:gap-6 mx-4 flex-wrap">
        {filters?.map((data) => (
          <p
            key={data.id}
            onClick={() => updateFilter("filterTerm", data.value)}
            className={`text-base ${
              data.value === filterTerm ? "font-semibold" : "font-normal"
            } text-textColor cursor-pointer hover:font-semibold transition-all duration-100 ease-in-out`}
          >
            {data.name}
          </p>
        ))}
      </div>

      <FilterButtons filterData={allAlbums} flag={"Albums"} onFilterChange={(value) => updateFilter("albumFilter", value)} />

      <FilterButtons filterData={filterByLanguage} flag={"Language"} onFilterChange={(value) => updateFilter("languageFilter", value)} />

      <motion.i
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileTap={{ scale: 0.75 }}
        onClick={clearAllFilter}
        className="text-textColor text-xl cursor-pointer flex-shrink-0"
      >
        <MdClearAll />
      </motion.i>
    </div>
  );
};

export default Filter;
