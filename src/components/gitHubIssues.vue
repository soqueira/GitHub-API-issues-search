<template>
  <div class="container">
    <h1>Vue.js + GitHub</h1>
    <p>Página que lista issues de um repositório do GitHub, usando Vue.js</p>
    <div class="form-group">
      <input v-model="username" type="text" placeholder="gitHub username" />
      <input v-model="repository" type="text" placeholder="github repositório" />
      <button @click.prevent.stop="getIssues()" class="btn btn-success">Procurar</button>
                                  <!-- clicking the reset will "clear" the localStorage-->
      <button @click.prevent.stop="reset() || getDataStore()" class="btn btn-danger">Limpar</button>
    </div>
    <table class="table table-sm table-bordered">
      <thead>
        <tr>
          <th width="100">ID</th>
          <th>Título</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="loader.getIssues || loader.getIssue">
          <td colspan="2">
            <img class="loader-img" src="/static/loader.gif" alt />
          </td>
        </tr>
        <template v-if="!loader.getIssue">
          <tr v-for="issue in issues" :key="issue.number">
            <td>{{issue.number}}</td>
            <td>
              <router-link
                :to="{name: 'gitHubIssue', params:{name: username, repo: repository, issue: issue.number}}"
              >{{issue.title}}</router-link>
            </td>
          </tr>
        </template>
        <tr v-if="notFind">
          <td colspan="2">Nada encontrado</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "gitHubIssues",
  created() {
    this.initLocalStore();
  },
  data() {
    return {
      username: "",
      repository: "",
      issues: [],
      selectedIssue: {},
      notFind: false,
      loader: {
        getIssues: false,
        getIssue: false
      }
    };
  },
  methods: {
    reset() {
      this.username = "";
      this.repository = "";
      this.issues = [];
      this.notFind = false;
    },
    getIssues() {
      this.getDataStore()
      if (!this.username && !this.repository) {
        this.notFind = true;
        this.issues = [];
        return;
      }
      this.loader.getIssues = true;
      const url = `https://api.github.com/repos/${this.username}/${this.repository}/issues`;
      axios
        .get(url)
        .then(res => {
          this.issues = res.data;
          this.notFind = false;
        })
        .catch(error => {
          this.notFind = true;
        })
        .finally(() => {
          this.loader.getIssues = false;
        });
    },
    getDataStore(){
       const dataStorage = {
        username: this.username,
        repository: this.repository
      };
      localStorage.setItem("gitHubIssues", JSON.stringify(dataStorage));
    },
    initLocalStore() {
      const localData = JSON.parse(localStorage.getItem("gitHubIssues"));
      if (!localData.username || !localData.repository) return;
      this.username = localData.username;
      this.repository = localData.repository;
      this.getIssues();
    }
  }
};
</script>

<style scoped>
.container {
  text-align: center;
  margin-top: 3%;
}
.loader-img {
  width: 50px;
}
</style>