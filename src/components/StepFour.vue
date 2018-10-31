<template>
  <v-container fluid>
    <v-layout align-center justify-center row fill-height>
      <v-flex xs12 sm8>
      <v-btn @click="test">test</v-btn>

        <v-treeview
         
          open-all
          :load-children="fetchUsers"
          :items="items"
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

         <v-scroll-y-transition mode="out-in">

          <div
            v-if="!selected"
            class="title grey--text text--lighten-1 font-weight-light"
            style="align-self: center;"
          >
            Select a User
          </div>
          <v-card
            v-else
            :key="selected.id"
            class="pt-4 mx-auto"
            flat
            max-width="400"
          >
           <div>{{ selected }}</div>
            <v-card-text>
              <h3 class="headline mb-2">
                {{ selected.name }}
              </h3>
              <div class="blue--text mb-2">{{ selected.email }}</div>
              <div class="blue--text subheading font-weight-bold">{{ selected.username }}</div>
            </v-card-text>
            <v-divider></v-divider>
            <v-layout
              tag="v-card-text"
              text-xs-left
              wrap
            >
              <v-flex tag="strong" xs5 text-xs-right mr-3 mb-2>Company:</v-flex>
              <v-flex>{{ selected.company.name }}</v-flex>
              <v-flex tag="strong" xs5 text-xs-right mr-3 mb-2>Website:</v-flex>
              <v-flex>
                <a :href="`//${selected.website}`" target="_blank">{{ selected.website }}</a>
              </v-flex>
              <v-flex tag="strong" xs5 text-xs-right mr-3 mb-2>Phone:</v-flex>
              <v-flex>{{ selected.phone }}</v-flex>
            </v-layout>
          </v-card>
        </v-scroll-y-transition>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import store from "../store"

  export default {
    data: () => ({
      open: [],
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
      users: [
        {
              "id": 1,
              "name": "share",
              children: [
                {
                  "id":2,
                  name: 'omar',
                  children:[
                    {
                      "id":3,
                      name: 'omar-systemd.sh',
                      file: 'config'
                    },
                    {
                      "id":4,
                      name: '.env',
                      file: 'config'
                    }
                  ]
                },
                {
                  "id":5,
                  name: 'ossim',
                  children:[
                    {
                      "id":6,
                      name: 'index.html',
                      file: 'txt'
                    }
                  ]
                }
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
        console.log('active BEFORE: ',this.active)
        if (!this.active.length) {
          console.log('active in sel: ',this.active)
          return undefined
        }
        const id = this.active[0]
        console.log('id: ',id)
        return this.users.find(user => user.id === id)
      },
      items () {
        return [
          {
            name: '/usr',
            children: this.users
          }
        ]
      },
    },
    methods: {
      test(value) {
        console.log('active: ',this.$el.querySelector('.v-treeview-node--active'))
        this.$el.querySelector('.v-treeview-node--active')
        // get this element  next <label class="v-treeview-node__label">omar-systemd.sh</label>
        // add click to all of these v-treeview-node__content
        console.log('content: ',this.$el.querySelectorAll('label'))
      },
      fetchUsers(item) {
        var selectedApps = this.$store.getters.getSelectedApps
        var selectedLibraries = this.$store.getters.getSelectedLibraries
        var accountInfo = this.$store.getters.getAccountInfo  
        var arr = []

        selectedApps.map(app => {
          // If its not already added then add it to tree
          if(!this.addedApps.includes(app)) {
            arr.push(
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
        this.items[0].children[0].children[0].children.push(arr)
        return this.items
      }
    },
    activated() {

      this.$emit('can-continue', {value: true}); 
      
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
