/* eslint-disable */
/* eslint-enable no-case-declarations */
/*eslint no-case-declarations: "error"*/
switch (foo) {
    case 1:
        let x = 1;
        break;
    case 2:
        const y = 2;
        break;
    case 3:
        function f() {}
        break;
    default:
        class C {}
}
