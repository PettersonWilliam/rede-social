// src/server/models/postLike.js
export default (sequelize, DataTypes) => {
	const PostLike = sequelize.define('PostLike', {
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		post_id: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		liked_at: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW
		},
		is_deleted: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		}
	}, {
		tableName: 'post_likes',
		underscored: true,
		timestamps: true,
		paranoid: true,
		deletedAt: 'deleted_at'
	});

	PostLike.associate = models => {
		PostLike.belongsTo(models.User, { foreignKey: 'user_id' });
		PostLike.belongsTo(models.Post, { foreignKey: 'post_id' });
	};

	return PostLike;
};
