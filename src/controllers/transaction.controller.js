const env = require("@src/configs/env")
const GiaoDich = require("@src/models/GiaoDich")
const { default: axios } = require("axios")
const https = require("https")

const agent = new https.Agent({ keepAlive: true })

/* getNewSheetTrans */
const getNewSheetTrans = async ({ MaGiaoDich = "" }) => {
    const url = `${env.TRANSACTION_URL}?MaGiaoDich=${MaGiaoDich}`

    const response = await axios.get(url, {
        timeout: 1000 * 6,
        httpsAgent: agent,
    })
    return await response.data
}
module.exports.getNewSheetTrans = getNewSheetTrans

/* saveTrans */
const saveTrans = async (data) => {
    const {
        ThoiGianTT,
        SoTien,
        MaGiaoDich,
        MaDonHang,
        MaDiemBan,
        LoaiGD,
        ThoiGianTao,
        TaiKhoanNhan,
        NoiDung,
        GhiChu,
        TrangThai,
    } = data

    const giaoDich = await GiaoDich.findOne({ where: { MaGiaoDich }, raw: true })

    if (!giaoDich) {
        const giaoDichMoi = await GiaoDich.create(
            {
                ThoiGianTT,
                SoTien,
                MaGiaoDich,
                MaDonHang,
                MaDiemBan,
                LoaiGD,
                ThoiGianTao,
                TaiKhoanNhan,
                NoiDung,
                GhiChu,
                TrangThai,
            },
            { raw: true }
        )
        return giaoDichMoi
    }
    return false
}
module.exports.saveTrans = saveTrans

/* getLastTrans */
const getLastTrans = async () => {
    const giaoDich = await GiaoDich.findOne({ order: [["createdAt", "desc"]], raw: true })
    return giaoDich
}
module.exports.getLastTrans = getLastTrans
