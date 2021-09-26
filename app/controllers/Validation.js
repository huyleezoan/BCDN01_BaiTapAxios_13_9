function GetELE(spanID) {
    return document.getElementById(spanID);
}

function ReturnMess(spanID, message) {
    GetELE(spanID).style.cssText = 'display:block; color:red';
    GetELE(spanID).innerHTML = message;
}

function ReturnNotMess(spanID) {
    GetELE(spanID).innerHTML = '';
}

function Validation() {
    this.checkEmpty = function(inputVal, spanID, message) {
        if (inputVal.trim() == '') {
            ReturnMess(spanID, message);
            return false;
        } else {
            ReturnNotMess(spanID);
            return true;
        }
    };
    this.checkTaiKhoanTrung = function(inputTK, spanID, message, arrGV) {
        var isExist = false;
        isExist = arrGV.some(function(item) {
            return item.taiKhoan === inputTK.trim();
        });
        //console.log("exist: " + isExist);
        if (isExist) {
            ReturnMess(spanID, message);
            return false;
        } else {
            ReturnNotMess(spanID);
            return true;
        }
    };
    this.checkTen = function(inputTen, spanID, message) {
        var pattern = new RegExp(
            '^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ' +
            'ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ' +
            'ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$'
        );
        if (pattern.test(inputTen.trim())) {
            ReturnNotMess(spanID);
            return true;
        } else {
            ReturnMess(spanID, message);
            return false;
        }
    };
    this.checkEmail = function(inputEmail, spanID, message) {
        var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (inputEmail.trim().match(pattern)) {
            ReturnNotMess(spanID);
            return true;
        } else {
            ReturnMess(spanID, message);
            return false;
        }
    };
    this.checkPass = function(inputPass, spanID, message) {
        var pattern =
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,8}$/;
        if (inputPass.trim().match(pattern)) {
            ReturnNotMess(spanID);
            return true;
        } else {
            ReturnMess(spanID, message);
            return false;
        }
    };
    this.checkDropDown = function(selDropdown, spanID, message) {
        var optionSelect = GetELE(selDropdown).selectedIndex;
        if (optionSelect != 0) {
            ReturnNotMess(spanID);
            return true;
        } else {
            ReturnMess(spanID, message);
            return false;
        }
    };
    this.checkMoTa = function(input, spanID, message) {
        var pattern = new RegExp(
            '^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ' +
            'ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ' +
            'ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]{1,10}$'
        );
        if (pattern.test(input.trim())) {
            console.log("test = " + pattern.test(input.trim()));
            ReturnNotMess(spanID);
            return true;
        } else {
            ReturnMess(spanID, message);
            return false;
        }

    }
}