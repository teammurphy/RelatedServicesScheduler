<template>
    <b-form-select :options="serviceOptions" @change="handleChange" ></b-form-select>
</template>

<script>
export default {
    name: "BaseSelectService",
    data() {
        return {
            serviceOptions: ['speech', 'OT', 'PT']
        };
    },
    methods: {
        handleChange(value) {
            this.$emit("service-has-changed", value)
        }
    }
};
</script>