<template>
  <div
    class="wrapper"
    v-on:click="$emit('showpicture', source)"
    v-b-modal.picture>
    <b-img-lazy
      thumbnail
      :src="getURL()"
      height="180px"
      width="180px"
      :title="source"
      >
    </b-img-lazy>
  </div>
</template>

<script>
export default {
  name: "ImageItem",
  props: {
    source: {
      type: String,
      required: true
    }
  },
  data: function() {
    return {
      loaded: false
    }
  },
  methods: {
    getURL: function() {
      return "thumbs/" + this.source;
    }
  }
};
</script>

<style>
.wrapper {
    padding: 4px;
    cursor: pointer;
  }
</style>
