import { useState } from "react";
import { useForm } from "./hooks/formValidate";

const regEx = /[a-zA-Z]/;
const currDate = new Date();

const isValidDay = (value) => (value.trim() !== '' && parseInt(value) <= 31 && !regEx.test(value))
const isValidMonth = (value) => (value.trim() !== '' && parseInt(value) <= 12 && !regEx.test(value))
const isValidYear = (value) => (value.trim() !== '' && (parseInt(value) <= currDate.getFullYear()) && !regEx.test(value))

const App = () => {

  const [dateError, setDateError] = useState(false)

  const {
    value: enteredDay,
    hasError: dayHasError,
    isValid: dayIsValid,
    valueChangeHandler: dayChangeHandler,
    inputBlurHandler: dayBlurHandler,
    reset: resetDay
  } = useForm(isValidDay);

  const {
    value: enteredMonth,
    hasError: monthHasError,
    isValid: monthIsValid,
    valueChangeHandler: monthChangeHandler,
    inputBlurHandler: monthBlurHandler,
    reset: resetMonth
  } = useForm(isValidMonth);

  const {
    value: enteredYear,
    hasError: yearHasError,
    isValid: yearIsValid,
    valueChangeHandler: yearChangeHandler,
    inputBlurHandler: yearBlurHandler,
    reset: resetYear
  } = useForm(isValidYear);

  const [displayAge, setAge] = useState({
    days: "--",
    months: "--",
    year: "--",
  });

  let isValid = false;

  if (dayIsValid && monthIsValid && yearIsValid) {
    isValid = true
  }

  const calcAge = (e) => {
    e.preventDefault();

    const inputDate = new Date(`${parseInt(enteredDay)}-${parseInt(enteredMonth)}-${parseInt(enteredYear)}`)
    if (!(inputDate instanceof Date && !isNaN(inputDate))) {
      setDateError(prev => !prev)
      return;
    }

    //Storing Values from input fields
    let day = parseInt(enteredDay);
    let month = parseInt(enteredMonth);
    let year = parseInt(enteredYear);

    //Creating current date object
    const date = new Date();

    //Number of Days in each Month
    let monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    //Age Declarations
    let age = {};

    let ageYears = date.getFullYear() - year;
    let ageMonth = 0;
    let ageDays = 0;


    //Get Total Number of Months
    if (month > date.getMonth()) { //If birth month has not been reached yet
      ageYears -= 1; //Reduce age

      ageMonth = date.getMonth() + 12; //Add Twleve Months to current month
      ageMonth -= month //Remove birth month
    } else {
      ageMonth = date.getMonth() - month; //Diff btw current month and birth month
    }

    //Get Total Number of Days
    if (date.getDate() >= day) { //if birth date has been reached, birthday 🎂
      ageDays = date.getDate() - day;
    } else {
      ageDays = date.getDate() - day + monthDays[month];
    }

    //Add days, month and year properties to age object
    age.days = ageDays.toString();
    age.months = ageMonth.toString();
    age.year = ageYears.toString();

    //update the diplay component
    setAge(age)

    resetDay();
    resetMonth();
    resetYear();
  }

  return (
    <>
      <div className="calc-main">
        <form className="form-wrapper">
          <div className="age-form">
            <div>
              <label className={dayHasError || dateError ? "invalid" : null}>Day
                <input
                  className={dayHasError || dateError ? "invalid" : null}
                  type='text'
                  name="day"
                  placeholder="DD"
                  value={enteredDay}
                  onChange={dayChangeHandler}
                  onBlur={dayBlurHandler}
                />
              </label>
              <span className="error">{dayHasError || dateError ? `Must be a valid ${dayHasError ? "day" : "date"}` : null}</span>
            </div>
            <div>
              <label className={monthHasError || dateError ? "invalid" : null}>Month
                <input
                  className={monthHasError || dateError ? "invalid" : null}
                  type='text'
                  name="month"
                  placeholder="MM"
                  value={enteredMonth}
                  onChange={monthChangeHandler}
                  onBlur={monthBlurHandler}
                />
              </label>
              <span className="error">{monthHasError ? "Must be a valid month" : null}</span>
            </div>
            <div>
              <label className={yearHasError || dateError ? "invalid" : null}>Year
                <input
                  className={yearHasError || dateError ? "invalid" : null}
                  type='text'
                  name="year"
                  placeholder="YYYY"
                  value={enteredYear}
                  onChange={yearChangeHandler}
                  onBlur={yearBlurHandler}
                />
              </label>
              <span className="error">{yearHasError ? "Must be in the past" : null}</span>
            </div>
          </div>
          <div className="form-btn-wrapper">
            <button disabled={!isValid} className={!isValid ? "disabled" : null} onClick={calcAge} ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 46 44"><g fill="none" stroke="#FFF" strokeWidth="2"><path d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44" /></g></svg></button>
            <hr className="form-divider" />
          </div>
        </form>

        <div className="age-display">
          <div>
            <p><span name="year">{displayAge.year}</span>years</p>
            <p><span name="months">{displayAge.months}</span>months</p>
            <p><span name="days">{displayAge.days}</span>days</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
