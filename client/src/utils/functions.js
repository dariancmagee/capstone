import axios from "axios";

const getAddedFavorites = async function () {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const { data } = await axios.post(
      `/api/users/favorites`,
      { token }
    );
    return data[0].favorites;
    // setFavoritesList(data[0].favorites);
  } catch (error) {
    console.log(error);
    return [];
  }
};

export { getAddedFavorites };
