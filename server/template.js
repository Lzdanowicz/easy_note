export default function template(body, initialState) {
  return `<!DOCTYPE HTML>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Easy Note</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
  <div id="contents">${body}</div>    <!-- this is where our component will appear -->
  <script>window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};</script>
  <script src="bundle.js"></script>
</body>
</html>
`;
}