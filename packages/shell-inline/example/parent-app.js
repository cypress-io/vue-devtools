require('../')

document.getElementById('open-devtools').onclick = () => {
    window.inlineDevtools('#app', document.getElementsByTagName('iframe')[0])
}