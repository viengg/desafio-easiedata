<template>
  <div class="content">
    <h1 class="title is-1">Desafio easiedata</h1>
    <band-list
      @displayModal="showSearchModal = true"
      @removeArtist="removeArtist"
      @displayDetails="displayDetails"
      :bandas="bandas"
    />
    <add-artist @displayModal="showSearchModal = true" />
    <search-modal
      @addArtist="addArtista"
      @closeModal="showSearchModal = false"
      v-show="showSearchModal"
    />
    <artist-details
      @closeModal="showDetailModal = false"
      v-if="showDetailModal"
      :artist="artist"
    />
  </div>
</template>

<script>
import AddArtist from "./components/AddArtist.vue";
import BandList from "./components/BandList.vue";
import SearchModal from "./components/SearchModal.vue";
import ArtistDetails from "./components/ArtistDetails.vue";

export default {
  name: "App",
  components: { AddArtist, BandList, SearchModal, ArtistDetails },
  data() {
    return {
      artist: "",
      bandas: [],
      showSearchModal: false,
      showDetailModal: false,
    };
  },
  mounted() {
    if (localStorage.getItem("bandas")) {
      try {
        this.bandas = JSON.parse(localStorage.getItem("bandas"));
      } catch (e) {
        localStorage.remove("bandas");
      }
    }
  },
  methods: {
    addArtista(item) {
      console.log(item);
      this.bandas.push(item);
      this.showSearchModal = false;
      this.saveBandList();
    },
    removeArtist(artistName) {
      this.bandas = this.bandas.filter((banda) => banda.name != artistName);
      this.saveBandList();
    },
    displayDetails(artist) {
      this.showDetailModal = true;
      this.artist = artist;
    },
    saveBandList() {
      const parsed = JSON.stringify(this.bandas);
      localStorage.setItem("bandas", parsed);
    },
  },
};
</script>

<style>
</style>
