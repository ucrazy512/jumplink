import { useState } from 'react';
import { FaArrowDown, FaRocket, FaMobileAlt } from 'react-icons/fa';

export default function Home() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const shortenUrl = async () => {
    const res = await fetch('/api/shorten', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ longUrl }),
    });
    const data = await res.json();
    setShortUrl(`127.0.0.1:3000/${data.shortCode}`);
  };

  return (
    <div className="bg-white text-gray-800 min-h-screen">
      {/* Navbar */}
      <nav className="bg-indigo-500 p-4 text-white">
        <div className="container mx-auto flex justify-between items-center">
          <a href="#" className="text-2xl font-bold">LinkKorter</a>
          <div>
            <a href="#features" className="mx-2 hover:underline">Kenmerken</a>
            <a href="#contact" className="mx-2 hover:underline">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center py-24 bg-gray-100">
        <h1 className="text-5xl text-indigo-500 mb-4">Verkort en Verdien 💰</h1>
        <p className="text-lg text-gray-700 mb-8">Maak je links korter en verdien geld door ze te delen!</p>
        <div className="bg-white inline-block p-8 rounded-lg shadow-lg">
          <input
            type="text"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            className="border p-4 rounded w-full mb-4"
            placeholder="Voer de lange URL in"
          />
          <button onClick={shortenUrl} className="bg-indigo-500 text-white p-4 w-full rounded hover:bg-indigo-600">
            Verkorten
          </button>
          {shortUrl && (
            <div className="mt-4 text-indigo-500">
              Verkorte URL: <a href={shortUrl}>{shortUrl}</a>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="text-center py-16" id="features">
        <h2 className="text-4xl text-indigo-500 mb-8">🌟 Kenmerken 🌟</h2>
        <div className="flex justify-center flex-wrap">
          <div className="w-1/3 p-4">
            <FaRocket size={32} className="m-auto text-indigo-500"/>
            <h3 className="text-2xl mt-4 mb-4">Snelheid</h3>
            <p>Verkort links in een fractie van een seconde.</p>
          </div>
          <div className="w-1/3 p-4">
            <FaMobileAlt size={32} className="m-auto text-indigo-500"/>
            <h3 className="text-2xl mt-4 mb-4">Mobielvriendelijk</h3>
            <p>Optimaal ontwerp voor alle apparaten.</p>
          </div>
          <div className="w-1/3 p-4">
            <FaArrowDown size={32} className="m-auto text-indigo-500"/>
            <h3 className="text-2xl mt-4 mb-4">Eenvoud</h3>
            <p>Gemakkelijk te gebruiken en te begrijpen.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gray-100 py-16 text-center" id="contact">
        <h2 className="text-4xl text-indigo-500 mb-8">Contact 📞</h2>
        <p className="text-lg text-gray-700 mb-8">Heb je vragen of opmerkingen? We horen graag van je!</p>
        <a href="mailto:info@linkkorter.com" className="bg-indigo-500 text-white p-4 rounded hover:bg-indigo-600">
          Stuur een e-mail
        </a>
      </section>
        {/* Footer */}
        <footer className="bg-indigo-500 text-white p-4 text-center">
        <p>&copy; 2023 LinkKorter. Alle rechten voorbehouden.</p>
        </footer>
    </div>
  );
}
