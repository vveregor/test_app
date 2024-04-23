import {SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import {Provider} from 'react-redux';

import {store} from '../../app/store';
import UserProfile from './components/UserProfile';

interface IProps {
    componentId: string;
    userId: number;
}

const User = (props: IProps) => {
    const {userId} = props;

    return (
        <Provider store={store}>
            <SafeAreaView style={styles.root}>
                <UserProfile userId={userId} />
            </SafeAreaView>
        </Provider>
    );
};

const styles = StyleSheet.create({root: {flex: 1}});

export default User;
