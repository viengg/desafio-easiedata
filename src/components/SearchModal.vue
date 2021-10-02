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
import spotifyAPI from "../modules/spotifyAPI";

export default {
  name: "SearchModal",
  components: { Modal },
  data() {
    return {
      nomeArtista: "",
      artistas: [],
    };
  },
  methods: {
    pesquisaArtista() {
      if (!this.nomeArtista) return;

      spotifyAPI
        .search(this.nomeArtista)
        .then((artistas) => (this.artistas = artistas))
        .catch((err) => console.log(err));
    },
    cleanUp() {
      this.nomeArtista = "";
      this.artistas = [];
    },
  },
};
</script>