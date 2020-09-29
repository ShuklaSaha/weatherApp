console.log('Loading client side javascript')
const m1=document.querySelector('.m1')
const m2=document.querySelector('.m2')
const weatherInfo = (address) => {
    fetch('/weather?address=' + address).then((response) => {
        response.json().then((data) => {
            if (data.error)
                m1.textContent=data.error
            else {
                m1.textContent=data.location
                m2.textContent=data.description
            }
        })
    })
}
const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    m1.textContent='Loading'
    m2.textContent=''
    const location = searchElement.value
    console.log(location)
    weatherInfo(location)
})