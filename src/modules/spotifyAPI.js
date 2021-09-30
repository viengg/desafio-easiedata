import axios from "axios";
import { getToken } from "./spotifyToken";

export default {
  async search(artista) {
    const token = await getToken();
    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=artist:${artista}&type=artist`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.artists.items;
  },
};
