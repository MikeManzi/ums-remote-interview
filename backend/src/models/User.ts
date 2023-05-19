import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db/config";
import { Status, MaritalStatus, Gender, Role } from "../enums/user.enum";

class User extends Model {
  id!: string;
  firstName!: string;
  lastName!: string;
  gender!: Gender;
  dateOfBirth!: Date;
  maritalStatus!: string;
  status!: Status;
  nationality!: string;
  profile!: string;
  email!: string;
  password!: string;
  role!: string;
  resetPasswordToken!: string;
  resetPasswordExpires!: number;
  otp!: string;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM(Gender.Male, Gender.Female),
      allowNull: true,
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    maritalStatus: {
      type: DataTypes.ENUM(
        MaritalStatus.Single,
        MaritalStatus.Married,
        MaritalStatus.Divorced,
        MaritalStatus.Widowed
      ),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(
        Status.Unverified,
        Status.PendingVerification,
        Status.Verified
      ),
      allowNull: false,
      defaultValue: Status.Unverified,
    },
    nationality: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    profile: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isStrongPassword: function (value: string) {
          if (!/(?=.*[A-Z])(?=.*[\W_])(?=.*[a-z]).{8,}/.test(value)) {
            throw new Error(
              "Password must be at least 8 characters long and contain at least one uppercase letter and one special character."
            );
          }
        },
      },
    },
    role: {
      type: DataTypes.ENUM(Role.Admin, Role.Normal),
      defaultValue: Role.Normal,
      allowNull: false,
    },
    resetPasswordToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    resetPasswordExpires: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    modelName: "User",
    timestamps: true,
    sequelize,
  }
);

export default User;
