<template>
  <modal>
    <label>Search</label>
    <input
      @keyup.enter="pesquisaArtista"
      type="text"
      placeholder="Start typing the artist's name here..."
      v-model="nomeArtista"
    />
    <button @click="pesquisaArtista">Go!</button>
    <ul>
      <li v-for="(artista, index) in artistas" :key="index">
        {{ artista.name }}
        <button @click="$emit('addArtist', artista), cleanUp()">Add!</button>
      </li>
    </ul>
  </modal>
</template>

<script>
import Modal from "./Modal.vue";
import getSpotifyToken from "../modules/spotifyToken";
const axios = require("axios");

export default {
  name: "SearchModal",
  components: { Modal },
  data() {
    return {
      token: "",
      nomeArtista: "",
      artistas: [],
    };
  },
  mounted() {
    getSpotifyToken()
      .then((data) => (this.token = data))
      .catch((err) => console.log(err));
  },
  methods: {
    pesquisaArtista() {
      axios
        .get(
          `https://api.spotify.com/v1/search?q=artist:${this.nomeArtista}&type=artist`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        )
        .then((data) => {
          console.log(data);
          this.artistas = data.data.artists.items;
        })
        .catch((err) => console.log(err));
    },
    cleanUp() {
      this.nomeArtista = "";
      this.artistas = [];
    },
  },
};
</script>