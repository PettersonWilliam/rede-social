export default (sequelize, DataTypes) => {
	const User = sequelize.define('User', {
		name: DataTypes.STRING,
		email: DataTypes.STRING,
		password: DataTypes.STRING
	}, {
		tableName: 'users'
	});

	User.associate = models => {
		User.hasMany(models.Post, { foreignKey: 'user_id' });
	};

	return User;
};
