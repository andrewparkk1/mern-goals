import {useState, useEffect} from 'react'
import {FaSignInAlt} from 'react-icons/fa'

function Login() {
  const [formData, setFormData] = useState({
    email:'',
    password:'',
  })

  const {email, password} = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div>
      <section>
        <FaSignInAlt></FaSignInAlt>
        <h3>Login</h3>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input type="text" className='form-control' id='email' name='email' value={email} placeholder='enter your email' onChange={onChange}/>
          </div>
          <div className="form-group">
            <input type="text" className='form-control' id='password' name='password' value={password} placeholder='enter your password' onChange={onChange}/>
          </div>

          <div className="form-group">
            <button type='submit' className='btn btn-block'>Submit</button>
          </div>


        </form>
      </section>
      

    </div>
  )
}

export default Login