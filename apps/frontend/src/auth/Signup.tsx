import React, { useState } from "react";

const Signup: React.FC = () => {
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

  // Handle Google sign-up later

  return (
    <div className="w-full max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
        Créer un compte
      </h2>

      {/* Error message */}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

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
            className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Sign Up Button */}
        <div>
          <button
            type="submit"
            className="w-full py-3 mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            S'inscrire
          </button>
        </div>
      </form>

      <div className="flex items-center my-4">
        <hr className="flex-grow border-gray-300" />
        <span className="mx-2 text-gray-500">or</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      {/* Link to login page */}
      <div className="mt-4 text-center">
        <span className="text-sm text-gray-600">
          Déjà un compte?{" "}
          <a href="/signin" className="text-blue-500 hover:underline">
            Log toi ici
          </a>
        </span>
      </div>
    </div>
  );
};

export default Signup;
