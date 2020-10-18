<template>
    <b-form-select :options="countyOptions" @change="handleChange" ></b-form-select>
</template>

<script>
export default {
    name: "BaseSelectCounty",
    data() {
        return {
            countyOptions: ['K', 'M', 'Q', 'R', 'X']
        };
    },
    methods: {
        handleChange(value) {
            this.$emit("county-has-changed", value)
        }
    }
};
</script>