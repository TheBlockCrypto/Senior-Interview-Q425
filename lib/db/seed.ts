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
  },
  {
    title: "Update post states from the post component",
    description:
      "We should be able to mark a post as completed from the post 'sticky note'. It should be a checkbox.",
    completed: false,
    priority: "high",
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
  },
  {
    title: "Add login and registration system",
    description:
      "Create secure user authentication with cookie-based sessions for the platform.",
    completed: false,
    priority: "high",
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
  },
  {
    title: "Connect todos to user accounts",
    description:
      "Establish database relationships so each todo belongs to a specific user.",
    completed: false,
    priority: "high",
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
  },
  {
    title: "Build public todo feed",
    description:
      "Create a timeline where users can see todos shared by the community.",
    completed: false,
    priority: "medium",
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
  },
  {
    title: "Add user profile pages",
    description:
      "Build pages where users can view each other's public todo history and activity.",
    completed: false,
    priority: "medium",
    dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // 4 days from now
  },
  {
    title: "Allow users to like and unlike posts",
    description:
      "Implement an interaction system where users can show appreciation for todos.",
    completed: false,
    priority: "low",
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
  },
  {
    title: "Add real-time updates to todo feed",
    description:
      "When a user publishes a new todo, broadcast that to all users so they don't have to refresh the page.",
    completed: false,
    priority: "low",
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
  },
  {
    title: "Show all registered users on homepage",
    description:
      "Display a directory of users with links to their profiles. Would be nice (not necessary) if we only show *active* users",
    completed: false,
    priority: "low",
    dueDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000), // 6 days from now
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

