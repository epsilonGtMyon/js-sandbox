document.getElementById("btn1-top").addEventListener("click", () => {

    Toast.push(`abc
adeb`, 'is-top-left', 'is-primary');
});
document.getElementById("btn2-top").addEventListener("click", () => {

    Toast.push(`abc
adeb`, 'is-top-center', 'is-success');
});

document.getElementById("btn3-top").addEventListener("click", () => {

    Toast.push(`abc
adeb`, 'is-top-right', 'is-danger');
});

//----------------------

document.getElementById("btn1-bottom").addEventListener("click", () => {

    Toast.push(`abc
adeb`, 'is-bottom-left', 'is-primary');
});
document.getElementById("btn2-bottom").addEventListener("click", () => {

    Toast.push(`abc
adeb`, 'is-bottom-center', 'is-success');
});

document.getElementById("btn3-bottom").addEventListener("click", () => {

    Toast.push(`abc
adeb`, 'is-bottom-right', 'is-danger');
});

