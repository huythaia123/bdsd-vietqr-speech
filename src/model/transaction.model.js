const mongoose = require("mongoose");

const modelName = "transactionModel";

const transactionSchema = new mongoose.Schema(
  {
    ThoiGianTT: { type: Date, required: true },
    SoTien: { type: Number, required: true },
    MaGiaoDich: { type: String, required: true, unique: true },
    MaDonHang: { type: String, default: "-" },
    MaDiemBan: { type: String, default: "-" },
    LoaiGD: { type: String, required: true },
    ThoiGianTao: { type: Date, required: true },
    TaiKhoanNhan: { type: String, required: true },
    NoiDung: { type: String, required: true },
    GhiChu: { type: String, default: "-" },
    TrangThai: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const transactionModel = mongoose.model(modelName, transactionSchema);

module.exports = transactionModel;
