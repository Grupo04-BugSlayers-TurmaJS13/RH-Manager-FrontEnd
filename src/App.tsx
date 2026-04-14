import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="pt-16 flex-1"></main>
      <Footer />
    </div>
  );
}

export default App;
