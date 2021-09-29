<template>
  <modal>
    <label class="label">Search</label>
    <div class="field is-grouped">
      <input
        @keyup.enter="pesquisaArtista"
        type="text"
        placeholder="Start typing the artist's name here..."
        v-model="nomeArtista"
        class="input mr-3 is-rounded"
      />
      <button @click="pesquisaArtista" class="button is-primary is-rounded">
        Go!
      </button>
    </div>
    <ul>
      <li v-for="(artista, index) in artistas" :key="index" class="mt-3">
        {{ artista.name }}
        <button
          @click="$emit('addArtist', artista), cleanUp()"
          class="button is-light is-small is-rounded ml-2"
        >
          Add!
        </button>
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
      if (!this.nomeArtista) {
        return;
      }

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