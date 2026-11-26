import { useState } from "react";

export const usePostData = (service, onSuccess) => {
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState({});

  const addData = (payload) => {
    setLoading(true);

    return service(payload)
      .then((response) => {
        if (response.ok) {
          // algumas rotas respondem sem corpo, por isso o json() pode falhar
          response.json().then(setData).catch(() => setData({}));
          alert("Pedido Efetuado com sucesso");
          if (onSuccess) onSuccess();
        } else {
          alert("Error ao adicionar");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setError(error);
        alert(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    data,
    isError,
    isLoading,
    addData,
  };
};
