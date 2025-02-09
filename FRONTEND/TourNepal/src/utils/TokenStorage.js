import * as Keychain from 'react-native-keychain'; //importing keychain

//for storing token in mobile device
export const storeTokens = async (accessToken, encryptedToken) => {
  try {
    //for storing access token and encrypted token in dictionary
    const authTokens = {accessToken, encryptedToken};
    await Keychain.setGenericPassword('auth', JSON.stringify(authTokens), {
      service: 'TourNepalTokens',
    });
  } catch (e) {
    console.error('Error storing tokens: ', e);
  }
};

//for retreiving tokens in mobile device
export const getToken = async () => {
  try {
    const authTokens = await Keychain.getGenericPassword({
      service: 'TourNepalTokens',
    });
    if (authTokens) {
      return JSON.parse(authTokens.password);
    }
    return "1st";
  } catch (e) {
    console.error('Error retreiving tokens: ', e);
    return "2nd";
  }
};

//for clearing tokens stored in mobile device
export const clearToken = async () => {
  try {
    await Keychain.resetGenericPassword({service: 'TourNepalTokens'});
  } catch (e) {
    console.error('Error Clearing tokens: ', e);
  }
};
