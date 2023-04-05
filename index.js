const allInputs = document.querySelectorAll('input')
const inputDay = document.querySelectorAll('input[name="day"]')[0]
const inputMonth = document.querySelectorAll('input[name="month"]')[0]
const inputYear = document.querySelectorAll('input[name="year"]')[0]
const submitButton = document.querySelectorAll('button')[0]
const outputYears = document.getElementById('output-years')
const outputMonths = document.getElementById('output-months')
const outputDays = document.getElementById('output-days')
let currentDate = new Date().getDate()
let currentMonth = new Date().getMonth() + 1
let currentYear = new Date().getFullYear()
let birthDate
let birthMonth
let birthYear
let monthsDays = []



// Focus next input when max characters reached, stop event listener on last element
// currently does not work well with tab when refilling inputs
for (i = 0; i < allInputs.length - 1; i++) {
    allInputs[i].addEventListener('input', function() {
        determineError()
        if (this.value.length == this.getAttribute('maxlength')) {
           this.parentElement.nextElementSibling.children[1].focus()
           this.parentElement.nextElementSibling.children[1].select()
        } 
    }, true)
}

// Allow error to display on last input immediately
for (i = 0; i < allInputs.length; i++) {
    allInputs[i].addEventListener('keyup', determineError)
}

// Automatically select a filled input on click for easy edit
for (i = 0; i < allInputs.length; i++) {
    allInputs[i].addEventListener('click', function() {
        this.select()
        determineError()
    })
}

// Calculation
submitButton.addEventListener('click', function(event) {
    event.preventDefault()
    calculateAge()
})

function calculateAge() {
    birthDate = inputDay.value
    birthMonth = (inputMonth.value)
    birthYear = inputYear.value

    if (birthYear % 4 === 0) {
        if (birthYear % 100 === 0) {
            if (birthYear % 400 === 0) {
                feb = 29
            } else 
                feb = 28
        } else
            feb = 29
    } else {
        feb = 28
    }

    monthsDays = [31, feb, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    if (birthDate > currentDate) {
        currentDate = currentDate + monthsDays[birthMonth - 1]
        currentMonth = currentMonth - 1
    }

    if (birthMonth > currentMonth) {
        currentYear = currentYear - 1
        currentMonth = currentMonth + 12
    }


    var caclulatedDays = currentDate - birthDate
    var calculatedMonths = currentMonth - birthMonth
    var calculatedYears = currentYear - birthYear
    
    outputYears.innerHTML = calculatedYears
    outputMonths.innerHTML = calculatedMonths
    outputDays.innerHTML = caclulatedDays

    determineError()
    // Error if inputs are empty
    for (i = 0; i < allInputs.length; i++) {
        if (allInputs[i].value === '') {
            allInputs[i].nextElementSibling.style.display = 'block'
        } else {
            allInputs[i].nextElementSibling.style.display = 'none'
        }
    }  

    birthDate = ''
    birthMonth = ''
    birthYear = ''
    currentDate = new Date().getDate()
    currentMonth = new Date().getMonth() + 1
    currentYear = new Date().getFullYear()
    monthsDays = []

}

// Error if not correct date format
function determineError() {
    if (birthDate > monthsDays[birthMonth - 1] || inputDay.value.match(/^[a-zA-Z0 .!?"-]+$/)) {
        allInputs[0].style.border = '1px solid red'
        allInputs[0].previousElementSibling.style.color = 'red'
        outputDays.innerHTML = '--'
        outputMonths.innerHTML = '--'
        outputYears.innerHTML = '--'
    } else {
        allInputs[0].style.border = ''
        allInputs[0].previousElementSibling.style.color = ''
    }
    if (inputMonth.value > 12 || inputMonth.value.match(/^[a-zA-Z0 .!?"-]+$/)) {
        allInputs[1].style.border = '1px solid red'
        allInputs[1].previousElementSibling.style.color = 'red'
        outputDays.innerHTML = '--'
        outputMonths.innerHTML = '--'
        outputYears.innerHTML = '--'
    } else {
        allInputs[1].style.border = ''
        allInputs[1].previousElementSibling.style.color = ''
    }
    if (inputYear.value > currentYear || inputYear.value.match(/^[a-zA-Z0 .!?"-]+$/)) {
        allInputs[2].style.border = '1px solid red'
        allInputs[2].previousElementSibling.style.color = 'red'
        outputDays.innerHTML = '--'
        outputMonths.innerHTML = '--'
        outputYears.innerHTML = '--'
    } else {
        allInputs[2].style.border = ''
        allInputs[2].previousElementSibling.style.color = ''
    }

}
