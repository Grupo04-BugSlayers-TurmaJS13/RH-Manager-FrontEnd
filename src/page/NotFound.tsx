import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="min-h-screen bg-purple flex flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="text-8xl font-extrabold text-primary tracking-widest">404</p>
      <div className="w-16 h-1 bg-primary/40 rounded-full" />
      <h1 className="text-2xl font-bold text-custom-beige uppercase tracking-widest">
        Página não encontrada
      </h1>
      <p className="text-custom-beige/60 text-sm max-w-xs">
        A página que você está procurando não existe ou foi movida.
      </p>
      <Link
        to="/"
        className="mt-4 inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white text-sm font-bold uppercase tracking-widest px-8 py-3 rounded-lg transition-colors shadow-lg shadow-primary/30"
      >
        Voltar ao início
      </Link>
    </main>
  );
}

export default NotFound;
