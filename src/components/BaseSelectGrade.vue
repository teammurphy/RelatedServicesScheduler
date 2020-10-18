<template>
    <b-form-select :options="gradeOptions" @change="handleChange" ></b-form-select>
</template>

<script>
export default {
    name: "BaseSelectGrade",
    data() {
        return {
            gradeOptions: []
        };
    },
    created() {
        this.gradeOptions = this.buildGradeOptions()
    },
    methods: {
        handleChange(value) {
            this.$emit("grade-has-changed", value)
        },

        ordinal(n) {
            if (n > 3 && n < 21) return "th"
            switch (n % 10) {
                case 1: return "st"
                case 2: return "nd"
                case 3: return "rd"
                default: return "th"
            }
        },

        buildGradeOptions() {
            //prob should get from back end database to keep in sync
            let gradeOptions = [{ value: "3K", text: "3K" },{ value: "PK", text: "PreK" }]
            let i
            for (i = 1; i<=12; i++) {
                gradeOptions.push({value: i.toString(), text: `${i}${this.ordinal(i)} Grade`})
            }
            return gradeOptions
        }
    }
};
</script>