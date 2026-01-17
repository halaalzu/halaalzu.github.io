// Easy to edit: Add projects here by adding objects to the arrays
// Format matches alzureiqi.dev style

export const projects = {
  completed: [
    {
      id: 1,
      title: "Project Name",
      description: "A brief description of the project",
      tech: ["Python", "Django", "Next.js", "AWS", "DynamoDB"],
      type: "Full-Stack Web Application",
      keyAchievements: [
        "Achievement 1",
        "Achievement 2"
      ],
      details: [
        "Detail point 1",
        "Detail point 2",
        "Detail point 3"
      ],
      github: null, // Add GitHub URL: "https://github.com/username/repo"
      liveDemo: null, // Add live demo URL: "https://demo-url.com"
      image: null
    }
    // Add more projects by copying the object above
  ],
  featured: [
    {
      id: 1,
      title: "Project Name",
      description: "A brief description of the project",
      tech: ["Python", "Django"],
      type: "Full-Stack Web Application",
      linkTo: "/projects" // Link to project or experience section
    }
    // Add featured projects here
  ]
};
