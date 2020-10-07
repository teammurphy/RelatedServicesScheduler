<template>
    <b-card :title="username">
        <!-- given a user, will display a card with some basic infor -->
        <p>{{ email }}</p>
        <strong>Roles</strong>
        <b-list-group>
            <b-list-group-item v-for="role in roles" :key="role.id">
                {{ role.name }} {{ role.service }} {{ role.district }}{{ role.county }}{{ role.school }}
            </b-list-group-item>
        </b-list-group>
    </b-card>
</template>

<script>
export default {
  name: "UserCard",
  props: {
    username: {type: String, required: true},
    email: String,
    id: Number,
    roles: Array
  },
  data () {
    return {
      alert: {}
    }
  }
}
</script>