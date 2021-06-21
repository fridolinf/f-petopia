const isLongText = (string, max) => {
	return string.substr(0, max - 1) + (string.length > max ? ' ...' : '');
};

export { isLongText };
