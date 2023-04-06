import User from "./user";
import Category from "./category";
import Course from "./course";
import Video from "./video";
import Favourite from "./favourite";
import Enrolment from "./enrolment";
import Instructor_Earning from "./instructor_earning";
import Course_Progress from "./course_progress";
import Course_Asset from "./course_asset";

User.hasMany(Course, { foreignKey: "userId", as: "courses" });
Course.belongsTo(User, { foreignKey: "userId", as: "user" });

Category.hasMany(Course, { foreignKey: "catId", as: "courses" });
Course.belongsTo(Category, { foreignKey: "catId", as: "category" });

Course.hasMany(Video, { foreignKey: "courseId", as: "videos" });
Video.belongsTo(Course, { foreignKey: "courseId", as: "course" });

User.hasMany(Video, { foreignKey: "userId", as: "videos" });
Video.belongsTo(User, { foreignKey: "userId", as: "user" });

User.hasMany(Favourite, { foreignKey: "userId", as: "favourites" });
Favourite.belongsTo(User, { foreignKey: "userId", as: "user" });

Course.hasMany(Favourite, { foreignKey: "courseId", as: "favourites" });
Favourite.belongsTo(Course, { foreignKey: "courseId", as: "course" });

User.hasMany(Enrolment, { foreignKey: "userId", as: "enrolments" });
Enrolment.belongsTo(User, { foreignKey: "userId", as: "user" });

Course.hasMany(Enrolment, { foreignKey: "courseId", as: "enrolments" });
Enrolment.belongsTo(Course, { foreignKey: "courseId", as: "course" });

User.hasMany(Instructor_Earning, {
	foreignKey: "userId",
	as: "instructor_earnings",
});
Instructor_Earning.belongsTo(User, { foreignKey: "userId", as: "user" });

Course.hasMany(Instructor_Earning, {
	foreignKey: "courseId",
	as: "instructor_earnings",
});
Instructor_Earning.belongsTo(Course, { foreignKey: "courseId", as: "course" });

User.hasMany(Course_Progress, {
	foreignKey: "userId",
	as: "course_progresses",
});
Course_Progress.belongsTo(User, { foreignKey: "userId", as: "user" });

Course.hasMany(Course_Progress, {
	foreignKey: "courseId",
	as: "course_progresses",
});
Course_Progress.belongsTo(Course, { foreignKey: "courseId", as: "course" });

Video.hasMany(Course_Progress, {
	foreignKey: "videoId",
	as: "course_progresses",
});
Course_Progress.belongsTo(Video, { foreignKey: "videoId", as: "video" });

export {
	User,
	Course,
	Category,
	Video,
	Favourite,
	Enrolment,
	Instructor_Earning,
	Course_Progress,
	Course_Asset,
};
