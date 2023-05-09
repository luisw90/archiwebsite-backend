import app from "./app";
const port = 3001;

app.use("*", (_, res) => {
  res.status(400).json({
    message: "Incorrect endpoint!",
  });
});

app.listen(port, (): void => {
  console.log(`Example app listening on port ${port}`);
});
