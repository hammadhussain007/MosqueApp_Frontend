import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
// Home tab removed as per request
import ProfileScreen from "./ProfileScreen";
import ForumScreen from "./ForumScreen";
import ForumDetailScreen from "./ForumDetailScreen";
import AnnouncementsScreen from "./AnnouncementsScreen";
import NotificationsScreen from "./NotificationsScreen";

const Tab = createBottomTabNavigator();
const ForumStackNav = createStackNavigator();

function ForumStack() {
  return (
    <ForumStackNav.Navigator>
      <ForumStackNav.Screen name="ForumList" component={ForumScreen} options={{ headerShown: false }} />
      <ForumStackNav.Screen name="ForumDetail" component={ForumDetailScreen} options={{ title: 'Forum' }} />
    </ForumStackNav.Navigator>
  );
}

export default function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      {/* Home tab removed */}
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{ tabBarLabel: "Profile" }}
      />
      <Tab.Screen
        name="ForumTab"
        component={ForumStack}
        options={{ tabBarLabel: "Forum", headerShown: false }}
      />
      <Tab.Screen
        name="NotificationsTab"
        component={NotificationsScreen}
        options={{ tabBarLabel: "Notifications" }}
      />
      <Tab.Screen
        name="AnnouncementsTab"
        component={AnnouncementsScreen}
        options={{ tabBarLabel: "Announcements" }}
      />
    </Tab.Navigator>
  );
}
