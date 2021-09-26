var dsGV = new DanhSachGiaoVien();
var validation = new Validation();
var textDinhDang = ' không đúng định dạng!';

function GetElementID(id) {
    return document.getElementById(id);
}

function layDSGV() {
    dsGV.layDS()
        .then(function(response) {
            // thành công
            console.log(response.data);
            hienThi(response.data);
        })
        .catch(function(error) {
            // lỗi
            console.log(error);
        });
}
layDSGV();

function checkValEmpty(val, id) {
    return validation.checkEmpty(val, id, 'Bạn không được bỏ trống ô này!');
}

function checkDrop(sel, spanId) {
    return validation.checkDropDown(
        sel,
        spanId,
        'Chưa lựa chọn!'
    );
}

function checkValidation(
    taiKhoan, matKhau, hoTen, email, ngonNgu, loaiND, moTa, hinhAnh
) {
    var isValid = true;
    isValid &= checkValEmpty(taiKhoan, 'tbTaiKhoan');
    isValid &=
        checkValEmpty(hoTen, 'tbHoTen') &&
        validation.checkTen(hoTen, 'tbHoTen', 'Tên' + textDinhDang);
    isValid &=
        checkValEmpty(email, 'tbEmail') &&
        validation.checkEmail(email, 'tbEmail', 'Email' + textDinhDang);
    isValid &=
        checkValEmpty(hinhAnh, 'tbHinhAnh');
    isValid &=
        checkValEmpty(matKhau, 'tbMatKhau') &&
        validation.checkPass(matKhau, 'tbMatKhau', 'Mật khẩu' + textDinhDang);
    // check chức vụ
    isValid &= checkDrop('loaiNguoiDung', 'tbNguoiDung');
    isValid &= checkDrop('loaiNgonNgu', 'tbNgonNgu');
    isValid &=
        checkValEmpty(moTa, 'tbMoTa');
    return isValid;
}

function KetQuaKhiIsValid(
    taiKhoan, matKhau, hoTen, email, ngonNgu, loaiND, moTa, hinhAnh
) {
    var gv = new GiaoVien(
        taiKhoan, matKhau, hoTen, email, ngonNgu, loaiND, moTa, hinhAnh
    );
    return gv;
}

function hienThi(mangDS) {
    var content = "";
    mangDS.map(function(item, index) {
        content += `
            <tr>
                <td>${index+1}</td>
                <td>${item.taiKhoan}</td>
                <td>${item.matKhau}</td>
                <td>${item.hoTen}</td>
                <td>${item.email}</td>
                <td>${item.ngonNgu}</td>
                <td>${item.loaiND}</td>
                <td>
                    <button class="btn btn-danger" onclick ="xoa('${item.id}');">Xóa</button>
                    <button class="btn btn-info" onclick="layChiTiet('${item.id}');" data-toggle="modal" data-target="#myModal" id="Xem">Xem</button>
                </td>    
            </tr>
        `;
        document.querySelector("#tblDanhSachNguoiDung").innerHTML = content;
    });

}

function themGV() {
    // lấy thông tin từ form
    var taiKhoan = document.getElementById("TaiKhoan").value;
    var hoTen = document.getElementById("HoTen").value;
    var matKhau = document.getElementById("MatKhau").value;
    var email = document.getElementById("Email").value;
    var hinhAnh = document.getElementById("HinhAnh").value;
    var loaiND = document.getElementById("loaiNguoiDung").value;
    var ngonNgu = document.getElementById("loaiNgonNgu").value;
    var moTa = document.getElementById("MoTa").value;

    var isValid = checkValidation(taiKhoan, matKhau, hoTen, email, ngonNgu, loaiND, moTa, hinhAnh);
    console.log(isValid);
    // check tài khoản
    dsGV.layDS()
        .then(function(response) {
            // thành công
            isValid &= validation.checkTaiKhoanTrung(taiKhoan, 'tbTaiKhoan', 'Tài khoản đã tồn tại', response.data);
        })
        .catch(function(error) {
            // lỗi
            console.log(error);
        });
    console.log(isValid);
    if (isValid) {
        var gv = new GiaoVien(taiKhoan, matKhau, hoTen, email, ngonNgu, loaiND, moTa, hinhAnh);
        console.table(gv);
        dsGV.them(gv)
            .then(function(response) {
                // ko xài reponse.data vì cơ chế khác nhau
                console.log(response);
                layDSGV();
                document.querySelector("#myModal .close").click();
                //document.querySelector(".sp-thongbao").style.cssText = 'display:none';
            })
            .catch(function(error) {
                console.log(error);
            });
    }
    //console.log(taiKhoan, hoTen, matKhau, email, hinhAnh, loaiND, loaiNN, moTa);
}

function ResetForm() {
    // GetElementID('tknv').value.disabled = false;
    document.querySelector("#modal-body").reset();
}
document.querySelector("#btnThemNguoiDung").addEventListener('click', function() {

    document.querySelector(".modal-footer").innerHTML = `
      <button class="btn btn-success" onclick="themGV();">Thêm</button>  
    `;
});

function layChiTiet(id) {
    dsGV.layGV(id)
        .then(function(response) {
            //console.log(reponse.data);
            document.getElementById("TaiKhoan").value = response.data.taiKhoan;
            document.getElementById("HoTen").value = response.data.hoTen;
            document.getElementById("MatKhau").value = response.data.matKhau;
            document.getElementById("Email").value = response.data.email;
            document.getElementById("HinhAnh").value = response.data.hinhAnh;
            document.getElementById("loaiNguoiDung").value = response.data.loaiND;
            document.getElementById("loaiNgonNgu").value = response.data.ngonNgu;
            document.getElementById("MoTa").value = response.data.moTa;
            document.querySelector(".modal-footer").innerHTML = `
                  <button class="btn btn-success" onclick="capNhapGV('${response.data.id}');">Cập nhập</button>  
                `;
        })
        .catch(function(error) {
            console.log(error);
        });
}

function capNhapGV(id) {
    var taiKhoan = document.getElementById("TaiKhoan").value;
    var hoTen = document.getElementById("HoTen").value;
    var matKhau = document.getElementById("MatKhau").value;
    var email = document.getElementById("Email").value;
    var hinhAnh = document.getElementById("HinhAnh").value;
    var loaiND = document.getElementById("loaiNguoiDung").value;
    var ngonNgu = document.getElementById("loaiNgonNgu").value;
    var moTa = document.getElementById("MoTa").value;
    var gv = new GiaoVien(taiKhoan, matKhau, hoTen, email, ngonNgu, loaiND, moTa, hinhAnh);
    dsGV.capNhap(gv, id)
        .then(function(response) {
            console.log(response.data);
            layDSGV();
            document.querySelector("#myModal .close").click();
        })
        .catch(function(error) {
            console.log(error);
        })
}

function xoa(id) {
    dsGV.xoaGV(id)
        .then(function(response) {
            console.log(response.data);
            layDSGV();
        })
        .catch(function(error) {
            console.log(error);
        })
}