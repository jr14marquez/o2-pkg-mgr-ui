<template>
  <v-container fluid>
    <v-layout align-center justify-center row fill-height>

      <v-card>
    <v-card-title class="indigo white--text headline">
      User Directory
    </v-card-title>
    <v-layout
      justify-space-between
      pa-3
    >
      <v-flex xs5>
        <v-treeview
          :active.sync="active"
          :items="items"
          :open.sync="open"
          activatable
          active-class="primary--text"
          class="grey lighten-5"
          open-on-click
          transition
        >
          <v-icon
            v-if="!item.children"
            slot="prepend"
            slot-scope="{ item, active }"
            :color="active ? 'primary' : ''"
          >mdi-account</v-icon>
        </v-treeview>
      </v-flex>
      <v-flex
        d-flex
        text-xs-center
      >
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
            <v-card-text>
              <v-avatar
                v-if="avatar"
                size="88"
              >
                <v-img
                  :src="`https://avataaars.io/${avatar}`"
                  class="mb-4"
                ></v-img>
              </v-avatar>
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
  </v-card>

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
    computed: {
      selected () {
      // looks like i need to do something to get the selected. likely change to active node and change selected
      console.log('selected called')
        /*if (!this.active.length) return undefined
        const id = this.active[0]
        return this.users.find(user => user.id === id)*/
        return this .users
      }
    },
    watch: {
      selected: 'randomAvatar'
    },
    methods: {
    
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
