function generateTemplate(exampleName) {
	const title = exampleName.replace('-', ' ');
	return `<html>
<head>
	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:400,700">
</head>
<body>
	<example-${exampleName} class="example-app"></example-${exampleName}>
</body>

</html>`;
}

module.exports = generateExampleTemplate;
