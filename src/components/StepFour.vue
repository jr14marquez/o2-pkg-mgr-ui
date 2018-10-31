<template>
  <v-container fluid>
    <v-layout align-center justify-center row fill-height>
      <v-flex xs12 sm8>
      <v-btn @click="test">test</v-btn>

        <v-treeview
          v-model="tree"
          :open="open"
          :items="items"
          activatable
          hoverable
          item-key="name"
          active.sync="active"
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
      val: 'blah',
      tree: [],
      addedApps: [],
      items: [
        {
          name: '/usr',
          children: [
            {
              name: 'share',
              children: [
                {
                  name: 'omar',
                  children:[
                    {
                      name: 'omar-systemd.sh',
                      file: 'config'
                    },
                    {
                      name: '.env',
                      file: 'config'
                    }
                  ]
                },
                {
                  name: 'ossim',
                  children:[
                    {
                      name: 'index.html',
                      file: 'txt'
                    }
                  ]
                }
              ]
            },
          ]
        },
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
      ]
    }),
    mounted () {

    },
    computed: {
      selected () {
        console.log('selected called')
      } 
    },
    methods: {
      test(value) {
        console.log('active: ',this.$el.querySelector('.v-treeview-node--active'))
        this.$el.querySelector('.v-treeview-node--active')
        // get this element  next <label class="v-treeview-node__label">omar-systemd.sh</label>
        // add click to all of these v-treeview-node__content
        console.log('content: ',this.$el.querySelectorAll('label'))
      }
    },
    activated() {

      this.$emit('can-continue', {value: true}); 
      var selectedApps = this.$store.getters.getSelectedApps
      var selectedLibraries = this.$store.getters.getSelectedLibraries
      var accountInfo = this.$store.getters.getAccountInfo  

      selectedApps.map(app => {
        // If its not already added then add it to tree
        if(!this.addedApps.includes(app)) {
          this.items[0].children[0].children[0].children.push(
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
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
