import { useEffect, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa";

const STATS = [
  { label: "Colaboradores", value: 128 },
  { label: "Férias Ativas", value: 12 },
  { label: "Novas Contratações", value: 5 },
];

function useCountUp(target: number, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = Math.ceil(target / 40);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 30);
    return () => clearInterval(timer);
  }, [target, active]);
  return count;
}

function StatCard({ label, value }: { label: string; value: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const count = useCountUp(value, visible);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="bg-gradient-to-br from-primary/10 to-amber-50 border border-primary/20 p-6 rounded-lg hover:shadow-md transition-all">
      <h3 className="text-xs text-gray-500 font-semibold tracking-widest uppercase">{label}</h3>
      <p className="text-4xl font-extrabold mt-2 text-primary tabular-nums">{count}</p>
    </div>
  );
}

function Dashboard() {
  return (
    <section className="w-full py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl text-purple font-bold uppercase tracking-widest">
            Visão do Sistema
          </h2>
          <p className="text-gray-500 mt-3">
            Uma interface simples e poderosa para gerenciar seu RH
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {STATS.map((s) => <StatCard key={s.label} label={s.label} value={s.value} />)}
          <div className="col-span-1 md:col-span-3 bg-amber-50 border-l-4 border-primary p-6 rounded-lg">
            <h3 className="text-xs text-gray-500 mb-2 font-semibold tracking-widest uppercase">Atividade Recente</h3>
            <p className="text-xs text-gray-400 italic mb-4">Dados fictícios para demonstração (LGPD)</p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex gap-2 items-center"><FaCheck size={14} className="text-primary" /> Novo colaborador cadastrado</li>
              <li className="flex gap-2 items-center"><FaCheck size={14} className="text-primary" /> Férias aprovadas</li>
              <li className="flex gap-2 items-center"><FaCheck size={14} className="text-primary" /> Atualização de cargo</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;