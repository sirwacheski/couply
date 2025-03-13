import React from "react";
import { Avatar, Icon, Logo, Screen, FeatureOption } from "@components";
import { RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";

import { useMuralModel } from "./home.model";

export default function Mural() {
  const window = useWindowDimensions();
  const { muralQuery, muralFeatures, handleNavigateToInvitePartner } = useMuralModel();

  const getFeatureOptionSize = React.useCallback(() => {
    return window.width / 2 - Screen.Padding - 12
  }, [window.width, Screen.Padding]);

  if(muralQuery.data == null) {
    return (
      <Screen
      withSafeAreaView={true}>
      </Screen>
    );
  }

  return (
    <Screen
    withSafeAreaView={true}>
      <View
      className="w-full flex-row justify-between items-center">
        <View>
          <Logo />
        </View>
        <TouchableOpacity
        onPress={() => {}}>
          <Text
          className="text-white text-2xl">
            {"Edit Mural"}
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={(
        <RefreshControl 
        onRefresh={muralQuery.refetch}
        refreshing={muralQuery.isRefetching} 
        />
      )}>
        <View
        className="my-10">
          <View
          className="flex-row justify-center items-center">
            <View
            style={styles.avatar}
            className="z-10">
              <Avatar 
              size={120}
              username={muralQuery.data.owner?.name}
              uri={muralQuery.data.owner?.avatar?.url}
              />
            </View>
            {muralQuery.data.partner_id ? (
              <View
              style={styles.avatar}>
                <Avatar 
                size={120}
                username={muralQuery.data.partner?.name}
                uri={muralQuery.data.partner?.avatar?.url}
                />
              </View>
            ) : (
              <TouchableOpacity
              onPress={() => handleNavigateToInvitePartner()}
              className="w-[120] h-[120] border-2 border-white border-dashed justify-center items-center rounded-full">
                <Icon 
                size={40}
                name="plus"
                color="white"
                />
              </TouchableOpacity>
            )}
          </View>
          <View
          className="mt-10 gap-y-2">
            <Text
            numberOfLines={1}
            className="text-4xl font-base font-bold text-center leading-tight text-white">
              {muralQuery.data.title}
            </Text>
            <Text
            className="text-xl text-center font-base font-light text-white">
              {muralQuery.data.description}
            </Text>
          </View>
        </View>
        <View
        className="flex-row flex-wrap gap-3">
          {muralFeatures.map((item, index) => {
            return (
              <FeatureOption
              key={index}
              icon={item.icon}
              title={item.title}
              onSelect={() => {}}
              size={getFeatureOptionSize()}
              />
            )
          })}
        </View>
      </ScrollView>
    </Screen>
  )
}

const styles = StyleSheet.create({
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginRight: -35,
  }
});