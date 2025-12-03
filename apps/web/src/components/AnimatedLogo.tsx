import React from 'react';

interface AnimatedLogoProps {
  size?: number;
  className?: string;
}

export const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ size = 40, className = '' }) => {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        className="overflow-visible"
      >
        <defs>
          <linearGradient id="paddleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#86efac" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>
          <linearGradient id="handleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4ade80" />
            <stop offset="100%" stopColor="#16a34a" />
          </linearGradient>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="1" dy="2" stdDeviation="2" floodOpacity="0.2"/>
          </filter>
        </defs>

        {/* Paddle */}
        <g filter="url(#shadow)">
          {/* Paddle head */}
          <ellipse
            cx="45"
            cy="40"
            rx="28"
            ry="32"
            fill="url(#paddleGradient)"
            className="animate-paddle"
          />
          {/* Paddle holes pattern */}
          <g fill="#16a34a" fillOpacity="0.3">
            <circle cx="35" cy="30" r="3" />
            <circle cx="45" cy="30" r="3" />
            <circle cx="55" cy="30" r="3" />
            <circle cx="30" cy="40" r="3" />
            <circle cx="40" cy="40" r="3" />
            <circle cx="50" cy="40" r="3" />
            <circle cx="60" cy="40" r="3" />
            <circle cx="35" cy="50" r="3" />
            <circle cx="45" cy="50" r="3" />
            <circle cx="55" cy="50" r="3" />
          </g>
          {/* Paddle handle */}
          <rect
            x="40"
            y="68"
            width="10"
            height="25"
            rx="3"
            fill="url(#handleGradient)"
          />
        </g>

        {/* Animated Ball */}
        <g className="animate-ball">
          <circle
            cx="75"
            cy="25"
            r="12"
            fill="#fef08a"
            stroke="#eab308"
            strokeWidth="1.5"
          />
          {/* Ball holes */}
          <g fill="#eab308" fillOpacity="0.5">
            <circle cx="71" cy="22" r="2" />
            <circle cx="79" cy="22" r="2" />
            <circle cx="75" cy="28" r="2" />
            <circle cx="71" cy="28" r="1.5" />
            <circle cx="79" cy="28" r="1.5" />
          </g>
        </g>
      </svg>

      <style>{`
        @keyframes paddleSwing {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
        }

        @keyframes ballBounce {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(-5px, -8px); }
          50% { transform: translate(-10px, 0); }
          75% { transform: translate(-5px, 5px); }
        }

        .animate-paddle {
          transform-origin: 45px 75px;
          animation: paddleSwing 2s ease-in-out infinite;
        }

        .animate-ball {
          animation: ballBounce 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
