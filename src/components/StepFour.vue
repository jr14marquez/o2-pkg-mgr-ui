<template>
  <v-container fluid>
    <v-layout align-center justify-center row fill-height>
      <v-flex xs12 sm8>
         <v-treeview
          v-if="activateTree"
          open-all
          :items="bitems()"
          activatable
          hoverable
          item-key="name"
          :active.sync="active"
          open-on-click
        >
          <template slot="prepend" slot-scope="{ item, open, leaf, active }">
            <v-icon v-if="!item.file">
              {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
            </v-icon>
            <v-icon v-else>
              {{ files[item.file] }}
            </v-icon>
          </template>
        </v-treeview>

        <!--<div v-if="!selected">not selected</div>
        <div v-else :key="selected.name">yep</div>-->
       </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import store from "../store"

   export default {
    data: () => ({
      open: ['/usr'],
      files: {
        html: 'mdi-language-html5',
        js: 'mdi-nodejs',
        json: 'mdi-json',
        md: 'mdi-markdown',
        pdf: 'mdi-file-pdf',
        png: 'mdi-file-image',
        config: 'mdi-file-document-outline',
        xls: 'mdi-file-excel',
      },
      active:[],
      activateTree: false,
      dirs: [],
      selectedApps: [],
      selectedLibraries: [],
      items:
       
        {
          name: '/etc',
          children: [
            {
              name: 'systemd',
              children: [
                {
                  name: 'system',
                  children:[
                    {
                      name: 'index.html',
                      file: 'html'
                    }
                  ]
                }
              ]
            },
          ]
        }
      
    }),
     created () {
    console.log('created')
         this.activateTree = true
      this.dirs = this.$store.getters.getAccountInfo.home.split('/').filter((obj) => obj)
      this.selectedApps = this.$store.getters.getSelectedApps
      this.selectedLibraries = this.$store.getters.getSelectedLibraries
      this.$emit('can-continue', {value: true}); 
     },
     mounted () {

     console.log('mounted')
          this.activateTree = true
      this.dirs = this.$store.getters.getAccountInfo.home.split('/').filter((obj) => obj)
      this.selectedApps = this.$store.getters.getSelectedApps
      this.selectedLibraries = this.$store.getters.getSelectedLibraries
      console.log('this.dirs: ',this.dirs)

      this.$emit('can-continue', {value: true}); 
     },
    computed: {
      selected () {
        console.log('active BEFORE: ',this.active)
        if (!this.active.length) {
          console.log('active in sel: ',this.active)
          return undefined
        }
        const name = this.active[0]
        console.log('name selected: ',name)
        var find =  this.items.find(user => user.name === name)

        return undefined
      },
      citems() {
      console.log('called citems')
       /* var dirs = this.$store.getters.getAccountInfo.home.split('/').filter((obj) => obj)
        var selectedApps = this.$store.getters.getSelectedApps
        var selectedLibraries = this.$store.getters.getSelectedLibraries*/
        
       var res =  this.dirs.map(dir => {
          return { name: dir, children: [] }
        }).reverse().reduce((a,b,i) => {
          b.children.push(a)
          return b
        })


    /* console.log('childres test: ', dirObj.children[0].children[0])
      selectedApps.map(app => {
        // If its not already added then add it to tree
        if(!this.addedApps.includes(app)) {
          dirObj.children[0].children[0].children.push(
            {
              name: app,
              children:[
                {
                  name: `${app}-prod.yml`,
                  file: 'config'
                },
                {
                  name: `${app}-dev.yml`,
                  file: 'config'
                }
              ]
            }
          )
          this.addedApps.push(app)
        }
      }) */

        return [
          res,
          this.items
        ]
      }
    },
    methods: {
      bitems() {
      console.log('called bitems')
        var dirs = this.$store.getters.getAccountInfo.home.split('/').filter((obj) => obj)
        var selectedApps = this.$store.getters.getSelectedApps
        var selectedLibraries = this.$store.getters.getSelectedLibraries

        console.log('dirs in bitems: ',dirs)
       var res =  dirs.map(dir => {
          return { name: dir, children: [] }
        }).reverse().reduce((a,b,i) => {
          b.children.push(a)
          return b
        })


    /* console.log('childres test: ', dirObj.children[0].children[0])
      selectedApps.map(app => {
        // If its not already added then add it to tree
        if(!this.addedApps.includes(app)) {
          dirObj.children[0].children[0].children.push(
            {
              name: app,
              children:[
                {
                  name: `${app}-prod.yml`,
                  file: 'config'
                },
                {
                  name: `${app}-dev.yml`,
                  file: 'config'
                }
              ]
            }
          )
          this.addedApps.push(app)
        }
      }) */

        return [
          res,
          this.items
        ]
      }
    },
    activated() {
      console.log('ACTCIVATE')
      console.log('mounted')
      console.log('this.dirs: ',this.dirs)
          this.activateTree = true
      /*this.dirs = this.$store.getters.getAccountInfo.home.split('/').filter((obj) => obj)
      this.selectedApps = this.$store.getters.getSelectedApps
      this.selectedLibraries = this.$store.getters.getSelectedLibraries
      this.$emit('can-continue', {value: true}); */
      
    },
    deactivated() {
      console.log('deactivated')
      this.activateTree = false
    }
  }
</script>
 <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 </style>