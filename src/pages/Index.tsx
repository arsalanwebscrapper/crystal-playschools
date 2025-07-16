import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Activities from "@/components/Activities";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Blog from "@/components/Blog";

const Index = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <Header />
      <main className="w-full">
        <section id="home">
          <Hero />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="activities">
          <Activities />
        </section>
        <section id="gallery">
          <Gallery />
        </section>
        <section id="blog">
          <Blog />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
