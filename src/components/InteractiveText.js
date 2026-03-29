"use client";
import React from 'react';

// Soft Glass / Ghost Pill
// Purpose: A highly elegant, minimalist pill with an inner/outer glow. Doesn't clash with text.
export const HighlightPill = ({ children, color = "var(--accent-cyan)", icon: Icon }) => {
    return (
        <span
            className="pill-badge-inline"
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '2px 10px',
                borderRadius: '999px',
                background: 'transparent',
                color: color,
                fontSize: '0.9em',
                fontWeight: '500', // elegant, not too heavy
                whiteSpace: 'nowrap',
                border: `1px solid color-mix(in srgb, ${color} 40%, transparent)`,
                // very subtle inner and outer glow
                boxShadow: `0 0 8px color-mix(in srgb, ${color} 10%, transparent), inset 0 0 8px color-mix(in srgb, ${color} 10%, transparent)`,
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                cursor: 'default',
                fontFamily: 'inherit'
            }}
            onMouseOver={(e) => {
                // Upon hovering, the pill gently "lights up" and lifts slightly
                e.currentTarget.style.background = `color-mix(in srgb, ${color} 15%, transparent)`;
                e.currentTarget.style.borderColor = `color-mix(in srgb, ${color} 80%, transparent)`;
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = `0 4px 15px color-mix(in srgb, ${color} 25%, transparent), inset 0 0 10px color-mix(in srgb, ${color} 20%, transparent)`;
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = `color-mix(in srgb, ${color} 40%, transparent)`;
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = `0 0 8px color-mix(in srgb, ${color} 10%, transparent), inset 0 0 8px color-mix(in srgb, ${color} 10%, transparent)`;
            }}
        >
            {Icon && <span style={{ display: 'inline-flex', width: '13px', opacity: 0.9 }}><Icon /></span>}
            {children}
        </span>
    );
};
