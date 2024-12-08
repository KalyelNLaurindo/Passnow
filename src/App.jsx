// src/App.jsx

import { useState } from 'react';
import { motion } from 'framer-motion';

function App() {
  const [passwordLength, setPasswordLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [message, setMessage] = useState('');

  const generatePassword = () => {
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let availableChars = '';
    if (includeUppercase) availableChars += uppercaseChars;
    if (includeLowercase) availableChars += lowercaseChars;
    if (includeNumbers) availableChars += numberChars;
    if (includeSymbols) availableChars += symbolChars;

    if (availableChars === '') {
      setMessage('Por favor, selecione pelo menos um tipo de caractere.');
      return;
    }

    let password = '';
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * availableChars.length);
      password += availableChars[randomIndex];
    }

    setGeneratedPassword(password);
    setMessage('Senha gerada com sucesso!');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generatePassword();
  };

  const copyToClipboard = () => {
    if (generatedPassword === '') return;
    navigator.clipboard.writeText(generatedPassword)
      .then(() => {
        setMessage('Senha copiada para a área de transferência!');
      })
      .catch((err) => {
        console.error('Erro ao copiar a senha:', err); // Loga o erro no console
        setMessage('Erro ao copiar a senha. Por favor, tente novamente.');
      });
  };

  return (
    <div className="container mt-5">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        Gerador de Senhas Fortes
      </motion.h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="passwordLength" className="form-label">
            Comprimento da Senha
          </label>
          <input
            type="number"
            className="form-control"
            id="passwordLength"
            min="4"
            max="64"
            value={passwordLength}
            onChange={(e) => setPasswordLength(e.target.value)}
          />
        </div>

        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="includeUppercase"
            checked={includeUppercase}
            onChange={(e) => setIncludeUppercase(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="includeUppercase">
            Incluir Letras Maiúsculas
          </label>
        </div>

        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="includeLowercase"
            checked={includeLowercase}
            onChange={(e) => setIncludeLowercase(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="includeLowercase">
            Incluir Letras Minúsculas
          </label>
        </div>

        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="includeNumbers"
            checked={includeNumbers}
            onChange={(e) => setIncludeNumbers(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="includeNumbers">
            Incluir Números
          </label>
        </div>

        <div className="mb-4 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="includeSymbols"
            checked={includeSymbols}
            onChange={(e) => setIncludeSymbols(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="includeSymbols">
            Incluir Símbolos
          </label>
        </div>

        <motion.button
          type="submit"
          className="btn btn-primary w-100"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Gerar Senha
        </motion.button>
      </form>

      {message && (
        <motion.div
          className="mt-3 alert alert-info"
          role="alert"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {message}
        </motion.div>
      )}

      {generatedPassword && (
        <motion.div
          className="mt-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h5>Senha Gerada:</h5>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              value={generatedPassword}
              readOnly
            />
            <button className="btn btn-outline-secondary" onClick={copyToClipboard}>
              Copiar
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default App;
