<template>
    <b-form-select :options="districtOptions" @change="handleChange" ></b-form-select>
</template>

<script>
export default {
    name: "BaseSelectDistrict",
    data() {
        return {
            districtOptions: []
        };
    },
    mounted() {
        this.districtOptions = this.buildDistrictOptions()
    },
    methods: {
        buildDistrictOptions() {
            let i
            let districts = []
            for (i=1; i<33; i++) {
                districts.push(i.toString())
            }
            districts.push("75")
            return districts
        },

        handleChange(value) {
            this.$emit("district-has-changed", value)
        }
    }
};
</script>