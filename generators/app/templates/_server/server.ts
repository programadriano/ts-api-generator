import App from "./app";

let port = process.env.PORT || '3040';

App.app.listen(port, function () {
  console.log(`server running in" + ${port}`);
});

process.once('SIGUSR2', () => App.closedataBaseConnection('nodemon restart', () => process.kill(process.pid, 'SIGUSR2')));
process.once('SIGINT', () => App.closedataBaseConnection('connection crashed', () => process.exit(0)));
