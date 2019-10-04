
import Feed from './screens/Feed';
import Login from './screens/Login';
import AuthLoadingScreen from './AuthLoadingScreen';

import { createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


const AppStack = createStackNavigator({
    Feed: {
        screen: Feed,
        navigationOptions: {
            title: 'Instalura',
            headerTitleStyle: { fontWeight: 'bold' },
        },
    },
},
    { headerLayoutPreset: 'center' }
);

const AuthStack = createStackNavigator({
    Login: {
        screen: Login,
        navigationOptions: { header: null },
    },
});

const Routes = createAppContainer(createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        App: AppStack,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'AuthLoading',
    }
));

export default Routes;

/* const Routes = createAppContainer(
    createStackNavigator({
        Login: {
            screen: Login,
            navigationOptions: {
                header: null,
            },
        },
        Feed: {
            screen: Feed,
            navigationOptions: {
                title: 'Instalura',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            },
        },
    },
        { headerLayoutPreset: 'center' }
        //    {
        //        headerMode: 'none',
        //    }
    )
); */
