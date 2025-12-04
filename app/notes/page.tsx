export default function NotesPage() {
  return (
    <div className="min-h-screen p-8 bg-white text-gray-900">
      <header className="mb-12">
        <h1 className="text-4xl font-light">Notes du jour</h1>
      </header>
      <div className="max-w-4xl">
        <textarea
          className="w-full h-96 p-4 text-lg font-light border-none focus:outline-none"
          placeholder="Écrivez vos pensées ici..."
        />
      </div>
    </div>
  );
}