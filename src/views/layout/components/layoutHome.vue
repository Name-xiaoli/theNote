<template>
  <div class="welcome">
    <span>欢</span>
    <span>迎</span>
    <span>使</span>
    <span>用</span>
    <span>笔</span>
    <span>记</span>
    <span>本</span>
  </div>
  <message-container></message-container>
</template>

<style lang="scss" scoped>
.welcome {
  min-height: 18vh;
  align-items: center;
  margin-bottom: 5vh;
  display: flex;
  justify-content: space-evenly;
  span {
    justify-content: center;
    font-size: 6em;
    font-family: monospace;
  }
}
</style>
