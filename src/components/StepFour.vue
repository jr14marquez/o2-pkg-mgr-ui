<template>
  <v-container fluid>
    <v-layout align-center justify-center row fill-height>
      <v-flex xs11>

<v-btn @click="openTree">Open</v-btn>
        <v-card>
          <v-card-title class="blue darken-1 white--text headline">
            Linux File System Directories
          </v-card-title>
          <v-layout justify-space-between pa-3>

            <v-treeview
            v-if="activateTree"
            :open="open"
            :items="zitems"
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


            <v-flex d-flex text-xs-center>
              <v-scroll-y-transition mode="out-in">
                <div
                  v-if="!selected"
                  class="title grey--text text--lighten-1 font-weight-light"
                  style="align-self: center;"
                >
                  Select a File to see a description.
                </div>

                <v-card v-else class="pt-4 mx-auto" flat max-width="400">
                  <v-card-text>
                    <h3 class="headline mb-2">
                      {{ selected}}
                    </h3>
                    <div class="blue--text mb-2">{{ selected.email }}</div>
                    <div class="blue--text subheading font-weight-bold">{{ selected }}</div>
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-layout tag="v-card-text" text-xs-left wrap>
                    <v-flex tag="strong" xs5 text-xs-right mr-3 mb-2>Website:</v-flex>
                    <v-flex>
                      <a :href="`//${selected}`" target="_blank">{{ selected }}</a>
                    </v-flex>
                  </v-layout>
                </v-card>
              </v-scroll-y-transition>
            </v-flex>
          </v-layout>
        </v-card>
       </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import store from "../store"

   export default {
    data: () => ({
      open:[],
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
      zitems: [],
      activateTree: false,
      dirs: [],
      selectedApps: [],
      addedApps: [],
      addedSystemdUnits: [],
      addedDefaults: false,
      selectedLibraries: [],
      initTree: {
        name: 'etc',
        children: [
          {
            name: 'systemd',
            children: [
              {
                name: 'system',
                children:[]
              }
            ]
          },
        ]
      }
    }),
    created () {
      console.log('created')
      this.activateTree = true
      this.open = ['etc']
      this.$emit('can-continue', {value: true}); 
     },
     mounted () {
      console.log('mounted')
      this.open = ['etc']
      this.activateTree = true
      this.$emit('can-continue', {value: true}); 
     },
    computed: {
      selected () {
        console.log('active BEFORE in selected computed: ',this.active)
        if (!this.active.length) {
          console.log('active in sel: ',this.active)
          return undefined
        }
        const name = this.active[0]
        console.log('name selected: ',name)
        //var find =  this.initItems.find(user => user.name === name)
        var fileDescription = this.$store.getters.getFileInfo(name)
        console.log('file description',fileDescription)
        return fileDescription

      },
    },
    methods: {
      items() {
        var dirs = this.$store.getters.getAccountInfo.home.split('/').filter((obj) => obj)
        var selectedApps = this.$store.getters.getSelectedApps
        var selectedLibraries = this.$store.getters.getSelectedLibraries

        Promise.all(dirs.map((dir,i) => {
          var obj = { name: dir, children: [] }
          if(i != dirs.length -1) {
            return Promise.resolve(obj)
          } 
          // At the end of the file tree so we put our app stuff in here
          return this.addApps(selectedApps, { name: dir, children: [] })
            .then(results => {
              return results[0]
            })
  
        })).then(x => {
          var appTree = x.reverse().reduce((a,b,i) => {
            b.children.push(a)
            return b
          })
          this.zitems = [appTree, this.initTree]
          this.open = ['etc','systemd','system']

        })
 
      },
      addApps(apps,directory) {

       return Promise.all(apps.map((app) => { 
          var appName = app.replace('-app','')
          this.addSystemdUnit(appName)
          if(app != 'omar-disk-cleanup') {
            directory.children.push(
            {
              name: appName,
              children:[
                {
                  name: `${appName}-prod.yml`,
                  file: 'config'
                },
                {
                  name: `${appName}-dev.yml`,
                  file: 'config'
                },
                {
                  name: `${appName}-app-<version>.jar`,
                  file: 'config'
                }
              ]
            })
          } else {
            directory.children.push(
            {
              name: appName,
              children:[
                {
                  name: `${appName}-app-<version>.jar`,
                  file: 'config'
                }
              ]
            })
          }
          if(!this.addedDefaults){
            directory.children.push(
            { name: 'omar-systemd.sh', file: 'config'},
            { name: '.env', file: 'config'})
            this.addedDefaults = true
          }

          return Promise.resolve(directory)
        }))
      },
      addSystemdUnit(appName){
        var unitFile = { name: `${appName}.service`, file: 'config'}
        var timer = { name: `${appName}.timer`, file: 'config'}
        if(!this.addedSystemdUnits.includes(appName)) {
          this.initTree.children[0].children[0].children.push(unitFile)
          if(appName == 'omar-disk-cleanup' || 'omar-cmdln') {
            this.initTree.children[0].children[0].children.push(timer)
          }
        }
        this.addedSystemdUnits.push(appName)
      },
      openTree() {
        console.log('open clicked')
        this.open = ['etc']
      }
    },
    activated() {
      this.activateTree = true
      this.openStatus = true
      this.open = ['etc']
      this.items()

    },
    deactivated() {
      this.activateTree = false
    }
  }
</script>
 <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 </style>