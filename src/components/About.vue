<template>
  <v-layout>
    <v-dialog v-model="show" max-width="700px">
      <v-card>
         <v-card-title>
          <span class="headline">Book Trading</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-container class="text-xs-left">
          <h2>About the project</h2>
            <v-layout>
              <v-flex>
                <p>
                  This project was developed as a 
                  <a href="https://www.freecodecamp.org/challenges/manage-a-book-trading-club">challenge</a> of 
                  <a href="https://www.freecodecamp.org/">freecodecamp</a> 
                  with the purpose of improving and developing skills by building a full stack web app.
                </p>
                <p>
                  The project should follow this specific 
                  <a href="https://en.wikipedia.org/wiki/User_story">User Stories: </a>
                </p>
                <ul class="ml-4 mt-1">
                  <li>I can view all books posted by every user.</li>
                  <li>I can add a new book.</li>
                  <li>I can update my settings to store my full name, city, and state.</li>
                  <li>I can propose a trade and wait for the other user to accept the trade.</li>
                </ul>
              </v-flex>
            </v-layout>
            <v-divider class="mt-4 mb-4"></v-divider>
            <v-container style="border: 1px solid rgba(0, 0, 0, 0.2); border-radius: 10px" class="pb-4">
              <h2 class="text-xs-center mb-2">Technology Stack</h2>
              <v-layout wrap>
                <v-flex xs6
                v-for="stack in techStack"
                :key="stack.name">
                  <h3 class="text-xs-center mt-3">{{stack.name}}</h3>
                  <ul>
                    <li v-for="(data, index) in stack.data" :key="index" class="test">{{ data }}</li>
                  </ul>
                </v-flex>
              </v-layout>              
            </v-container>
            <v-divider class="mt-4 mb-4"></v-divider>
            <h3>Source Corde @<a> GibHub</a></h3>
            <div class="text-xs-right" style="font-size: 12px">
              <span class="grey--text">Alberto Florence @ 2017</span>
            </div>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    show: true,
    techStack: [
      {name: 'Back End', data: ['Nodejs', 'Express', 'MongoDB']},
      {name: 'Front End', data: ['Vue', 'Vuex', 'Vuetify']},
      {name: 'Authentication', data: ['JWT', 'Passwort.js']},
      {name: 'APIs', data: ['Google Books Api']}
    ]
  }),
  watch: {
    show () {
      if (this.show === false) {
        this.$router.push('/')
      }
    }
  }

}
</script>

<style>
  p {
    margin-bottom: 0px;
  }
  .test {
    list-style-type: none;
    border: 1px solid;
    margin: 3px;
    padding: 7px;
    border-radius: 5px;
    background-color: grey;
    color: white;
    font-weight: bold;
  }
</style>
