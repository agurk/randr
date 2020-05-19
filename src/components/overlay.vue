<template >
  <div ref="ovrly" id="overlay"
    v-on:keydown="cursorEvent()"
    v-touch:swipe.left="next"
    v-touch:swipe.right="prev"
  tabindex="0">

    <div id="close" title="Close zoom" class="control" v-on:click="$emit('close')">
      <img src="../assets/close.svg">
    </div>

    <div id="download" title="Download original" class="control" >
      <a v-bind:href="fullpath()" v-bind:download="filename()">
        <img src="../assets/download.svg">
      </a>
    </div>

    <div id="image" v-on:click="$emit('close')">
      <b-img id="image_content" thumbnail blank-color="white" :key="getURL()" :src="getURL()" ></b-img>
    </div>

    <div id="prev" title="Previous image" v-if="this.index > 0" class="control" v-on:click="prev()">
      <img src="../assets/arrow.svg">
    </div>

    <div id="next" title="Next image" v-if="this.index + 1 < this.albums[this.selected].data.length" class="control" v-on:click="next()">
      <img src="../assets/arrow.svg">
    </div>

  </div>
</template>

<script>
export default {
  name: "Overlay",
  data: function() {
    return {
      index: 0
    }
  },
  props: [
    'albums',
    'selected',
    'initial_index'
  ],
  methods: {
    getURL: function() {
      return "large/" + this.albums[this.selected].data[this.index];
    },
    fullpath: function() {
      return "full/" + this.albums[this.selected].data[this.index];
    },
    filename: function() {
      return this.albums[this.selected].data[this.index];
    },
    prev: function() {
      if (this.index > 0) {
        this.index--;
      }
    },
    next: function() {
      if (this.index + 1 < this.albums[this.selected].data.length) {
        this.index++;
        this.preloadNext();
      }
    },
    preloadNext: function() {
      if (this.index + 1 < this.albums[this.selected].data.length) {
        const image = new Image();
        image.src = "large/" + this.albums[this.selected].data[this.index+1];
      }
    },
    cursorEvent: function(e) {
      e = e || window.event;
      switch (e.keyCode) {
        case 39:
          this.next();
          break;
        case 37:
          this.prev();
          break;
        case 27:
          this.$emit('close');
          break;
      }

    }
  },
  mounted() {
    this.index = this.initial_index;
    this.$refs.ovrly.focus();
    this.preloadNext();
  }
};
</script>

<style>
#overlay {
  align-items: center;
  justify-content: center;
  background-color: rgba(0,0,0,0.75);
  display: flex;
  position: fixed;
  height: 100%;
  width: 100%;
  padding: 4px;
  z-index: 4;
}

.control {
  position: fixed;
  padding: 15px;
  z-index: 3;
  cursor: pointer;
}

.control:hover {
  background-color: rgb(0,0,0);
}

#close {
  top: 0;
  right: 0;
}

#download{
  top: 0;
  left: 0;
}

#prev{
  bottom: 0;
  left: 0;
  transform: rotate(180deg);
}

#next {
  bottom: 0;
  right: 0;
}

#image {
  display: flex;
  margin: 5px;
  cursor: zoom-out;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
}

#image_content {
  max-width: 100%;
  max-height: 100%;
}

.nav_button {
  margin-left: 3px;
  margin-right: 3px;
  margin-bottom: 2px;
  margin-top: 2px;
}

#arrow {
  height: 100%;
  display: flex;
  width: 6%;
  align-items: center;
  justify-content: center;
}

#arrow:hover {
  background-color: rgba(0,0,0,0.5);
  cursor: pointer;
}
</style>
