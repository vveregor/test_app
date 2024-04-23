import React, {useCallback} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Navigation} from 'react-native-navigation';

import {TUser} from '../../../app/API';
import {COMMON_STYLES} from '../../../styles';
import {ImagePlaceholder} from './ImagePlaceholder/ImagePlaceholder';

interface IProps {
    item: TUser;
    onRemove?: (id: number) => void;
    componentId: string;
}

export function UserItem(props: IProps) {
    const {item, onRemove, componentId} = props;
    const {avatar, name, id, age, like} = item;

    const handlePress = useCallback(() => {
        Navigation.push(componentId, {
            component: {
                name: 'User',
                passProps: {
                    userId: id,
                },
            },
        });
    }, [componentId, id]);

    const handleRemove = useCallback(() => onRemove?.(item.id), [item, onRemove]);

    const renderDescription = useCallback(
        () => (
            <View style={styles.text}>
                <Text>id: {id}</Text>
                <Text>Name: {name}</Text>
                <Text>Age: {age}</Text>
            </View>
        ),
        [age, id, name],
    );

    const renderImage = useCallback(
        () => (
            <View style={styles.imageContainer}>
                {avatar ? <Image style={styles.image} source={{uri: avatar}} /> : <ImagePlaceholder />}
            </View>
        ),
        [avatar],
    );

    const renderLike = useCallback(
        () => (
            <View style={styles.likeContainer}>
                {like ? <Image style={styles.like} source={require('../../../assets/heart_red.png')} /> : null}
            </View>
        ),
        [like],
    );

    const renderRemoveButton = useCallback(
        () => (
            <TouchableOpacity onPress={handleRemove} style={styles.removeIconWrapper}>
                <Text style={styles.removeIcon}>x</Text>
            </TouchableOpacity>
        ),
        [handleRemove],
    );

    const renderBody = useCallback(() => {
        return (
            <TouchableOpacity style={styles.body} onPress={handlePress}>
                {renderImage()}
                {renderLike()}
                {renderDescription()}
                {renderRemoveButton()}
            </TouchableOpacity>
        );
    }, [renderDescription, renderImage, renderRemoveButton, handlePress, renderLike]);

    const renderContainer = useCallback(() => {
        return <View style={styles.container}>{renderBody()}</View>;
    }, [renderBody]);

    return <View style={styles.root}>{renderContainer()}</View>;
}

const styles = StyleSheet.create({
    root: {
        height: 150,
        width: '100%',
    },
    body: {
        ...COMMON_STYLES.pv_2,
        ...COMMON_STYLES.ph_1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
        borderWidth: 1,
        borderRadius: 16,
    },
    container: {
        ...COMMON_STYLES.ph_1,
        ...COMMON_STYLES.pv_1,
        height: '100%',
        width: '100%',
    },
    imageContainer: {
        ...COMMON_STYLES.ml_1,
        height: 100,
        width: 100,
        borderWidth: 1,
        borderRadius: 16,
    },
    image: {
        height: '100%',
        width: '100%',
        borderRadius: 16,
    },
    like: {
        height: '100%',
        width: '100%',
    },
    likeContainer: {
        width: 15,
        height: 15,
    },
    text: {
        ...COMMON_STYLES.ml_1,
    },
    removeIcon: {
        fontSize: 24,
    },
    removeIconWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});
