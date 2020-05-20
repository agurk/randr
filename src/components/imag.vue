<template>
  <div
    class="wrapper"
    v-on:click="$emit('showpicture', index)">
    <b-img-lazy
      thumbnail
      :src="$thumb_dir + source"
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
    },
    index: {
    }
  },
  data: function() {
    return {
      loaded: false
    }
  },
};
</script>

<style>
.wrapper {
    padding: 4px;
    cursor: zoom-in;
  }
</style>
