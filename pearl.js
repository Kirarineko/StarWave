
//目的地XZ坐标分别减去炮口XZ坐标
//在乘以利用率
function 计算当量(){

    const 目标X = parseFloat(document.getElementById('目标X').value) || 0;
    const 目标Y = parseFloat(document.getElementById('目标Y').value) || 0;
    const 炮口X = parseFloat(document.getElementById('炮口X').value) || 0;
    const 炮口Y = parseFloat(document.getElementById('炮口Y').value) || 0;
    const TNT利用率 = parseFloat(document.getElementById('TNT利用率').value) || 0.602568;


    function 目标减炮口X(awa) {return awa-炮口X};
    function 目标减炮口Y(qwq) {return qwq-炮口Y};

    function 乘以TNT利用率X(twt) {return twt*TNT利用率};
    function 乘以TNT利用率Y(ovo) {return ovo*TNT利用率};

    let X当量 = 乘以TNT利用率X(目标减炮口X(目标X));
    let Y当量 = 乘以TNT利用率Y(目标减炮口Y(目标Y));
}