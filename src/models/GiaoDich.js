const { DataTypes } = require("sequelize")
const { sequelize } = require("@src/configs/db")

const GiaoDich = sequelize.define(
    "GiaoDich",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        ThoiGianTT: {
            type: DataTypes.DATE,
        },
        SoTien: {
            type: DataTypes.INTEGER,
        },
        MaGiaoDich: {
            type: DataTypes.STRING,
            unique: true,
        },
        MaDonHang: {
            type: DataTypes.STRING,
        },
        MaDiemBan: {
            type: DataTypes.STRING,
        },
        LoaiGD: {
            type: DataTypes.STRING,
        },
        ThoiGianTao: {
            type: DataTypes.DATE,
        },
        TaiKhoanNhan: {
            type: DataTypes.STRING,
        },
        NoiDung: {
            type: DataTypes.STRING,
        },
        GhiChu: {
            type: DataTypes.STRING,
        },
        TrangThai: {
            type: DataTypes.STRING,
        },
    },
    { timestamps: true }
)

module.exports = GiaoDich
