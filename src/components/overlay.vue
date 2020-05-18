<template>
  <div id="overlay" ref="overlay2"
    v-on:keydown="cursorEvent(event)"
    v-touch:swipe.left="next"
    v-touch:swipe.right="prev">

      <div id="close" class="control" v-on:click="$emit('close')">
        <img src="../assets/close.svg">
      </div>

      <div id="download" class="control" >
        <a v-bind:href="fullpath()" v-bind:download="filename()">
        <img src="../assets/download.svg">
        </a>
      </div>

      <b-img-lazy thumbnail blank-color="white" id="image" :src="getURL()" v-on:click="$emit('close')"></b-img-lazy>
      

      <div id="prev" class="control" v-on:click="prev()">
        <img src="../assets/back.svg">
      </div>

      <div id="next" class="control" v-on:click="next()">
        <img src="../assets/next.svg">
      </div>

  </div>
</template>

<script>
export default {
  name: "Overlay",
  props: [
    'albums',
    'selected',
    'index'
  ],
  methods: {
    getURL: function() {
      return "large/" + this.albums[this.selected].data[this.index];
    },
    fullpath: function() {
      return "large/" + this.albums[this.selected].data[this.index];
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
    this.$refs.next_thing.focus();
  }
};
</script>

<style>
#overlay {
  position: fixed;
  display: flex;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.75);
  z-index: 4;
  align-items: center;
  justify-content: center;
}

.control {
  position: fixed;
  padding: 10px;
  z-index: 3;
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
}

#next {
  bottom: 0;
  right: 0;
}

#image {
  max-width: 100%;
  max-height: 100%;
  margin: 5px;
  cursor: zoom-out;
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
