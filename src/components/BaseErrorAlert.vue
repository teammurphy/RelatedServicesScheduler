<template>
    <b-alert class="error" variant="danger" show>
      {{ error.name }} - {{ error.message }}
    </b-alert>
</template>

<script>
export default {
    name: 'BaseErrorAlert',
    props: {
        error: Object
    }
}
</script>
