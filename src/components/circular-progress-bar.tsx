
'use client';

import React from 'react';

interface CircularProgressBarProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  color?: string; // hex or hsl string
  trailColor?: string;
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  score,
  size = 120,
  strokeWidth = 10,
  color = 'hsl(var(--accent))', // Green by default
  trailColor = 'hsl(var(--border))',
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (score / 100) * circumference;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
      <circle
        className="circular-progress-trail"
        stroke={trailColor}
        fill="transparent"
        strokeWidth={strokeWidth}
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      <circle
        className="circular-progress-path"
        stroke={color}
        fill="transparent"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        r={radius}
        cx={size / 2}
        cy={size / 2}
        style={{ transition: 'stroke-dashoffset 0.35s' }}
      />
      <text
        className="circular-progress-text transform rotate-90"
        x="50%"
        y="50%"
        dy=".3em"
        textAnchor="middle"
        fontSize={size * 0.25}
        fontWeight="bold"
        fill={color}
      >
        {score}
      </text>
    </svg>
  );
};

export default CircularProgressBar;
