<template>
  <div class="container">
    <h1>Vue.js + GitHub</h1>
    <p>Página que lista issues de um repositório do GitHub, usando Vue.js</p>
    <div class="form-group">
      <input v-model="username" type="text" placeholder="gitHub username" />
      <input v-model="repository" type="text" placeholder="github repositório" />
      <button @click.prevent.stop="getIssues()" class="btn btn-success">Procurar</button>
      <button @click.prevent.stop="reset()" class="btn btn-danger">Limpar</button>
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
      if (!this.username && !this.repository) {
        this.notFind = true;
        return;
      }
      this.loader.getIssues = true;
      const url = `https://api.github.com/repos/${this.username}/${this.repository}/issues`;
      axios
        .get(url)
        .then(res => {
          this.issues = res.data;
          this.notFind = false;
          console.log(this.issues);
        })
        .catch(error => {
          this.notFind = true;
        })
        .finally(() => {
          this.loader.getIssues = false;
        });
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