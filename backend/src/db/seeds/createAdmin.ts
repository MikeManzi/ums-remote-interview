import User from "../../models/User";
import { Status, Gender, Role, MaritalStatus } from "../../enums/user.enum";

export const createAdminUser = async () => {
  try {
    
    const adminUser = await User.findOne({
      where: { email: "admin@example.com" },
    });

    if (adminUser) {
      console.log("Admin user already exists.");
      return;
    }

    await User.create({
      firstName: "Admin",
      lastName: "User",
      gender: Gender.Male,
      maritalStatus: MaritalStatus.Single,
      status: Status.Verified,
      profile: "admin.png",
      email: "admin@example.com",
      password: "Admin@123",
      role: Role.Admin,
    });

    console.log("Admin user created successfully.");
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
};