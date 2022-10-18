<template>
    <div class="ellipse"></div>
</template>

<script>
import App from "./App.vue";
import "../styleguide.css"
import "../global.css"
import vueConfig from "vue.config";
Vue.config.productionTip = false;
new Vue ({
    render: h => h(App),
}).$mount(#app);

export default {
    name: "App",
};
</script>

<style>
    .ellipse {
        background-color: #267fc9;
        border: 1px none;
        border-radius: 362px;
        height: 724px;
        width: 724px;
    }
</style>