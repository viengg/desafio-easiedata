<template>
  <modal>
    <img :src="artist.images[1].url" class="center" />
    <h1>{{ artist.name }}</h1>
    <p>Spotify ID: {{ artist.id }}</p>
    <p>
      Spotify URL:
      <a :href="artist.external_urls.spotify" target="_blank">{{
        artist.external_urls.spotify
      }}</a>
    </p>
    <p>Follower count: {{ artist.followers.total }}</p>
    <p>Popularity Index: {{ artist.popularity }}</p>
    <p>Genres: {{ formatGenre(artist.genres) }}</p>
  </modal>
</template>

<script>
import Modal from "./Modal.vue";
const _ = require("lodash");

export default {
  name: "ArtistDetails",
  components: { Modal },
  props: ["artist"],
  methods: {
    formatGenre(genre) {
      return genre.map((element) => _.capitalize(element)).join(", ");
    },
  },
};
</script>

<style scoped>
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>