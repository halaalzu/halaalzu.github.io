// Easy to edit: Add projects here by adding objects to the arrays
// Format matches alzureiqi.dev style

export const projects = {
  completed: [
    {
      id: 6,
      title: "SineWave",
      description: "SineWave is a rhythm-based hand gesture game designed for motor rehabilitation. Using real-time computer vision and PyTorch-based gesture classification, it provides musical feedback while tracking movement metrics to support rehabilitation progress.",
      tech: ["Python", "MediaPipe", "OpenCV", "PyTorch"],
      type: "AI/Computer Vision Application",
      status: "completed",
      date: "Feb. 2026",
      keyAchievements: [
        "Developed a rhythm-based hand gesture game for motor rehabilitation using real-time computer vision and PyTorch-based gesture classification",
        "Built a low-latency pipeline from webcam input to musical feedback while recording movement metrics to support rehabilitation progress tracking"
      ],
      details: [
        "Real-time hand gesture recognition",
        "PyTorch-based gesture classification",
        "Musical feedback system",
        "Movement metrics tracking for rehabilitation"
      ],
      github: "https://github.com/halaalzu/SineWave",
      liveDemo: "https://devpost.com/software/flowstate-zhvg0m",
      images: ['https://youtu.be/N-tTWb4yO_M']
    },
    {
      id: 1,
      title: "BookTok",
      description: "BookTok turns book summaries into short, engaging videos and shows them in a scrollable feed so users can quickly discover new reads. It makes finding your next book feel like scrolling TikTok, but for books.",
      tech: ["Node.js", "Express", "React", "Gemini API", "ElevenLabs", "FFmpeg", "Cloudinary", "MongoDB Atlas"],
      type: "Full-Stack Web Application",
      status: "completed",
      date: "Jan. 2026",
      keyAchievements: [
        "Built AI-powered video generation pipeline using Gemini API for text analysis and ElevenLabs for voice narration",
        "Implemented independent Node.js/Express backend with REST APIs for image generation, text-to-speech, video composition, and cloud storage",
        "Designed responsive React frontend with TikTok-style scrollable video feed"
      ],
      details: [
        "AI-powered video generation from book summaries",
        "Text-to-speech narration using ElevenLabs",
        "Cloud media storage with Cloudinary",
        "MongoDB Atlas for database management"
      ],
      github: "https://github.com/ishashenoy/booktok-frontend",
      githubBackend: "https://github.com/ishashenoy/booktok-backend",
      liveDemo: null,
      images: ['/assets/booktok-logo.jpeg', '/assets/1768250233760.jpeg', 'https://youtu.be/0o5lP3xi_ak']
    },
    {
      id: 2,
      title: "Accessible Catan",
      description: "Accessible Catan is a SolidWorks redesign of the classic board game to improve playability for users with hand tremors using stable, magnetic, slot-fit components refined through multiple prototypes.",
      tech: ["SolidWorks", "Iterative Design", "3D Modeling", "Prototyping"],
      type: "AutoCAD/3D Print",
      status: "completed",
      date: "Sep. – Dec. 2025",
      keyAchievements: [
        "Redesigned a board game to improve accessibility for users with hand tremors using SolidWorks and a human-centered focus",
        "Built SolidWorks assemblies with magnetic, slot-based components to improve stability and alignment",
        "Iteratively tested and refined 3 prototypes, documented failures, and refined tolerances based on feedback"
      ],
      details: [
        "Human-centered design approach for accessibility",
        "Magnetic and slot-based component system",
        "Multiple prototype iterations with user testing"
      ],
      github: "https://github.com/halaalzu/Accessible-Catan-3D-Print",
      liveDemo: null,
      images: [
        '/assets/SolidWroks 3D Version Assembly.jpg',
        '/assets/Painted Final Prints.jpg',
        '/assets/Painted 3D Version .jpg'
      ]
    },
    {
      id: 3,
      title: "Flower Puzzle Assembly",
      description: "Flower Puzzle Assembly is a multi-part mechanical puzzle designed with interlocking components and smooth motion in mind. It went through 4 design revisions to improve fit, alignment, and overall reliability.",
      tech: ["SolidWorks", "Iterative Design", "Tolerance Analysis", "Part Modeling"],
      type: "AutoCAD/3D Print",
      status: "completed",
      date: "Sep. – Dec. 2025",
      keyAchievements: [
        "Designed a multi-component mechanical puzzle using SolidWorks part modeling and assemblies",
        "Integrated interlocking components and moving parts, applying tolerance analysis to ensure proper fit, alignment, and smooth motion",
        "Iterated 4 design revisions to resolve alignment issues and improve overall mechanical reliability"
      ],
      details: [
        "Multi-component interlocking puzzle design",
        "Tolerance analysis for precise fit",
        "4 design revisions for mechanical reliability"
      ],
      github: "https://github.com/halaalzu/Fragrant-Water-Lily-3D-Print",
      liveDemo: null,
      images: ['/assets/Flower Mechanism Video.mov', '/assets/STL Print Layout.png']
    },
    {
      id: 4,
      title: "2000 Nissan Skyline R34 GT-R 3D Print",
      description: "I designed a detailed CAD model of the 2000 Nissan Skyline R34 GT-R (my favourite car from my favourite character) so I had to recreate it myself.",
      tech: ["CAD", "3D Modeling", "Digital Fabrication"],
      type: "AutoCAD/3D Print",
      status: "completed",
      keyAchievements: [
        "Created a detailed CAD model of a real-world vehicle",
        "Demonstrated precision modeling and geometric construction",
        "Prepared model for digital fabrication and 3D printing"
      ],
      details: [
        "Detailed CAD modeling of real vehicle",
        "Precision geometric construction",
        "Ready for 3D printing"
      ],
      github: "https://github.com/halaalzu/2000-Nissan-Skyline-R34-GT-R-3D-Print",
      liveDemo: null,
      images: [] // Add image URLs here: ['/assets/skyline-1.png', '/assets/skyline-2.png']
    },
    {
      id: 5,
      title: "To-Do List",
      description: "I built a full-stack to-do list app that lets users add, complete, and delete tasks with real-time updates through a clean web interface. It reinforced core CRUD logic, backend routing, and organized data handling.",
      tech: ["Python", "Flask", "HTML/CSS", "JavaScript"],
      type: "Full-Stack Web Application",
      status: "completed",
      date: "Dec. 2025",
      keyAchievements: [
        "Developed a full-stack task management application using Flask, implementing REST-style routes to support task creation, updating, and deleting through backend Python logic",
        "Built a front-end with HTML, CSS, and JavaScript for user interactions and reflect real-time task state changes",
        "Implemented basic CRUD logic and program flow in Python"
      ],
      details: [
        "Task management with add, complete, and delete",
        "CRUD logic and REST-style routing",
        "Real-time task state updates"
      ],
      github: "https://github.com/halaalzu/To-Do-List",
      liveDemo: "https://to-do-list-22no.onrender.com/login",
      images: [] // Add image URLs here: ['/assets/todo-1.png', '/assets/todo-2.png']
    }
  ],
  featured: [
    {
      id: 1,
      title: "Electrical Sub-team Member",
      description: "Collaborated with mechanical and software sub-teams to design an assistive knee brace",
      tech: ["PCB Design", "KiCad", "Arduino", "BLE"],
      type: "Hardware Design",
      linkTo: "/projects"
    },
    {
      id: 2,
      title: "BookTok",
      description: "AI media pipeline that transforms book summaries into short-form videos",
      tech: ["Node.js", "React", "Gemini API"],
      type: "Full-Stack Web",
      linkTo: "/projects"
    },
    {
      id: 3,
      title: "Accessible Catan",
      description: "SolidWorks redesign of classic board game for users with hand tremors",
      tech: ["SolidWorks", "3D Modeling"],
      type: "AutoCAD/3D Print",
      linkTo: "/projects"
    }
  ]
};
