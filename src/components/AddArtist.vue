<template>
  <button
    @click="$emit('displayModal')"
    class="button is-primary is-rounded mt-3"
  >
    Add Artist
  </button>
</template>

<script>
export default {
  name: "AddArtist",
};
</script>