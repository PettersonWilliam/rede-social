export default (databaseConnection, DataTypes) => {
	const Post = databaseConnection.define('Post', {
		user_id: DataTypes.INTEGER,
		title: DataTypes.STRING,
		summary: DataTypes.STRING,
		text: DataTypes.TEXT,
		available_at: DataTypes.DATE
	}, {
		tableName: 'posts',
		underscored: true,
		timestamps: true,
		paranoid: true,
		deletedAt: 'deleted_at'
	});

	Post.associate = models => {
		Post.belongsTo(models.User, { foreignKey: 'user_id' });
	};

	return Post;
};
