import React from 'react';
import {FlatListProps} from 'react-native';
import rpx from '@/utils/rpx';
import MusicQueue from '@/core/musicQueue';

import MusicItem from '../mediaItem/musicItem';
import Empty from '../base/empty';
import {FlashList} from '@shopify/flash-list';

interface IMusicListProps {
    /** 顶部 */
    Header?: FlatListProps<IMusic.IMusicItem>['ListHeaderComponent'];
    /** 音乐列表 */
    musicList?: IMusic.IMusicItem[];
    /** 所在歌单 */
    musicSheet?: IMusic.IMusicSheetItem;
    /** 是否展示序号 */
    showIndex?: boolean;
    /** 点击 */
    onItemPress?: (
        musicItem: IMusic.IMusicItem,
        musicList?: IMusic.IMusicItem[],
    ) => void;
}
const ITEM_HEIGHT = rpx(120);

/** 音乐列表 */
export default function MusicList(props: IMusicListProps) {
    const {Header, musicList, musicSheet, showIndex, onItemPress} = props;

    return (
        <FlashList
            ListHeaderComponent={Header}
            ListEmptyComponent={Empty}
            data={musicList ?? []}
            keyExtractor={musicItem =>
                `ml-${musicItem.id}${musicItem.platform}`
            }
            estimatedItemSize={ITEM_HEIGHT}
            renderItem={({index, item: musicItem}) => {
                return (
                    <MusicItem
                        musicItem={musicItem}
                        index={showIndex ? index + 1 : undefined}
                        onItemPress={() => {
                            if (onItemPress) {
                                onItemPress(musicItem, musicList);
                            } else {
                                MusicQueue.playWithReplaceQueue(
                                    musicItem,
                                    musicList ?? [],
                                );
                            }
                        }}
                        musicSheet={musicSheet}
                    />
                );
            }}
        />
    );
}
