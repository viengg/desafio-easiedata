<template>
  <div>
    <div v-if="bandas.length === 0">
      <p>
        No artists added yet.
        <a @click="$emit('displayModal')">Start adding now!</a>
      </p>
    </div>
    <div v-else>
      <table class="table is-striped">
        <tr>
          <th>Artist Name</th>
          <th>Follower Count</th>
          <th>Genres</th>
          <th></th>
          <th></th>
        </tr>
        <tr v-for="(item, index) of bandas" :key="index">
          <td>{{ item.name }}</td>
          <td>{{ item.followers.total }}</td>
          <td>{{ formataGenero(item.genres) }}</td>
          <td>
            <button
              @click="$emit('removeArtist', item.name)"
              class="button is-light is-rounded"
            >
              Remove
            </button>
          </td>
          <td>
            <button
              @click="$emit('displayDetails', item)"
              class="button is-light is-rounded"
            >
              Details
            </button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
const _ = require("lodash");

export default {
  name: "BandList",
  props: ["bandas"],
  methods: {
    formataGenero(genero) {
      return genero
        .slice(0, 2)
        .map((element) => _.capitalize(element))
        .join(", ");
    },
  },
};
</script>