<template>
  <div>
    <div v-if="loader.getIssue">
      <img class="loader-img" src="/static/loader.gif" alt />
    </div>
    <div v-if="!loader.getIssue" class="container">
      <h1>Issue #{{issue.number}}</h1>
      <h3>{{issue.title}}</h3>
      <p>{{issue.body}}</p>
      <a href="javascript:history.go(-1)" class="btn btn-success">Voltar</a>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "gitHubIssue",
  created() {
    this.getIssue();
  },
  data() {
    return {
      issue: {},
      notFind: false,
      loader: {
        getIssue: false
      }
    };
  },
  methods: {
    getIssue() {
      this.loader.getIssue = true;
      const url = `https://api.github.com/repos/${this.$route.params.name}/${this.$route.params.repo}/issues/${this.$route.params.issue}`;
      axios
        .get(url)
        .then(res => {
          this.issue = res.data;
        })
        .finally(() => {
          this.loader.getIssue = false;
          this.notFind = false;
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
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>