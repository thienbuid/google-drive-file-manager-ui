import { useCallback, useEffect, useState } from "react";
import { ResponseType } from "../utils/api/axios";

const STATUS_DEFAULT = "OK";
const MESSAGE_DEFAULT = "No message";

function useFetchData<T>(
  callback: () => Promise<ResponseType<T>>,
  defaultData: T,
  reload?: boolean
): [T, string, string, boolean, any] {
  const [data, setData] = useState<T>(defaultData);
  const [status, setStatus] = useState(STATUS_DEFAULT);
  const [message, setMessage] = useState(MESSAGE_DEFAULT);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await callback();
        console.log(result);
        if (!result) return;
        const { data, status, message } = result;
        setData(data);
        setStatus(status);
        setMessage(message);
      } catch (error) {
        setErrors(error as any);
      } finally {
        setLoading(true);
      }
    };
    fetchData();
  }, [callback, reload]);

  return [data, status, message, loading, errors];
}

export default useFetchData;
