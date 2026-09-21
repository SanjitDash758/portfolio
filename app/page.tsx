import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SystemFlow from "@/components/SystemFlow";
import Projects from "@/components/Projects";
import Blogs from "@/components/Blogs";
import Thinking from "@/components/Thinking";
import Contact from "@/components/Contact";
import { getAllPostsMeta } from "@/lib/writing";

export default function Home() {
  const posts = getAllPostsMeta();

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
        <Hero />
        <SystemFlow />
        <Projects />
        <Blogs posts={posts} />
        <Thinking />
        <Contact />
      </main>
    </>
  );
}
