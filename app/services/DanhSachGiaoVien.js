function DanhSachGiaoVien() {
    // lấy danh sách giáo viên
    this.layDS = function() {
        // axious có lệnh return (tham số là object và trả là object)
        return axios({
            method: 'get',
            url: 'https://61320761ab7b1e001799b298.mockapi.io/DanhSachGiaoVien'
                //responseType: 'stream': kiểu dữ liệu (mặc định là JSON)
        });
    }
    this.them = function(gv) {
        return axios({
            method: 'post',
            url: 'https://61320761ab7b1e001799b298.mockapi.io/DanhSachGiaoVien',
            data: gv
        });
    }
    this.layGV = function(id) {
        return axios({
            method: 'get',
            url: `https://61320761ab7b1e001799b298.mockapi.io/DanhSachGiaoVien/${id}`
        });
    }
    this.capNhap = function(gv, id) {
        return axios({
            method: 'put',
            url: `https://61320761ab7b1e001799b298.mockapi.io/DanhSachGiaoVien/${id}`,
            data: gv
        });
    }
    this.xoaGV = function(id) {
        return axios({
            method: 'delete',
            url: `https://61320761ab7b1e001799b298.mockapi.io/DanhSachGiaoVien/${id}`
        });
    }
}