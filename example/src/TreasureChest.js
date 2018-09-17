import React from 'react'

const TreasureChest = ({
  size,
  style,
  primaryColor,
  secondaryColor,
  title = 'icon/activity-log',
  ...props
}) => (
  <svg height='24' width='24' viewBox='0 0 24 24' style={style} {...props}>
    <g
      fill='none'
      fillRule='evenodd'
      stroke={primaryColor}
      strokeWidth='1.2'
      strokeLinecap='round'
    >
      <polygon points="21.5 11.5 2.5 11.5 2.5 22.5 21.5 22.5" />
      <polygon stroke={secondaryColor} points="4.5 20.5 4.5 13.5 9.5 13.5 9.5 16.5 14.5 16.5 14.5 13.5 19.5 13.5 19.5 20.5" />
      <g>
        <path d="M12,13.5 L12,14.5" />
        <path d="M20.5,11.5 C20.5,9.281 18.795,8.936 16.5,9 C16.047,6.993 14.143,6.5 12,6.5 C9.856,6.5 7.953,6.993 7.5,9 C5.203,8.936 3.5,9.281 3.5,11.5" />
      </g>

      <g stroke={secondaryColor}>
        <path d="M0.5,9.5 L1.5,9.5" />
        <path d="M4.5,2 L5.5,3" />
        <path d="M11.5,0.5 L11.5,2" />
        <path d="M19.5,2 L18.5,3" />
        <path d="M23.5,9.5 L22.5,9.5" />
      </g>

    </g>
  </svg>
)

export default TreasureChest
