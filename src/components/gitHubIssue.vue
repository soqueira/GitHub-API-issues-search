<template>
  <div>
    <div v-if="loader.getIssue">
      <img class="loader-img" src="/static/loader.gif" alt />
    </div>
    <div v-if="!loader.getIssue" class="container">
      <h1>Issue #{{issue.number}}</h1>
      <h3>{{issue.title}}</h3>

      <pre v-html="codeText">{{codeText}}</pre>

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
      codeText: "",
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
          this.formatCode();
        });
    },
    formatCode() {
      let text = this.issue.body;
      const regx = /```[^```]*```/g;
      let regMatch = text.match(regx);
      if (regMatch) {
        //replace "```" to HTML tag and replace the end "`," of each code regex and close the tag
        this.codeText = text.replace(
          regx,
          `<div class='code'>${regMatch}</div>`.replace(/`,/g,`</div><div class='code'>`)).replace(/`/g, '')
      } else {
        this.codeText = text;
      }
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
.btn {
  position: absolute;
  left: 45px;
  top: 45px;
}
pre {
  display: block;
  font-size: 87.5%;
  color: #212529;
  width: 100%;
  margin: 0;
  padding: 20px;
  position: absolute;
  left: 0;
  text-align: left;
  border-top: 1px solid #aaa;
}
</style>