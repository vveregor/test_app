import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';

import {COMMON_STYLES} from '../../../styles';
import {fetchUserThunk, likeUserThunk} from '../../../app/asyncActions/users';
import {Loader} from '../../Home/components/Loader/Loader';
import {ImagePlaceholder} from '../../Home/components/ImagePlaceholder/ImagePlaceholder';
import {clearCurrentUser} from '../../../app/actions/users';

interface IProps {
    userId: number;
}

function UserProfile(props: IProps) {
    const {userId} = props;
    const dispatch = useAppDispatch();

    const {data: user, status} = useAppSelector(state => state.currentUser); // data from static JSON, can't see current 'like'
    const {items} = useAppSelector(state => state.users);
    const [isLiked, setIsLiked] = useState<boolean>(false);

    useEffect(() => {
        // check 'like' in current list
        if (items.length && user?.id) {
            items.find(item => {
                if (item.id === user.id && item.like) {
                    setIsLiked(true);
                }
                return item.id === user.id;
            });
        }
    }, [items, user]);

    useEffect(() => {
        dispatch(fetchUserThunk(userId));

        return () => {
            dispatch(clearCurrentUser());
        };
    }, [dispatch, userId]);

    const handleLike = () => {
        setIsLiked(prev => !prev);
        dispatch(likeUserThunk(userId));
    };

    return (
        <View style={styles.root}>
            {status === 'loading' ? (
                <Loader />
            ) : (
                <View style={styles.profileContainer}>
                    <View style={styles.imageContainer}>
                        {user?.avatar ? (
                            <Image style={styles.image} source={{uri: user.avatar}} />
                        ) : (
                            <ImagePlaceholder />
                        )}
                    </View>
                    <View style={styles.text}>
                        <Text>id: {user?.id}</Text>
                        <Text>Name: {user?.name}</Text>
                        <Text>Age: {user?.age}</Text>
                    </View>
                    <TouchableOpacity style={styles.likeWrap} onPress={handleLike}>
                        <Image
                            style={styles.image}
                            source={
                                isLiked
                                    ? require('../../../assets/heart_red.png')
                                    : require('../../../assets/heart_black.png')
                            }
                        />
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    root: {flex: 1},
    profileContainer: {
        position: 'relative',
        flexDirection: 'row',
        ...COMMON_STYLES.mt_3,
        ...COMMON_STYLES.mh_2,
    },
    imageContainer: {
        ...COMMON_STYLES.ml_1,
        height: 200,
        width: 200,
        borderWidth: 1,
        borderRadius: 16,
    },
    image: {
        height: '100%',
        width: '100%',
        borderRadius: 16,
    },
    text: {
        ...COMMON_STYLES.ml_2,
    },
    likeWrap: {
        width: 34,
        height: 34,
        position: 'absolute',
        left: 20,
        bottom: -15,
    },
    likeImg: {
        width: '100%',
        height: '100%',
    },
    liked: {
        backgroundColor: 'red',
        opacity: 1,
    },
});

export default UserProfile;
