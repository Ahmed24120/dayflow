"use client";

import { useState } from "react";

export default function ChallengePage() {
  const [phoneNumber, setPhoneNumber] = useState("");

  // Fonction pour gérer la saisie de manière frustrante
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // 1. Supprimer tous les caractères non numériques
    value = value.replace(/\D/g, "");

    // 2. Inverser les chiffres
    value = value.split("").reverse().join("");

    // 3. Limiter à 10 chiffres
    value = value.substring(0, 10);

    // 4. Ajouter un tiret après chaque 2 chiffres, mais en partant de la fin
    let formatted = "";
    for (let i = 0; i < value.length; i++) {
      if (i > 0 && i % 2 === 0) {
        formatted = "-" + formatted;
      }
      formatted = value[i] + formatted;
    }

    setPhoneNumber(formatted);
  };

  return (
    <div className="min-h-screen p-8">
      <header className="mb-12">
        <h1 className="text-4xl font-light text-gray-100">Défi: Champ de saisie frustrant</h1>
        <p className="text-slate-400 mt-2">
          Essayez d&apos;entrer votre numéro de téléphone. Bonne chance !
        </p>
      </header>

      <div className="max-w-md mx-auto bg-slate-800/50 rounded-2xl p-8 shadow-lg">
        <label className="block text-slate-300 mb-4">
          Numéro de téléphone (10 chiffres) :
        </label>
        <input
          type="text"
          value={phoneNumber}
          onChange={handleInput}
          className="w-full p-4 bg-slate-900 text-slate-100 rounded-lg border border-slate-700 focus:outline-none focus:border-blue-500"
          placeholder="Ex: 06-12-34-56-78"
        />

        <div className="mt-8 text-slate-400">
          <h3 className="text-lg font-medium mb-2">Pourquoi ce champ est frustrant :</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Les chiffres sont inversés pendant la saisie</li>
            <li>Les tirets sont ajoutés automatiquement, mais à l&apos;envers</li>
            <li>Vous ne pouvez pas contrôler la position du curseur</li>
            <li>Seuls les chiffres sont autorisés</li>
          </ul>
        </div>

        <div className="mt-8">
          <p className="text-slate-300">Valeur actuelle : <span className="font-mono">{phoneNumber}</span></p>
        </div>
      </div>

      <div className="mt-12 max-w-2xl mx-auto text-slate-400">
        <p>
          Ce champ est un exemple de mauvaise ergonomie. Il a été créé dans le cadre du défi Sopra Steria.
          L&apos;objectif est de montrer comment ne pas faire un champ de saisie.
        </p>
      </div>
    </div>
  );
}