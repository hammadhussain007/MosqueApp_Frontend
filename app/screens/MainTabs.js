import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { theme } from "../core/theme";
import { selectUserRole } from "../store/slices/userSlice";
import ProfileScreen from "./ProfileScreen";
import ForumScreen from "./ForumScreen";
import ForumDetailScreen from "./ForumDetailScreen";
import AnnouncementsScreen from "./AnnouncementsScreen";
import NotificationsScreen from "./NotificationsScreen";
import ReportsScreen from "./ReportsScreen";
import ImamDashboard from "./ImamDashboard";
import TopicDetailScreen from "./TopicDetailScreen";
import KhutbahSearchScreen from "./KhutbahSearchScreen";

const Tab = createBottomTabNavigator();
const ForumStackNav = createStackNavigator();
const ImamStackNav = createStackNavigator();

function ForumStack() {
  return (
    <ForumStackNav.Navigator>
      <ForumStackNav.Screen
        name="ForumList"
        component={ForumScreen}
        options={{ headerShown: false }}
      />
      <ForumStackNav.Screen
        name="ForumDetail"
        component={ForumDetailScreen}
        options={{
          title: 'Discussion',
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: '600',
          },
        }}
      />
    </ForumStackNav.Navigator>
  );
}

function ImamStack() {
  return (
    <ImamStackNav.Navigator>
      <ImamStackNav.Screen
        name="ImamDashboardList"
        component={ImamDashboard}
        options={{ 
          headerShown: false
        }}
      />
      <ImamStackNav.Screen
        name="KhutbahSearch"
        component={KhutbahSearchScreen}
        options={{
          title: 'Search Islamic Content',
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: '600',
          },
        }}
      />
      <ImamStackNav.Screen
        name="TopicDetail"
        component={TopicDetailScreen}
        options={{
          title: 'Topic Details',
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: '600',
          },
        }}
      />
    </ImamStackNav.Navigator>
  );
}

export default function MainTabs() {
  // Get user role from Redux store
  const userRole = useSelector(selectUserRole);
  const isAdmin = userRole === 'admin';
  const isImam = userRole === 'imam';
  
  console.log('MainTabs - userRole:', userRole, 'isImam:', isImam, 'isAdmin:', isAdmin);
  
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopWidth: 1,
          borderTopColor: theme.colors.border,
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
          ...theme.shadows.medium,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: -5,
        },
      }}
    >
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Icon name="account-circle-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ForumTab"
        component={ForumStack}
        options={{
          tabBarLabel: "Forum",
          tabBarIcon: ({ color, size }) => (
            <Icon name="forum-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="NotificationsTab"
        component={NotificationsScreen}
        options={{
          tabBarLabel: "Activity",
          tabBarIcon: ({ color, size }) => (
            <Icon name="bell-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="AnnouncementsTab"
        component={AnnouncementsScreen}
        options={{
          tabBarLabel: "Announcements",
          tabBarIcon: ({ color, size }) => (
            <Icon name="bullhorn-outline" size={size} color={color} />
          ),
        }}
      />
      {isAdmin && (
        <Tab.Screen
          name="ReportsTab"
          component={ReportsScreen}
          options={{
            tabBarLabel: "Dashboard",
            tabBarIcon: ({ color, size }) => (
              <Icon name="chart-bar" size={size} color={color} />
            ),
          }}
        />
      )}
      {isImam && (
        <Tab.Screen
          name="ImamTab"
          component={ImamStack}
          options={{
            tabBarLabel: "Khutbah",
            tabBarIcon: ({ color, size }) => (
              <Icon name="book-open-variant" size={size} color={color} />
            ),
          }}
        />
      )}
    </Tab.Navigator>
  );
}
