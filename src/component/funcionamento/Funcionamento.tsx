const PASSOS = [
  { titulo: "Cadastre sua empresa", descricao: "Crie sua conta e configure suas informações iniciais." },
  { titulo: "Adicione colaboradores", descricao: "Cadastre todos os funcionários de forma simples." },
  { titulo: "Gerencie tudo", descricao: "Controle processos, dados e relatórios em um só lugar." },
];

function Funcionamento() {
  return (
    <section className="w-full py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl text-purple font-bold uppercase tracking-widest">Como Funciona</h2>
          <p className="text-gray-500 mt-3">Comece em poucos passos simples</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PASSOS.map((item, index) => (
            <div key={item.titulo} className="bg-custom-beige p-8 rounded-xl text-center hover:shadow-md hover:scale-[1.02] transition-all">
              <div className="w-12 h-12 rounded-full bg-primary/10 border-2 border-primary text-primary font-extrabold text-xl flex items-center justify-center mx-auto mb-4">
                {index + 1}
              </div>
              <h3 className="font-bold text-lg uppercase tracking-widest mb-2">{item.titulo}</h3>
              <p className="text-sm text-gray-600">{item.descricao}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Funcionamento;