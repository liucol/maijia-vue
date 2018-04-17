<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swp-page swiper-slide"  v-for="lists in bannerlists">
                <a class="js-no-follow" v-bind:href="lists.clickUrl">
                    <img class="goods-main-photo fadeIn" v-bind:src="lists.image">
                </a>
            </div>
        </div>
        <div class="swiper-pagination"></div>
    </div>
</template>

<style>
    .swiper-slide img {
        height: 100%;
        width: 100%;
    }
</style>

<script>
    import Swiper from "swiper"
    import "swiper/dist/css/swiper.css"

    export default {
        name: 'swipe',
        props: {
            bannerlists: {
                // type: Array,
                required: true
            }
        },
        created() {
            // console.log("created", document.getElementsByClassName("swiper-slide"))
        },
        mounted() {
            // console.log("mounted", document.getElementsByClassName("swiper-slide"))
            new Swiper(".swiper-container",{
                loop: true,
                pagination: { el: '.swiper-pagination'}
            })
        },
        // watch: {
        //     bannerlists(val, oldval) { 
        //         console.log(val) 
        //         console.log(oldval)
        //         console.log("before nextTick",document.getElementsByClassName("swiper-slide"))
        //         this.$nextTick(() => {
        //             console.log("after nextTick", document.getElementsByClassName("swiper-slide"))
        //         })
        //     }
        // }
    }
</script>