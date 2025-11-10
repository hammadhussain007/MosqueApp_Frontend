import React from 'react';
import { View } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

export default function MosqueLogo({ size = 80, color = "#00897B" }) {
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        {/* Main dome */}
        <Path
          d="M50 25 C30 25, 20 35, 20 50 L80 50 C80 35, 70 25, 50 25Z"
          fill={color}
        />
        
        {/* Minaret left */}
        <Path
          d="M25 50 L25 75 L30 75 L30 50Z"
          fill={color}
        />
        <Circle cx="27.5" cy="48" r="3" fill={color} />
        
        {/* Minaret right */}
        <Path
          d="M70 50 L70 75 L75 75 L75 50Z"
          fill={color}
        />
        <Circle cx="72.5" cy="48" r="3" fill={color} />
        
        {/* Central minaret */}
        <Path
          d="M47 10 L47 30 L53 30 L53 10Z"
          fill={color}
        />
        <Circle cx="50" cy="8" r="4" fill={color} />
        
        {/* Base */}
        <Path
          d="M15 75 L15 85 L85 85 L85 75Z"
          fill={color}
        />
        
        {/* Arch/Door */}
        <Path
          d="M42 60 C42 55, 45 52, 50 52 C55 52, 58 55, 58 60 L58 75 L42 75Z"
          fill="#FFFFFF"
          opacity="0.3"
        />
      </Svg>
    </View>
  );
}
