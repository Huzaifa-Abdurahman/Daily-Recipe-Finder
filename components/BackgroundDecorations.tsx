"use client";

export default function BackgroundDecorations() {
  // SVG icons for various vegetables and food items
  const vegetables = [
    // Tomato
    `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="40" fill="#cc2016"/>
      <ellipse cx="50" cy="15" rx="12" ry="8" fill="#4ca736"/>
      <path d="M 50 20 Q 45 25 40 25 Q 45 20 50 20" fill="#4ca736"/>
    </svg>`,
    
    // Carrot
    `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <polygon points="30,80 40,20 50,25 60,20 70,80" fill="#e68a19"/>
      <ellipse cx="50" cy="15" rx="8" ry="6" fill="#4ca736"/>
      <path d="M 45 10 L 40 8 M 50 8 L 50 5 M 55 10 L 60 8" stroke="#4ca736" stroke-width="2" fill="none"/>
    </svg>`,
    
    // Bell Pepper
    `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M 50 25 Q 30 35 30 55 Q 30 75 50 80 Q 70 75 70 55 Q 70 35 50 25" fill="#4ca736"/>
      <ellipse cx="50" cy="20" rx="10" ry="8" fill="#6b4327"/>
      <path d="M 45 18 Q 50 15 55 18" stroke="#50301a" stroke-width="1.5" fill="none"/>
    </svg>`,
    
    // Lettuce
    `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M 50 80 Q 30 70 25 50 Q 22 35 35 25 Q 50 20 50 20 Q 50 20 65 25 Q 78 35 75 50 Q 70 70 50 80" fill="#4ca736"/>
      <path d="M 45 75 Q 40 65 42 50 Q 45 55 50 75" fill="#3d8b2a"/>
      <path d="M 55 75 Q 60 65 58 50 Q 55 55 50 75" fill="#3d8b2a"/>
    </svg>`,
    
    // Broccoli
    `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="40" rx="35" ry="40" fill="#4ca736"/>
      <circle cx="30" cy="30" r="12" fill="#4ca736"/>
      <circle cx="70" cy="30" r="12" fill="#4ca736"/>
      <circle cx="40" cy="50" r="10" fill="#4ca736"/>
      <circle cx="60" cy="50" r="10" fill="#4ca736"/>
      <rect x="45" y="70" width="10" height="20" fill="#6b4327"/>
    </svg>`,
    
    // Onion
    `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="35" fill="#e68a19"/>
      <path d="M 50 20 Q 48 18 50 15 Q 52 18 50 20" fill="#6b4327"/>
      <circle cx="50" cy="50" r="32" fill="none" stroke="#cc2016" stroke-width="2" opacity="0.3"/>
    </svg>`,
    
    // Garlic
    `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="45" r="18" fill="#f5e6d3"/>
      <circle cx="60" cy="45" r="18" fill="#f5e6d3"/>
      <circle cx="50" cy="60" r="18" fill="#f5e6d3"/>
      <circle cx="35" cy="65" r="15" fill="#f5e6d3"/>
      <circle cx="65" cy="65" r="15" fill="#f5e6d3"/>
      <path d="M 50 25 L 48 20 M 50 25 L 52 20" stroke="#6b4327" stroke-width="2"/>
    </svg>`,
    
    // Chili Pepper
    `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M 50 75 Q 35 55 35 40 Q 35 20 50 15 Q 65 20 65 40 Q 65 55 50 75" fill="#cc2016"/>
      <path d="M 50 15 Q 48 10 50 5 Q 52 10 50 15" fill="#4ca736"/>
      <line x1="40" y1="30" x2="45" y2="35" stroke="#8b0000" stroke-width="1"/>
    </svg>`,
    
    // Mushroom
    `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="35" rx="40" ry="28" fill="#8b6f47"/>
      <circle cx="35" cy="35" r="12" fill="#a0826d"/>
      <circle cx="65" cy="35" r="12" fill="#a0826d"/>
      <rect x="45" y="60" width="10" height="25" fill="#d4a574"/>
    </svg>`,
    
    // Cucumber
    `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="50" rx="15" ry="35" fill="#4ca736" transform="rotate(-20 50 50)"/>
      <circle cx="35" cy="30" r="3" fill="#3d8b2a"/>
      <circle cx="42" cy="40" r="3" fill="#3d8b2a"/>
      <circle cx="50" cy="50" r="3" fill="#3d8b2a"/>
      <circle cx="58" cy="60" r="3" fill="#3d8b2a"/>
      <circle cx="65" cy="70" r="3" fill="#3d8b2a"/>
    </svg>`,
  ];

  // Spoon and Fork icons
  const utensils = [
    // Spoon
    `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="30" cy="25" r="20" fill="#e68a19" opacity="0.7"/>
      <rect x="25" y="40" width="10" height="50" fill="#e68a19" opacity="0.7"/>
      <circle cx="30" cy="25" r="18" fill="none" stroke="#cc2016" stroke-width="1"/>
    </svg>`,
    
    // Fork
    `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="40" width="8" height="50" fill="#e68a19" opacity="0.7"/>
      <rect x="35" y="35" width="6" height="55" fill="#e68a19" opacity="0.7"/>
      <rect x="50" y="40" width="8" height="50" fill="#e68a19" opacity="0.7"/>
      <rect x="18" y="28" width="40" height="12" fill="#e68a19" opacity="0.7"/>
    </svg>`,
  ];

  // Combine all decorations
  const allDecorations = [...vegetables, ...vegetables, ...utensils];

  // Generate random positions for decorations
  const decorations = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    svg: allDecorations[i % allDecorations.length],
    top: Math.random() * 80,
    left: Math.random() * 90,
    size: 80 + Math.random() * 80,
    delay: i * 0.5,
    duration: 6 + Math.random() * 4,
  }));

  return (
    <div className="background-decorations">
      {decorations.map((deco) => (
        <div
          key={deco.id}
          className="decoration-item float-animation"
          style={{
            top: `${deco.top}%`,
            left: `${deco.left}%`,
            width: `${deco.size}px`,
            height: `${deco.size}px`,
            animationDuration: `${deco.duration}s`,
            animationDelay: `${deco.delay}s`,
          }}
          dangerouslySetInnerHTML={{ __html: deco.svg }}
        />
      ))}
    </div>
  );
}
