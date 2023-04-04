import { ref, isRef, unref, watchEffect } from "vue";
import axios from "axios";

export const useFetchListFilm = (url) => {
  const data = ref(null);
  const error = ref(null);

  const doFetch = async () => {
    data.value = null;
    error.value = null;
    const urlValue = unref(url);

    try {
      await timeout();
      const res = await axios.get(urlValue);
      data.value = res.data;
    } catch (error) {
      error.value = error;
    }
  };

  if (isRef(url)) {
    watchEffect(doFetch);
  } else {
    doFetch();
  }
  console.log(data);
  return { data, error, doFetch };
};

const timeout = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.3) {
        resolve();
      } else {
        reject(new Error("Random Error"));
      }
    }, 300);
  });
