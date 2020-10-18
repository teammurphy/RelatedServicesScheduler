<template>
    <b-form-select :options="roleOptions" @change="handleChange" ></b-form-select>
</template>

<script>
export default {
    name: "BaseSelectRole",
    data() {
        return {
            roleOptions: ['admin', 'provider', 'supervisor', 'principal', 'student']
        };
    },
    methods: {
        handleChange(value) {
            this.$emit("role-has-changed", value)
        }
    }
};
</script>