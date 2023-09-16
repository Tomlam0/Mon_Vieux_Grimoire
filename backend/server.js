const http = require("http");
const app = require("./app");

// Assure une forme valide au port
const normalizePort = (val) => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }
    return false;
};

const port = normalizePort(process.env.PORT || "4001");

app.set("port", port);

// Fonction pour gérer les erreurs liées à la mise en place du serveur
const errorHandler = (error) => {
    if (error.syscall != "listen") {
        throw error;
    }
    console.log(address);
    const address = server.address();

    const bind =
        typeof address === "string" ? "pipe " + address : "port: " + port;

    switch (error.code) {
        case "EACCES":
            console.error(bind + " nécessite des privilèges élevés.");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " est déjà utilisé.");
            process.exit(1);
            break;
        default:
            throw error;
    }
};

const server = http.createServer(app);

// Attache du gestionnaire d'erreur au server
server.on("error", errorHandler);

// Affiche un message lorsque le serveur commence à écouter sur un port
server.on("listening", () => {
    const address = server.address();
    const bind =
        typeof address === "string" ? "pipe" + address : "port " + port;
    console.log("Écoute sur " + bind);
});

server.listen(port);
