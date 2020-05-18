<template>
  <div class="main">

    <overlay
      v-if="overlay_visible"
      v-scroll-lock="overlay_visible"        
      v-on:close="overlay_visible = false"
      v-bind:albums="this.albums"
      v-bind:selected="this.selected"
      v-bind:index="this.index"
    >
    </overlay>

    <div class="header">
      <img id="tent" src="../assets/tent.jpg">
      </div>

      <div id="logo">
        <img src="../assets/logo.png">
        </div>

        <div class="container" id="content">

          <b-row id="menu" class="justify-content-center" align-v="center">
            <b-col cols=3>
              <div class="link"
                v-bind:class="{ 'active-link': selected === sets.all.name }"
                v-on:click="changeSet(sets.all)"
              >All Photos</div>
            </b-col>
            <b-col cols=3>
              <div
                class="link"
                v-bind:class="{ 'active-link': selected === sets.highlights.name }"  
                v-on:click="changeSet(sets.highlights)">
                Highlights</div>
            </b-col>
            <b-col cols=3>
              <div class="link"
                v-bind:class="{ 'active-link': selected === sets.official.name }"
                v-on:click="changeSet(sets.official)"
              >Official Photos</div>
            </b-col>
          </b-row>

          <b-row id="picview" class="justify-content-center" align-v="center">
            <image-item v-for="(image, index) in albums[selected].data"
              v-bind:key="index"
              v-bind:index="index"
              v-bind:source="image"
              v-on:showpicture="showpic"></image-item>
          </b-row>

          <b-row id="footer" class="justify-content-center">
            ~
          </b-row>
        </div>

      </div>
    </template>

<script>
import ImageItem from './imag.vue';
import Overlay from './overlay.vue';
const officialData= require('../assets/official.json');
const highlightsData = require('../assets/highlights.json');
const allData = require('../assets/all.json');
export default {
  name: 'home',
  components: {
    ImageItem,
    Overlay
  },
  data: function() {
    return {
      sets: {
        official: {
          data: officialData,
          name: 'official'
        },
        highlights: {
          data: highlightsData,
          name: 'highlights'
        },
        all: {
          data: allData,
          name: 'all'
        }
      },
      selected: '',
      albums: {"": {data: "", name: ""}},
      index: 0,
      overlay_visible: false,
    }
  },
  methods: {
    showpic: function(index) {
      this.index = index;
      this.overlay_visible = true;
    },
    changeSet: function(set) {
      this.selected = set.name
    }
  },
  mounted() {
    this.albums[this.sets.official.name] = this.sets.official;
    this.albums[this.sets.highlights.name] = this.sets.highlights;
    this.albums[this.sets.all.name] = this.sets.all;
    this.changeSet(this.sets.highlights);
  }
}
</script>

<style>
.main {
  background-color: #fafffa;
}

.header {
  width: 100%;
  display: block;
  position: fixed;
  background-color: rgba(245, 237, 212, 1);
}

#tent {
  position: relative;
  margin-left: 50%;
  transform: translateX(-50%);
}

#logo {
  background-color: rgba(131, 102, 70, 0.5);
  transform: translateY(120px);

}

#content{
  background-color: rgba(255, 247, 222, 0.5);
  transform: translateY(245px);
}

#menu {
  background-color: rgba(255, 247, 222, 0.7);
  padding-top: 10px;
  padding-bottom: 10px;
}

.link {
  cursor: pointer;
  font-size: large;
  font-family: serif;
}

.link:hover {
  font-weight: bold;
}

.active-link {
  font-weight: bold;
}

#picview {
  padding-top: 5px;
}


#footer {
  font-size: x-large;
  font-weight: bold;
  padding-bottom: 10px;
  padding-top: 10px;
}

</style>
