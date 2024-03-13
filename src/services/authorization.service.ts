const sendResetPassword = async (email: string) => {
  // make request to backend
  // const { data } = await axios.post<ISuccessResponse>('/auth/test', { email });
  
  // TODO delete mock data
  return new Promise<boolean>((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, 300);
  });
};

const authorizationService = { sendResetPassword };

export default authorizationService;
