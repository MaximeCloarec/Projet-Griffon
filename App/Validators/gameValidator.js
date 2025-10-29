exports.validateGame = (data) => {
    if (!data) {
        throw new Error("Données manquantes");
    }

    const { userId } = data;

    if (!userId) {
        throw new Error("Une erreur est survenue.");
    }

    if (typeof userId !== "number") {
        throw new Error("Une erreur est survenue.");
    }

    return { userId };
};

exports.validateGameCode = (data) => {
    if (!data) {
        throw new Error("Données manquantes");
    }

    const { roomCode } = data;

    if (!roomCode) {
        throw new Error("Code de partie manquant");
    }

    const trimmedCode = roomCode.trim();
    const roomCodeRegex = /^[A-Z0-9]{6}$/;

    if (!roomCodeRegex.test(trimmedCode)) {
        throw new Error("Code de partie invalide");
    }

    return { roomCode: trimmedCode };
};
