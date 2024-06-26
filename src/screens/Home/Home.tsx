import {SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import {Provider} from 'react-redux';

import UsersList from './components/UsersList';
import {store} from '../../app/store';

interface IProps {
    componentId: string;
}

const Home = (props: IProps) => {
    const {componentId} = props;

    return (
        <Provider store={store}>
            <SafeAreaView style={styles.root}>
                <UsersList componentId={componentId} />
            </SafeAreaView>
        </Provider>
    );
};

const styles = StyleSheet.create({root: {flex: 1}});

export default Home;
