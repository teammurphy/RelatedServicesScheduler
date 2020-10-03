<template>
    <b-alert v-if="message.length>0" show class="loading">
      <b-spinner label="Loading..." class="loading"></b-spinner>
      {{ message }}
    </b-alert>
</template>

<script>
export default {
    name: 'BaseLoadingAlert',
    props: {
        message: String
    }
}
</script>