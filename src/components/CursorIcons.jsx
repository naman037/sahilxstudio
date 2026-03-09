export const CursorDefault = ({ size = 64 }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        style={{ fill: 'var(--white)', pointerEvents: 'none' }}
    >
        <g>
            {/* Body */}
            <polygon points="38,40 62,40 58,75 42,75" />
            {/* Head */}
            <circle cx="50" cy="22" r="14" />
            {/* Legs */}
            <path d="M 45 70 L 32 95 M 55 70 L 68 95" stroke="var(--white)" strokeWidth="8" strokeLinecap="round" />
            {/* Arms resting */}
            <path d="M 38 45 L 25 65 M 62 45 L 75 65" stroke="var(--white)" strokeWidth="6" strokeLinecap="round" />
        </g>
    </svg>
)

export const CursorHover = ({ size = 72 }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        style={{ fill: 'var(--white)', pointerEvents: 'none' }}
    >
        <g>
            {/* Body */}
            <polygon points="38,40 62,40 58,75 42,75" />
            {/* Head */}
            <circle cx="50" cy="22" r="14" />
            {/* Legs */}
            <path d="M 45 70 L 32 95 M 55 70 L 68 95" stroke="var(--white)" strokeWidth="8" strokeLinecap="round" />
            {/* Arms raised to face holding camera */}
            <path d="M 38 45 L 40 30 M 62 45 L 60 30" stroke="var(--white)" strokeWidth="6" strokeLinecap="round" />
            {/* Camera Body */}
            <rect x="36" y="16" width="28" height="18" rx="2" />
            {/* Camera Flash */}
            <rect x="45" y="10" width="10" height="6" />
            {/* Camera Lens */}
            <circle cx="50" cy="25" r="5" fill="var(--black)" />
        </g>
    </svg>
)
