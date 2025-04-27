import axios from "axios";
import { toast } from "react-toastify";

let Get = async (url, accessToken) => {
  const options = {
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
  };
  try {
    const res = await axios.get(url, options);
    return res;
  } catch (error) {
    toast.error(error?.message, {
      position: "top-center",
    });
  }
};
export { Get };

let Post = async (url, body, accessToken) => {
  const options = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
  };
  try {
    const res = await axios.post(url, body, options);
    return res;
  } catch (error) {
    console.log(error , "errorerror")
    toast.error(error?.response?.data?.error, {
      position: "top-center",
    });
  }
};
export { Post };

let Patch = async (url, body, accessToken) => {
  const options = {
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
  };
  try {
    const res = await axios.patch(url, body, options);
    return res;
  } catch (error) {
    toast.error(error?.message, {
      position: "top-center",
    });
  }
};
export { Patch };

let Delete = async (url, accessToken) => {
  const options = {
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
  };
  try {
    const res = await axios.delete(url, options);
    return res;
  } catch (error) {
    toast.error(error?.message, {
      position: "top-center",
    });
  }
};

let Put = async (url, body, accessToken) => {
  const options = {
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
  };
  try {
    const res = await axios.put(url, body, options);
    return res;
  } catch (error) {
    toast.error(error?.message, {
      position: "top-center",
    });
  }
};
export { Put };

export { Delete };
