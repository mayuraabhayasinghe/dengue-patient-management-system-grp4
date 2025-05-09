import React from 'react'
import "./Caretaker.css"

function Caretaker() {
  return (
    <div className="main-container">
      <div className="container">
      <div className="header">
        <div>
          <strong>Patient Name :</strong> <strong>Thilak Rathnayake</strong><br />
          Time : 4:08 PM
        </div>
        <div>
          <strong>Admission Date :</strong> <strong>12/03/2025</strong><br />
          Date : 29/03/2025
        </div>
      </div>

      <form className="form-box">
        <h3>Fluid Input</h3>
        <div className="form-row">
          <div className="form-group">
            <label>Kind of Fluid</label>
            <input type="text" className="short-input" />
          </div>
          <div className="form-group">
            <label>Intake Type</label>
            <select>
              <option>IV</option>
              <option>Oral</option>
              <option>NG</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Intake Volume</label>
          <input type="text" placeholder="ml" className="short-input"/>
          <span className="small-text">*maximum 1.5ml should be 100ml per hour</span>
        </div>

        <h3>Fluid Output</h3>
        <div className="form-group">
          <label>Urine Output</label>
          <input type="text" placeholder="ml" className="short-input"/>
        </div>

        <div className="form-group">
          <label>Vital Signs of Fluid Output (Optional)</label>
          <div className="radio-group">
            <label><input type="radio" name="vomitus" /> Vomitus</label>
            <label><input type="radio" name="diarrhoe" /> Diarrhoea</label>
          </div>
        </div>

        <div className="button-group">
          <button type="button" className="back-btn">Back</button>
          <button type="submit" className="submit-btn">Submit</button>
        </div>
      </form>
    </div>
    </div>
    
  )
}

export default Caretaker
