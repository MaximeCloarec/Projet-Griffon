exports.validateUser = (data) => {
    if (!data) {
        throw new Error("Données manquantes.");
    }

    const { email, password } = data;

    if (!email || !password) {
        throw new Error("Email et mot de passe requis.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new Error("Format d'email invalide.");
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
        throw new Error("Format de mot de passe invalide.");
    }

    return { email, password };
};
