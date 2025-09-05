import { db, schema } from "./index";

const seedUsers = [
  {
    username: "alice",
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "admin",
    avatar: null,
  },
  {
    username: "bob",
    name: "Bob Smith",
    email: "bob@example.com",
    role: "user",
    avatar: null,
  },
  {
    username: "carol",
    name: "Carol Wilson",
    email: "carol@example.com",
    role: "moderator",
    avatar: null,
  },
];

const seedTodos = [
  {
    title: "Fetch all incomplete posts in the homepage",
    description:
      "Where are all your tasks? This is supposed to be an interview!",
    completed: false,
    priority: "high",
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
    userId: 1,
  },
  {
    title: "Update post states from the post component",
    description:
      "We should be able to mark a post as completed from the post 'sticky note'. It should be a checkbox.",
    completed: false,
    priority: "high",
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
    userId: 1,
  },
  {
    title: "Add login and registration system",
    description:
      "We have basic `/login` and `/register pages with validated endpoints. Lets finish this flow up. How will the browser know if a user is logged in?",
    completed: false,
    priority: "high",
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
    userId: 2,
  },
  {
    title: "Connect todos to user accounts",
    description:
      "Make sure every todo has a user tied to it. No note should be anonymous.",
    completed: false,
    priority: "high",
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    userId: 2,
  },
  {
    title: "Add user profile pages",
    description:
      "Build basic unauthenticated pages where users can view each other's public todo notes. States dont matter.",
    completed: false,
    priority: "medium",
    dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // 4 days from now
    userId: 3,
  },
  {
    title: "Allow users to like and unlike posts",
    description:
      "Implement an interaction system where users can show appreciation for todos.",
    completed: false,
    priority: "low",
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    userId: 1,
  },
  {
    title: "Add real-time updates to todo feed",
    description:
      "When a user publishes a new todo, broadcast that to all users so they don't have to refresh the page.",
    completed: false,
    priority: "low",
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    userId: 2,
  },
  {
    title: "Show all registered users on homepage",
    description:
      "Display a small directory of users on the homepage, like a video game lobby or how Figma shows icons on top. Would be nice (not necessary) if we only show *active* users",
    completed: false,
    priority: "low",
    dueDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000), // 6 days from now
    userId: 3,
  },
];

async function seed() {
  try {
    console.log("🌱 Seeding database...");

    console.log("📝 Inserting users...");
    const users = await db.insert(schema.users).values(seedUsers).returning();
    console.log(`✅ Created ${users.length} users`);

    console.log("📋 Inserting todos...");
    const todos = await db.insert(schema.todos).values(seedTodos).returning();
    console.log(`✅ Created ${todos.length} todos`);

    console.log("🎉 Database seeded successfully!");
    console.log("\n📍 Try these URLs:");
    console.log("   http://localhost:3000/users/1");
    console.log("   http://localhost:3000/users/2");
    console.log("   http://localhost:3000/todos/1");
    console.log("   http://localhost:3000/todos/2");
    console.log("   http://localhost:3000/api/ping");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seed();
