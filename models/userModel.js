export default (sequelize, DataTypes) => {
	const User = sequelize.define('User', {
		name: DataTypes.STRING,
		email: DataTypes.STRING,
		password: DataTypes.STRING
	}, {
		tableName: 'users',
		underscored: true,
		paranoid: true,
		timestamps: true,
		deletedAt: 'deleted_at'
	});

	User.associate = models => {
		User.hasMany(models.Post, { foreignKey: 'user_id' });
	};

	return User;
};
