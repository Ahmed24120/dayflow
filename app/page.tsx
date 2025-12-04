import TaskCard from "@/components/TaskCard";

export default function Home() {
  const tasks = [
    { id: 1, title: "Réunion à 10h", completed: false, type: "work" },
    { id: 2, title: "Acheter du lait", completed: true, type: "personal" },
    { id: 3, title: "Faire du sport", completed: false, type: "health" },
  ];

  return (
    <div className="min-h-screen p-8">
      <header className="mb-12">
        <h1 className="text-4xl font-light text-gray-100">Votre journée — Lundi 12</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <section className="bg-slate-800/50 rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl font-light text-slate-200 mb-4">Tâches</h2>
          <div className="space-y-4">
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </section>

        <section className="bg-slate-800/50 rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl font-light text-slate-200 mb-4">Notes du jour</h2>
          <p className="text-slate-400">Aucune note pour le moment.</p>
        </section>

        <section className="bg-slate-800/50 rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl font-light text-slate-200 mb-4">Calendrier</h2>
          <p className="text-slate-400">Aucun événement à venir.</p>
        </section>

        <section className="bg-slate-800/50 rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl font-light text-slate-200 mb-4">Focus Timer</h2>
          <div className="text-center">
            <div className="text-5xl font-light text-slate-100">25:00</div>
            <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full">Démarrer</button>
          </div>
        </section>

        <section className="bg-slate-800/50 rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl font-light text-slate-200 mb-4">Progrès</h2>
          <div className="flex justify-center">
            <div className="relative w-40 h-40">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#334155" strokeWidth="8" />
                <circle cx="50" cy="50" r="45" fill="none" stroke="#3B82F6" strokeWidth="8" strokeDasharray="283" strokeDashoffset="70" strokeLinecap="round" transform="rotate(-90 50 50)" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-light">65%</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}