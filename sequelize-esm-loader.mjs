export const up = async ({ path }) => {
	const migration = await import(path);
	return migration.up;
};

export const down = async ({ path }) => {
	const migration = await import(path);
	return migration.down;
};
