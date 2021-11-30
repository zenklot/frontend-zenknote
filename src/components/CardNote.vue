<template>
  <div class="card shadow">
    <b-link :to="'/detail/' + note.id" class="not"></b-link>
    <div class="card-body">
      <h6 class="card-title">
        <strong>{{ note.title }}</strong>
      </h6>
      <hr />
      <p class="card-text">
        {{ note.note }}
      </p>
      <span
        class="badge badge-secondary mr-1"
        v-for="(tg, index) in tag"
        :key="index"
        >{{ tg ? "#"+tg : null }}</span
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "CardNote",
  props: ["note", "tag"],
};
</script>

<style>
</style>