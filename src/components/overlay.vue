<template>
  <div ref="overlay"  v-on:keydown="cursorEvent(event)">
    <div id="overlay"  v-on:click="$emit('close')" >
      <b-img id="image" :src="getURL()"></b-img>

    </div>

    <div id="overlay_footer">
      <b-button @click="prev()" size="sm" variant="secondary" >&lt; Prev</b-button>
      &nbsp;
      <b-button :href="fullpath()" :download="filename()" size="sm" variant="secondary" >Download Fullsize</b-button>
      &nbsp;
      <b-button size="sm" variant="secondary" @click="$emit('close')">Close</b-button>
      &nbsp;
      <b-button @click="next()" size="sm" variant="secondary" >Next &gt;</b-button>
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
      if (this.index < this.albums[this.selected].data.length) {
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
    this.$refs.overlay.focus();
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
  z-index: 2;
  align-items: center;
  justify-content: center;
}

#image {
  transform: translateY(-20px);
  max-width: 100%;
  max-height: 90%;
}

#overlay_footer {
  position: fixed;
  width: 100%;
  bottom: 0;
  margin-bottom: 6px;
  z-index: 3;
  align-items: center;
  justify-content: center;
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
