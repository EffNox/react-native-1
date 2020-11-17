import { ApolloClient, InMemoryCache, createHttpLink, } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import AsyncStorage from "@react-native-community/async-storage";

const httpLink = createHttpLink({
    uri: 'http://10.0.2.2:4567',
})

const authLink = setContext(async (_, { headers }) => {
    const tk = await AsyncStorage.getItem('tk')
    return { headers: { ...headers, tk } }
})

const client = new ApolloClient({
    // link: new HttpLink({ uri: 'http://10.0.2.2:4567', })
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({ addTypename: !0 }),
})

export default client
