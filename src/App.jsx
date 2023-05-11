import React, { useState } from "react";

const App = () => {
  const [val, setVal] = useState({
    day: "",
    month: "",
    year: ""
  });

  const [displayAge, setAge] = useState({
    days: "--",
    months: "--",
    year: "--",
  });

  const [errors, setState] = useState({
    day: "",
    month: "",
    year: "",
  });

  const [disabled, setDisabled] = useState(false);

  let invalidBool = false;

  const handleChange = (e) => {
    const { name, value } = e.target;

    validateForm(name, value);

    setVal({
      ...val,
      [e.target.name]: value
    })
  }

  const validateForm = (name, value) => {
    let regExp = /[a-zA-Z]/g;

    switch (name) {
      case 'day':
        errors.day =
          parseInt(value) > 31 || regExp.test(value) ? 'Must be a valid day' : '';
        break;

      case 'month':
        errors.month =
          parseInt(value) > 12 || regExp.test(value) ? 'Must be a valid month' : '';
        break;

      case 'year':
        errors.year =
          parseInt(value) > new Date().getFullYear() ? 'Must be in the past' : regExp.test(value) ? 'Must be a valid year' : '';
        break;

      default:
        break;
    }
    setState(errors)

    Object.values(errors).forEach(error => {
      if (error.length > 0) {
        invalidBool = true
      }
    })
  }

  const calcAge = (e) => {
    e.preventDefault();

    //Storing Values from input fields
    let day = parseInt(val.day);
    let month = parseInt(val.month);
    let year = parseInt(val.year);

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
  }

  return (
    <>
      <div className="calc-main">
        <form className="form-wrapper">
          <div className="age-form">
            <div>
              <label>Day <input type='text' name="day" placeholder="DD" value={val.day} onChange={handleChange}></input></label>
              <span className="error">{errors.day}</span>
            </div>
            <div>
              <label>Month<input type='text' name="month" placeholder="MM" value={val.month} onChange={handleChange}></input></label>
              <span className="error">{errors.month}</span>
            </div>
            <div>
              <label>Year<input type='text' name="year" placeholder="YYYY" value={val.year} onChange={handleChange}></input></label>
              <span className="error">{errors.year}</span>
            </div>
          </div>
          <div className="form-btn-wrapper">
            <button onClick={calcAge} disabled={disabled}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 46 44"><g fill="none" stroke="#FFF" strokeWidth="2"><path d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44" /></g></svg></button>
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
