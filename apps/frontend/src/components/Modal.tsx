import React, { useEffect, useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Handle Email/Password signup
  const handleEmailSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Both fields are required");
      return;
    }

    // Simulate API call or form submission
    console.log("Signing up with:", { email, password });
    setError("");
    // Handle signup logic (e.g., API call) here
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
      <div
        className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg animate-slideDown"
        style={{ transition: "transform 0.5s ease" }}
      >
        <p>INSCRIPTION</p>
        <div className="flex justify-between items-center pb-4">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 ml-auto"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleEmailSignup} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Adresse email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 "
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <div>{error}</div>}

          {/* Sign Up Button */}
          <div>
            <button
              type="submit"
              className="w-full py-3 mt-4 bg-primary text-white rounded-lg hover:bg-primary_light focus:outline-none"
            >
              S'inscrire
            </button>
          </div>
        </form>

        {/* Link to login page */}
        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600">
            Déjà un compte?{" "}
            <a href="/signin" className="text-primary hover:underline">
              Log toi ici
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Modal;
