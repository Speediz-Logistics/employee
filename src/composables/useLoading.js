// useLoading.js
import { ref } from 'vue';
import { ElLoading } from 'element-plus';

export default function useLoading() {
  const loadingInstance = ref(null);

  const startLoading = () => {
    loadingInstance.value = ElLoading.service({
      fullscreen: true, // You can also change this to false for other loading styles
      text: 'Loading...', // You can customize the loading text here
    });
  };

  const stopLoading = () => {
    if (loadingInstance.value) {
      loadingInstance.value.close();
    }
  };

  return { startLoading, stopLoading };
}
