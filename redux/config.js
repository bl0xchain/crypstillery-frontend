const getEnvironmentVariable = (environmentVariable) => {
    const unvalidatedEnvironmentVariable = process.env[environmentVariable];
    if (!unvalidatedEnvironmentVariable) {
        return undefined;
    } else {
        return unvalidatedEnvironmentVariable;
    }
  };
  
export const config = {
    serverUrl: getEnvironmentVariable("SERVER_URL"),
    alchemyUri: getEnvironmentVariable("ALCHEMY_URI")
};