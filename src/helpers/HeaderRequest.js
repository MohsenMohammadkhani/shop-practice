const getHeaderForRequest = (extraHeader) => {
  const headersRequest = {
    headers: {
      ...extraHeader,
      "Content-Type": "application/json",
    },
  };

  return headersRequest;
};

const getAuthorizationHeaderRequest = () => {
  const token = localStorage.getItem("token");
  return {
    authorization: `Bearer ${token}`,
  };
};

export default {
  getHeaderForRequest,
  getAuthorizationHeaderRequest,
};
