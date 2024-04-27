import { useState, useEffect } from "react";
import { NOT_ALLOWED_WORDS } from "./constants";

export function useMeaning(word) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`

    if (word && word.split(" ").length <= 2 && !NOT_ALLOWED_WORDS.includes(word)) {
      fetch(url)
        .then(response => response.json())
        .then(json => {
          setData(json[0]);
        }).catch(error => {
          console.error("There has been a problem with your fetch operation: ", error);
        });
    }

  }, [word]);

  return data;

}