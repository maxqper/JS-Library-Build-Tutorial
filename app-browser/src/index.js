const hello = () => {
    let out = new webpackModuleOne.ClassOne().methodOne();
    document.getElementById('root').innerHTML = "This is an app example where module One API is accessed as a browser script' \n Results: === " + out;
}

const helloAgain = () => {
    let out = new webpackModuleTwo.ClassTwo().methodTwo();
    document.getElementById('root').innerHTML = document.getElementById('root').innerHTML  + "<br><br>This is an app example where module Two API is accessed as a browser script' \n Results: === " + out;
}

hello();
helloAgain();