import type { LoadingBarApi } from "naive-ui";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useProviderStore = defineStore('provider', () => {
    const loadingBar = ref<LoadingBarApi>()

    function setLoadingBar(bar: LoadingBarApi) {
        loadingBar.value = bar
    }

    return { loadingBar, setLoadingBar }
})