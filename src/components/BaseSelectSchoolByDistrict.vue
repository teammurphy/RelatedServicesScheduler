<template>
    <b-form-select :options="schoolOptions" @change="handleChange"></b-form-select>
</template>

<script>
import SchoolAPI from '../api/school.js'

export default {
    name: "BaseSelectSchoolByDistrict",
    props: {
        district: String
    },
    data() {
        return {
            schoolOptions: [{value:null, text:"Loading..."}]
        };
    },
    mounted() {
        this.buildSchoolOptionsByDistrict(this.district)
    },
    methods: {
        handleChange(value) {
            this.$emit("school-has-changed", value)
        },

        async buildSchoolOptionsByDistrict(district) {
            this.schoolOptions = [{value:null, text:"Loading..."}]
            const payload = await SchoolAPI.getSchoolsByDistrict(district)
            if (payload.ok) {
                this.schoolOptions = payload.data.map(function(item) { 
                    return {value: item.id, text: `${item.dbn} ${item.name}`}
                });
            } else {
                this.schoolOptions = [{value:null, text:"Error loading schools..."}]
            }            
        }
    }
};
</script>