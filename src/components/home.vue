<template>
  <div class="main">
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
            <image-item v-for="image in current"
              v-bind:key="image"
              v-bind:source="image"
              v-on:showpicture="showpic"></image-item>
          </b-row>

          <b-row id="footer" class="justify-content-center">
            ~
          </b-row>
        </div>

        <b-modal centered size="xl" id="picture" scrollable>
          <template v-slot:modal-header="{ }">{{modalpic.filename}}</template>
          <b-img center fluid :src="modalpic.path"></b-img>


          <template v-slot:modal-footer="{ close }">
              <b-button :href="modalpic.fullpath" :download="modalpic.filename" size="sm" variant="outline-secondary" >Download Fullsize</b-button>
            <b-button size="sm" variant="outline-secondary" @click="close('forget')">Close</b-button>
          </template>

        </b-modal>

      </div>
    </template>

<script>
import ImageItem from './imag.vue';
const officialData= require('../assets/official.json');
const highlightsData = require('../assets/highlights.json');
const allData = require('../assets/all.json');
export default {
  name: 'home',
  components: {
    ImageItem
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
      current: [],
      modalpic: {
        path: "",
        fullpath: "",
        filename: ""
      }
    }
  },
  methods: {
    showpic: function(path) {
      this.modalpic.filename = path;
      this.modalpic.path = "large/" + path;
      this.modalpic.fullpath = "large/" + path; 
    },
    changeSet: function(set) {
      this.selected = set.name
      this.current= set.data;

    }
  },
  mounted() {
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
  overflow: hidden;
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
