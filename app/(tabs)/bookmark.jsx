import { View, Text, FlatList, RefreshControl } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchInput from '../../components/SearchInput';
import EmptyState from '../../components/EmptyState';
import useAppwrite from '../../lib/useAppwrite';
import { getAllPosts } from '../../lib/appwrite';
import VideoCard from '../../components/VideoCard';

const Bookmark = () => {
  const { data: posts, refetch } = useAppwrite(getAllPosts)

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true)

    await refetch()

    setRefreshing(false)
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            video={item}
          />
        )}
        ListHeaderComponent={() => (
          <View className='my-6 px-4 space-y-6'>
            <View className='justify-between items-start flex-row mb-6'>
                <Text className='text-2xl font-psemibold text-white'>Saved Videos</Text>
            </View>

            <SearchInput
              title='Search'
              placeholder='Search for a video topic'
              otherStyles=''
            />
          </View>
        )}

        ListEmptyComponent={() => (
          <EmptyState
            title='No Videos Found'
            subtitle='Be the first one to upload a video'
          />
        )}

        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  )
}

export default Bookmark
